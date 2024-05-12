import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

//Importando telas para o Menu Bottom Tabs
import Home from '../Home'
import Produtos from '../Produtos'
import Clientes from '../Clientes'

const Tab = createBottomTabNavigator()

const MenuNavegacao = ({route}) => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home}  options={{ headerShown:false }}/>
            {route.params.tipo_usuario == 'gerente'  ? 
                <Tab.Screen name="Produtos" component={Produtos} options={{ headerShown:false }} /> : 
                null
            }
            {route.params.tipo_usuario == 'gerente'  ? 
                <Tab.Screen name="Clientes" component={Clientes} options={{ headerShown:false }} /> : 
                null
            }
            
        </Tab.Navigator>
    )
}

export default MenuNavegacao