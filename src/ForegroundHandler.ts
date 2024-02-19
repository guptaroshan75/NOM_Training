import { useEffect } from 'react'
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';
import { Platform } from 'react-native';

const ForegroundHandler = () => {
    useEffect(() => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log("handle in foreground", remoteMessage);
            const { notification } = remoteMessage
            if (Platform.OS === 'android') {
                PushNotification.localNotification({
                    channelId: "my-channel-id",
                    title: notification?.title,
                    message: notification?.body || '',
                    soundName: 'default',
                    vibrate: true,
                    playSound: true
                });
            }
        });
        return unsubscribe;
    }, [])
    return null
}

export default ForegroundHandler