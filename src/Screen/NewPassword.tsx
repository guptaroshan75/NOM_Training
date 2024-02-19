import { View, Text, ImageBackground, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native'
import NewPasswordStyle from '../Css/NewPasswordStyle'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Fontisto from "react-native-vector-icons/Fontisto"
import { Image } from 'react-native'
import axios from 'axios'
import { Api } from '../BaseUrl/BaseUrl'
import CustomeAlert from '../Component/CustomeAlert'
import Loader from '../Component/Loader'
import Toast from 'react-native-toast-message'

interface NewPassword {
    navigation: any,
    route: any,
}

const NewPassword: React.FC<NewPassword> = ({ navigation, route }) => {
    const [emailMessage, setEmailMessage] = useState<string>('');
    const [otp, setOtp] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const { email, msg, success } = route.params
    
    const [showNewPassword, setShowNewPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [loading, setLoading] = useState<boolean>(false);

    const [alertModelVisible, setAlertModelVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('')
    const [alertLable, setAlertLable] = useState('')

    const closeModel = () => {
        setAlertModelVisible(!alertModelVisible)
    } 

    const handleMessage = () => {
        setEmailMessage(email)
    }

    useEffect(() => {
        handleMessage()
        if (msg) {
            setAlertMessage(msg);
            setAlertLable(success)
            setAlertModelVisible(true);
            return;
        }
    }, [])

    const handleChangePassword = async () => {
        setLoading(true);
        const passwordValidation= /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
        const changePassword = {
            email: email, otp: otp, npass: newPassword, cpass: confirmPassword,
        }

        if (otp === '') {
            setAlertMessage('OTP is required'); setAlertLable('Warning')
            setAlertModelVisible(true); setLoading(false)
            return
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

        try {
            const response = await axios.post(`${Api}/chnge_pass`, changePassword);
            const msg = response?.data?.msg
            if (response?.data && response?.data?.status === 'error') {
                setAlertMessage(msg); setAlertModelVisible(true);
                setLoading(false); setAlertLable('Error')
                return;
            }
            if (response?.data && response?.data?.status === 'success') {
                Toast.show({
                    type: 'Toast', text1: 'Password Update Successfully',
                    visibilityTime: 2000, position: "bottom"
                }); 
                setLoading(false);
                navigation.navigate('Login')
            }
        } catch (error) {
            setLoading(false);
            console.log('Change Password', error);
        }
    }

    return (
        <ImageBackground source={require('../Images/cycle_up.png')} style={{ flex: 1 }}>
            <ScrollView>
                <Image source={require('../Images/top_logo.png')} style={NewPasswordStyle.logo} />

                <View style={NewPasswordStyle.container}>
                    <View style={NewPasswordStyle.inputView}>
                        <TextInput style={NewPasswordStyle.inputText} autoCapitalize='none'
                            value={emailMessage} autoCorrect={false} cursorColor='#3154e0' editable={false}
                            onChangeText={(emailMessage) => setEmailMessage(emailMessage)} 
                            placeholderTextColor="#fff"
                        />
                        <MaterialIcons name={'email'}
                            size={25} color="#fff" style={NewPasswordStyle.icon}
                        />
                    </View>

                    <View style={NewPasswordStyle.inputView}>
                        <TextInput style={NewPasswordStyle.inputText} autoCapitalize='none'
                            value={otp} placeholder="OTP" autoCorrect={false}
                            onChangeText={(otp) => setOtp(otp)} placeholderTextColor="#fff"
                            cursorColor='#3154e0' keyboardType='numeric' maxLength={4}
                        />
                        <Fontisto name={'hashtag'}
                            size={22} color="#fff" style={NewPasswordStyle.icon}
                        />
                    </View>

                    <View style={NewPasswordStyle.inputView}>
                        <TextInput placeholder="Neues Passwort" style={NewPasswordStyle.inputText}
                            autoCapitalize='none' autoCorrect={false} value={newPassword}
                            secureTextEntry={!showNewPassword} placeholderTextColor="#fff"
                            onChangeText={(newPassword) => setNewPassword(newPassword)}
                            cursorColor='#3154e0'
                        />
                        <SimpleLineIcons name={'lock'}
                            size={23} color="#fff" style={NewPasswordStyle.icon}
                        />
                        <MaterialCommunityIcons name={showNewPassword ? 'eye' : 'eye-off'}
                            size={26} color="#fff" style={NewPasswordStyle.lockIcon}
                            onPress={() => setShowNewPassword(!showNewPassword)}
                        />
                    </View>

                    <View style={NewPasswordStyle.inputView}>
                        <TextInput placeholder="Bestätigen Passwort" style={NewPasswordStyle.inputText}
                            autoCapitalize='none' autoCorrect={false} value={confirmPassword}
                            secureTextEntry={!showConfirmPassword} placeholderTextColor="#fff"
                            onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                            cursorColor='#3154e0'
                        />
                        <SimpleLineIcons name={'lock'}
                            size={23} color="#fff" style={NewPasswordStyle.icon}
                        />
                        <MaterialCommunityIcons name={showConfirmPassword ? 'eye' : 'eye-off'}
                            size={26} color="#fff" style={NewPasswordStyle.lockIcon}
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        />
                    </View>

                    <TouchableOpacity style={NewPasswordStyle.newPasswordBtn}
                        onPress={handleChangePassword}
                    >
                        <Text style={[NewPasswordStyle.newPasswordText]}> Sichern </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {loading && (<Loader loading={loading} />)}

            <CustomeAlert message={alertMessage} lable={alertLable}
                isVisible={alertModelVisible} closeModel={closeModel}
            />
        </ImageBackground>
    )
}

export default NewPassword