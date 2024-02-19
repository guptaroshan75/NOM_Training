// import React, { useEffect, useState } from 'react';
// import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
// import { TextInput, ScrollView, Image } from 'react-native';
// import EditTrainingStyle from '../../Css/HomeScreenStyle/EditTrainingStyle';
// import CustomeEditText from '../../Component/CustomeEditText';
// import { responsiveHeight } from 'react-native-responsive-dimensions';
// import { Update_Rating } from '../../Redux/Features/CalenderSlice';
// import { useDispatch } from 'react-redux';
// import Toast from 'react-native-toast-message';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
// import { ThunkDispatch } from '@reduxjs/toolkit';
// import Loader from '../../Component/Loader';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// interface EditTraining {
//     backEditModal: () => void;
//     selectedDate: any;
//     response: any;
// }

// const EditTraining: React.FC<EditTraining> = ({ backEditModal, selectedDate, response }) => {
//     const [performance, setPerformance] = useState<{ [key: string]: string }>({});
//     const [maxHR, setMaxHR] = useState<{ [key: string]: string }>({});
//     const [hf, setHf] = useState<{ [key: string]: string }>({});
//     const [cadence, setCadence] = useState<{ [key: string]: string }>({});
//     const [intervalTime, setIntervalTime] = useState<{ [key: string]: string }>({});
//     const [totalpauseTime, setTotalPauseTime] = useState<{ [key: string]: string }>({});
//     const [loading, setLoading] = useState<boolean>(false);
//     const [selectedEmojis, setSelectedEmojis] = useState(null);
// const [weight, setWeight] = useState<string>('')
// const [totalTime, setTotalTime] = useState<string>('')
// const [remark, setRemark] = useState<string>('')
//     const [emojiColor, setEmojiColor] = useState<string>('')


// const handleWeight = () => {
//     setWeight(response?.msg[0].a_weight.trim());
// }

// const handleTotalTime = () => {
//     setTotalTime(response?.msg[0].a_trainingstime.trim());
// }

// const handleComment = () => {
//     setRemark(response?.msg[0].a_comment.trim());
// }

// useEffect(() => {
//     handleComment()
//     handleTotalTime()
//     handleWeight()
// }, []);

//     const handleEmojiPress = (id: any, rating: string) => {
//         setSelectedEmojis(id === selectedEmojis ? null : id);
//         setEmojiColor(getEmojiColor(rating));
//     };

//     const getEmojiColor = (rating: string) => {
//         switch (rating) {
//             case '1.0':
//                 return '#0b780d';
//             case '2.0':
//                 return '#30c732a1';
//             case '3.0':
//                 return '#c99204';
//             case '4.0':
//                 return '#bf2a2a';
//             case '5.0':
//                 return '#e80505';
//             default:
//                 return '#fff'; 
//         }
//     };

//     useEffect(() => {
//         if (response && response.data) {
//             const initialData: { [key: string]: string } = {};
//             response.data.forEach((data: any) => {
//                 initialData[data.id] = '';
//             });
//             setPerformance(initialData); setMaxHR(initialData); setTotalPauseTime(initialData);
//             setHf(initialData); setCadence(initialData); setIntervalTime(initialData);
//         }
//     }, [response]);

//     const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

//     const handleChange = (field: string, id: string, value: string) => {
//         switch (field) {
//             case 'performance':
//                 setPerformance({ ...performance, [id]: value });
//                 break;
//             case 'maxHR':
//                 setMaxHR({ ...maxHR, [id]: value });
//                 break;
//             case 'hf':
//                 setHf({ ...hf, [id]: value });
//                 break;
//             case 'cadence':
//                 setCadence({ ...cadence, [id]: value });
//                 break;
//             case 'intervalTime':
//                 setIntervalTime({ ...intervalTime, [id]: value });
//                 break;
//             case 'totalpauseTime':
//                 setTotalPauseTime({ ...totalpauseTime, [id]: value });
//                 break;
//             default:
//                 break;
//         }
//     };

