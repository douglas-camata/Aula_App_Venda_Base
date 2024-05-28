import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons, FontAwesome6 } from '@expo/vector-icons';

//Importando telas para o Menu Bottom Tabs
import Home from '../Home'
import Produtos from '../Produtos'
import Clientes from '../Clientes'

const Tab = createBottomTabNavigator()

const MenuNavegacao = ({ route }) => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home}
                options={{
                    headerShown: false,
                    tabBarLabelStyle: { fontSize: 14 },

                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color }) => (<MaterialIcons name="home" color={color} size={24} />)
                }} />
            {route.params.tipo_usuario == 'gerente' ?
                <Tab.Screen name="Produtos" component={Produtos}
                    options={{
                        headerShown: false,
                        tabBarLabelStyle: { fontSize: 14 },
                        tabBarIcon: ({ color }) => (<FontAwesome6 name="box" color={color} size={24} />)
                    }} /> :
                null
            }
            {route.params.tipo_usuario == 'gerente' ?
                <Tab.Screen name="Clientes" component={Clientes}
                    options={{
                        headerShown: false,
                        tabBarLabelStyle: { fontSize: 14 },
                        tabBarIcon: ({ color }) => (<FontAwesome6 name="id-card" color={color} size={24} />)
                    }} /> :
                null
            }

        </Tab.Navigator>
    )
}

export default MenuNavegacao