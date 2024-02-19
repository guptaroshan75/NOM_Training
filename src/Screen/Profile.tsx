import { View, Text, Image, ImageBackground, TextInput, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native'
import ProfileStyle from '../Css/ProfileStyle'
import CustomeTextInput from '../Component/CustomeTextInput'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import DateTimePicker from 'react-native-modal-datetime-picker'
import CustomeImage from '../Component/CustomeImage'
import CustomeHeader from '../Component/CustomeHeader'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../Redux/Store'
import { User_Profile_Image, User_Update, get_User } from '../Redux/Features/UserSlice'
import { CountryPicker } from 'react-native-country-codes-picker'
import Loader from '../Component/Loader'
import { Image_Url } from '../BaseUrl/BaseUrl'
import Toast from 'react-native-toast-message'

interface Profile {
    navigation: any
}

const Profile: React.FC<Profile> = ({ navigation }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [name, setName] = useState('')
    const [serName, setSerName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [profileImage, setProfileImage] = useState<string>('');

    const [show, setShow] = useState(false);
    const [countryCode, setCountryCode] = useState('');

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { get_user } = useSelector((state: RootState) => state.user);

    const fetchImage = get_user ? get_user[0]?.profile_image : ''
    const userName = `${get_user[0]?.fname} ${get_user[0]?.lname}`;
    const userImage =
        `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&color=7F9CF5&background=EBF4FF`

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: any) => {
        setSelectedDate(date);
        hideDatePicker();
    };

    const handleProfileImage = async (imageURI: string) => {
        setProfileImage(imageURI);
        setLoading(true);
        const formData = new FormData();
        formData.append('sendimage', {
            uri: imageURI,
            type: 'image/jpeg',
            name: 'image.jpg',
        });
        try {
            await dispatch(User_Profile_Image(formData));
            Toast.show({
                type: 'Toast', text1: 'Profile Image Update Successfully',
                visibilityTime: 3000, position: "bottom"
            }); 
            setLoading(false);
            dispatch(get_User());
        } catch (error) {
            setLoading(false);
            console.log('User error:', error);
        }
        setIsVisible(false);
    };

    const handleFName = () => {
        setName(get_user[0]?.fname)
    }

    const handleLName = () => {
        setSerName(get_user[0]?.lname)
    }

    const handleEmail = () => {
        setEmail(get_user[0]?.email)
    }

    const handlePhoneNumber = (phoneNumber: any) => {
        const phoneNumberLength = 10;
        if (!phoneNumber) {
            return { countryGetCode: '', phoneNumber: '' }
        }
        phoneNumber = phoneNumber.trim();
        const last10Digits = phoneNumber.slice(-phoneNumberLength);
        const countryGetCode = phoneNumber.slice(0, -phoneNumberLength);

        return { countryGetCode, phoneNumber: last10Digits }
    };

    const userPhone = get_user[0]?.phone;
    const { countryGetCode, phoneNumber } = handlePhoneNumber(userPhone);

    const handlePhone = () => {
        setPhone(phoneNumber)
    }

    useEffect(() => {
        handleFName()
        handleLName()
        handleEmail()
        handlePhone()
    }, [])

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
    }, [dispatch]);

    const handleUpdateProfile = async () => {
        setLoading(true);
        if (!phone || phone.length < 10) {
            Alert.alert('Error', 'Please Enter A Valid Phone Number (At Least 10 Digits)');
            setLoading(false);
            return;
        }

        const user_update = {
            fname: name, lname: serName, email,
            phone: `${countryCode ? countryCode : countryGetCode}${phone}`,
            dob: selectedDate?.toISOString().split('T')[0] || get_user[0]?.dob,
        };

        try {
            await dispatch(User_Update(user_update))
            Toast.show({
                type: 'Toast', text1: 'Profile Update Successfully',
                visibilityTime: 2000, position: "bottom"
            }); 
            setLoading(false);
            dispatch(get_User())
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <ImageBackground source={require('../Images/profile_back.png')} style={{ flex: 1 }}>
            <ScrollView>
                <View style={ProfileStyle.container}>
                    <CustomeHeader lable={'Dein Profil'} navigation={navigation} />

                    <View style={ProfileStyle.main}>
                        <TouchableOpacity style={ProfileStyle.profile} onPress={() => setIsVisible(true)}>
                            {profileImage || fetchImage ? (
                                <Image style={ProfileStyle.profileLogo}
                                    source={profileImage ? { uri: profileImage } :
                                        { uri: `${Image_Url}/${fetchImage}` }
                                    }
                                />
                            ) : (
                                <Image style={ProfileStyle.profileLogo}
                                    source={{ uri: userImage }}
                                />
                            )}
                        </TouchableOpacity>
                    </View>

                    <CustomeTextInput value={name} placeholder={''}
                        onChangeText={(name) => setName(name)} icon={'user-tie'}
                    />

                    <CustomeTextInput value={serName} placeholder={""}
                        onChangeText={(serName) => setSerName(serName)} icon={'user-tie'}
                    />

                    <View style={ProfileStyle.inputView}>
                        <TextInput style={ProfileStyle.inputText} autoCapitalize='none'
                            value={email} autoCorrect={false} cursorColor='#3154e0' editable={false}
                            onChangeText={(email) => setEmail(email)} placeholderTextColor="#fff"
                        />
                        <MaterialIcons name={'email'}
                            size={25} color="#fff" style={ProfileStyle.icon}
                        />
                    </View>

                    <View style={{ flex: 1 }}>
                        <TouchableOpacity style={ProfileStyle.country_code} onPress={() => setShow(true)}>
                            <View style={ProfileStyle.teleCode}>
                                <MaterialIcons name={'call'} size={25} color="#fff" />
                                <Text style={ProfileStyle.phonenumber}>
                                    {countryCode ? countryCode : countryGetCode}
                                </Text>
                            </View>
                        </TouchableOpacity>

                        <TextInput style={ProfileStyle.inputPhone}
                            autoCapitalize='none' autoCorrect={false} value={phone}
                            placeholderTextColor="#fff" cursorColor='#3154e0' maxLength={10}
                            onChangeText={(phone) => setPhone(phone)} keyboardType='numeric'
                        />
                    </View>

                    <TouchableOpacity style={ProfileStyle.date} onPress={showDatePicker}>
                        <View style={ProfileStyle.teleCalender}>
                            <Ionicons name={'calendar-sharp'} size={25} color="#fff" />

                            <Text style={ProfileStyle.selectDate}>
                                {selectedDate ? selectedDate.toLocaleDateString('en-GB', {
                                    day: '2-digit', month: 'short', year: 'numeric',
                                }) : get_user[0]?.dob &&
                                new Date(get_user[0]?.dob).toLocaleDateString('en-GB', {
                                    day: '2-digit', month: 'short', year: 'numeric',
                                })}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {loading && (<Loader loading={loading} />)}

                    <TouchableOpacity style={ProfileStyle.profileBtn} onPress={handleUpdateProfile}>
                        <Text style={[ProfileStyle.profileText]}> Sichern </Text>
                    </TouchableOpacity>
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

                <DateTimePicker isVisible={isDatePickerVisible} mode="date" maximumDate={new Date()}
                    date={selectedDate || new Date()} onConfirm={handleConfirm} onCancel={hideDatePicker}
                />

                <CustomeImage isVisible={isVisible} setIsVisible={setIsVisible}
                    setSelectedImageURI={handleProfileImage}
                />
            </ScrollView>
        </ImageBackground>
    )
}

export default Profile