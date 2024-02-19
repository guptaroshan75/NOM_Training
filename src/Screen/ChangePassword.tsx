import { View, Text, ImageBackground, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native'
import ChangePasswordStyle from '../Css/ChangePasswordStyle'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import CustomeHeader from '../Component/CustomeHeader'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../Redux/Store'
import { Change_Password, get_User } from '../Redux/Features/UserSlice'
import Loader from '../Component/Loader'
import ToastMessage from '../Component/ToastMessage'
import CustomeAlert from '../Component/CustomeAlert'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CommonActions } from '@react-navigation/native'

interface ChangePassword {
    navigation: any
}

const ChangePassword: React.FC<ChangePassword> = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [loading, setLoading] = useState<boolean>(false);

    const [showOldPassword, setShowOldPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [alertModelVisible, setAlertModelVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('')
    const [alertLable, setAlertLable] = useState('')

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { get_user } = useSelector((state: RootState) => state.user);

    const handleEmail = () => {
        setEmail(get_user[0]?.email)
    }

    const closeModel = () => {
        setAlertModelVisible(!alertModelVisible)
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await dispatch(get_User())
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        fetchData();
        handleEmail()
    }, [dispatch])

    const handleUpdatePassword = async () => {
        setLoading(true);
        const passwordValidation= /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;

        if (!email || !oldPassword || !newPassword || !confirmPassword) {
            setAlertMessage('Please Fill In All Fields'); setAlertModelVisible(true);
            setLoading(false); setAlertLable('Warning')
            return;
        }

        if (oldPassword === newPassword) {
            setAlertMessage('Old and New Password Cannot Be Same'); setAlertModelVisible(true);
            setLoading(false); setAlertLable('Warning')
            return;
        }

        if (!passwordValidation.test(newPassword)) {
            setAlertMessage('Password Must Contain At Least 8 Characters, One Capital Letter, And One Special Character');
            setAlertModelVisible(true); setLoading(false);  setAlertLable('Warning');
            return;
        }
    
        if (newPassword !== confirmPassword) {
            setAlertMessage('New Password And Confirm Password Do Not Match');
            setAlertModelVisible(true);
            setLoading(false);
            setAlertLable('Warning');
            return;
        }
    

        const change_password = {
            email: email, old_password: oldPassword,
            new_password: newPassword,
            confrim_password: confirmPassword,
        };

        try {
            setLoading(true);
            const response: any = await dispatch(Change_Password(change_password))
            const msg = response?.payload?.msg
            if (response.payload && response.payload.status === 'error') {
                setAlertMessage(msg); setAlertModelVisible(true);
                setLoading(false); setAlertLable('Error')
                return;
            }
            if (response.payload && response.payload.status === 'success') {
                try {
                    await AsyncStorage.removeItem('User_id');
                    Toast.show({
                        type: 'TabsTopOnBottom', text1: 'Password Update Successfully',
                        visibilityTime: 2000, position: "bottom",
                    });
                    const resetAction = CommonActions.reset({
                        index: 0,
                        routes: [{ name: 'Login' }],
                    });
                    navigation.dispatch(resetAction);
                    setLoading(false);
                } catch (error) {
                    setLoading(false);
                } 
                // setLoading(false);
                // navigation.navigate('UserOptions')
            }
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <ImageBackground source={require('../Images/profile_back.png')} style={{ flex: 1 }}>
            <ScrollView>
                <View style={ChangePasswordStyle.container}>
                    <CustomeHeader lable={'Passwort ändern'} navigation={navigation} />

                    <View style={ChangePasswordStyle.inputView}>
                        <TextInput style={ChangePasswordStyle.inputText} autoCapitalize='none'
                            value={email} placeholder="bsttesting113@gmail.com" autoCorrect={false}
                            onChangeText={(email) => setEmail(email)} placeholderTextColor="#fff"
                            cursorColor='#3154e0' editable={false}
                        />
                        <MaterialIcons name={'email'}
                            size={25} color="#fff" style={ChangePasswordStyle.icon}
                        />
                    </View>

                    <View style={ChangePasswordStyle.inputView}>
                        <TextInput placeholder="Altes Passwort" style={ChangePasswordStyle.inputText}
                            autoCapitalize='none' autoCorrect={false} value={oldPassword}
                            secureTextEntry={!showOldPassword} placeholderTextColor="#fff"
                            onChangeText={(oldPassword) => setOldPassword(oldPassword)}
                            cursorColor='#3154e0'
                        />
                        <SimpleLineIcons name={'lock'}
                            size={23} color="#fff" style={ChangePasswordStyle.icon}
                        />
                        <MaterialCommunityIcons name={showOldPassword ? 'eye' : 'eye-off'}
                            size={26} color="#fff" style={ChangePasswordStyle.lockIcon}
                            onPress={() => setShowOldPassword(!showOldPassword)}
                        />
                    </View>

                    <View style={ChangePasswordStyle.inputView}>
                        <TextInput placeholder="Neues Passwort" style={ChangePasswordStyle.inputText}
                            autoCapitalize='none' autoCorrect={false} value={newPassword}
                            secureTextEntry={!showNewPassword} placeholderTextColor="#fff"
                            onChangeText={(newPassword) => setNewPassword(newPassword)}
                            cursorColor='#3154e0'
                        />
                        <SimpleLineIcons name={'lock'}
                            size={23} color="#fff" style={ChangePasswordStyle.icon}
                        />
                        <MaterialCommunityIcons name={showNewPassword ? 'eye' : 'eye-off'}
                            size={26} color="#fff" style={ChangePasswordStyle.lockIcon}
                            onPress={() => setShowNewPassword(!showNewPassword)}
                        />
                    </View>

                    <View style={ChangePasswordStyle.inputView}>
                        <TextInput placeholder="Bestätige Passwort" style={ChangePasswordStyle.inputText}
                            autoCapitalize='none' autoCorrect={false} value={confirmPassword}
                            secureTextEntry={!showConfirmPassword} placeholderTextColor="#fff"
                            onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                            cursorColor='#3154e0'
                        />
                        <SimpleLineIcons name={'lock'}
                            size={23} color="#fff" style={ChangePasswordStyle.icon}
                        />
                        <MaterialCommunityIcons name={showConfirmPassword ? 'eye' : 'eye-off'}
                            size={26} color="#fff" style={ChangePasswordStyle.lockIcon}
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        />
                    </View>

                    {loading && (<Loader loading={loading} />)}

                    <TouchableOpacity style={ChangePasswordStyle.newPasswordBtn}
                        onPress={handleUpdatePassword}
                    >
                        <Text style={[ChangePasswordStyle.newPasswordText]}> Sichern </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <CustomeAlert message={alertMessage} lable={alertLable}
                isVisible={alertModelVisible} closeModel={closeModel}
            />
        </ImageBackground>
    )
}

export default ChangePassword