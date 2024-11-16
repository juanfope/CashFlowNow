import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import RegVentaScreen from '../screens/RegVentasScreen';
import RefScreen from '../screens/RefScreen';
import MoneyBalanceScreen from '../screens/MoneyBalanceScreen';
import HistScreen from '../screens/HistScreen';
import AuthenticatedScreen from '../screens/AuthenticatedScreen';

const Drawer = createDrawerNavigator();

export default function AppDrawer(){
    return(
            <Drawer.Navigator initialRouteName='authenticated home'>
                <Drawer.Screen name="authenticated home" component={AuthenticatedScreen}/>
                <Drawer.Screen name="Registrar ventas y compras" component={RegVentaScreen}/>
                <Drawer.Screen name="Mis referencias" component={RefScreen}/>
                <Drawer.Screen name="Balance" component={MoneyBalanceScreen}/>
                <Drawer.Screen name="Historial" component={HistScreen}/>
            </Drawer.Navigator>
    )
}
 