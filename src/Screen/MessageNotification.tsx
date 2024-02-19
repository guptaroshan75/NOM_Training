import { View, Text, ImageBackground } from 'react-native'
import React, { useEffect, useState } from 'react'
import MessageNotificationStyle from '../Css/MessageNotificationStyle'
import CustomeHeader from '../Component/CustomeHeader'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../Redux/Store'
import { get_notification } from '../Redux/Features/CalenderSlice'
import { ThunkDispatch } from '@reduxjs/toolkit'
import Loader from '../Component/Loader'

interface MessageNotification {
    navigation: any
}

const MessageNotification: React.FC<MessageNotification> = ({ navigation }) => {
    const { notification } = useSelector((state: RootState) => state.calender);
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const handleDateTime = (created_at: any) => {
        if (!created_at) {
            return { date: '', time: '' };
        }
        const dateTime = new Date(created_at);
        const date = `${dateTime.getDate().toString().padStart(2, '0')}/${(dateTime.getMonth() + 1).toString().padStart(2, '0')}/${dateTime.getFullYear()}`;
        const time = `${dateTime.getHours().toString().padStart(2, '0')}:${dateTime.getMinutes().toString().padStart(2, '0')}`;
        return { date, time };
    };
    const { date, time } = handleDateTime(notification && notification[0]?.created_at)

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await dispatch(get_notification())
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        fetchData();
    }, [dispatch]);

    return (
        <ImageBackground source={require('../Images/cycle_blur.png')} style={{ flex: 1 }}>
            <View style={MessageNotificationStyle.container}>
                <CustomeHeader lable={'Mitteilungen'} navigation={navigation} />

                {loading && (<Loader loading={loading} />)}

                {date && time ? (
                    <View>
                        <View style={MessageNotificationStyle.notifycontainer}>
                            <Text style={MessageNotificationStyle.notification}>
                                Daten Wurden Hochgeladen
                            </Text>

                            <Text style={MessageNotificationStyle.textnote}>
                                Trainingsplans Update Verfügbar
                            </Text>
                        </View>

                        <View style={MessageNotificationStyle.messageShow}>
                            <Text style={MessageNotificationStyle.datelable}> Datum </Text>
                            <Text style={MessageNotificationStyle.datelable}> Zeit </Text>
                        </View>

                        <View style={MessageNotificationStyle.messageShowtext}>
                            <Text style={MessageNotificationStyle.datetext}> {date} </Text>
                            <Text style={MessageNotificationStyle.datetext}> {time} </Text>
                        </View>
                    </View>
                ) : (
                    <View style={MessageNotificationStyle.mainsection}>
                        <Text style={MessageNotificationStyle.text}> Keine Daten Gefunden </Text>
                    </View>
                )}

                <View style={MessageNotificationStyle.borderBottom}></View>
            </View>
        </ImageBackground>
    )
}

export default MessageNotification