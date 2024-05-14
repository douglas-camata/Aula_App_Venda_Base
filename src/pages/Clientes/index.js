
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { corBorda, corBranco, corPrincipal, meusEstilos } from '../../style/MeusEstilos';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Clientes = ({ navigation }) => {
    const [dadosLista, setDadosLista] = useState([]);
    const [txtPesquisa, setTxtPesquisa] = useState('');
    const [ordenacao, setOrdenacao] = useState('nome');
    const [nrClientes, setNrClientes] = useState(0)

    const isFocused = useIsFocused()

    const buscarDadosAPI = async () => {
        if (txtPesquisa == '') {
            setDadosLista([])
            return
        }
        try {
            const response = await fetch(`http://192.168.0.237:5000/clientes/obterClientes/${txtPesquisa}`);
            const dados = await response.json();
            
            if (ordenacao === 'nome') {
                dados.sort((a, b) => a.nome.localeCompare(b.nome));
            } else if (ordenacao === 'cidade') {
                dados.sort((a, b) => a.cidade.localeCompare(b.cidade));
            }        
            setDadosLista(dados);
            setNrClientes(dados.length);
              
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    const exibirItemLista = ({ item }) => {
        return (
            <TouchableOpacity style={meusEstilos.itemLista}
                onPress={async () => {
                    await AsyncStorage.setItem('ClienteSelecionado', JSON.stringify({
                        id_cliente: item.id_cliente,
                        nome: item.nome
                    }));
                    navigation.navigate('ComprarProduto')}
                }
            >
                <View style={meusEstilos.textContainer}>
                    <Text>{item.nome} - Cid.: {item.cidade}</Text>
                    <Text>Fone: {item.telefone}</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('CadCliente', { Alterar: item })}>
                    <MaterialIcons name="edit" size={24} color={corPrincipal} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => botaoExcluirProduto(item.id_cliente)}>
                    <MaterialIcons name="delete" size={24} color={corPrincipal} />
                </TouchableOpacity>
                
            </TouchableOpacity>
        );
    }

    const botaoExcluirProduto = async (id) => {
        try {
            const resposta = await fetch(`http://192.168.0.237:5000/clientes/excluirCliente/${id}`,
                { method: 'DELETE' })
            if (resposta.ok)
                buscarDadosAPI()
        } catch (error) {
            console.error('Erro ao excluir Produto:', error)
        }
    }

    useEffect(() => {
        buscarDadosAPI()
    }, [isFocused]);    

    return (
        <View style={meusEstilos.conteudoHeader}>
            <View style={meusEstilos.controles}>
                <TextInput
                    style={meusEstilos.inputPesquisa}
                    placeholder="Pesquisar"
                    value={txtPesquisa}
                    onChangeText={setTxtPesquisa}
                />
                <View style={meusEstilos.picker}>
                    <Picker
                        selectedValue={ordenacao}
                        onValueChange={setOrdenacao}
                    >
                        <Picker.Item label="Nome" value="nome" />
                        <Picker.Item label="Cidade" value="cidade" />
                    </Picker>
                </View>

                <TouchableOpacity style={meusEstilos.botaoIcone2}
                    onPress={buscarDadosAPI}>
                    <MaterialIcons name="search" size={24} color={corBranco} />
                </TouchableOpacity>
            </View>

            <View style={[meusEstilos.conteudoCorpo, {paddingHorizontal:0}]}>
                <View style={meusEstilos.tituloLista}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: corPrincipal }}>
                        Clientes listados {nrClientes}</Text>
                    <TouchableOpacity style={meusEstilos.botaoIcone}
                        onPress={() => navigation.navigate('CadCliente')}>
                        <MaterialIcons name="add" size={24} color={corPrincipal} />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={dadosLista}
                    renderItem={exibirItemLista}
                    keyExtractor={(item) => item.id_cliente.toString()}
                />
            </View>

        </View>
    );
};

export default Clientes
