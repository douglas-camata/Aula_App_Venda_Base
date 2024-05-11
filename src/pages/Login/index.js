import React, { useState } from "react"
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native'
import * as Animar from 'react-native-animatable'
import { Picker } from '@react-native-picker/picker';
import { corBranco, meusEstilos } from "../../style/MeusEstilos"

const Login = ({ navigation }) => {
    const [tipoAcesso, setTipoAcesso] = useState('vendedor')
    const [usuario, setUsuario] = useState('')
    const [senha, setSenha] = useState('')
    const [mensagemLogin, setMensagemLogin] = useState('')

    const botaoEntrar = async () => {
        try {
            // URL do endpoint da API de Login
            const resposta = await fetch('http://192.168.0.237:5000/usuarios/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body : JSON.stringify({
                    usuario: usuario,
                    senha: senha,
                    tipo_usuario: tipoAcesso
                })
            })
            if (!resposta.ok) {
                setMensagemLogin('Usuário e/ou senha não encontrado')
                return
            }

            const json = await resposta.json()
            if (json.length == 0) 
                setMensagemLogin('Usuário e/ou senha não encontrado')
            else
                navigation.navigate('MenuNavegacao', {tipo_usuario: tipoAcesso})

        } catch (error) {
            console.error('Erro ao realizar o login:', error)
        }
    }

    return (
        <View style={meusEstilos.conteudoHeader}>
            <Animar.View animation='fadeInLeft' delay={500} style={styles.header} >
                <Image source={require('../../assets/logo.png')}
                        style={styles.logo}
                        resizeMode="contain" />
                <Text style={styles.headerText}>Bem-vindo(a) </Text>
            </Animar.View>
            <Animar.View animation={'fadeInUp'} style={meusEstilos.conteudoCorpo}>

                <Text style={styles.label}> Tipo acesso:</Text>
                <View style={styles.picker}>
                    <Picker
                        selectedValue={tipoAcesso}
                        onValueChange={setTipoAcesso}
                    >
                        <Picker.Item label="Vendedor" value="vendedor" />
                        <Picker.Item label="Gerente" value="gerente" />
                    </Picker>
                </View>
                <Text style={styles.label}> Email:</Text>
                <TextInput 
                    placeholder="Digite um email..." 
                    style={styles.inputLogin} 
                    value={usuario}
                    onChangeText={setUsuario}/>
                <Text style={styles.label}> Senha:</Text>
                <TextInput 
                    placeholder="Digite sua senha" 
                    style={styles.inputLogin} 
                    secureTextEntry={true} 
                    value={senha}
                    onChangeText={setSenha}/>
                <TouchableOpacity style={meusEstilos.botao}
                    onPress={botaoEntrar}>
                    <Text style={meusEstilos.textoBotao}> Acessar </Text>
                </TouchableOpacity>
                <Text>{mensagemLogin}</Text>
            </Animar.View>
        </View>
    )
}

const styles = StyleSheet.create({
    header: {
        marginTop: '14%',
        marginBottom: '8%',
        paddingStart: '5%',
        flexDirection: 'row'
    },
    headerText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: corBranco
    },
    logo : {
        width: 30, 
        height: 30, 
        marginRight: 20
    },
    picker: {
        backgroundColor: corBranco,
        height: 40,
        justifyContent: 'center',
        borderBottomWidth: 1,
    },
    label: {
        fontSize: 20,
        marginTop: 28
    },
    inputLogin: {
        borderBottomWidth: 1,
        height: 40,
        fontSize: 16
    },
})

export default Login
