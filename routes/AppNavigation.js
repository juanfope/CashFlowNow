import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from '../AuthContext';
import AppDrawer from './AppDrawer';
import AuthScreen from '../screens/AuthScreen';
import RefEdit from '../screens/RefEdit';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Autentication'
          screenOptions={{
            headerShown:false
          }}
        >
        <Stack.Screen name="Autentication" component={AuthScreen} />
        <Stack.Screen name="Home" component={AppDrawer} />
        <Stack.Screen name="reference edit" component={RefEdit} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default AppNavigation;