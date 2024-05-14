import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { corBranco, corPrincipal, corTexto, meusEstilos } from '../../style/MeusEstilos';
import { Picker } from '@react-native-picker/picker'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialIcons } from '@expo/vector-icons';

const ComprarProduto = ({ navigation, route }) => {
    const [Usuario, setUsuario] = useState('')
    const [Cliente, setCliente] = useState('')
    const [dadosProdutos, setDadosProdutos] = useState([])
    const [ProdutoSelecionado, setProdutoSelecionado] = useState('')
    const [dadosProdutosComprados, setDadosProdutosComprados] = useState([])

    const carregarDados = async () => {
        try {
            // Obter o cliente selecionado do AsyncStorage
            let ClienteSelecionado = await AsyncStorage.getItem('ClienteSelecionado');
            ClienteSelecionado = await JSON.parse(ClienteSelecionado);
            setCliente(ClienteSelecionado);

            // Obter o usuario selecionado do AsyncStorage
            let UsuarioSelecionado = await AsyncStorage.getItem('DadosUsuárioLogado');
            UsuarioSelecionado = JSON.parse(UsuarioSelecionado);
            setUsuario(UsuarioSelecionado);

            // Buscar produtos da API
            let resposta = await fetch('http://192.168.0.237:5000/produtos/obterProdutos');
            let dados = await resposta.json();
            setDadosProdutos(dados);

            // Buscar produtos comprados da API
            console.log('cliente', Cliente);
            resposta = await fetch(`http://192.168.0.237:5000/vendas/obterVendasCliente/${ClienteSelecionado.id_cliente}`);
            dados = await resposta.json();
            setDadosProdutosComprados(dados);

        } catch (error) {
            console.error('Erro ao buscar dados', error);
        }
    };

    useEffect(() => {
        carregarDados();
    }, []);


    const botaoComprar = async () => {
        try {
            let endpoint = 'http://192.168.0.114:5000/vendas/incluirVenda'
            let metodo = 'POST'
            const resposta = await fetch(endpoint,
                {
                    method: metodo,  //Qual é o método do endpoint
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        id_cliente: Cliente.id_cliente,
                        id_usuario: Usuario.id_usuario,
                        id_produto: ProdutoSelecionado
                    })
                }
            )
            if (resposta.ok) {
                alert('Compra salva com sucesso')
                carregarDados()
            }

        } catch (error) {
            console.error('Erro ao salvar compra:', error)
        }
    }

    const botaoExcluirProduto = async (id) => {
        try {
            const resposta = await fetch(`http://192.168.0.114:5000/vendas/excluirVenda/${id}`,
                { method: 'DELETE' })
            if (resposta.ok)
                carregarDados()
        } catch (error) {
            console.error('Erro ao excluir Produto:', error)
        }
    }

    const exibirItemLista = ({ item }) => {
        return (
            <TouchableOpacity style={meusEstilos.itemLista}>
                <Image source={{ uri: item.imagem }} style={meusEstilos.imagemLista} />
                <View style={meusEstilos.textContainer}>
                    <Text>{item.titulo}</Text>
                    <Text style={meusEstilos.preco}>R$ {item.preco}</Text>
                    <Text >Data: {item.data_venda}</Text>
                </View>
                <TouchableOpacity onPress={() => botaoExcluirProduto(item.id_venda)}>
                    <MaterialIcons name="delete" size={24} color={corPrincipal} />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }

    return (
        <View style={meusEstilos.conteudoHeader}>
            <View style={{padding:20}}>
                <Text style={{color:corBranco}}>Cliente:</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color:corBranco, marginBottom: 20 }}>{Cliente.nome}</Text>

                <Text style={{color:corBranco}}>Selecione o produto: </Text>
                <View style={{backgroundColor:corBranco}}>
                    <Picker
                        selectedValue={ProdutoSelecionado}
                        onValueChange={setProdutoSelecionado}
                        style={{ height: 50, width: '100%' }}
                    >
                        {/* Aqui receberemos os itens do picker*/}
                        {dadosProdutos.map((produto, index) => (
                            <Picker.Item key={index} label={produto.TITULO} value={produto.ID_PRODUTO} />
                        ))}

                    </Picker>
                </View>
                <TouchableOpacity style={meusEstilos.botao}
                    onPress={botaoComprar}>
                    <Text style={meusEstilos.textoBotao}> Comprar </Text>
                </TouchableOpacity>
            </View>
            <View style={meusEstilos.conteudoCorpo}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: corPrincipal }}> Produtos comprados: </Text>
                <FlatList data={dadosProdutosComprados}
                    renderItem={exibirItemLista}
                    keyExtractor={(item) => item.id_venda.toString()} />
            </View>
        </View>
    )
}

export default ComprarProduto
