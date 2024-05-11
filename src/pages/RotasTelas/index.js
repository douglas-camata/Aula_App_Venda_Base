import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { StatusBar } from 'react-native'

import { corPrincipal } from '../../style/MeusEstilos'

//Importar aqui todas as telas de navegação Stack
import BemVindo from '../BemVindo'
import Login from '../Login'
import MenuNavegacao from '../MenuNavegacao'
import CadProduto from '../CadProduto'

const Stack = createNativeStackNavigator()

const RotasTelas = () => {
    return (
        <NavigationContainer>
            <StatusBar backgroundColor={corPrincipal} />
            <Stack.Navigator>
                <Stack.Screen name="BemVindo" component={BemVindo} options={{ headerShown:false }}/>
                <Stack.Screen name="Login" component={Login} options={{ headerShown:false }}/>
                <Stack.Screen name="MenuNavegacao" component={MenuNavegacao} options={{ headerShown: false }} />
                <Stack.Screen name="CadProduto" component={CadProduto}  />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default RotasTelas