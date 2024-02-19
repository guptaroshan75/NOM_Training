// import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
// import { Image, ScrollView, Alert, Modal } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import YourTrainingStyle from '../../Css/HomeScreenStyle/YourTrainingStyle';
// import { useDispatch, useSelector } from 'react-redux';
// import { ThunkDispatch } from '@reduxjs/toolkit';
// import { RootState } from '../../Redux/Store';
// import { get_All_Excel_Data, move_Date } from '../../Redux/Features/CalenderSlice';
// import { notification_trainer_post } from '../../Redux/Features/CalenderSlice';
// import { notification_trainer } from '../../Redux/Features/CalenderSlice';
// import Loader from '../../Component/Loader';
// import DateTimePicker from 'react-native-modal-datetime-picker';
// import Toast from 'react-native-toast-message';
// import messaging from '@react-native-firebase/messaging';
// import EditTraining from './EditTraining';

// interface YourTraining {
//     closeModal: () => void;
//     selectedDate: any;
// }

// const YourTraining: React.FC<YourTraining> = ({ selectedDate, closeModal }) => {
//     const formattedDate = selectedDate && new Date(selectedDate).toLocaleDateString('en-GB', {
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric',
//     })

//     const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//     const [selectDate, setSelectDate] = useState<Date | null>(null);
//     const [editTrainingVisible, setEditTrainingVisible] = useState(false);

//     const [loading, setLoading] = useState<boolean>(false);
//     const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
//     const { get_all_excel_data } = useSelector((state: RootState) => state.calender);
//     const { notificationTrainer } = useSelector((state: RootState) => state.calender);

//     const { get_user } = useSelector((state: RootState) => state.user);
//     const trainer_Id = get_user[0]?.parents
//     const user_Id = get_user[0]?.id
//     const userName = `${get_user[0]?.fname} ${get_user[0]?.lname}`;

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 await dispatch(get_All_Excel_Data())
//                 await dispatch(notification_trainer(trainer_Id))
//                 setLoading(false);
//             } catch (error) {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, [dispatch, trainer_Id]);

//     const showDatePicker = () => {
//         setDatePickerVisibility(true);
//     };

//     const hideDatePicker = () => {
//         setDatePickerVisibility(false);
//     };

//     const handleConfirm = (date: any) => {
//         setSelectDate(date);

//         if (date) {
//             handleMoveDate(date);
//             hideDatePicker();
//         }
//     };

//     const handleMoveDate = async (date: Date) => {
//         const move_date_post = {
//             real_date: selectedDate, change_date: date.toISOString().split('T')[0],
//         }

//         setLoading(true);
//         try {
//             const response: any = await dispatch(move_Date(move_date_post))
//             const msg = response?.payload?.msg
//             if (response.payload && response.payload.status === 'success') {
//                 await dispatch(get_All_Excel_Data())
//                 Toast.show({
//                     type: 'TabsAbove',
//                     text1: 'Das Training Wurde Auf Das Ausgewählten Datum Verschoben',
//                     visibilityTime: 2000,
//                     position: "bottom"
//                 });
//             }
//             setLoading(false);
//         } catch (error) {
//             setLoading(false);
//             console.log('Registration error:', error);
//         }
//     };

//     const backEditModal = () => {
//         setEditTrainingVisible(false);
//     }

//     const handleMissOrSickPress = async (type: string) => {
//         setLoading(true);
//         const notification_post = {
//             trainer_id: trainer_Id, user_id: user_Id, user_name: userName,
//             msg: 'Trainingsdaten wurden gespeichert', title: type,
//         }

//         try {
//             await dispatch(notification_trainer_post({ notification_post, trainer_Id }))
//             Toast.show({
//                 type: 'Notify', text1: 'Notification Sent',
//                 visibilityTime: 3000, position: "bottom"
//             });
//             closeModal()
//             setLoading(false);
//         } catch (error) {
//             setLoading(false);
//         }
//     };

//     return (
//         <ImageBackground source={require('../../Images/cycle_run.png')} style={{ flex: 1 }}>
//             <View style={YourTrainingStyle.container}>
//                 <View style={YourTrainingStyle.header}>
//                     <TouchableOpacity onPress={closeModal}>
//                         <Image source={require('../../Icons/arrow.png')}
//                             style={YourTrainingStyle.back}
//                         />
//                     </TouchableOpacity>

