import React, { useState, useEffect } from 'react'
import { View, Text, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';
import * as Notifications from 'expo-notifications'
import { enderecoServidor } from '../../Config';

//Configuração das notificações
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,    // Exibir alerta na barra de notificação
        shouldPlaySound: true,    // Emitir som da notificação
        shouldSetBadge: true,     // Exibir o nº de notificações   
    })
})

const Home = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [tipoAcesso, setTipoAcesso] = useState('');
    const [dadosNotificacao, setDadosNotificacao] = useState('')

    const verificarLoginRealizado = async () => {
        let dadosLogado = await AsyncStorage.getItem('DadosUsuárioLogado');
        if (dadosLogado) {
            dadosLogado = JSON.parse(dadosLogado);
            console.log(dadosLogado);
            setNome(dadosLogado.nome)
            setTipoAcesso(dadosLogado.tipoAcesso)
            carregarNotificacoes(dadosLogado.id_usuario)
        }
    }

    useEffect(() => {
        verificarLoginRealizado();
    }, []);

    const botaoLogout = async () => {
        await AsyncStorage.removeItem('DadosUsuárioLogado')
        navigation.navigate('BemVindo')
    }

    const exibirItensLista = ( {item} ) => {
        return(
            <View style={{marginVertical:5, padding: 10, borderColor:'#ccc',
                            borderWidth: 1, backgroundColor:'#fff' }} >
                <Text>{item.descricao}</Text>
            </View>
        )
    }

    const carregarNotificacoes = async (idUsuarioLogado) => {
        try {
            const resposta = await fetch(
                `${enderecoServidor}/notificacoes/obterNotificacoes/${idUsuarioLogado}`)
            const dados = await resposta.json()
            setDadosNotificacao(dados)

            if (dados.length > 0) {
                criarNotificacaoLocal()
            }

        } catch(error) {
            console.error('Erro ao buscar notificações', error);
        }
    }

    //Criando função para gerar uma notificação local
    const criarNotificacaoLocal = async () => {
        await Notifications.scheduleNotificationAsync({
            content: {
                title: 'Aplicativo Base Projeto',
                body: 'Há novas notificações para você',
                data: {}
            },
            trigger: {
                seconds: 5
            }
        })
    }

    return (
        <View>
            <Text>Tela de Home</Text>
            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', padding:20}}>
                <View>
                    <Text style={{ fontSize: 16 }}>Nome: </Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{nome}</Text>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{tipoAcesso}</Text>
                </View>
                <MaterialIcons name='logout' size={25} onPress={botaoLogout} />
            </View>

            <Text> Notificações: </Text>
            <FlatList 
                data={dadosNotificacao}
                renderItem={exibirItensLista}
                keyExtractor={(item) => item.id_notificacao.toString() }
            />

        </View>
    )
}

export default Home