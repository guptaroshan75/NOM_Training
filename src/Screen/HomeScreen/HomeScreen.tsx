// import { View, Text, ImageBackground, Image, Modal, ScrollView } from 'react-native'
// import React, { useCallback, useState } from 'react'
// import HomeScreenStyle from '../../Css/HomeScreenStyle/HomeScreenStyle'
// import { TouchableOpacity } from 'react-native'
// import Fontisto from "react-native-vector-icons/Fontisto"
// import Ionicons from "react-native-vector-icons/Ionicons"
// import MonthlyOverview from './MonthlyOverview'
// import { useDispatch, useSelector } from 'react-redux'
// import { ThunkDispatch } from '@reduxjs/toolkit'
// import { RootState } from '../../Redux/Store'
// import { get_User } from '../../Redux/Features/UserSlice'
// import Loader from '../../Component/Loader'
// import { Image_Url } from '../../BaseUrl/BaseUrl'
// import { Row, TableWrapper, Cell } from 'react-native-table-component';
// import { get_Date_Time, get_notification } from '../../Redux/Features/CalenderSlice'
// import { monthlyOverViewDate_Post } from '../../Redux/Features/CalenderSlice'
// import YourTraining from './YourTraining'
// import { useFocusEffect } from '@react-navigation/native'

// interface HomeScreen {
//     navigation: any,
// }

// const HomeScreen: React.FC<HomeScreen> = ({ navigation }) => {
//     const [monthlyVisible, setMonthlyVisible] = useState(false);
//     const [yourTrainingVisible, setYourTrainingVisible] = useState(false);
//     const [loading, setLoading] = useState<boolean>(false);
//     const [getDateTime, setGetDateTime] = useState('')
//     const [response, setResponse] = useState('');

//     const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
//     const { get_user } = useSelector((state: RootState) => state.user);
//     const { get_date_time } = useSelector((state: RootState) => state.calender);
//     const { notification } = useSelector((state: RootState) => state.calender);

//     const handleDateTime = (created_at: any) => {
//         if (!created_at) {
//             return { date: '', time: '' };
//         }
//         const dateTime = new Date(created_at);
//         const date = `${dateTime.getDate().toString().padStart(2, '0')}/${(dateTime.getMonth() + 1).toString().padStart(2, '0')}/${dateTime.getFullYear()}`;
//         const time = `${dateTime.getHours().toString().padStart(2, '0')}:${dateTime.getMinutes().toString().padStart(2, '0')}`;
//         return { date, time };
//     };
//     const { date, time } = handleDateTime(notification && notification[0]?.created_at)

//     const userName = `${get_user[0]?.fname} ${get_user[0]?.lname}`;
//     const userId = get_user[0]?.id
//     const userImage =
//         `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&color=7F9CF5&background=EBF4FF`
//     const fetchImage = get_user ? get_user[0]?.profile_image : ''

//     const checkVisible = (item: boolean) => {
//         setMonthlyVisible(item)
//         setYourTrainingVisible(item)
//     }

//     const fetchData = useCallback(async () => {
//         setLoading(true);
//         try {
//             await dispatch(get_User());
//             await dispatch(get_Date_Time());
//             await dispatch(get_notification());
//             setLoading(false);
//         } catch (error) {
//             setLoading(false);
//         }
//     }, [dispatch]);

//     const closeModal = () => {
//         setMonthlyVisible(false);
//         setYourTrainingVisible(false)
//         fetchData();
//     }

//     useFocusEffect(useCallback(() => {
//         fetchData();
//         return () => { }
//     }, [fetchData, userId]))

//     const TableHead = {
//         header: ['Datum', 'Trainings Zeit', 'Anzeigen'],
//     };

//     const handleTraining = async (getdate: string) => {
//         setLoading(true)
//         const monthlyOverView = { first_date: getdate }
//         try {
//             const response: any = await dispatch(monthlyOverViewDate_Post(monthlyOverView));            
//             setResponse(response.payload)
//             setLoading(false)
//             setGetDateTime(getdate)
//             setYourTrainingVisible(true)
//         } catch (error) {
//             return error
//         }

