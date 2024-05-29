import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { corBranco, meusEstilos } from '../../style/MeusEstilos';
import { enderecoServidor } from '../../Config';

const CadProduto = ({ navigation, route }) => {
    const [inputTitulo, setInputTitulo] = useState('')
    const [inputPreco, setInputPreco] = useState('')
    const [inputLinkImagem, setInputLinkImagem] = useState('')

    useEffect(
        () => {
            if (route.params && route.params.produtoAlterar) {
                setInputTitulo(route.params.produtoAlterar.TITULO)
                setInputPreco(route.params.produtoAlterar.PRECO)
                setInputLinkImagem(route.params.produtoAlterar.IMAGEM)
            } else {
                setInputTitulo('')
                setInputPreco('')
                setInputLinkImagem('')
            }
        }, [route.params]
    )

    const botaoSalvarProduto = async () => {
        try {
            //Criando variável para apontar qual endpoint deve ir
            let endpoint = `${enderecoServidor}/produtos/incluirProduto`
            let metodo = 'POST'

            if (route.params && route.params.produtoAlterar) {
                endpoint = `${enderecoServidor}/produtos/alterarProduto/${route.params.produtoAlterar.ID_PRODUTO}`
                metodo = 'PUT'
            }
            //Endereço do endpoint do POST
            const resposta = await fetch(endpoint,
                {
                    method: metodo,  //Qual é o método do endpoint
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        titulo: inputTitulo,
                        preco: parseFloat(inputPreco),
                        imagem: inputLinkImagem
                    })
                }
            )
            if (resposta.ok) {
                alert('Produto salvo com sucesso')
                //Redirecionando para a tela com todos os produtos
                navigation.goBack()
            }

        } catch (error) {
            console.error('Erro ao salvar produto:', error)
        }
    }

    return (
        <View style={{ padding: 20 }}>

            <TextInput placeholder='Título do produto' value={inputTitulo}
                onChangeText={setInputTitulo} style={meusEstilos.inputCad} />

            <TextInput placeholder='Preço do produto' value={inputPreco}
                onChangeText={setInputPreco} style={meusEstilos.inputCad} />
            <TextInput placeholder='Link da imagem do produto' value={inputLinkImagem}
                onChangeText={setInputLinkImagem} style={meusEstilos.inputCad} />
            <View style={{alignItems:'center', paddingBottom:20}}>
                {inputLinkImagem && <Image source={{ uri: inputLinkImagem }} style={styles.imagem} />}
            </View>
            
            <TouchableOpacity style={meusEstilos.botao}
                    onPress={botaoSalvarProduto}>
                    <Text style={meusEstilos.textoBotao}> Salvar </Text>
                </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    imagem: {
        width: 200,
        height: 200,
    },
})

export default CadProduto