//     const handleUpdateExcel = async () => {
//         setLoading(true);
//         const update_rating = {
//             comment: remark, Weight: weight, Trainings_time_min: totalTime, date: selectedDate,
//             data: Object.keys(performance).map((id) => ({
//                 row_id: id,
//                 power_watt: performance[id] || response?.data.find((data: any) => data.id === id)?.a_power_watt,
//                 max_plus: maxHR[id] || response?.data.find((data: any) => data.id === id)?.a_max_plus,
//                 average_power: hf[id] || response?.data.find((data: any) => data.id === id)?.a_average_power,
//                 cadence: cadence[id] || response?.data.find((data: any) => data.id === id)?.a_candence,
//                 time_min: intervalTime[id] || response?.data.find((data: any) => data.id === id)?.a_trainings_time_min,
//                 breaks: totalpauseTime[id] || response?.data.find((data: any) => data.id === id)?.a_breaks,
//                 rating: 'dd'
//             }))
//         };
//         try {
//             const res = await dispatch(Update_Rating(update_rating));
//             if (res?.payload && res?.payload?.status === 'success') {
//                 Toast.show({
//                     type: 'Toast', text1: 'Race Updated Successfully',
//                     visibilityTime: 8000, position: "bottom"
//                 });
//             }
//             backEditModal()
//             setLoading(false);
//         } catch (error) {
//             setLoading(false);
//         }
//     };

//     return (
//         <ImageBackground source={require('../../Images/cycle_run.png')} style={{ flex: 1 }}>
//             <View style={EditTrainingStyle.container}>
//                 {loading && (<Loader loading={loading} />)}

//                 <View style={EditTrainingStyle.header}>
//                     <View style={{ alignItems: 'center', flexDirection: 'row' }}>
//                         <TouchableOpacity onPress={backEditModal}>
//                             <Image source={require('../../Icons/arrow.png')}
//                                 style={EditTrainingStyle.back}
//                             />
//                         </TouchableOpacity>
//                         <Text style={EditTrainingStyle.mainContent}> Training Bearbeiten </Text>
//                     </View>

//                     <TouchableOpacity style={{ alignItems: 'center' }} onPress={handleUpdateExcel}>
//                         <Icon name="update" size={30} color="#fff" />
//                         <Text style={EditTrainingStyle.btntext}> Update </Text>
//                     </TouchableOpacity>
//                 </View>

//                 <ScrollView style={{ marginBottom: responsiveHeight(2.8) }}>
// <View style={EditTrainingStyle.mainpage}>
//     <CustomeEditText placeholder={weight ? weight : 'Gewicht'}
//         lable={'Gewicht(kg) :'} value={weight}
//         onChangeText={(weight) => setWeight(weight)}
//     />

//     <CustomeEditText placeholder={totalTime ? totalTime : 'Trainingszeit Total'}
//         lable={'Trainingszeit Total :'} value={totalTime}
//         onChangeText={(totalTime) => setTotalTime(totalTime)}
//     />

//     <CustomeEditText placeholder={remark ? remark : 'Comment'}
//         lable={'Bemerkung :'} value={remark}
//         onChangeText={(remark) => setRemark(remark)}
//     />
// </View>

//                     {response?.data?.map((data: any) => (
//                         <View style={{ marginTop: responsiveHeight(2.8) }} key={data.id}>
//                             <View style={EditTrainingStyle.borderBottom}></View>

// <View style={EditTrainingStyle.mainpage}>
//     <Text style={EditTrainingStyle.mainheadtext}> {data?.headline} </Text>

//     <CustomeEditText placeholder={data?.a_power_watt || data?.power_watt}
//         value={performance[data.id]} lable={'Leistung Ø :'}
//         onChangeText={(performanceValue) =>
//             handleChange('performance', data.id, performanceValue)
//         }
//     />

//     <CustomeEditText placeholder={data?.a_max_plus || data?.pulse}
//         value={maxHR[data.id]} onChangeText={(maxHRValue) =>
//             handleChange('maxHR', data.id, maxHRValue)
//         } lable={'Max. HF :'}
//     />

//     <CustomeEditText placeholder={data?.a_average_power}
//         value={hf[data.id]} lable={'Ø Hf :'} onChangeText={(hfValue) =>
//             handleChange('hf', data.id, hfValue)
//         }
//     />

//     <CustomeEditText placeholder={data?.a_candence || data?.cadence}
//         lable={'Trittfrequenz :'} value={cadence[data.id]}
//         onChangeText={(cadenceValue) =>
//             handleChange('cadence', data.id, cadenceValue)
//         }
//     />

//     <CustomeEditText placeholder={data?.a_trainings_time_min ||
//         data?.trainingstime_min}
//         lable={'Intervallzeit :'} value={intervalTime[data.id]}
//         onChangeText={(intervalTimeValue) =>
//             handleChange('intervalTime', data.id, intervalTimeValue)
//         }
//     />
// </View>

