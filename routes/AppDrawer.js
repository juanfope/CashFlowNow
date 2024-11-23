import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import RegVentaScreen from '../screens/RegVentasScreen';
import RefScreen from '../screens/RefScreen';
import MoneyBalanceScreen from '../screens/MoneyBalanceScreen';
import HistScreen from '../screens/HistScreen';
import AuthenticatedScreen from '../screens/AuthenticatedScreen';
import ViewRefsScreen from '../screens/ViewRefsScreen';

const Drawer = createDrawerNavigator();

export default function AppDrawer(){
    return(
            <Drawer.Navigator initialRouteName='authenticated home'>
                <Drawer.Screen name="authenticated home" component={AuthenticatedScreen}/>
                <Drawer.Screen name="Registrar ventas y compras" component={RegVentaScreen}/>
                <Drawer.Screen name="Crear referencia" component={RefScreen}/>
                <Drawer.Screen name="Ver mis referencias" component={ViewRefsScreen}/>
                <Drawer.Screen name="Balance" component={MoneyBalanceScreen}/>
                <Drawer.Screen name="Historial" component={HistScreen}/>
            </Drawer.Navigator>
    )
}