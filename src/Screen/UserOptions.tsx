import { View, Text, ImageBackground, Image } from 'react-native'
import { TouchableWithoutFeedback, Alert } from 'react-native'
import React, { useState } from 'react'
import UserOptionsStyle from '../Css/UserOptionsStyle'
import Loader from '../Component/Loader'
import Toast from 'react-native-toast-message'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { CommonActions } from '@react-navigation/native'

interface UserOptions {
    navigation: any
}

const UserOptions: React.FC<UserOptions> = ({ navigation }) => {
    const [loading, setLoading] = useState<boolean>(false);

    const handleLogout = async () => {
        Alert.alert(
            'Confirm Logout',
            'Are You Sure You Want To LogOut',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Logout',
                    onPress: async () => {
                        setLoading(true);
                        try {
                            await AsyncStorage.removeItem('User_id');
                            Toast.show({
                                type: 'Toast', text1: 'Log Out Successfully',
                                visibilityTime: 3000, position: "bottom"
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
                    },
                },
            ],
            { cancelable: false }
        );

    };

    return (
        <ImageBackground source={require('../Images/cycle_blur.png')} style={UserOptionsStyle.container}>
            <Text style={UserOptionsStyle.mainContent}> Athleten Konto </Text>

            <TouchableWithoutFeedback onPress={() => navigation.navigate('Profile')}>
                <View style={UserOptionsStyle.iconlogo}>
                    <Image source={require('../Icons/user.png')} style={UserOptionsStyle.icon} />
                    <Text style={UserOptionsStyle.text}> Dein Profil </Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => navigation.navigate('MessageNotification')}>
                <View style={UserOptionsStyle.iconlogo}>
                    <Image source={require('../Icons/notification.png')}
                        style={UserOptionsStyle.icon}
                    />
                    <Text style={UserOptionsStyle.text}> Mitteilungen </Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => navigation.navigate('Race_Calender')}>
                <View style={UserOptionsStyle.iconlogo}>
                    <Image source={require('../Icons/calendar.png')} style={UserOptionsStyle.icon} />
                    <Text style={UserOptionsStyle.text}> Rennkalender </Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => navigation.navigate('Documents')}>
                <View style={UserOptionsStyle.iconlogo}>
                    <Image source={require('../Icons/documents-folder.png')}
                        style={UserOptionsStyle.icon}
                    />
                    <Text style={UserOptionsStyle.text}> Dokumente </Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback>
                <View style={UserOptionsStyle.iconlogo}>
                    <Image source={require('../Icons/discount.png')} style={UserOptionsStyle.icon} />
                    <Text style={UserOptionsStyle.text}> Aktionen </Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => navigation.navigate('Upgrade')}>
                <View style={UserOptionsStyle.iconlogo}>
                    <Image source={require('../Icons/up.png')} style={UserOptionsStyle.icon} />
                    <Text style={UserOptionsStyle.text}> Upgrade </Text>
                </View>
            </TouchableWithoutFeedback>

            <TouchableWithoutFeedback onPress={() => navigation.navigate('ChangePassword')}>
                <View style={UserOptionsStyle.iconlogo}>
                    <Image source={require('../Icons/documents-folder.png')}
                        style={UserOptionsStyle.icon}
                    />
                    <Text style={UserOptionsStyle.text}> Passwort ändern </Text>
                </View>
            </TouchableWithoutFeedback>

            {loading && (<Loader loading={loading} />)}

            <TouchableWithoutFeedback onPress={handleLogout}>
                <View style={UserOptionsStyle.iconlogo}>
                    <Image source={require('../Icons/logout.png')} style={UserOptionsStyle.icon} />
                    <Text style={UserOptionsStyle.text}> Logout </Text>
                </View>
            </TouchableWithoutFeedback>
        </ImageBackground>
    )
}

export default UserOptions