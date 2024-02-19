import { View, Text, ScrollView, TouchableOpacity, PermissionsAndroid } from 'react-native'
import { TextInput, Image, Alert, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import LoginStyle from '../Css/LoginStyle'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import AgreeCheckBox from './AgreeCheckBox'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { loginUser } from '../Redux/Features/AuthSlice'
import Loader from '../Component/Loader'
import CustomeAlert from '../Component/CustomeAlert'
import firestore from '@react-native-firebase/firestore'
import Toast from 'react-native-toast-message'
import messaging from '@react-native-firebase/messaging';
import { CommonActions } from '@react-navigation/native'

interface Login {
    navigation: any
}

const Login: React.FC<Login> = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fcmToken, setFcmToken] = useState('')
    const [isLogged, setIsLogged] = useState<boolean | null>(null);

    const [showPassword, setShowPassword] = useState(false)
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const [alertModelVisible, setAlertModelVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('')
    const [alertLable, setAlertLable] = useState('')

    const closeModel = () => {
        setAlertModelVisible(!alertModelVisible)
    }

    const getFcmToken = async () => {
        try {
            const token = await messaging().getToken()
            setFcmToken(token)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getFcmToken()
    }, [])

    const requestUserPermission = async () => {
        const authStatus: any = await messaging().requestPermission();
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
            getFcmToken()
        }
    }

    const checkTokenAndNavigate = async () => {
      try {
        const User_id = await AsyncStorage.getItem('User_id');
        setIsLogged(!!User_id);
      } catch (error) {
        setIsLogged(false);
      }
    };

    useEffect(() => {
        if (Platform.OS == 'android') {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then((res) => {
                if (!!res && res == 'granted') {
                    requestUserPermission()
                }
            }).catch(error => {
                Alert.alert('Somethind Went Wrong')
            })
        }
        if (isLogged === true) {
            navigation.navigate('HomeScreen'); 
        }
        checkTokenAndNavigate();
    }, [isLogged]);

    useEffect(() => {
        retrieveCredentials();
    }, []);

    const retrieveCredentials = async () => {
        try {
            const storedEmail = await AsyncStorage.getItem('storedEmail');
            const storedPassword = await AsyncStorage.getItem('storedPassword');

            if (storedEmail && storedPassword) {
                setEmail(storedEmail);
                setPassword(storedPassword);
                setRememberMe(true);
            }
        } catch (error) {
            return error
        }
    };

    const handleSignIn = async () => {
        setLoading(true);
        if (!email || !password) {
            setAlertMessage('Please Fill In All Fields'); setAlertModelVisible(true);
            setLoading(false); setAlertLable('Warning')
            return;
        }

        // if (!rememberMe) {
        //     setAlertMessage('Please Checked Stay Logged In Or Not'); setAlertModelVisible(true);
        //     setLoading(false); setAlertLable('Warning')
        //     return;
        // }

        const emailValidationRegex = /\S+@\S+\.\S+/;
        if (!emailValidationRegex.test(email)) {
            setAlertMessage('Please Enter A Valid Email Address'); setAlertModelVisible(true);
            setLoading(false); setAlertLable('Warning')
            return;
        }

        const userObj = { email: email, password: password, device_token: fcmToken }

        try {
            const response: any = await dispatch(loginUser(userObj))                        
            const msg = response?.payload?.msg            
            if (response.payload && response?.payload?.status === 'error') {
                setAlertMessage(msg); setAlertModelVisible(true);
                setLoading(false); setAlertLable('Error')
                return;
            }
            if (response.payload && response?.payload?.status === 'success') {
                Toast.show({
                    type: 'TabsAbove', text1: 'Login Successfully',
                    visibilityTime: 2000, position: "bottom"
                });
                const userDocRef = firestore().collection('firestore_save').doc(email);
                const doc = await userDocRef.get();
                if (!doc.exists) {
                    await userDocRef.set({ email_id: email, json: "[]" });
                }
                if (rememberMe) {
                    try {
                        setLoading(false);
                        await AsyncStorage.setItem('storedEmail', email);
                        await AsyncStorage.setItem('storedPassword', password);
                    } catch (error) {
                        setLoading(false);
                        console.error('Error storing credentials:', error);
                    }
                } else {
                    setLoading(false);
                    await AsyncStorage.removeItem('storedEmail');
                    await AsyncStorage.removeItem('storedPassword');
                }
                setLoading(false);
                const { type, id } = response.payload.data
                await AsyncStorage.setItem('User_id', id);
                await AsyncStorage.setItem('Type', type)
                const resetAction = CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'HomeScreen' }],
                });
                navigation.dispatch(resetAction);
            }
            setLoading(false)
        } catch (error) {
            setLoading(false);
        }
    }

    return (
        <ScrollView style={LoginStyle.mainField}>
            <View style={LoginStyle.container}>
                <Image source={require('../Images/top_logo.png')} style={LoginStyle.logo} />
                <ScrollView style={LoginStyle.mainField}>
                    <Text style={LoginStyle.mainContent}> Willkommen zurück </Text>
                    <View style={LoginStyle.inputView}>
                        <TextInput style={LoginStyle.inputText} autoCapitalize='none'
                            value={email} placeholder="Enter Your Email-Id" autoCorrect={false}
                            onChangeText={(email) => setEmail(email)} placeholderTextColor="#fff"
                            cursorColor='#3154e0'
                        />
                        <MaterialCommunityIcons name={'email-outline'}
                            size={27} color="#fff" style={LoginStyle.icon}
                        />
                    </View>

                    <View style={LoginStyle.inputView}>
                        <TextInput placeholder="Enter Your Password" style={LoginStyle.inputText}
                            autoCapitalize='none' autoCorrect={false} value={password}
                            secureTextEntry={!showPassword} placeholderTextColor="#fff"
                            onChangeText={(password) => setPassword(password)} cursorColor='#3154e0'
                        />
                        <SimpleLineIcons name={'lock'}
                            size={24} color="#fff" style={LoginStyle.icon}
                        />
                        <MaterialCommunityIcons name={showPassword ? 'eye' : 'eye-off'}
                            size={27} color="#fff" style={LoginStyle.lockIcon}
                            onPress={() => setShowPassword(!showPassword)}
                        />
                    </View>

                    <View style={LoginStyle.bottom}>
                        <AgreeCheckBox setRememberMe={setRememberMe} rememberMe={rememberMe}
                            lable={'Bleibe Eingeloggt'}
                        />
                        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                            <Text style={LoginStyle.forget}>
                                Passwort Vergessen ?
                            </Text>
                        </TouchableOpacity>
                    </View>

                    {loading && (<Loader loading={loading} />)}

                    <TouchableOpacity style={LoginStyle.loginBtn} onPress={handleSignIn}>
                        <Text style={[LoginStyle.loginText]}> Login </Text>
                    </TouchableOpacity>

                    <View style={LoginStyle.mainor}>
                        <TouchableOpacity style={LoginStyle.ortextborder} >
                            <Text style={LoginStyle.ortext}> oder </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={LoginStyle.mainsign}>
                        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                            <Text style={LoginStyle.sign}>
                                Erstelle Deinen Account
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>

            <CustomeAlert message={alertMessage} lable={alertLable}
                isVisible={alertModelVisible} closeModel={closeModel}
            />
        </ScrollView>
    )
}

export default Login