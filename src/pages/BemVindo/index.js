import React, {useEffect} from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { corPrincipal, corBranco, corTitulo, meusEstilos } from "../../style/MeusEstilos"
import * as Animar from 'react-native-animatable'
import * as Notifications from 'expo-notifications'

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true, //exibir alerta na barra de notificacao
        shouldPlaySound:true, // emitir som da notificacao
        shouldSetBadge: true, //exibir o nº de natificacoes
    })
})

const BemVindo = ({navigation}) => {

    const obterToken = async () => {
        const {status} = await Notifications.getPermissionsAsync()
        if (status != 'granted') {
            await Notifications.requestPermissionsAsync()
        }
        const NovoToken = (await Notifications.getExpoPushTokenAsync()).data
        console.log(NovoToken)
    }

    useEffect(() => {
        obterToken()
    }, [])

    return (
        <View style={meusEstilos.conteudoHeader}>
            <View style={styles.logo}>
                <Animar.Image source={require('../../assets/logo.png')}
                    animation='flipInY'
                    style={{ width: '100%' }}
                    resizeMode="contain" />
            </View>
            <Animar.View animation='fadeInUp' delay={600} style={meusEstilos.conteudoCorpo}>
                <Text style={styles.apresentacao} >Texto de apresentação do app!</Text>
                <Text style={styles.titulo}> Faça o login para começar </Text>
                <TouchableOpacity style={meusEstilos.botao} onPress={() => navigation.navigate('Login')}>
                    <Text style={meusEstilos.textoBotao}> Acessar </Text>
                </TouchableOpacity>
            </Animar.View>
        </View>
    )
}

const styles = StyleSheet.create({
    logo: {
        flex: 2,
        backgroundColor: corPrincipal,
        justifyContent: 'center',
        alignItems: 'center',
    },
    apresentacao: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 15,
        marginBottom: 12,
    },
    titulo: {
        color: corTitulo
    },
})
export default BemVindo
