import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomNavigator from '../Component/BottomNavigator';
import StackNavigator from './StackNavigator';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="HomeScreen" component={BottomNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Login" component={StackNavigator}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default AppNavigator