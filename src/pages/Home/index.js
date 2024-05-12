import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

const Home = ({ navigation }) => {
    const [nome, setNome] = useState('');
    const [tipoAcesso, setTipoAcesso] = useState('');

    const verificarLoginRealizado = async () => {
        let dadosLogado = await AsyncStorage.getItem('DadosUsuárioLogado');
        if (dadosLogado) {
            dadosLogado = JSON.parse(dadosLogado);
            console.log(dadosLogado);
            setNome(dadosLogado.nome)
            setTipoAcesso(dadosLogado.tipoAcesso)
        }
    }

    useEffect(() => {
        verificarLoginRealizado();
    }, []);

    const botaoLogout = async () => {
        await AsyncStorage.removeItem('DadosUsuárioLogado')
        navigation.navigate('BemVindo')
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

        </View>
    )
}

export default Home