//                             <View style={EditTrainingStyle.emojiContainer}>
//                                 <TouchableOpacity onPress={() => handleEmojiPress(data.id, data.a_rating)}>
//                                     <MaterialCommunityIcons size={45} style={{ marginRight: 5 }}
//                                         name={'emoticon-excited-outline'}
//                                         color={selectedEmojis === data.id ? getEmojiColor(data.a_rating) : '#fff'}
//                                     />
//                                 </TouchableOpacity>

//                                 <TouchableOpacity onPress={() => handleEmojiPress(data.id, data.a_rating)}>
//                                     <MaterialCommunityIcons size={45} name={'emoticon-happy-outline'}
//                                         style={{ marginRight: 5 }} 
//                                         color={selectedEmojis === data.id ? getEmojiColor(data.a_rating) : '#fff'}
//                                     />
//                                 </TouchableOpacity>

//                                 <TouchableOpacity onPress={() => handleEmojiPress(data.id, data.a_rating)}>
//                                     <MaterialCommunityIcons size={45} name={'emoticon-neutral-outline'}
//                                         style={{ marginRight: 5 }} 
//                                         color={selectedEmojis === data.id ? getEmojiColor(data.a_rating) : '#fff'}
//                                     />
//                                 </TouchableOpacity>

//                                 <TouchableOpacity onPress={() => handleEmojiPress(data.id, data.a_rating)}>
//                                     <MaterialCommunityIcons size={45} name={'emoticon-sad-outline'}
//                                     color={selectedEmojis === data.id ? getEmojiColor(data.a_rating) : '#fff'}
//                                         style={{ marginRight: 5 }} 
//                                     />
//                                 </TouchableOpacity>

//                                 <TouchableOpacity onPress={() => handleEmojiPress(data.id, data.a_rating)}>
//                                     <MaterialCommunityIcons size={45} name={'emoticon-angry-outline'}
//                                     color={selectedEmojis === data.id ? getEmojiColor(data.a_rating) : '#fff'}
//                                         style={{ marginRight: 5 }} 
//                                     />
//                                 </TouchableOpacity>
//                             </View>

// <View style={EditTrainingStyle.mainpause}>
//     <View style={EditTrainingStyle.maininputView}>
//         <Text style={EditTrainingStyle.lable}>Pause</Text>
//         <TextInput style={EditTrainingStyle.inputText} textAlign='center'
//             autoCapitalize='none' value={totalpauseTime[data.id]}
//             placeholder={data?.a_breaks || data?.a_breaks}
//             onChangeText={(totalpauseTimeValue) =>
//                 handleChange('totalpauseTime',
//                     data.id, totalpauseTimeValue)
//             } autoCorrect={false}
//             cursorColor='#3154e0' placeholderTextColor="#ffffffa1"
//         />
//     </View>
// </View>
//                         </View>
//                     ))}
//                 </ScrollView>
//             </View>
//         </ImageBackground>
//     );
// }

// export default EditTraining;

import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground } from 'react-native';
import { TouchableOpacity, TextInput, ScrollView, Image } from 'react-native';
import EditTrainingStyle from '../../Css/HomeScreenStyle/EditTrainingStyle';
import CustomeEditText from '../../Component/CustomeEditText';
import { responsiveHeight } from 'react-native-responsive-dimensions';
import { Update_Rating, notification_trainer_post } from '../../Redux/Features/CalenderSlice';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { ThunkDispatch } from '@reduxjs/toolkit';
import Loader from '../../Component/Loader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { RootState } from '../../Redux/Store';

interface EditTraining {
    route: any,
    navigation: any
}

