// import React, { useEffect, useState } from "react";
// import { ImageBackground, Text, View } from "react-native";
// import ChatHeader from "../Component/Message/ChatHeader";
// import MessagesList from "../Component/Message/MessagesList";
// import { useDispatch, useSelector } from "react-redux";
// import { ThunkDispatch } from "@reduxjs/toolkit";
// import { RootState } from "../Redux/Store";
// import Loader from "../Component/Loader";
// import { get_User } from "../Redux/Features/UserSlice";
// import { Send_Chat_Post } from "../Redux/Features/ChatSlice";
// import firestore from '@react-native-firebase/firestore';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import messaging from '@react-native-firebase/messaging';
// import PushNotification from 'react-native-push-notification';
// import { allTrainer_Get } from "../Redux/Features/TrainerSlice";
// import MessageScreenStyle from "../Css/MessageScreenStyle";

// interface MessagesScreen {
//     navigation: any,
//     route: any
// }

// const MessagesScreen: React.FC<MessagesScreen> = ({ navigation, route }) => {
//     const [loading, setLoading] = useState<boolean>(false);
//     const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
//     const { get_user } = useSelector((state: RootState) => state.user);
//     const { all_trainer } = useSelector((state: RootState) => state.trainer);
//     // console.log('hioii message', route.params?.data?.message);

//     const user_Id = get_user[0]?.id;
//     const trainer_id = get_user[0]?.parents;
//     const user_Email = get_user[0]?.email;
//     const [messages, setMessages] = useState([]);

//     const selectedTrainer = all_trainer.find((trainer) => trainer.id === trainer_id);
//     const trainer_name = `${selectedTrainer?.fname} ${selectedTrainer?.lname}`;
//     const trainer_Image =
//         `https://ui-avatars.com/api/?name=${encodeURIComponent(trainer_name)}&color=7F9CF5&background=EBF4FF`

//     const addMessageToFirestore = async (newMessage: string) => {
//         try {
//             const docRef = firestore().collection('firestore_save').doc(user_Email);
//             const doc = await docRef.get();
//             let storeMessage = [];
//             if (doc.exists) {
//                 const data = doc.data();
//                 storeMessage = JSON.parse(data?.json || "[]");
//             }
//             const messageData = {
//                 message: newMessage,
//                 current_user: false,
//                 message_time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//             };
//             storeMessage.unshift(messageData);
//             await docRef.set({ email_id: user_Email, json: JSON.stringify(storeMessage) });
//         } catch (error: any) {
//             console.log(error.message);
//             console.error("Error adding message to Firestore:", error);
//         }
//     };

//     // const handleMessage = async (message: any) => {
//     //     console.log('Received message:', message);
//     //     addMessageToFirestore(message);
//     //     // Show notification
//     //     PushNotification.localNotification({
//     //         title: 'New Message',
//     //         message: message,
//     //         channelId: 'default',
//     //     });
//     // };

//     // useEffect(() => {
//     //     const unsubscribeForeground = messaging().onMessage(async remoteMessage => {
//     //         if (remoteMessage.data && remoteMessage.data.message) {
//     //             const message = remoteMessage.data.message;
//     //             handleMessage(message);
//     //         }
//     //     });

//     //     return () => {
//     //         unsubscribeForeground();
//     //     };
//     // }, []);

//     // useEffect(() => {
//     //     const unsubscribeBackground: any = messaging().setBackgroundMessageHandler(async remoteMessage => {
//     //         if (remoteMessage.data && remoteMessage.data.message) {
//     //             const message = remoteMessage.data.message;
//     //             handleMessage(message);
//     //         }
//     //     });

//     //     const unsubscribeNotificationPress = messaging().onNotificationOpenedApp(remoteMessage => {
//     //         if (remoteMessage.data && remoteMessage.data.message) {
//     //             const message = remoteMessage.data.message;
//     //             console.log('Notification pressed. Message:', message);
//     //         }
//     //     });

//     //     return () => {
//     //         unsubscribeBackground();
//     //         unsubscribeNotificationPress();
//     //     };
//     // }, []);

//     const handleInitialMessage = () => {
//         const unsubscribe = messaging().onMessage(async remoteMessage => {
//             if (remoteMessage?.data && remoteMessage?.data?.message) {
//                 const newMessage: any = remoteMessage?.data?.message;
//                 addMessageToFirestore(newMessage);
//             }
//         });
//         return unsubscribe;
//     }

