
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { MaterialIcons } from '@expo/vector-icons';
import { useIsFocused } from '@react-navigation/native';
import { corBorda, corBranco, corPrincipal, meusEstilos } from '../../style/MeusEstilos';
import { enderecoServidor } from '../../Config';

const Produtos = ({ navigation }) => {
    const [dadosLista, setDadosLista] = useState([]);
    const [txtPesquisa, setTxtPesquisa] = useState('');
    const [ordenacao, setOrdenacao] = useState('titulo');
    const [nrProdutos, setNrProdutos] = useState(0)

    const isFocused = useIsFocused()

    const buscarDadosAPI = async () => {
        if (txtPesquisa == '') {
            setDadosLista([])
            return
        }
        try {
            const response = await fetch(`${enderecoServidor}/produtos/obterProdutos/${txtPesquisa}`);
            const dados = await response.json();
            
            if (ordenacao === 'titulo') {
                dados.sort((a, b) => a.TITULO.localeCompare(b.TITULO));
            } else if (ordenacao === 'preco') {
                dados.sort((a, b) => a.PRECO - b.PRECO);
            } else if (ordenacao === 'preco_desc') {
                dados.sort((a, b) => b.PRECO - a.PRECO);
            }        
            setDadosLista(dados);
            setNrProdutos(dados.length);
              
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    const exibirItemLista = ({ item }) => {
        return (
            <TouchableOpacity style={meusEstilos.itemLista}
                onPress={() => navigation.navigate('CadProduto', { produtoAlterar: item })}
            >
                <Image source={{ uri: item.IMAGEM }} style={meusEstilos.imagemLista} />
                <View style={meusEstilos.textContainer}>
                    <Text>{item.TITULO}</Text>
                    <Text style={meusEstilos.preco}>R$ {item.PRECO}</Text>
                </View>
                <TouchableOpacity onPress={() => botaoExcluirProduto(item.ID_PRODUTO)}>
                    <MaterialIcons name="delete" size={24} color={corPrincipal} />
                </TouchableOpacity>
            </TouchableOpacity>
        );
    }

    const botaoExcluirProduto = async (id) => {
        try {
            const resposta = await fetch(`${enderecoServidor}/produtos/excluirProduto/${id}`,
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
                        <Picker.Item label="Título" value="titulo" />
                        <Picker.Item label="< Preço" value="preco" />
                        <Picker.Item label="> Preço" value="preco_desc" />
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
                        Produtos cadastrados {nrProdutos}</Text>
                    <TouchableOpacity style={meusEstilos.botaoIcone}
                        onPress={() => navigation.navigate('CadProduto')}>
                        <MaterialIcons name="add" size={24} color={corPrincipal} />
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={dadosLista}
                    renderItem={exibirItemLista}
                    keyExtractor={(item) => item.ID_PRODUTO.toString()}
                />
            </View>

        </View>
    );
};

export default Produtos
