import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'react-native'

import { corBranco, corPrincipal } from '../../style/MeusEstilos'

//Importar aqui todas as telas de navegação Stack
import BemVindo from '../BemVindo'
import Login from '../Login'
import MenuNavegacao from '../MenuNavegacao'
import CadProduto from '../CadProduto'
import CadCliente from '../CadCliente'
import ComprarProduto from '../ComprarProduto'

const Stack = createNativeStackNavigator()

const RotasTelas = () => {
    return (
        <NavigationContainer>
            <StatusBar backgroundColor={corPrincipal} />
            <Stack.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: corPrincipal
                    },
                    headerTintColor: corBranco
                }}
            >
                <Stack.Screen name="BemVindo" component={BemVindo} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="MenuNavegacao" component={MenuNavegacao} options={{ headerShown: false }} />
                <Stack.Screen name="CadProduto" component={CadProduto} 
                    options={{
                        title:"Cadastro de produtos",  //Título da Tela
                        // headerStyle: {                 //Altera a cor do fundo 
                        //     backgroundColor: '#f4511e' 
                        // },
                        // headerTintColor: '#00f',    //Altera a cor do título da tela
                        // headerTitleStyle: {
                        //     fontWeight: 'bold',     //Alterar titulo para negrito
                        //     fontSize: 25
                        // },
                        // headerTitleAlign: 'center',  //Alinhando o titulo
                        // headerShown: false,          //Ocultando a barra

                    }}
                />
                <Stack.Screen name="CadCliente" component={CadCliente}  />
                <Stack.Screen name="ComprarProduto" component={ComprarProduto}  />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RotasTelas
