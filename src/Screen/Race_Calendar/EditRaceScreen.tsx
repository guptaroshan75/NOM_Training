import { View, Text, ImageBackground, ScrollView, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import EditRaceScreenStyle from '../../Css/Race_Calender_Style/EditRaceScreenStyle'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import DateTimePicker from 'react-native-modal-datetime-picker'
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import Loader from '../../Component/Loader'
import { get_All_Race, update_race } from '../../Redux/Features/RaceSlice'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../../Redux/Store'
import Toast from 'react-native-toast-message'
import CustomeAlert from '../../Component/CustomeAlert'

interface EditRaceScreen {
    closeModal: () => void;
    checkVisible: (visible: boolean) => void;
}

const EditRaceScreen: React.FC<EditRaceScreen> = ({ checkVisible, closeModal }) => {
    const [isFirstDatePick, setIsFirstDatePick] = useState(false);
    const [selectedFirstDay, setSelectedFirstDay] = useState<Date | null>(null);

    const [isSecondDatePick, setIsSecondDatePick] = useState(false);
    const [selectedLastDay, setSelectedLastDay] = useState<Date | null>(null);

    const [isArrivalDate, setIsArrivalDate] = useState(false);
    const [selectArrivalDate, setSelectArrivalDate] = useState<Date | null>(null);

    const [isDepartureDate, setIsDepartureDate] = useState(false);
    const [selectDepartureDate, setSelectDepartureDate] = useState<Date | null>(null);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const { get_single_Race } = useSelector((state: RootState) => state.race);
    const race_id: string = get_single_Race?.id

    const [name, setName] = useState<string>('')
    const [distance, setDistance] = useState<string>('')
    const [highMeter, setHighMeter] = useState<string>('')
    const [goal, setGoal] = useState<string>('')
    const [priority, setPriority] = useState('')
    const [loading, setLoading] = useState<boolean>(false);

    const [alertModelVisible, setAlertModelVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('')
    const [alertLable, setAlertLable] = useState('')

    const handleName = () => {
        setName(get_single_Race?.name)
    }

    const handleDistance = () => {
        setDistance(get_single_Race?.distance)
    }

    const handleVerticleMeter = () => {
        setHighMeter(get_single_Race?.vertical_meters)
    }

    const handleGole = () => {
        setGoal(get_single_Race?.goal)
    }

    const handlePriority = () => {
        setPriority(get_single_Race?.priority)
    }

    useEffect(() => {
        handleName()
        handleDistance()
        handleVerticleMeter()
        handleGole()
        handlePriority()
    }, [dispatch, get_single_Race])

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await dispatch(get_All_Race())
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        fetchData();
    }, [dispatch]);

    const handleFirstDateConfirm = (date: any) => {
        setSelectedFirstDay(date);
        setIsFirstDatePick(false)
    };


    const handleSecondDateConfirm = (date: any) => {
        setSelectedLastDay(date);
        setIsSecondDatePick(false);
    };

    const handleArrivalDateConfirm = (date: any) => {
        setSelectArrivalDate(date);
        setIsArrivalDate(false);
    };

    const handleDepartureDateConfirm = (date: any) => {
        setSelectDepartureDate(date);
        setIsDepartureDate(false);
    };

    const closeModel = () => {
        setAlertModelVisible(!alertModelVisible)
    }

    const handleUpdateRace = async () => {
        setLoading(true);
        const update_single_race = {
            name, goal, priority, distance, vertical_meters: highMeter,
            first_day: selectedFirstDay?.toISOString().split('T')[0] || get_single_Race?.first_day,
            last_day: selectedLastDay?.toISOString().split('T')[0] || get_single_Race?.last_day,
            arrival: selectArrivalDate?.toISOString().split('T')[0] || get_single_Race?.arrival,
            departure: selectDepartureDate?.toISOString().split('T')[0] || get_single_Race?.departure,
        };

        if (!name || /[^a-zA-Z]/g.test(name)) {
            setAlertMessage('Name should only Contain Alphabets'); setAlertModelVisible(true);
            setAlertLable('Warning'); setLoading(false); return;
        }
    
        if (!distance || /[^0-9]/.test(distance)) {
            setAlertMessage('Distance Should Only Contain Numbers'); setAlertModelVisible(true);
            setAlertLable('Warning'); setLoading(false); return;
        }
    
        if (!highMeter || /[^0-9]/.test(highMeter)) {
            setAlertMessage('High Meter Should Only Contain Numbers'); setAlertModelVisible(true);
            setAlertLable('Warning'); setLoading(false); return;
        }
    
        if (!goal || /[^a-zA-Z0-9 ]/.test(goal)) {
            setAlertMessage('Goal Should Only Contain Alphabets');
            setAlertModelVisible(true); setAlertLable('Warning'); setLoading(false); return;
        }
    
        if (!priority || /[^a-zA-Z0-9 ]/.test(priority)) {
            setAlertMessage('Priority Should Only Contain Alphabets');
            setAlertModelVisible(true); setAlertLable('Warning'); setLoading(false); return;
        }

        try {
            await dispatch(update_race({ update_single_race, race_id }))
            Toast.show({
                type: 'Toast', text1: 'Race Updated Successfully',
                visibilityTime: 3000, position: "bottom"
            });
            closeModal()
            setLoading(false);
            dispatch(get_All_Race());
        } catch (error) {
            console.log('Add Race error:', error);
            setLoading(false);
        }
    };

    return (
        <ImageBackground source={require('../../Images/cycle_climb.png')} style={{ flex: 1 }}>
            <ScrollView>
                <View style={EditRaceScreenStyle.container}>
                    <View style={EditRaceScreenStyle.header}>
                        <TouchableOpacity onPress={() => checkVisible(false)}>
                            <Image source={require('../../Icons/arrow.png')}
                                style={EditRaceScreenStyle.back}
                            />
                        </TouchableOpacity>
                        <Text style={EditRaceScreenStyle.mainContent}> Rennen Hinzufügen </Text>
                    </View>

                    <View style={EditRaceScreenStyle.inputView}>
                        <TextInput style={EditRaceScreenStyle.inputText} autoCapitalize='none'
                            value={name} cursorColor='#3154e0'
                            onChangeText={(name) => setName(name)} autoCorrect={false}
                        />
                        <FontAwesome6 name={'user-tie'}
                            size={25} color="#fff" style={EditRaceScreenStyle.icon}
                        />
                    </View>

                    <TouchableOpacity style={EditRaceScreenStyle.date}
                        onPress={() => setIsFirstDatePick(true)}
                    >
                        <View style={EditRaceScreenStyle.teleCalender}>
                            <Ionicons name={'calendar-sharp'} size={25} color="#fff" />

                            <Text style={EditRaceScreenStyle.selectDate}>
                                {selectedFirstDay ? selectedFirstDay.toLocaleDateString('en-GB', {
                                    day: '2-digit', month: 'short', year: 'numeric',
                                }) : get_single_Race?.first_day &&
                                new Date(get_single_Race?.first_day).toLocaleDateString('en-GB', {
                                    day: '2-digit', month: 'short', year: 'numeric',
                                })
                                }
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={EditRaceScreenStyle.date}
                        onPress={() => setIsSecondDatePick(true)}
                    >
                        <View style={EditRaceScreenStyle.teleCalender}>
                            <Ionicons name={'calendar-sharp'} size={25} color="#fff" />

                            <Text style={EditRaceScreenStyle.selectDate}>
                                {selectedLastDay ? selectedLastDay.toLocaleDateString('en-GB', {
                                    day: '2-digit', month: 'short', year: 'numeric',
                                }) : get_single_Race?.last_day &&
                                new Date(get_single_Race?.last_day).toLocaleDateString('en-GB', {
                                    day: '2-digit', month: 'short', year: 'numeric',
                                })
                                }
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <View style={EditRaceScreenStyle.inputView}>
                        <TextInput style={EditRaceScreenStyle.inputText} autoCapitalize='none'
                            value={distance} keyboardType='numeric' cursorColor='#3154e0'
                            onChangeText={(distance) => setDistance(distance)} autoCorrect={false}
                        />
                        <MaterialIcons name={'add-road'}
                            size={25} color="#fff" style={EditRaceScreenStyle.icon}
                        />
                    </View>

                    <View style={EditRaceScreenStyle.inputView}>
                        <TextInput style={EditRaceScreenStyle.inputText} autoCapitalize='none'
                            value={highMeter} autoCorrect={false} cursorColor='#3154e0'
                            onChangeText={(highMeter) => setHighMeter(highMeter)}
                            keyboardType='numeric'
                        />
                        <MaterialCommunityIcons name={'axis-z-arrow'}
                            size={25} color="#fff" style={EditRaceScreenStyle.icon}
                        />
                    </View>

                    <View style={EditRaceScreenStyle.inputView}>
                        <TextInput style={EditRaceScreenStyle.inputText} autoCapitalize='none'
                            cursorColor='#3154e0' value={goal} autoCorrect={false}
                            onChangeText={(goal) => setGoal(goal)}
                        />
                        <MaterialIcons name={'star-purple500'}
                            size={25} color="#fff" style={EditRaceScreenStyle.icon}
                        />
                    </View>

                    <View style={EditRaceScreenStyle.inputView}>
                        <TextInput style={EditRaceScreenStyle.inputText} autoCapitalize='none'
                            cursorColor='#3154e0' value={priority} autoCorrect={false}
                            onChangeText={(priority) => setPriority(priority)}
                        />
                        <MaterialCommunityIcons name={'exclamation-thick'}
                            size={25} color="#fff" style={EditRaceScreenStyle.icon}
                        />
                    </View>

                    <TouchableOpacity style={EditRaceScreenStyle.date}
                        onPress={() => setIsArrivalDate(true)}
                    >
                        <View style={EditRaceScreenStyle.teleCalender}>
                            <Ionicons name={'calendar-sharp'} size={25} color="#fff" />

                            <Text style={EditRaceScreenStyle.selectDate}>
                                {selectArrivalDate ? selectArrivalDate.toLocaleDateString('en-GB', {
                                    day: '2-digit', month: 'short', year: 'numeric',
                                }) : get_single_Race?.arrival &&
                                new Date(get_single_Race?.arrival).toLocaleDateString('en-GB', {
                                    day: '2-digit', month: 'short', year: 'numeric',
                                })
                                }
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={EditRaceScreenStyle.date}
                        onPress={() => setIsDepartureDate(true)}
                    >
                        <View style={EditRaceScreenStyle.teleCalender}>
                            <Ionicons name={'calendar-sharp'} size={25} color="#fff" />

                            <Text style={EditRaceScreenStyle.selectDate}>
                                {selectDepartureDate ? selectDepartureDate.toLocaleDateString('en-GB', {
                                    day: '2-digit', month: 'short', year: 'numeric',
                                }) : get_single_Race?.departure &&
                                new Date(get_single_Race?.departure).toLocaleDateString('en-GB', {
                                    day: '2-digit', month: 'short', year: 'numeric',
                                })
                                }
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {loading && (<Loader loading={loading} />)}

                    <TouchableOpacity style={EditRaceScreenStyle.addBtn} onPress={handleUpdateRace}>
                        <Text style={[EditRaceScreenStyle.addText]}> Sichern </Text>
                    </TouchableOpacity>
                </View>

                {isFirstDatePick && (
                    <DateTimePicker isVisible={isFirstDatePick} mode="date"
                        onConfirm={handleFirstDateConfirm} onCancel={() => setIsFirstDatePick(false)}
                        date={selectedFirstDay || new Date()}
                    />
                )}

                {isSecondDatePick && (
                    <DateTimePicker isVisible={isSecondDatePick} mode="date"
                        onConfirm={handleSecondDateConfirm} onCancel={() => setIsSecondDatePick(false)}
                        date={selectedLastDay || new Date()}
                    />
                )}

                {isArrivalDate && (
                    <DateTimePicker isVisible={isArrivalDate} mode="date"
                        onConfirm={handleArrivalDateConfirm} onCancel={() => setIsArrivalDate(false)}
                        date={selectArrivalDate || new Date()}
                    />
                )}

                {isDepartureDate && (
                    <DateTimePicker isVisible={isDepartureDate} mode="date"
                        onConfirm={handleDepartureDateConfirm} onCancel={() => setIsDepartureDate(false)}
                        date={selectDepartureDate || new Date()}
                    />
                )}
            </ScrollView>

            <CustomeAlert message={alertMessage} lable={alertLable}
                isVisible={alertModelVisible} closeModel={closeModel}
            />
        </ImageBackground>
    )
}

export default EditRaceScreen