//                     <Text style={YourTrainingStyle.mainContent}> Dein Training </Text>
//                 </View>

//                 <Text style={YourTrainingStyle.date}> Trainingsplan Für : {formattedDate} </Text>

//                 {get_all_excel_data.length > 0 ? (
//                     <>
//                         {get_all_excel_data?.every((excelData) => excelData?.dates !== selectedDate) ? (
//                             <Text style={YourTrainingStyle.datefound}> Keine Daten Gefunden </Text>
//                         ) : (
//                             <>
//                                 <View style={YourTrainingStyle.mainbtn}>
//                                     <TouchableOpacity style={YourTrainingStyle.head}
//                                         onPress={showDatePicker}
//                                     >
//                                         <Text style={YourTrainingStyle.btntext}> Move </Text>
//                                     </TouchableOpacity>

//                                     <TouchableOpacity style={YourTrainingStyle.head}
//                                         onPress={() => handleMissOrSickPress('Training Verpasst')}
//                                     >
//                                         <Text style={YourTrainingStyle.btntext}> Miss </Text>
//                                     </TouchableOpacity>

//                                     <TouchableOpacity style={YourTrainingStyle.head}
//                                         onPress={() => handleMissOrSickPress('Krank')}
//                                     >
//                                         <Text style={YourTrainingStyle.btntext}> Sick </Text>
//                                     </TouchableOpacity>

//                                     <TouchableOpacity style={{ alignSelf: 'center' }}
//                                         onPress={() => setEditTrainingVisible(true)}
//                                     >
//                                         <Image source={require('../../Icons/edit.png')}
//                                             style={YourTrainingStyle.editbtn}
//                                         />
//                                     </TouchableOpacity>
//                                 </View>

//                                 <View style={YourTrainingStyle.borderBottom}></View>
//                             </>
//                         )}
//                     </>
//                 ) : (
//                     <Text style={YourTrainingStyle.datefound}> Keine Daten Gefunden </Text>
//                 )}

//                 {loading && (<Loader loading={loading} />)}

//                 {get_all_excel_data.length > 0 && (
//                     <ScrollView>
//                         {get_all_excel_data?.map((excelData, index) => (
//                             (excelData?.dates === selectedDate && (
//                                 <View key={index}>
//                                     <View style={YourTrainingStyle.mainbox}>
//                                         <Text style={YourTrainingStyle.mainheadtext}>
//                                             {excelData?.headline}
//                                         </Text>

//                                         <View style={{ marginBottom: 4 }}>
//                                             <Text style={YourTrainingStyle.text}>
//                                                 {excelData?.trainingstime_min}
//                                             </Text>
//                                             <Text style={YourTrainingStyle.text}>
//                                                 {excelData?.pulse}
//                                             </Text>
//                                             <Text style={YourTrainingStyle.text}>
//                                                 {excelData?.cadence}
//                                             </Text>
//                                             <Text style={YourTrainingStyle.text}>
//                                                 {excelData?.power_watt}
//                                             </Text>
//                                         </View>
//                                     </View>

//                                     <View style={YourTrainingStyle.pausemain}>
//                                         <Text style={YourTrainingStyle.pausetext}> Pause </Text>
//                                         <Text style={YourTrainingStyle.pausetext}>
//                                             {excelData?.breaks || 'N/A'}
//                                         </Text>
//                                     </View>
//                                 </View>
//                             ))
//                         ))}
//                     </ScrollView>
//                 )}
//             </View>

//             <DateTimePicker isVisible={isDatePickerVisible} mode="date" date={selectDate || new Date()}
//                 onConfirm={handleConfirm} onCancel={hideDatePicker}
//             />

//             <Modal animationType="slide" transparent={false} visible={editTrainingVisible}
//                 onRequestClose={() => { setEditTrainingVisible(false) }}
//             >
//                 <EditTraining backEditModal={backEditModal} selectedDate={selectedDate} />
//             </Modal>
//         </ImageBackground>
//     )
// }

// export default YourTraining

