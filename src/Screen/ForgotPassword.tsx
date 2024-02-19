import { View, Text, ScrollView, TextInput, TouchableOpacity, Image, ImageBackground } from 'react-native'
import React, { useState } from 'react'
import ForgotPasswordStyle from '../Css/ForgotPasswordStyle'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import AgreeCheckBox from './AgreeCheckBox'
import CustomeAlert from '../Component/CustomeAlert'
import axios from 'axios'
import { Api } from '../BaseUrl/BaseUrl'
import Loader from '../Component/Loader'

interface ForgotPassword {
    navigation: any
}

const ForgotPassword: React.FC<ForgotPassword> = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [loading, setLoading] = useState<boolean>(false);

    const [alertModelVisible, setAlertModelVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('')
    const [alertLable, setAlertLable] = useState('')

    const closeModel = () => {
        setAlertModelVisible(!alertModelVisible)
    }

    const handleForgotPassword = async () => {
        if (!email) {
            setAlertMessage('Email-Id Is Required'); setAlertModelVisible(true);
            setLoading(false); setAlertLable('Warning')
            return;
        }

        const emailValidationRegex = /\S+@\S+\.\S+/;
        if (!emailValidationRegex.test(email)) {
            setAlertMessage('Please Enter A Valid Email Address'); setAlertModelVisible(true);
            setLoading(false); setAlertLable('Warning')
            return;
        }

        const emailDomain = email.split('@')[1];
        if (emailDomain.toLowerCase().indexOf('.com') !== emailDomain.length - 4) {
            setAlertMessage('Invalid Email-Id Address'); setAlertModelVisible(true);
            setLoading(false); setAlertLable('Warning')
            return;
        }

        const userEmail = { email: email }

        setLoading(true);
        try {
            const response = await axios.post(`${Api}/send_otp`, userEmail);
            const msg = response?.data?.msg
            if (response && response?.data?.status === 'error') {
                setAlertMessage(msg); setAlertModelVisible(true);
                setLoading(false); setAlertLable('Error')
                return;
            }
            if (response && response?.data && response?.data?.status === 'success') {
                setLoading(false);
                navigation.navigate('NewPassword', {
                    email, msg: response.data.msg,
                    success: response.data.status
                })
                return;
            }
        } catch (error) {
            setLoading(false);
            console.log('Forgot Password', error);
        }
    }

    return (
        <ImageBackground source={require('../Images/cycle_up.png')} style={{ flex: 1 }}>
            <Image source={require('../Images/top_logo.png')} style={ForgotPasswordStyle.logo} />
            <View style={ForgotPasswordStyle.container}>
                <Text style={ForgotPasswordStyle.header}> Passwort Vergessen ?</Text>

                <View style={ForgotPasswordStyle.inputView}>
                    <TextInput style={ForgotPasswordStyle.inputText} autoCapitalize='none'
                        value={email} placeholder="Enter Your Email-Id" autoCorrect={false}
                        onChangeText={(email) => setEmail(email)} placeholderTextColor="#fff"
                        cursorColor='#3154e0'
                    />
                    <MaterialCommunityIcons name={'email-outline'}
                        size={27} color="#fff" style={ForgotPasswordStyle.icon}
                    />
                </View>

                {loading && (<Loader loading={loading} />)}

                <TouchableOpacity style={ForgotPasswordStyle.forgotBtn} onPress={handleForgotPassword}>
                    <Text style={[ForgotPasswordStyle.forgotText]}> OTP Senden </Text>
                </TouchableOpacity>
            </View>

            <CustomeAlert message={alertMessage} lable={alertLable}
                isVisible={alertModelVisible} closeModel={closeModel}
            />

        </ImageBackground>
    )
}

export default ForgotPassword