//     }

//     const element = (getdate: string) => (
//         <TouchableOpacity onPress={() => handleTraining(getdate)} style={{ alignItems: 'center' }}>
//             <Image source={require('../../Icons/search.png')} style={HomeScreenStyle.search} />
//         </TouchableOpacity>
//     );

//     const formatDate = (dateString: string) => {
//         const [year, month, day] = dateString?.split('-')
//         return `${day}/${month}/${year}`;
//     };

//     return (
//         <ImageBackground source={require('../../Images/cycle_run.png')} style={{ flex: 1 }}>
//             <View style={HomeScreenStyle.container}>
//                 <Text style={HomeScreenStyle.mainContent}> Hauptseite </Text>

//                 {loading && (<Loader loading={loading} />)}

//                 <View style={HomeScreenStyle.homescreen}>
//                     {fetchImage ? (
//                         <Image style={HomeScreenStyle.userLogo}
//                             source={{ uri: `${Image_Url}/${fetchImage}` }}
//                         />
//                     ) : (
//                         <Image style={HomeScreenStyle.userLogo}
//                             source={{ uri: userImage }}
//                         />
//                     )}

//                     <View style={{ marginHorizontal: 12 }}>
//                         <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                             <Text style={HomeScreenStyle.userName}>
//                                 {get_user[0]?.fname} {get_user[0]?.lname}
//                             </Text>

//                             <TouchableOpacity onPress={() => navigation.navigate('UserOptions')}>
//                                 <Fontisto name={'player-settings'}
//                                     size={22} color="#fff" style={{ marginHorizontal: 9 }}
//                                 />
//                             </TouchableOpacity>
//                         </View>
//                         <Text style={HomeScreenStyle.userEmail}> {get_user[0]?.email} </Text>
//                     </View>
//                 </View>

//                 {date && time ? (
//                     <TouchableOpacity onPress={() => navigation.navigate('MessageNotification')}>
//                         <View style={HomeScreenStyle.showDate}>
//                             <View style={HomeScreenStyle.messageShow}>
//                                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                                     <Text style={HomeScreenStyle.datelable}> Datum : </Text>
//                                     <Text style={HomeScreenStyle.datetext}> {date} </Text>
//                                 </View>

//                                 <View style={HomeScreenStyle.border}></View>

//                                 <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//                                     <Text style={HomeScreenStyle.datelable}> Zeit : </Text>
//                                     <Text style={HomeScreenStyle.datetext}> {time} </Text>
//                                 </View>
//                             </View>

//                             <View style={HomeScreenStyle.borderBottom}></View>

//                             <View style={HomeScreenStyle.messageShow}>
//                                 <Text style={HomeScreenStyle.datetext}>
//                                     Klick Hier Zu Deinen Nachrichten
//                                 </Text>
//                                 <Image source={require('../../Icons/notification.png')}
//                                     style={HomeScreenStyle.icon}
//                                 />
//                             </View>
//                         </View>
//                     </TouchableOpacity>
//                 ) : (
//                     <Text style={HomeScreenStyle.maintext}> Keine Aktuelle Benachrichtigung </Text>
//                 )}

//                 <TouchableOpacity onPress={() => setMonthlyVisible(true)} style={HomeScreenStyle.date}>
//                     <View style={HomeScreenStyle.teleCalender}>
//                         <Ionicons name={'calendar-sharp'} size={25} color="#fff" />

//                         <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
//                             <Text style={{ color: '#fff', fontSize: 18 }}>
//                                 Monatsübersicht
//                             </Text>
//                         </View>
//                     </View>
//                 </TouchableOpacity>