// import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
// import { Image, ScrollView, Alert, Modal } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import YourTrainingStyle from '../../Css/HomeScreenStyle/YourTrainingStyle';
// import { useDispatch, useSelector } from 'react-redux';
// import { ThunkDispatch } from '@reduxjs/toolkit';
// import { RootState } from '../../Redux/Store';
// // import { get_All_Excel_Data, monthlyOverViewDate_Post, move_Date } from '../../Redux/Features/CalenderSlice';
// import { monthlyOverViewDate_Post, move_Date } from '../../Redux/Features/CalenderSlice';
// import { notification_trainer_post } from '../../Redux/Features/CalenderSlice';
// import { notification_trainer } from '../../Redux/Features/CalenderSlice';
// import Loader from '../../Component/Loader';
// import DateTimePicker from 'react-native-modal-datetime-picker';
// import Toast from 'react-native-toast-message';
// import messaging from '@react-native-firebase/messaging';
// import EditTraining from './EditTraining';

// interface YourTraining {
//     closeModal: () => void;
//     selectedDate: any;
//     response: any
// }

// const YourTraining: React.FC<YourTraining> = ({ selectedDate, closeModal, response }) => {
//     const formattedDate = selectedDate && new Date(selectedDate).toLocaleDateString('en-GB', {
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric',
//     })

//     const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//     const [selectDate, setSelectDate] = useState<Date | null>(null);
//     const [editTrainingVisible, setEditTrainingVisible] = useState(false);
//     const [editResponse, setEditResponse] = useState('');

//     const [loading, setLoading] = useState<boolean>(false);
//     const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
//     const { get_user } = useSelector((state: RootState) => state.user);
//     const trainer_Id = get_user[0]?.parents
//     const user_Id = get_user[0]?.id
//     const userName = `${get_user[0]?.fname} ${get_user[0]?.lname}`;

//     const handleEditData = async () => {
//         setLoading(true)
//         const monthlyOverView = { first_date: selectedDate }
//         try {
//             const response: any = await dispatch(monthlyOverViewDate_Post(monthlyOverView));
//             setEditResponse(response.payload)
//             setLoading(false)
//             setEditTrainingVisible(true)
//         } catch (error) {
//             setLoading(false)
//             return error
//         }

//     }

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 setLoading(false);
//             } catch (error) {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, [dispatch, trainer_Id]);

//     const showDatePicker = () => {
//         setDatePickerVisibility(true);
//     };

//     const hideDatePicker = () => {
//         setDatePickerVisibility(false);
//     };

//     const handleConfirm = (date: any) => {
//         setSelectDate(date);
//         if (date) {
//             handleMoveDate(date);
//             hideDatePicker();
//         }
//     };

//     const handleMoveDate = async (date: Date) => {
//         setLoading(true);
//         const move_date_post = {
//             real_date: selectedDate, change_date: date.toISOString().split('T')[0],
//         }
//         try {
//             const response: any = await dispatch(move_Date(move_date_post))
//             if (response.payload && response.payload.status === 'success') {
//                 // await dispatch(get_All_Excel_Data())
//                 Toast.show({
//                     type: 'TabsAbove',
//                     text1: 'Das Training Wurde Auf Das Ausgewählten Datum Verschoben',
//                     visibilityTime: 2000, position: "bottom"
//                 });
//             }
//             setLoading(false);
//         } catch (error) {
//             setLoading(false);
//         }
//     };

//     const backEditModal = () => {
//         setEditTrainingVisible(false);
//     }

//     const handleMissOrSickPress = async (type: string) => {
//         setLoading(true);
//         const notification_post = {
//             trainer_id: trainer_Id, user_id: user_Id, user_name: userName,
//             msg: 'Trainingsdaten wurden gespeichert', title: type,
//         }

//         try {
//             await dispatch(notification_trainer_post({ notification_post, trainer_Id }))
//             Toast.show({
//                 type: 'Notify', text1: 'Notification Sent',
//                 visibilityTime: 3000, position: "bottom"
//             });
//             closeModal()
//             setLoading(false);
//         } catch (error) {
//             setLoading(false);
//         }
//     };

//     return (
//         <ImageBackground source={require('../../Images/cycle_run.png')} style={{ flex: 1 }}>
//             <View style={YourTrainingStyle.container}>
//                 <View style={YourTrainingStyle.header}>
//                     <TouchableOpacity onPress={closeModal}>
//                         <Image source={require('../../Icons/arrow.png')}
//                             style={YourTrainingStyle.back}
//                         />
//                     </TouchableOpacity>

//                     <Text style={YourTrainingStyle.mainContent}> Dein Training </Text>
//                 </View>

//                 <Text style={YourTrainingStyle.date}> Trainingsplan Für : {formattedDate} </Text>

