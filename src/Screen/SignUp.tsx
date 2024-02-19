import { View, Text, ScrollView, Alert, Platform } from 'react-native'
import { ImageBackground, PermissionsAndroid } from 'react-native'
import { TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons"
import SignUpStyle from '../Css/SignUpStyle'
import CustomeTextInput from '../Component/CustomeTextInput'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import DateTimePicker from "react-native-modal-datetime-picker";
import AgreeCheckBox from './AgreeCheckBox'
import { useDispatch } from 'react-redux'
import { registerUser } from '../Redux/Features/AuthSlice';
import { ThunkDispatch } from '@reduxjs/toolkit'
import Loader from '../Component/Loader'
import { CountryPicker } from 'react-native-country-codes-picker'
import CustomeAlert from '../Component/CustomeAlert'
import Toast from 'react-native-toast-message'
import messaging from '@react-native-firebase/messaging';

interface SignUp {
    navigation: any
}

const SignUp: React.FC<SignUp> = ({ navigation }) => {
    const [fname, setName] = useState('')
    const [lname, setSerName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [cpassword, setConfirmPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [allownotification, setAllowNotification] = useState('')
    const [fcmToken, setFcmToken] = useState('')

    const [loading, setLoading] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState(false);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [dob, setDob] = useState<Date | null>(null);

    const formattedDate: any = dob?.toISOString().split('T')[0];

    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState('');

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
            setAllowNotification(authStatus)
        }
    }
    
    useEffect(() => {
        if (Platform.OS == 'android') {
            PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then((res) => {
                if (!!res && res == 'granted') {
                    requestUserPermission()
                    getFcmToken()
                }
            }).catch(error => {
                Alert.alert('Somethind Went Wrong')
            })
        }
    }, []);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: any) => {
        setDob(date);
        hideDatePicker();
    };

    const handleSignUp = async () => {
        const passwordValidation = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/;
        if (!email || !fname || !lname || !phone) {
            setAlertMessage('Please Fill In All Fields'); setAlertModelVisible(true);
            setLoading(false); setAlertLable('Warning')
            return;
        }

        if (phone.length < 10) {
            Alert.alert('Error', 'Please Enter A Valid Phone Number (At Least 10 Digits)');
            setLoading(false);
            return;
        }

        if (password === '') {
            setAlertMessage('Password Is Required'); setAlertModelVisible(true);
            setLoading(false); setAlertLable('Warning')
            return
        }

        if (cpassword === '') {
            setAlertMessage('Confirm Password Is Required'); setAlertLable('Warning')
            setAlertModelVisible(true); setLoading(false)
            return
        }

        if (!passwordValidation.test(password)) {
            setAlertMessage('Password Must Contain At Least 8 Characters, One Capital Letter, And One Special Character');
            setAlertModelVisible(true); setLoading(false); setAlertLable('Warning');
            return;
        }

        if (password !== cpassword) {
            setAlertMessage('New Password And Confirm Password Do Not Match');
            setAlertModelVisible(true);
            setLoading(false);
            setAlertLable('Warning');
            return;
        }

        if (!rememberMe) {
            setAlertMessage('Please Checked Allow notifications'); setAlertModelVisible(true);
            setLoading(false); setAlertLable('Warning')
            return;
        }

        const emailValidationRegex = /\S+@\S+\.\S+/;
        if (!emailValidationRegex.test(email)) {
            setAlertMessage('Please Enter A Valid Email Address'); setAlertModelVisible(true);
            setLoading(false); setAlertLable('Warning')
            return;
        }

        const userObj = {
            fname: fname, lname: lname, email: email, password: password, cpassword: cpassword,
            phone: `${countryCode ? countryCode : '+91'}${phone}`, allownotification: allownotification,
            dob: formattedDate ? formattedDate : null, divece_token: fcmToken,
        }

        try {
            setLoading(true);
            const response: any = await dispatch(registerUser(userObj))
            const msg = response?.payload?.msg
            if (response.payload && response.payload.status === 'error') {
                setAlertMessage(msg); setAlertModelVisible(true);
                setLoading(false); setAlertLable('Error')
                return;
            }
            if (response.payload && response.payload.status === 'success') {
                Toast.show({
                    type: 'Toast', text1: 'Register Successfully',
                    visibilityTime: 2000, position: "bottom"
                });
                navigation.navigate('Login');
            }
        } catch (error) {
            setLoading(false);
            console.log('Registration error:', error);
        }
    }

    return (
        <ImageBackground source={require('../Images/profile_back.png')} style={{ flex: 1 }}>
            <ScrollView>
                <View style={SignUpStyle.container}>
                    <Text style={SignUpStyle.mainContent}> Registrieren </Text>

                    <CustomeTextInput value={fname} placeholder={"Enter Your Name"}
                        onChangeText={(name) => setName(name)} icon={'user-tie'}
                    />

                    <CustomeTextInput value={lname} placeholder={"Enter Your Nachname"}
                        onChangeText={(serName) => setSerName(serName)} icon={'user-tie'}
                    />

                    <View style={SignUpStyle.inputView}>
                        <TextInput style={SignUpStyle.inputText} autoCapitalize='none' cursorColor='#3154e0'
                            value={email} placeholder="Enter Your Email-Id" autoCorrect={false}
                            onChangeText={(email) => setEmail(email)} placeholderTextColor="#fff"
                        />
                        <MaterialIcons name={'email'}
                            size={25} color="#fff" style={SignUpStyle.icon}
                        />
                    </View>

                    <View style={SignUpStyle.inputView}>
                        <TextInput placeholder="Geben Sie Das Passwort Ein" style={SignUpStyle.inputText}
                            autoCapitalize='none' autoCorrect={false} value={password}
                            secureTextEntry={!showPassword} placeholderTextColor="#fff"
                            onChangeText={(password) => setPassword(password)}
                            cursorColor='#3154e0'
                        />
                        <SimpleLineIcons name={'lock'}
                            size={23} color="#fff" style={SignUpStyle.icon}
                        />
                        <MaterialCommunityIcons name={showPassword ? 'eye' : 'eye-off'}
                            size={26} color="#fff" style={SignUpStyle.lockIcon}
                            onPress={() => setShowPassword(!showPassword)}
                        />
                    </View>

                    <View style={SignUpStyle.inputView}>
                        <TextInput placeholder="Bestätige Das Passwort" style={SignUpStyle.inputText}
                            autoCapitalize='none' autoCorrect={false} value={cpassword}
                            secureTextEntry={!showConfirmPassword} placeholderTextColor="#fff"
                            onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
                            cursorColor='#3154e0'
                        />
                        <SimpleLineIcons name={'lock'}
                            size={23} color="#fff" style={SignUpStyle.icon}
                        />
                        <MaterialCommunityIcons name={showConfirmPassword ? 'eye' : 'eye-off'}
                            size={26} color="#fff" style={SignUpStyle.lockIcon}
                            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={SignUpStyle.country_code}
                            onPress={() => setShow(true)}
                        >
                            <View style={SignUpStyle.teleCode}>
                                <MaterialIcons name={'call'} size={25} color="#fff" />
                                <Text style={SignUpStyle.phonenumber}>
                                    {countryCode ? countryCode : '+91'}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TextInput placeholder="Geben Sie Ihre Nummer Ein" style={SignUpStyle.inputPhone}
                            autoCapitalize='none' autoCorrect={false} value={phone}
                            placeholderTextColor="#fff" cursorColor='#3154e0' maxLength={10}
                            onChangeText={(phone) => setPhone(phone)} keyboardType='numeric'
                        />
                    </View>

                    <TouchableOpacity style={SignUpStyle.date} onPress={showDatePicker}>
                        <View style={SignUpStyle.teleCalender}>
                            <Ionicons name={'calendar-sharp'} size={25} color="#fff" />

                            <Text style={SignUpStyle.selectDate}>
                                {dob ? dob.toLocaleDateString('en-GB', {
                                    day: '2-digit', month: 'short', year: 'numeric',
                                }) : 'Geburtstag'}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <View style={SignUpStyle.bottom}>
                        <AgreeCheckBox setRememberMe={setRememberMe} rememberMe={rememberMe}
                            lable={'Mitteilungen Erlauben'}
                        />
                    </View>

                    <CountryPicker onBackdropPress={() => setShow(false)} inputPlaceholder={'Search'}
                        show={show} searchMessage={'Did Not Find the Match'} lang={'de'}
                        style={{
                            modal: { height: 475 },
                            backdrop: { backgroundColor: 'rgba(0, 0, 0, 0.4)' },
                            textInput: {
                                height: 50, borderRadius: 15, borderWidth: 1,
                                backgroundColor: '#fff', paddingLeft: 20,
                            },
                            countryButtonStyles: {
                                height: 55, backgroundColor: '#b5b5b5', paddingHorizontal: 15,
                            },
                            searchMessageText: { color: '#000' },
                            flag: { fontSize: 23 },
                            line: { marginTop: 12, marginBottom: 9, backgroundColor: '#b5b5b5' },
                        }}
                        pickerButtonOnPress={(item) => {
                            setCountryCode(item.dial_code);
                            setShow(false);
                        }}
                    />

                    {loading && (<Loader loading={loading} />)}

                    <TouchableOpacity style={SignUpStyle.signUpBtn}
                        onPress={handleSignUp}
                    >
                        <Text style={[SignUpStyle.signUpText]}> Sichern </Text>
                    </TouchableOpacity>
                </View>

                <DateTimePicker isVisible={isDatePickerVisible} mode="date" maximumDate={new Date()}
                    date={dob || new Date()} onConfirm={handleConfirm} onCancel={hideDatePicker}
                />
            </ScrollView>

            <CustomeAlert message={alertMessage} lable={alertLable}
                isVisible={alertModelVisible} closeModel={closeModel}
            />
        </ImageBackground>
    )
}

export default SignUp