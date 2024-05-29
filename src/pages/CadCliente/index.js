import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { corBranco, meusEstilos } from '../../style/MeusEstilos';
import { Picker } from '@react-native-picker/picker';
import { enderecoServidor } from '../../Config';

const CadCliente = ({ navigation, route }) => {
    const [inputNome, setInputNome] = useState('')
    const [inputCidade, setInputCidade] = useState('')
    const [inputTelefone, setInputTelefone] = useState('')
    const [inputCEP, setInputCEP] = useState('')
    const [inputEndereco, setInputEndereco] = useState('')
    const [inputNumero, setInputNumero] = useState('')
    const [inputBairro, setInputBairro] = useState('')
    const [inputEstado, setInputEstado] = useState('')

    useEffect(
        () => {
            if (route.params && route.params.Alterar) {
                setInputNome(route.params.Alterar.nome)
                setInputTelefone(route.params.Alterar.telefone)
                setInputCEP(route.params.Alterar.cep)
                setInputEndereco(route.params.Alterar.endereco)
                setInputNumero(route.params.Alterar.numero)
                setInputBairro(route.params.Alterar.bairro)
                setInputCidade(route.params.Alterar.cidade)
                setInputEstado(route.params.Alterar.estado)
            } else {
                setInputNome('')
                setInputTelefone('')
                setInputCEP('')
                setInputEndereco('')
                setInputNumero('')
                setInputBairro('')
                setInputCidade('')
                setInputEstado('')
            }
        }, [route.params]
    )

    const botaoSalvarCliente = async () => {
        try {
            //Criando variável para apontar qual endpoint deve ir
            let endpoint = `${enderecoServidor}/clientes/incluirCliente`
            let metodo = 'POST'

            if (route.params && route.params.Alterar) {
                endpoint = `${enderecoServidor}/clientes/alterarCliente/${route.params.Alterar.id_cliente}`
                metodo = 'PUT'
            }

            console.log(endpoint);
            //Endereço do endpoint do POST
            const resposta = await fetch(endpoint,
                {
                    method: metodo,  //Qual é o método do endpoint
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        nome: inputNome,
                        telefone: inputTelefone,
                        cep: inputCEP,
                        endereco: inputEndereco,
                        numero: inputNumero,
                        bairro: inputBairro,
                        cidade: inputCidade,
                        estado: inputEstado
                    })
                }
            )
            if (resposta.ok) {
                alert('Cliente salvo com sucesso')
                //Redirecionando para a tela com todos os produtos
                navigation.goBack()
            }

        } catch (error) {
            console.error('Erro ao salvar cliente:', error)
        }
    }

    return (
        <View style={{ padding: 20, flex:1 }}>

            <ScrollView>

                <Text style={styles.label}> Nome:</Text>
                <TextInput placeholder='Nome do cliente' value={inputNome}
                    onChangeText={setInputNome} style={meusEstilos.inputCad} />
                <Text style={styles.label}> Telefone:</Text>
                <TextInput placeholder='Telefone' value={inputTelefone}
                    onChangeText={setInputTelefone} style={meusEstilos.inputCad} />
                <Text style={styles.label}> CEP:</Text>
                <TextInput placeholder='CEP' value={inputCEP}
                    onChangeText={setInputCEP} style={meusEstilos.inputCad} />
                <Text style={styles.label}> Endereço:</Text>
                <TextInput placeholder='Endereco' value={inputEndereco}
                    onChangeText={setInputEndereco} style={meusEstilos.inputCad} />
                <Text style={styles.label}> Nr:</Text>
                <TextInput placeholder='Nr' value={inputNumero}
                    onChangeText={setInputNumero} style={meusEstilos.inputCad} />
                <Text style={styles.label}> Bairro:</Text>
                <TextInput placeholder='Bairro' value={inputBairro}
                    onChangeText={setInputBairro} style={meusEstilos.inputCad} />
                <Text style={styles.label}> Cidade:</Text>
                <TextInput placeholder='Cidade' value={inputCidade}
                    onChangeText={setInputCidade} style={meusEstilos.inputCad} />
                <Text style={styles.label}> Estado:</Text>
                <TextInput placeholder='Estado' value={inputEstado}
                    onChangeText={setInputEstado} style={meusEstilos.inputCad} />
                
                <TouchableOpacity style={meusEstilos.botao}
                    onPress={botaoSalvarCliente}>
                    <Text style={meusEstilos.textoBotao}> Salvar </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    imagem: {
        width: 200,
        height: 200,
    },
    picker: {
        backgroundColor: corBranco,
        height: 40,
        justifyContent: 'center',
        marginBottom: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
})

export default CadCliente