//                 {response?.data ? (
//                     <>
//                         <View style={YourTrainingStyle.mainbtn}>
//                             <TouchableOpacity style={YourTrainingStyle.head}
//                                 onPress={showDatePicker}
//                             >
//                                 <Text style={YourTrainingStyle.btntext}> Move </Text>
//                             </TouchableOpacity>

//                             <TouchableOpacity style={YourTrainingStyle.head}
//                                 onPress={() => handleMissOrSickPress('Training Verpasst')}
//                             >
//                                 <Text style={YourTrainingStyle.btntext}> Miss </Text>
//                             </TouchableOpacity>

//                             <TouchableOpacity style={YourTrainingStyle.head}
//                                 onPress={() => handleMissOrSickPress('Krank')}
//                             >
//                                 <Text style={YourTrainingStyle.btntext}> Sick </Text>
//                             </TouchableOpacity>

//                             <TouchableOpacity style={{ alignSelf: 'center' }}
//                                 onPress={handleEditData}
//                             >
//                                 <Image source={require('../../Icons/edit.png')}
//                                     style={YourTrainingStyle.editbtn}
//                                 />
//                             </TouchableOpacity>
//                         </View>

//                         <View style={YourTrainingStyle.borderBottom}></View>
//                     </>
//                 ) : (
//                     <Text style={YourTrainingStyle.datefound}> Keine Daten Gefunden </Text>
//                 )}

//                 {loading && (<Loader loading={loading} />)}

//                 <ScrollView>
//                     {response?.data?.map((data: any, index: any) => (
//                         <View key={index}>
//                             <View style={YourTrainingStyle.mainbox}>
//                                 <Text style={YourTrainingStyle.mainheadtext}>
//                                     {data?.headline}
//                                 </Text>

//                                 <View style={{ marginBottom: 4 }}>
//                                     <Text style={YourTrainingStyle.text}>
//                                         {data?.trainingstime_min}
//                                     </Text>
//                                     <Text style={YourTrainingStyle.text}>
//                                         {data?.pulse}
//                                     </Text>
//                                     <Text style={YourTrainingStyle.text}>
//                                         {data?.cadence}
//                                     </Text>
//                                     <Text style={YourTrainingStyle.text}>
//                                         {data?.power_watt}
//                                     </Text>
//                                 </View>
//                             </View>

//                             <View style={YourTrainingStyle.pausemain}>
//                                 <Text style={YourTrainingStyle.pausetext}> Pause </Text>
//                                 <Text style={YourTrainingStyle.pausetext}>
//                                     {data?.breaks || 'N/A'}
//                                 </Text>
//                             </View>
//                         </View>
//                     ))}
//                 </ScrollView>
//             </View>

//             <DateTimePicker isVisible={isDatePickerVisible} date={selectDate || new Date()}
//                 onConfirm={handleConfirm} onCancel={hideDatePicker}  mode="date"
//             />

//             <Modal animationType="slide" transparent={false} visible={editTrainingVisible}
//                 onRequestClose={() => { setEditTrainingVisible(false) }}
//             >
//                 <EditTraining backEditModal={backEditModal} selectedDate={selectedDate}
//                     response={editResponse}
//                 />
//             </Modal>
//         </ImageBackground>
//     )
// }

// export default YourTraining


