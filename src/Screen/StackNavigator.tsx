import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './Login';
import SignUp from './SignUp';
import BottomNavigator from '../Component/BottomNavigator';
import Profile from './Profile';
import Documents from './Documents/Documents';
import Upgrade from './Upgrade';
import ChangePassword from './ChangePassword';
import MessageNotification from './MessageNotification';
import Race_Calender from './Race_Calendar/Race_Calender';
import ForgotPassword from './ForgotPassword';
import NewPassword from './NewPassword';
import YourTraining from './HomeScreen/YourTraining';
import MonthlyOverview from './HomeScreen/MonthlyOverview';
import EditTraining from './HomeScreen/EditTraining';


const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="NewPassword" component={NewPassword}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="HomeScreen" component={BottomNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="BottomNavigator" component={BottomNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
            <Stack.Screen name="Documents" component={Documents} options={{ headerShown: false }} />
            <Stack.Screen name="Upgrade" component={Upgrade} options={{ headerShown: false }} />
            <Stack.Screen name="ChangePassword" component={ChangePassword}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="MessageNotification" component={MessageNotification}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Race_Calender" component={Race_Calender}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="MonthlyOverview" component={MonthlyOverview}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="Your_Training" component={YourTraining}
                options={{ headerShown: false }}
            />
            <Stack.Screen name="EditTraining" component={EditTraining}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}

export default StackNavigator