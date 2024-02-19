import { View, Text, ImageBackground, ScrollView } from 'react-native'
import { TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import AddNewRaceStyle from '../../Css/Race_Calender_Style/AddNewRaceStyle'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import DateTimePicker from 'react-native-modal-datetime-picker'
import Ionicons from "react-native-vector-icons/Ionicons"
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import CustomeAlert from '../../Component/CustomeAlert'
import Loader from '../../Component/Loader'
import { add_race, get_All_Race } from '../../Redux/Features/RaceSlice';
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import Toast from 'react-native-toast-message'

interface AddNewRace {
    closeModal: () => void;
    checkVisible: (visible: boolean) => void;
}

const AddNewRace: React.FC<AddNewRace> = ({ checkVisible, closeModal }) => {
    const [isFirstDatePick, setIsFirstDatePick] = useState(false);
    const [selectedFirstDay, setSelectedFirstDay] = useState<Date | null>(null);

    const [isSecondDatePick, setIsSecondDatePick] = useState(false);
    const [selectedLastDay, setSelectedLastDay] = useState<Date | null>(null);

    const [isArrivalDate, setIsArrivalDate] = useState(false);
    const [selectArrivalDate, setSelectArrivalDate] = useState<Date | null>(null);

    const [isDepartureDate, setIsDepartureDate] = useState(false);
    const [selectDepartureDate, setSelectDepartureDate] = useState<Date | null>(null);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const [name, setName] = useState<string>('')
    const [distance, setDistance] = useState<string>('')
    const [highMeter, setHighMeter] = useState<string>('')
    const [goal, setGoal] = useState<string>('')
    const [priority, setPriority] = useState('')

    const [loading, setLoading] = useState<boolean>(false);
    const [alertModelVisible, setAlertModelVisible] = useState(false);
    const [alertMessage, setAlertMessage] = useState('')
    const [alertLable, setAlertLable] = useState('')

    const closeModel = () => {
        setAlertModelVisible(!alertModelVisible)
    }

    const handleFirstDateConfirm = (date: any) => {
        setSelectedFirstDay(date);
        setIsFirstDatePick(false)
    };
    
    const handleSecondDateConfirm = (date: any) => {
        if (selectedFirstDay && date < selectedFirstDay) {
            setAlertMessage('Second Date Cannot Be Before The First Date. Please Select A Valid Date');
            setAlertModelVisible(true);
            setAlertLable('Alert');
        } else {
            setSelectedLastDay(date);
            setIsSecondDatePick(false);
        }
    };

    const openSecondDatePicker = () => {
        if (!selectedFirstDay) {
            setAlertMessage('Please Select The First Date Before Selecting The Last Date.');
            setAlertModelVisible(true);
            setAlertLable('Alert');
        } else if (!selectedLastDay) {
            setIsSecondDatePick(true);
        }
    };

    // const handleSecondDateConfirm = (date: any) => {
    //     if (selectedFirstDay && date < selectedFirstDay) {
    //         setAlertMessage('Second date cannot be before the first date. Please select a valid date');
    //         setAlertModelVisible(true);
    //         setLoading(false);
    //         setAlertLable('Alert');
    //     } else {
    //         setSelectedLastDay(date);
    //         setIsSecondDatePick(false);
    //     }
    // };

    const handleArrivalDateConfirm = (date: any) => {
        setSelectArrivalDate(date);
        setIsArrivalDate(false);
    };

    const handleDepartureDateConfirm = (date: any) => {
        setSelectDepartureDate(date);
        setIsDepartureDate(false);
    };

    const handleAddRace = async () => {
        setLoading(true);
        if (!name || !distance || !highMeter || !goal || !priority || !selectedFirstDay
            || !selectedLastDay || !selectArrivalDate || !selectDepartureDate) {
            setAlertMessage('Alle Felder Sind Pflichtfelder'); setAlertModelVisible(true);
            setLoading(false); setAlertLable('Warning')
            return;
        }

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

        const add_new_race = {
            name, goal, priority,
            first_day: selectedFirstDay?.toISOString().split('T')[0] || "",
            last_day: selectedLastDay?.toISOString().split('T')[0] || "",
            distance, vertical_meters: highMeter,
            arrival: selectArrivalDate?.toISOString().split('T')[0] || "",
            departure: selectDepartureDate?.toISOString().split('T')[0] || "",
        };

        try {
            await dispatch(add_race(add_new_race))
            Toast.show({
                type: 'Toast', text1: 'Race Added Successfully',
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
                <View style={AddNewRaceStyle.container}>
                    <View style={AddNewRaceStyle.header}>
                        <TouchableOpacity onPress={() => checkVisible(false)}>
                            <Image source={require('../../Icons/arrow.png')}
                                style={AddNewRaceStyle.back}
                            />
                        </TouchableOpacity>
                        <Text style={AddNewRaceStyle.mainContent}> Rennen Hinzufügen </Text>
                    </View>

                    <View style={AddNewRaceStyle.inputView}>
                        <TextInput style={AddNewRaceStyle.inputText} autoCapitalize='none'
                            value={name} placeholder={'Enter Your Name'} placeholderTextColor="#fff"
                            onChangeText={(name) => setName(name)} autoCorrect={false}
                            cursorColor='#3154e0'
                        />
                        <FontAwesome6 name={'user-tie'}
                            size={25} color="#fff" style={AddNewRaceStyle.icon}
                        />
                    </View>

                    <TouchableOpacity style={AddNewRaceStyle.date}
                        onPress={() => setIsFirstDatePick(true)}
                    >
                        <View style={AddNewRaceStyle.teleCalender}>
                            <Ionicons name={'calendar-sharp'} size={25} color="#fff" />

                            <Text style={AddNewRaceStyle.selectDate}>
                                {selectedFirstDay ? selectedFirstDay.toLocaleDateString('en-GB', {
                                    day: '2-digit', month: 'short', year: 'numeric',
                                }) : 'Erster Tag'}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={AddNewRaceStyle.date} onPress={openSecondDatePicker}>
                        <View style={AddNewRaceStyle.teleCalender}>
                            <Ionicons name={'calendar-sharp'} size={25} color="#fff" />
                            <Text style={AddNewRaceStyle.selectDate}>
                                {selectedLastDay ? selectedLastDay.toLocaleDateString('en-GB', {
                                    day: '2-digit', month: 'short', year: 'numeric',
                                }) : 'Letzter Tag'}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={AddNewRaceStyle.date}
                        onPress={() => setIsSecondDatePick(true)}
                    >
                        <View style={AddNewRaceStyle.teleCalender}>
                            <Ionicons name={'calendar-sharp'} size={25} color="#fff" />

                            <Text style={AddNewRaceStyle.selectDate}>
                                {selectedLastDay ? selectedLastDay.toLocaleDateString('en-GB', {
                                    day: '2-digit', month: 'short', year: 'numeric',
                                }) : 'Letzter Tag'}
                            </Text>
                        </View>
                    </TouchableOpacity> */}

                    <View style={AddNewRaceStyle.inputView}>
                        <TextInput style={AddNewRaceStyle.inputText} autoCapitalize='none'
                            value={distance} placeholder={'Distanz'} placeholderTextColor="#fff"
                            onChangeText={(distance) => setDistance(distance)}
                            keyboardType='numeric' cursorColor='#3154e0' autoCorrect={false}
                        />
                        <MaterialIcons name={'add-road'}
                            size={25} color="#fff" style={AddNewRaceStyle.icon}
                        />
                    </View>

                    <View style={AddNewRaceStyle.inputView}>
                        <TextInput style={AddNewRaceStyle.inputText} autoCapitalize='none'
                            value={highMeter} placeholder={'Höhenmeter'} autoCorrect={false}
                            onChangeText={(highMeter) => setHighMeter(highMeter)}
                            placeholderTextColor="#fff" cursorColor='#3154e0' keyboardType='numeric'
                        />
                        <MaterialCommunityIcons name={'axis-z-arrow'}
                            size={25} color="#fff" style={AddNewRaceStyle.icon}
                        />
                    </View>

                    <View style={AddNewRaceStyle.inputView}>
                        <TextInput style={AddNewRaceStyle.inputText} autoCapitalize='none'
                            cursorColor='#3154e0' value={goal} placeholder={'Ziel'} autoCorrect={false}
                            onChangeText={(goal) => setGoal(goal)} placeholderTextColor="#fff"
                        />
                        <MaterialIcons name={'star-purple500'}
                            size={25} color="#fff" style={AddNewRaceStyle.icon}
                        />
                    </View>

                    <View style={AddNewRaceStyle.inputView}>
                        <TextInput style={AddNewRaceStyle.inputText} autoCapitalize='none'
                            cursorColor='#3154e0' placeholderTextColor="#fff"
                            value={priority} placeholder={'Priorität'} autoCorrect={false}
                            onChangeText={(priority) => setPriority(priority)}
                        />
                        <MaterialCommunityIcons name={'exclamation-thick'}
                            size={25} color="#fff" style={AddNewRaceStyle.icon}
                        />
                    </View>

                    <TouchableOpacity style={AddNewRaceStyle.date} onPress={() => setIsArrivalDate(true)}>
                        <View style={AddNewRaceStyle.teleCalender}>
                            <Ionicons name={'calendar-sharp'} size={25} color="#fff" />

                            <Text style={AddNewRaceStyle.selectDate}>
                                {selectArrivalDate ? selectArrivalDate.toLocaleDateString('en-GB', {
                                    day: '2-digit', month: 'short', year: 'numeric',
                                }) : 'Anreisetag'}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity style={AddNewRaceStyle.date}
                        onPress={() => setIsDepartureDate(true)}
                    >
                        <View style={AddNewRaceStyle.teleCalender}>
                            <Ionicons name={'calendar-sharp'} size={25} color="#fff" />

                            <Text style={AddNewRaceStyle.selectDate}>
                                {selectDepartureDate ? selectDepartureDate.toLocaleDateString('en-GB', {
                                    day: '2-digit', month: 'short', year: 'numeric',
                                }) : 'Abreisetag'}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    {loading && (<Loader loading={loading} />)}

                    <TouchableOpacity style={AddNewRaceStyle.addBtn} onPress={handleAddRace}>
                        <Text style={[AddNewRaceStyle.addText]}> Sichern </Text>
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

export default AddNewRace