//     const onBackgroundNotification = () => {
//         messaging().onNotificationOpenedApp(remoteMessage => {
//             if (route.params?.data?.message) {
//                 const newMessage = route.params.data.message;
//                 console.log(newMessage);
//                 addMessageToFirestore(newMessage);
//             }
//         })
//     }

//     useEffect(() => {
//         handleInitialMessage()
//         onBackgroundNotification()
//     }, [route.params?.data?.message]);

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 await dispatch(get_User());
//                 await dispatch(allTrainer_Get());
//                 setLoading(false);
//             } catch (error) {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, [dispatch]);

//     useEffect(() => {
//         const fetchMessages = async () => {
//             try {
//                 const docRef = firestore().collection('firestore_save').doc(user_Email);
//                 docRef.onSnapshot((doc) => {
//                     if (doc.exists) {
//                         const data = doc.data();
//                         const newMessages = JSON.parse(data?.json || "[]");
//                         setMessages(newMessages);
//                     }
//                 });
//             } catch (error) {
//                 console.error("Error fetching messages:", error);
//             }
//         };
//         fetchMessages();
//     }, [user_Email]);

//     const onSendMessage = async (newMessage: string) => {
//         try {
//             const docRef = firestore().collection('firestore_save').doc(user_Email);
//             const doc = await docRef.get();
//             let storeMessage = [];
//             if (doc.exists) {
//                 const data = doc.data();
//                 storeMessage = JSON.parse(data?.json || "[]");
//             }
//             const messageData = {
//                 message: newMessage,
//                 current_user: true,
//                 message_time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//             };
//             storeMessage.unshift(messageData);
//             await docRef.set({ email_id: user_Email, json: JSON.stringify(storeMessage) });
//             await AsyncStorage.setItem("setMessage", JSON.stringify({ messageData }));
//             const chat_message_data = {
//                 to_user_id: trainer_id,
//                 from_user_id: user_Id,
//                 chat_message: newMessage,
//             };
//             await dispatch(Send_Chat_Post(chat_message_data));
//         } catch (error) {
//             return error
//         }
//     };

//     return (
//         <>
//             {trainer_id === '0' ? (
//                 <ImageBackground source={require('../Images/cycle_blur.png')} style={{ flex: 1 }}>
//                     <Text style={MessageScreenStyle.chatAllow}> CHAT </Text>
//                     <View style={MessageScreenStyle.userInfo}>
//                         <Text style={MessageScreenStyle.userShowMessage}>
//                             No Trainer Available For You We Will Revert Back Once the Trainer is Available
//                         </Text>
//                     </View>
//                 </ImageBackground>
//             ) : (
//                 <>
//                     {loading && (<Loader loading={loading} />)}
//                     <View style={MessageScreenStyle.container}>
//                         <ChatHeader status={'Online'} userName={trainer_name}
//                             userProfile={trainer_Image}
//                         />
//                         <MessagesList messages={messages} onSendMessage={onSendMessage} />
//                     </View>
//                 </>
//             )}
//         </>
//     );
// };

// export default MessagesScreen;

import React, { useEffect, useState } from "react";
import { ActivityIndicator, ImageBackground, Text, View } from "react-native";
import ChatHeader from "../Component/Message/ChatHeader";
import MessagesList from "../Component/Message/MessagesList";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { RootState } from "../Redux/Store";
import Loader from "../Component/Loader";
import { get_User } from "../Redux/Features/UserSlice";
import { Send_Chat_Post } from "../Redux/Features/ChatSlice";
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import { allTrainer_Get } from "../Redux/Features/TrainerSlice";
import MessageScreenStyle from "../Css/MessageScreenStyle";

interface MessagesScreen {
    route: any
}