//                 {get_date_time ? (
//                     <View style={HomeScreenStyle.tablecontainer}>
//                         <Row data={TableHead.header} style={HomeScreenStyle.head}
//                             textStyle={HomeScreenStyle.text}
//                         />
//                         <ScrollView style={HomeScreenStyle.dataWrapper}>
//                             {get_date_time?.map((dateTime: any, index) => (
//                                 <TableWrapper key={index} style={HomeScreenStyle.row}>
//                                     <Cell data={formatDate(dateTime?.dates)}
//                                         textStyle={HomeScreenStyle.text}
//                                     />
//                                     <Cell data={`${dateTime?.total_rainingstime} mins`}
//                                         textStyle={HomeScreenStyle.text}
//                                     />
//                                     <Cell data={element(dateTime?.dates)}
//                                         textStyle={HomeScreenStyle.text}
//                                     />
//                                 </TableWrapper>
//                             ))}
//                         </ScrollView>
//                     </View>
//                 ) : (
//                     <Text style={HomeScreenStyle.textFormate}> Keine Daten Gefunden </Text>
//                 )}
//             </View>

//             <Modal animationType="slide" transparent={false} visible={monthlyVisible}
//                 onRequestClose={() => { setMonthlyVisible(false) }}
//             >
//                 <MonthlyOverview checkVisible={checkVisible} />
//             </Modal>

//             <Modal animationType="slide" transparent={false} visible={yourTrainingVisible}
//                 onRequestClose={() => { setYourTrainingVisible(false) }}
//             >
//                 <YourTraining closeModal={closeModal} selectedDate={getDateTime}
//                     response={response}
//                 />
//             </Modal>
//         </ImageBackground>
//     )
// }

// export default HomeScreen


import { View, Text, ImageBackground, Image, ScrollView, ActivityIndicator, TouchableWithoutFeedback } from 'react-native'
import React, { useCallback, useState } from 'react'
import HomeScreenStyle from '../../Css/HomeScreenStyle/HomeScreenStyle'
import { TouchableOpacity } from 'react-native'
import Fontisto from "react-native-vector-icons/Fontisto"
import Ionicons from "react-native-vector-icons/Ionicons"
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../../Redux/Store'
import { get_User } from '../../Redux/Features/UserSlice'
import Loader from '../../Component/Loader'
import { Image_Url } from '../../BaseUrl/BaseUrl'
import { Row, TableWrapper, Cell } from 'react-native-table-component';
import { get_Date_Time, get_notification, getalldate_Post } from '../../Redux/Features/CalenderSlice'
import { monthlyOverViewDate_Post } from '../../Redux/Features/CalenderSlice'
import { useFocusEffect } from '@react-navigation/native'

interface HomeScreen {
    navigation: any,
}