import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import { Image, ScrollView, Alert, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import YourTrainingStyle from '../../Css/HomeScreenStyle/YourTrainingStyle';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { RootState } from '../../Redux/Store';
import { monthlyOverViewDate_Post, move_Date } from '../../Redux/Features/CalenderSlice';
import { notification_trainer_post } from '../../Redux/Features/CalenderSlice';
import Loader from '../../Component/Loader';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Toast from 'react-native-toast-message';
import EditTraining from './EditTraining';
import { get_User } from '../../Redux/Features/UserSlice';

interface YourTraining {
    route: any,
    navigation: any
}

const YourTraining: React.FC<YourTraining> = ({ route, navigation }) => {
    const { response, getDateTime } = route.params    
    const formattedDate = getDateTime && new Date(getDateTime).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
    })

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectDate, setSelectDate] = useState<Date | null>(null);
    const [dataMoved, setDataMoved] = useState<boolean>(false);

    const [loading, setLoading] = useState<boolean>(false);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { get_user } = useSelector((state: RootState) => state.user);
    const trainer_Id = get_user[0]?.parents
    const user_Id = get_user[0]?.id
    const userName = `${get_user[0]?.fname} ${get_user[0]?.lname}`;

    const handleEditData = async () => {
        setLoading(true)
        const monthlyOverView = { first_date: getDateTime }
        try {
            const res: any = await dispatch(monthlyOverViewDate_Post(monthlyOverView));
            navigation.navigate('EditTraining', { response: res.payload, selectDate: getDateTime })
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                setLoading(false);
                await dispatch(get_User());
            } catch (error) {
                setLoading(false);
            }
        };
        fetchData();
    }, [dispatch, trainer_Id, get_User]);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date: any) => {
        setSelectDate(date);
        if (date) {
            handleMoveDate(date);
            hideDatePicker();
        }
    };

    const handleMoveDate = async (date: Date) => {
        setLoading(true);
        const move_date_post = {
            real_date: getDateTime, change_date: date.toISOString().split('T')[0],
        }
        try {
            const response: any = await dispatch(move_Date(move_date_post))
            if (response.payload && response.payload.status === 'success') {
                setDataMoved(true);
                Toast.show({
                    type: 'TabsAbove',
                    text1: 'Das Training Wurde Auf Das Ausgewählten Datum Verschoben',
                    visibilityTime: 2000, position: "bottom"
                });
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const handleMissOrSickPress = async (type: string) => {
        setLoading(true);
        const notification_post = {
            trainer_id: trainer_Id, user_id: user_Id, user_name: userName,
            msg: 'Trainingsdaten wurden gespeichert', title: type,
        }

        try {
            await dispatch(notification_trainer_post({ notification_post, trainer_Id }))
            Toast.show({
                type: 'Toast', text1: 'Notification Sent',
                visibilityTime: 3000, position: "bottom"
            });
            // closeModal()
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <ImageBackground source={require('../../Images/cycle_run.png')} style={{ flex: 1 }}>
            <View style={YourTrainingStyle.container}>
                <View style={YourTrainingStyle.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../Icons/arrow.png')}
                            style={YourTrainingStyle.back}
                        />
                    </TouchableOpacity>

                    <Text style={YourTrainingStyle.mainContent}> Dein Training </Text>
                </View>

                <Text style={YourTrainingStyle.date}> Trainingsplan Für : {formattedDate} </Text>

                {response?.data && !dataMoved ? (
                    <>
                        <View style={YourTrainingStyle.mainbtn}>
                            <TouchableOpacity style={YourTrainingStyle.head}
                                onPress={showDatePicker}
                            >
                                <Text style={YourTrainingStyle.btntext}> Move </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={YourTrainingStyle.head}
                                onPress={() => handleMissOrSickPress('Training Verpasst')}
                            >
                                <Text style={YourTrainingStyle.btntext}> Miss </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={YourTrainingStyle.head}
                                onPress={() => handleMissOrSickPress('Krank')}
                            >
                                <Text style={YourTrainingStyle.btntext}> Sick </Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ alignSelf: 'center' }}
                                onPress={handleEditData}
                            >
                                <Image source={require('../../Icons/edit.png')}
                                    style={YourTrainingStyle.editbtn}
                                />
                            </TouchableOpacity>
                        </View>

                        <View style={YourTrainingStyle.borderBottom}></View>
                    </>
                ) : (
                    <Text style={YourTrainingStyle.datefound}> Keine Daten Gefunden </Text>
                )}

                {loading && (<Loader loading={loading} />)}

                <ScrollView>
                    {response?.data?.map((data: any, index: any) => (
                        <View key={index}>
                            <View style={YourTrainingStyle.mainbox}>
                                <Text style={YourTrainingStyle.mainheadtext}>
                                    {data?.headline}
                                </Text>

                                <View style={{ marginBottom: 4 }}>
                                    <Text style={YourTrainingStyle.text}>
                                        {data?.trainingstime_min}
                                    </Text>
                                    <Text style={YourTrainingStyle.text}>
                                        {data?.pulse}
                                    </Text>
                                    <Text style={YourTrainingStyle.text}>
                                        {data?.cadence}
                                    </Text>
                                    <Text style={YourTrainingStyle.text}>
                                        {data?.power_watt}
                                    </Text>
                                </View>
                            </View>

                            <View style={YourTrainingStyle.pausemain}>
                                <Text style={YourTrainingStyle.pausetext}> Pause </Text>
                                <Text style={YourTrainingStyle.pausetext}>
                                    {data?.breaks || 'N/A'}
                                </Text>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>

            <DateTimePicker isVisible={isDatePickerVisible} date={selectDate || new Date()}
                onConfirm={handleConfirm} onCancel={hideDatePicker} mode="date"
            />

            {dataMoved && (
                <Text style={YourTrainingStyle.datefound}> Keine Daten Gefunden </Text>
            )}
        </ImageBackground>
    )
}

export default YourTraining


// import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
// import { Image, ScrollView, Alert, Modal } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import YourTrainingStyle from '../../Css/HomeScreenStyle/YourTrainingStyle';
// import { useDispatch, useSelector } from 'react-redux';
// import { ThunkDispatch } from '@reduxjs/toolkit';
// import { RootState } from '../../Redux/Store';
// import { monthlyOverViewDate_Post, move_Date } from '../../Redux/Features/CalenderSlice';
// import { notification_trainer_post } from '../../Redux/Features/CalenderSlice';
// import Loader from '../../Component/Loader';
// import DateTimePicker from 'react-native-modal-datetime-picker';
// import Toast from 'react-native-toast-message';
// import EditTraining from './EditTraining';
// import { get_User } from '../../Redux/Features/UserSlice';

// interface YourTraining {
//     route: any,
//     navigation: any
// }

// const YourTraining: React.FC<YourTraining> = ({ route, navigation }) => {
//     const { response, getDateTime } = route.params    
//     const formattedDate = getDateTime && new Date(getDateTime).toLocaleDateString('en-GB', {
//         day: '2-digit',
//         month: 'short',
//         year: 'numeric',
//     })

//     const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
//     const [selectDate, setSelectDate] = useState<Date | null>(null);
//     const [editTrainingVisible, setEditTrainingVisible] = useState(false);
//     const [editResponse, setEditResponse] = useState('');
//     const [dataMoved, setDataMoved] = useState<boolean>(false);

//     const [loading, setLoading] = useState<boolean>(false);
//     const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
//     const { get_user } = useSelector((state: RootState) => state.user);
//     const trainer_Id = get_user[0]?.parents
//     const user_Id = get_user[0]?.id
//     const userName = `${get_user[0]?.fname} ${get_user[0]?.lname}`;

//     const handleEditData = async () => {
//         setLoading(true)
//         const monthlyOverView = { first_date: getDateTime }
//         try {
//             const res: any = await dispatch(monthlyOverViewDate_Post(monthlyOverView));
//             navigation.navigate('EditTraining', { response: res.payload, selectDate: getDateTime })
//             // setEditResponse(response.payload)
//             setLoading(false)
//             // setEditTrainingVisible(true)
//         } catch (error) {
//             setLoading(false)
//             // return error
//         }

//     }

//     useEffect(() => {
//         const fetchData = async () => {
//             setLoading(true);
//             try {
//                 setLoading(false);
//                 await dispatch(get_User());
//             } catch (error) {
//                 setLoading(false);
//             }
//         };
//         fetchData();
//     }, [dispatch, trainer_Id, get_User]);

//     const showDatePicker = () => {
//         setDatePickerVisibility(true);
//     };

//     const hideDatePicker = () => {
//         setDatePickerVisibility(false);
//     };

//     const handleConfirm = (date: any) => {
//         setSelectDate(date);
//         if (date) {
//             handleMoveDate(date);
//             hideDatePicker();
//         }
//     };

//     const handleMoveDate = async (date: Date) => {
//         setLoading(true);
//         const move_date_post = {
//             real_date: getDateTime, change_date: date.toISOString().split('T')[0],
//         }
//         try {
//             const response: any = await dispatch(move_Date(move_date_post))
//             if (response.payload && response.payload.status === 'success') {
//                 setDataMoved(true);
//                 Toast.show({
//                     type: 'TabsAbove',
//                     text1: 'Das Training Wurde Auf Das Ausgewählten Datum Verschoben',
//                     visibilityTime: 2000, position: "bottom"
//                 });
//             }
//             setLoading(false);
//         } catch (error) {
//             setLoading(false);
//         }
//     };

//     const backEditModal = () => {
//         setEditTrainingVisible(false);
//     }

//     const handleMissOrSickPress = async (type: string) => {
//         setLoading(true);
//         const notification_post = {
//             trainer_id: trainer_Id, user_id: user_Id, user_name: userName,
//             msg: 'Trainingsdaten wurden gespeichert', title: type,
//         }

//         try {
//             await dispatch(notification_trainer_post({ notification_post, trainer_Id }))
//             Toast.show({
//                 type: 'Toast', text1: 'Notification Sent',
//                 visibilityTime: 3000, position: "bottom"
//             });
//             // closeModal()
//             setLoading(false);
//         } catch (error) {
//             setLoading(false);
//         }
//     };

//     return (
//         <ImageBackground source={require('../../Images/cycle_run.png')} style={{ flex: 1 }}>
//             <View style={YourTrainingStyle.container}>
//                 <View style={YourTrainingStyle.header}>
//                     <TouchableOpacity onPress={() => navigation.goBack()}>
//                         <Image source={require('../../Icons/arrow.png')}
//                             style={YourTrainingStyle.back}
//                         />
//                     </TouchableOpacity>

//                     <Text style={YourTrainingStyle.mainContent}> Dein Training </Text>
//                 </View>

//                 <Text style={YourTrainingStyle.date}> Trainingsplan Für : {formattedDate} </Text>

//                 {response?.data && !dataMoved ? (
//                     <>
//                         <View style={YourTrainingStyle.mainbtn}>
//                             <TouchableOpacity style={YourTrainingStyle.head}
//                                 onPress={showDatePicker}
//                             >
//                                 <Text style={YourTrainingStyle.btntext}> Move </Text>
//                             </TouchableOpacity>

//                             <TouchableOpacity style={YourTrainingStyle.head}
//                                 onPress={() => handleMissOrSickPress('Training Verpasst')}
//                             >
//                                 <Text style={YourTrainingStyle.btntext}> Miss </Text>
//                             </TouchableOpacity>

//                             <TouchableOpacity style={YourTrainingStyle.head}
//                                 onPress={() => handleMissOrSickPress('Krank')}
//                             >
//                                 <Text style={YourTrainingStyle.btntext}> Sick </Text>
//                             </TouchableOpacity>

//                             <TouchableOpacity style={{ alignSelf: 'center' }}
//                                 onPress={handleEditData}
//                             >
//                                 <Image source={require('../../Icons/edit.png')}
//                                     style={YourTrainingStyle.editbtn}
//                                 />
//                             </TouchableOpacity>
//                         </View>

//                         <View style={YourTrainingStyle.borderBottom}></View>
//                     </>
//                 ) : (
//                     <Text style={YourTrainingStyle.datefound}> Keine Daten Gefunden </Text>
//                 )}

//                 {loading && (<Loader loading={loading} />)}

//                 <ScrollView>
//                     {response?.data?.map((data: any, index: any) => (
//                         <View key={index}>
//                             <View style={YourTrainingStyle.mainbox}>
//                                 <Text style={YourTrainingStyle.mainheadtext}>
//                                     {data?.headline}
//                                 </Text>

//                                 <View style={{ marginBottom: 4 }}>
//                                     <Text style={YourTrainingStyle.text}>
//                                         {data?.trainingstime_min}
//                                     </Text>
//                                     <Text style={YourTrainingStyle.text}>
//                                         {data?.pulse}
//                                     </Text>
//                                     <Text style={YourTrainingStyle.text}>
//                                         {data?.cadence}
//                                     </Text>
//                                     <Text style={YourTrainingStyle.text}>
//                                         {data?.power_watt}
//                                     </Text>
//                                 </View>
//                             </View>

//                             <View style={YourTrainingStyle.pausemain}>
//                                 <Text style={YourTrainingStyle.pausetext}> Pause </Text>
//                                 <Text style={YourTrainingStyle.pausetext}>
//                                     {data?.breaks || 'N/A'}
//                                 </Text>
//                             </View>
//                         </View>
//                     ))}
//                 </ScrollView>
//             </View>

//             <DateTimePicker isVisible={isDatePickerVisible} date={selectDate || new Date()}
//                 onConfirm={handleConfirm} onCancel={hideDatePicker} mode="date"
//             />

//             {/* <Modal animationType="slide" transparent={false} visible={editTrainingVisible}
//                 onRequestClose={() => { setEditTrainingVisible(false) }}
//             >
//                 <EditTraining backEditModal={backEditModal} selectedDate={getDateTime}
//                     response={editResponse}
//                 />
//             </Modal> */}

//             {dataMoved && (
//                 <Text style={YourTrainingStyle.datefound}> Keine Daten Gefunden </Text>
//             )}
//         </ImageBackground>
//     )
// }

// export default YourTraining