const MessagesScreen: React.FC<MessagesScreen> = ({ route }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { get_user } = useSelector((state: RootState) => state.user);
    const { all_trainer } = useSelector((state: RootState) => state.trainer);

    const user_Id = get_user[0]?.id;
    const trainer_id = get_user[0]?.parents;
    const user_Email = get_user[0]?.email;
    const [messages, setMessages] = useState([]);

    const selectedTrainer = all_trainer.find((trainer) => trainer.id === trainer_id);
    const trainer_name = `${selectedTrainer?.fname} ${selectedTrainer?.lname}`;
    const trainer_Image =
        `https://ui-avatars.com/api/?name=${encodeURIComponent(trainer_name)}&color=7F9CF5&background=EBF4FF`

    const addMessageToFirestore = async (newMessage: string) => {
        try {
            const docRef = firestore().collection('firestore_save').doc(user_Email);
            const doc = await docRef.get();
            let storeMessage = [];
            if (doc.exists) {
                const data = doc.data();
                storeMessage = JSON.parse(data?.json || "[]");
            }
            const messageData = {
                message: newMessage,
                current_user: false,
                message_time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            storeMessage.unshift(messageData);
            await docRef.set({ email_id: user_Email, json: JSON.stringify(storeMessage) });
        } catch (error: any) {
            console.error("Error adding message to Firestore:", error);
        }
    };

    const handleInitialMessage = () => {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            if (remoteMessage?.data && remoteMessage?.data?.message) {
                const newMessage: any = remoteMessage?.data?.message;
                addMessageToFirestore(newMessage);
            }
        });
        return unsubscribe;
    }

    const onBackgroundNotification = async (remoteMessage: any) => {
        if (remoteMessage.data && remoteMessage.data.message) {
            const newMessage = remoteMessage.data.message;
            await addMessageToFirestore(newMessage);
        }
    };

    const onBackgroundNotificationkill = async () => {
        if (route?.params?.state === 'Kill App') {
            const newMessage = route?.params?.data?.message;
            await addMessageToFirestore(newMessage)
        }
    }

    useEffect(() => {
        onBackgroundNotificationkill()
    }, [user_Email])

    useEffect(() => {
        handleInitialMessage()
        const addonBackgroundNotification: any = messaging().setBackgroundMessageHandler(
            onBackgroundNotification
        );

        return () => {
            if (addonBackgroundNotification) {
                addonBackgroundNotification();
            }
        };
    }, []);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const docRef = firestore().collection('firestore_save').doc(user_Email);
                docRef.onSnapshot((doc) => {
                    if (doc.exists) {
                        const data = doc.data();
                        const newMessages = JSON.parse(data?.json || "[]");
                        setMessages(newMessages);
                    }
                });
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };
        fetchMessages();
    }, [user_Email]);

    const onSendMessage = async (newMessage: string) => {
        try {
            const docRef = firestore().collection('firestore_save').doc(user_Email);
            const doc = await docRef.get();
            let storeMessage = [];
            if (doc.exists) {
                const data = doc.data();
                storeMessage = JSON.parse(data?.json || "[]");
            }
            const messageData = {
                message: newMessage,
                current_user: true,
                message_time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            };
            storeMessage.unshift(messageData);
            await docRef.set({ email_id: user_Email, json: JSON.stringify(storeMessage) });
            await AsyncStorage.setItem("setMessage", JSON.stringify({ messageData }));
            const chat_message_data = {
                to_user_id: trainer_id,
                from_user_id: user_Id,
                chat_message: newMessage,
            };
            await dispatch(Send_Chat_Post(chat_message_data));
        } catch (error) {
            console.error("Error sending message:", error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await dispatch(get_User());
                await dispatch(allTrainer_Get());
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        fetchData();
    }, [dispatch]);

    return (
        <>
            {trainer_id === '0' ? (
                <ImageBackground source={require('../Images/cycle_blur.png')} style={{ flex: 1 }}>
                    <Text style={MessageScreenStyle.chatAllow}> CHAT </Text>
                    <View style={MessageScreenStyle.userInfo}>
                        <Text style={MessageScreenStyle.userShowMessage}>
                            No Trainer Available For You We Will Revert Back Once the Trainer is Available
                        </Text>
                    </View>
                </ImageBackground>
            ) : (
                <>
                    {loading && (<Loader loading={loading} />)}
                    <View style={MessageScreenStyle.container}>
                        {loading ? (
                            <ActivityIndicator size="large" color="#00aaf0" />
                        ) : (
                            <ChatHeader status={'Online'} userName={trainer_name}
                                userProfile={trainer_Image}
                            />
                        )}
                        <MessagesList messages={messages} onSendMessage={onSendMessage} />
                    </View>
                </>
            )}
        </>
    );
};

export default MessagesScreen;