const HomeScreen: React.FC<HomeScreen> = ({ navigation }) => {
    const [loading, setLoading] = useState<boolean>(false);

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { get_user } = useSelector((state: RootState) => state.user);
    const { get_date_time } = useSelector((state: RootState) => state.calender);
    const { notification } = useSelector((state: RootState) => state.calender);

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

    const userName = `${get_user[0]?.fname} ${get_user[0]?.lname}`;
    const userId = get_user[0]?.id
    const userImage =
        `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&color=7F9CF5&background=EBF4FF`
    const fetchImage = get_user ? get_user[0]?.profile_image : ''

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            await dispatch(get_User());
            await dispatch(get_Date_Time());
            await dispatch(get_notification());
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    }, [dispatch]);

    useFocusEffect(useCallback(() => {
        fetchData();
        return () => { }
    }, [fetchData, userId]))

    const TableHead = {
        header: ['Datum', 'Trainings Zeit', 'Anzeigen'],
    };

    const handleTraining = async (getdate: string) => {
        setLoading(true)
        const monthlyOverView = { first_date: getdate }
        try {
            const res: any = await dispatch(monthlyOverViewDate_Post(monthlyOverView));
            navigation.navigate('Your_Training', { response: res.payload, getDateTime: getdate })
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }

    }

    const element = (getdate: string) => (
        <TouchableOpacity onPress={() => handleTraining(getdate)} style={{ alignItems: 'center' }}>
            <Image source={require('../../Icons/search.png')} style={HomeScreenStyle.search} />
        </TouchableOpacity>
    );

    const formatDate = (dateString: string) => {
        const [year, month, day] = dateString?.split('-')
        return `${day}/${month}/${year}`;
    };

    return (
        <ImageBackground source={require('../../Images/cycle_run.png')} style={{ flex: 1 }}>
            <View style={HomeScreenStyle.container}>
                <Text style={HomeScreenStyle.mainContent}> Hauptseite </Text>

                {loading && (<Loader loading={loading} />)}

                {loading ? (
                    <ActivityIndicator size="large" color="#00aaf0" />
                ) : (
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('Profile')}>
                    <View style={HomeScreenStyle.homescreen}>
                        {fetchImage ? (
                            <Image style={HomeScreenStyle.userLogo}
                                source={{ uri: `${Image_Url}/${fetchImage}` }}
                            />
                        ) : (
                            <Image style={HomeScreenStyle.userLogo}
                                source={{ uri: userImage }}
                            />
                        )}

                        <View style={{ marginHorizontal: 12 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={HomeScreenStyle.userName}>
                                    {get_user[0]?.fname} {get_user[0]?.lname}
                                </Text>

                                <TouchableOpacity onPress={() => navigation.navigate('UserOptions')}>
                                    <Fontisto name={'player-settings'}
                                        size={22} color="#fff" style={{ marginHorizontal: 9 }}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text style={HomeScreenStyle.userEmail}> {get_user[0]?.email} </Text>
                        </View>
                    </View>
                    </TouchableWithoutFeedback>
                )}

                {date && time ? (
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('MessageNotification')}>
                        <View style={HomeScreenStyle.showDate}>
                            <View style={HomeScreenStyle.messageShow}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={HomeScreenStyle.datelable}> Datum : </Text>
                                    <Text style={HomeScreenStyle.datetext}> {date} </Text>
                                </View>

                                <View style={HomeScreenStyle.border}></View>

                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={HomeScreenStyle.datelable}> Zeit : </Text>
                                    <Text style={HomeScreenStyle.datetext}> {time} </Text>
                                </View>
                            </View>

                            <View style={HomeScreenStyle.borderBottom}></View>

                            <View style={HomeScreenStyle.messageShow}>
                                <Text style={HomeScreenStyle.datetext}>
                                    Klick Hier Zu Deinen Nachrichten
                                </Text>
                                <Image source={require('../../Icons/notification.png')}
                                    style={HomeScreenStyle.icon}
                                />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                ) : (
                    <Text style={HomeScreenStyle.maintext}> Keine Aktuelle Benachrichtigung </Text>
                )}

                <TouchableOpacity onPress={() => navigation.navigate('MonthlyOverview')}
                    style={HomeScreenStyle.date}
                >
                    <View style={HomeScreenStyle.teleCalender}>
                        <Ionicons name={'calendar-sharp'} size={25} color="#fff" />

                        <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                            <Text style={{ color: '#fff', fontSize: 18 }}>
                                Monatsübersicht
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>

                {get_date_time ? (
                    <View style={HomeScreenStyle.tablecontainer}>
                        <Row data={TableHead.header} style={HomeScreenStyle.head}
                            textStyle={HomeScreenStyle.text}
                        />
                        <ScrollView style={HomeScreenStyle.dataWrapper}>
                            {get_date_time?.map((dateTime: any, index) => (
                                <TableWrapper key={index} style={HomeScreenStyle.row}>
                                    <Cell data={formatDate(dateTime?.dates)}
                                        textStyle={HomeScreenStyle.text}
                                    />
                                    <Cell data={`${dateTime?.total_rainingstime} mins`}
                                        textStyle={HomeScreenStyle.text}
                                    />
                                    <Cell data={element(dateTime?.dates)}
                                        textStyle={HomeScreenStyle.text}
                                    />
                                </TableWrapper>
                            ))}
                        </ScrollView>
                    </View>
                ) : (
                    <Text style={HomeScreenStyle.textFormate}> Keine Daten Gefunden </Text>
                )}
            </View>
        </ImageBackground>
    )
}

export default HomeScreen