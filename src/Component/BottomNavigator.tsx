import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screen/HomeScreen/HomeScreen';
import MessageScreen from '../Screen/MessageScreen';
import UserOptions from '../Screen/UserOptions';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { ImageBackground } from 'react-native';

interface BottomNavigator {
    navigation: any
}

const Bottom = createBottomTabNavigator();

const BottomNavigator: React.FC<BottomNavigator> = (props) => {
    return (
        <Bottom.Navigator screenOptions={{
            tabBarActiveTintColor: '#39A7FF', tabBarShowLabel: false,
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: { position: 'relative',  height: 55 },
            tabBarBackground: () => (
                <ImageBackground source={require('../Images/cycle_run.png')} style={{ flex: 1 }} />
            ),
        }}>
            <Bottom.Screen name="Home" component={HomeScreen}
                options={{
                    headerShown: false, tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="home" color={color} size={25} />
                    )
                }}
            />
            <Bottom.Screen name="MessageScreen" component={MessageScreen}
                options={{
                    headerShown: false, tabBarIcon: ({ color }) => (
                        <Fontisto name="messenger" color={color} size={25} />
                    )
                }}
            />
            <Bottom.Screen name="UserOptions" component={UserOptions}
                options={{
                    headerShown: false, tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="user-tie" color={color} size={25} />
                    )
                }}
            />
        </Bottom.Navigator>
    )
}

export default BottomNavigator