const EditTraining: React.FC<EditTraining> = ({ route, navigation }) => {
    const { response, selectDate } = route.params    

    const [performance, setPerformance] = useState<{ [key: string]: string }>({});
    const [maxHR, setMaxHR] = useState<{ [key: string]: string }>({});
    const [hf, setHf] = useState<{ [key: string]: string }>({});
    const [cadence, setCadence] = useState<{ [key: string]: string }>({});
    const [intervalTime, setIntervalTime] = useState<{ [key: string]: string }>({});
    const [totalpauseTime, setTotalPauseTime] = useState<{ [key: string]: string }>({});
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedEmojis, setSelectedEmojis] = useState<{ [key: string]: string | null }>({});
    const [weight, setWeight] = useState<string>('')
    const [totalTime, setTotalTime] = useState<string>('')
    const [remark, setRemark] = useState<string>('')

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { get_user } = useSelector((state: RootState) => state.user);
    const trainer_Id = get_user[0]?.parents
    const user_Id = get_user[0]?.id
    const userName = `${get_user[0]?.fname} ${get_user[0]?.lname}`;

    useEffect(() => {
        if (response && response.data) {
            const initialData: { [key: string]: string } = {};
            const initialSelectedEmojis: { [key: string]: string | null } = {};
            response.data.forEach((data: any) => {
                initialData[data.id] = '';
                initialSelectedEmojis[data.id] = data.a_rating;
            });
            setPerformance(initialData); setMaxHR(initialData); setTotalPauseTime(initialData);
            setHf(initialData); setCadence(initialData); setIntervalTime(initialData);
            setSelectedEmojis(initialSelectedEmojis);
        }
    }, [response]);

    const handleChange = (field: string, id: string, value: string) => {
        switch (field) {
            case 'performance':
                setPerformance({ ...performance, [id]: value });
                break;
            case 'maxHR':
                setMaxHR({ ...maxHR, [id]: value });
                break;
            case 'hf':
                setHf({ ...hf, [id]: value });
                break;
            case 'cadence':
                setCadence({ ...cadence, [id]: value });
                break;
            case 'intervalTime':
                setIntervalTime({ ...intervalTime, [id]: value });
                break;
            case 'totalpauseTime':
                setTotalPauseTime({ ...totalpauseTime, [id]: value });
                break;
            default:
                break;
        }
    };

    const handleMissOrSickPress = async (type: string) => {
        const notification_post = {
            trainer_id: trainer_Id, user_id: user_Id, user_name: userName,
            msg: 'Trainingsdaten wurden gespeichert', title: type,
        }
        try {
            await dispatch(notification_trainer_post({ notification_post, trainer_Id }))
        } catch (error) {
            setLoading(false);
        }
    };

    const handleUpdateExcel = async () => {
        setLoading(true);
        const update_rating = {
            comment: remark || response?.msg[0].a_comment.trim(),
            Weight: weight || response?.msg[0].a_weight.trim(),
            Trainings_time_min: totalTime || response?.msg[0].a_trainingstime.trim(),
            date: selectDate,
            data: Object.keys(performance).map((id) => ({
                row_id: id,
                power_watt: performance[id] || response?.data.find((data: any) => data.id === id)?.a_power_watt,
                max_plus: maxHR[id] || response?.data.find((data: any) => data.id === id)?.a_max_plus,
                average_power: hf[id] || response?.data.find((data: any) => data.id === id)?.a_average_power,
                cadence: cadence[id] || response?.data.find((data: any) => data.id === id)?.a_candence,
                time_min: intervalTime[id] || response?.data.find((data: any) => data.id === id)?.a_trainings_time_min,
                breaks: totalpauseTime[id] || response?.data.find((data: any) => data.id === id)?.a_breaks,
                rating: selectedEmojis[id] || response?.data.find((data: any) => data.id === id)?.a_rating
            }))
        };
        try {
            const res = await dispatch(Update_Rating(update_rating));
            if (res?.payload && res?.payload?.status === 'success') {
                Toast.show({
                    type: 'Toast', text1: 'Daten Speichern',
                    visibilityTime: 3000, position: "bottom"
                });
            }
            handleMissOrSickPress('Daten speichern')
            navigation.goBack()
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    return (
        <ImageBackground source={require('../../Images/cycle_run.png')} style={{ flex: 1 }}>
            <View style={EditTrainingStyle.container}>
                {loading && (<Loader loading={loading} />)}

                <View style={EditTrainingStyle.header}>
                    <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Image source={require('../../Icons/arrow.png')}
                                style={EditTrainingStyle.back}
                            />
                        </TouchableOpacity>
                        <Text style={EditTrainingStyle.mainContent}> Training Bearbeiten </Text>
                    </View>

                    <TouchableOpacity style={{ alignItems: 'center' }} onPress={handleUpdateExcel}>
                        <Icon name="update" size={25} color="#fff" />
                        <Text style={EditTrainingStyle.btntext}> Update </Text>
                    </TouchableOpacity>
                </View>

                <ScrollView style={{ marginBottom: responsiveHeight(2.8) }}>
                    <View style={EditTrainingStyle.mainpage}>
                        <CustomeEditText placeholder={response?.msg[0].a_weight.trim() || 'Gewicht'}
                            lable={'Gewicht(kg) :'} value={weight}
                            onChangeText={(weight) => setWeight(weight)}
                        />

                        <CustomeEditText placeholder={response?.msg[0].a_trainingstime.trim() || 'Trainingszeit Total'}
                            lable={'Trainingszeit Total :'} value={totalTime}
                            onChangeText={(totalTime) => setTotalTime(totalTime)}
                        />

                        <CustomeEditText placeholder={response?.msg[0].a_comment.trim() || 'Comment'}
                            lable={'Bemerkung :'} value={remark}
                            onChangeText={(remark) => setRemark(remark)}
                        />
                    </View>

                    {response?.data?.map((data: any) => (
                        <View style={{ marginTop: responsiveHeight(2.8) }} key={data.id}>
                            <View style={EditTrainingStyle.borderBottom}></View>

                            <View style={EditTrainingStyle.mainpage}>
                                <Text style={EditTrainingStyle.mainheadtext}> {data?.headline} </Text>

                                <CustomeEditText placeholder={data?.a_power_watt || data?.power_watt}
                                    value={performance[data.id]} lable={'Leistung Ø :'}
                                    onChangeText={(performanceValue) =>
                                        handleChange('performance', data.id, performanceValue)
                                    }
                                />

                                <CustomeEditText placeholder={data?.a_max_plus || data?.pulse}
                                    value={maxHR[data.id]} onChangeText={(maxHRValue) =>
                                        handleChange('maxHR', data.id, maxHRValue)
                                    } lable={'Max. HF :'}
                                />

                                <CustomeEditText placeholder={data?.a_average_power}
                                    value={hf[data.id]} lable={'Ø Hf :'} onChangeText={(hfValue) =>
                                        handleChange('hf', data.id, hfValue)
                                    }
                                />

                                <CustomeEditText placeholder={data?.a_candence || data?.cadence}
                                    lable={'Trittfrequenz :'} value={cadence[data.id]}
                                    onChangeText={(cadenceValue) =>
                                        handleChange('cadence', data.id, cadenceValue)
                                    }
                                />

                                <CustomeEditText placeholder={data?.a_trainings_time_min ||
                                    data?.trainingstime_min}
                                    lable={'Intervallzeit :'} value={intervalTime[data.id]}
                                    onChangeText={(intervalTimeValue) =>
                                        handleChange('intervalTime', data.id, intervalTimeValue)
                                    }
                                />
                            </View>

                            <View style={EditTrainingStyle.emojiContainer}>
                                <TouchableOpacity onPress={() => setSelectedEmojis({ ...selectedEmojis, [data.id]: '1.0' })}>
                                    <MaterialCommunityIcons size={45} style={{ marginRight: 5 }}
                                        name={'emoticon-excited-outline'}
                                        color={selectedEmojis[data.id] === '1.0' ? '#0b780d' : '#fff'}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setSelectedEmojis({ ...selectedEmojis, [data.id]: '2.0' })}>
                                    <MaterialCommunityIcons size={45} name={'emoticon-happy-outline'}
                                        style={{ marginRight: 5 }} color={selectedEmojis[data.id] === '2.0' ? '#30c732a1' : '#fff'}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setSelectedEmojis({ ...selectedEmojis, [data.id]: '3.0' })}>
                                    <MaterialCommunityIcons size={45} name={'emoticon-neutral-outline'}
                                        style={{ marginRight: 5 }} color={selectedEmojis[data.id] === '3.0' ? '#c99204' : '#fff'}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setSelectedEmojis({ ...selectedEmojis, [data.id]: '4.0' })}>
                                    <MaterialCommunityIcons size={45} name={'emoticon-sad-outline'}
                                        style={{ marginRight: 5 }} color={selectedEmojis[data.id] === '4.0' ? '#bf2a2a' : '#fff'}
                                    />
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => setSelectedEmojis({ ...selectedEmojis, [data.id]: '5.0' })}>
                                    <MaterialCommunityIcons size={45} name={'emoticon-angry-outline'}
                                        style={{ marginRight: 5 }} color={selectedEmojis[data.id] === '5.0' ? '#e80505' : '#fff'}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={EditTrainingStyle.mainpause}>
                                <View style={EditTrainingStyle.maininputView}>
                                    <Text style={EditTrainingStyle.lable}>Pause</Text>
                                    <TextInput style={EditTrainingStyle.inputText} textAlign='center'
                                        autoCapitalize='none' value={totalpauseTime[data.id]}
                                        placeholder={data?.a_breaks || data?.a_breaks}
                                        onChangeText={(totalpauseTimeValue) =>
                                            handleChange('totalpauseTime',
                                                data.id, totalpauseTimeValue)
                                        } autoCorrect={false}
                                        cursorColor='#3154e0' placeholderTextColor="#ffffffa1"
                                    />
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </ImageBackground>
    );
}

export default EditTraining;