import { View, Text, ImageBackground, ScrollView, Modal, Image } from 'react-native'
import { TouchableOpacity, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomeHeader from '../../Component/CustomeHeader'
import RaceCalenderStyle from '../../Css/Race_Calender_Style/RaceCalenderStyle'
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import AddNewRace from './AddNewRace'
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import EditRaceScreen from './EditRaceScreen'
import { useDispatch, useSelector } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { RootState } from '../../Redux/Store'
import { deleteRace, get_All_Race, get_Single_Race } from '../../Redux/Features/RaceSlice'
import Loader from '../../Component/Loader'

interface Race_Calender {
    navigation: any
}

const Race_Calender: React.FC<Race_Calender> = ({ navigation }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [editRaceScreen, setEditRaceScreen] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { get_all_Race } = useSelector((state: RootState) => state.race);

    const checkVisible = (item: boolean) => {
        setIsVisible(item)
        setEditRaceScreen(item)
    }

    const handleEditRaceScreen = (race_id: number) => {
        dispatch(get_Single_Race(race_id));
        setEditRaceScreen(true)
    }

    const handleDelete = (race_id: number) => {
        Alert.alert(
            'Confirm Deletion',
            'Are You Sure You Want To Delete This Record?',
            [
                {
                    text: 'CANCEL',
                    onPress: () => {
                        console.log('No Pressed');
                    }
                },
                {
                    text: 'DELETE',
                    onPress: async () => {
                        try {
                            await dispatch(deleteRace(race_id))
                            await dispatch(get_All_Race())
                        } catch (error) {
                            console.error('Error deleting equipment:', error);
                        };
                    }
                }
            ]
        )
    }

    const closeModal = () => {
        setIsVisible(false);
        setEditRaceScreen(false)
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                await  dispatch(get_All_Race())
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };
        fetchData();
    }, [dispatch]);

    return (
        <ImageBackground source={require('../../Images/cycle_climb.png')} style={{ flex: 1 }}>
            <ScrollView>
                <View style={RaceCalenderStyle.container}>
                    <CustomeHeader lable={'Rennkalender'} navigation={navigation} />

                    <TouchableOpacity style={RaceCalenderStyle.mainfield}
                        onPress={() => setIsVisible(true)}
                    >
                        <View style={RaceCalenderStyle.addRaceField}>
                            <MaterialIcons name={'add-circle'} size={33} color="#fff" />
                            <Text style={RaceCalenderStyle.text}> Neues Rennen Hinzufügen </Text>
                        </View>
                    </TouchableOpacity>

                    {loading && (<Loader loading={loading} />)}

                    <View style={RaceCalenderStyle.mainfield}>
                        {get_all_Race?.map((all_race, index) => (
                            <View style={RaceCalenderStyle.showRaceField} key={index}>
                                <View style={RaceCalenderStyle.showDataParent}>
                                    <View style={RaceCalenderStyle.showData}>
                                        <MaterialCommunityIcons name={'calendar-blank'} size={27}
                                            color="#fff"
                                        />
                                        <Text style={RaceCalenderStyle.text}> {all_race?.name} </Text>
                                    </View>

                                    <TouchableOpacity onPress={() => handleEditRaceScreen(all_race?.id)}>
                                        <Image source={require('../../Icons/edit.png')}
                                            style={RaceCalenderStyle.icon}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View style={RaceCalenderStyle.showDataParent}>
                                    <View style={RaceCalenderStyle.showData}>
                                        <MaterialIcons name={'speed'} size={27} color="#fff" />
                                        <Text style={RaceCalenderStyle.text}>
                                            {new Date(all_race?.first_day).toLocaleDateString('en-GB', {
                                                day: 'numeric', month: 'short', year: 'numeric',
                                            })}
                                        </Text>
                                    </View>

                                    <TouchableOpacity onPress={() => handleDelete(all_race?.id)}>
                                        <Image source={require('../../Icons/cancel.png')}
                                            style={RaceCalenderStyle.icon}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>

                <Modal animationType="slide" transparent={false}
                    visible={isVisible} onRequestClose={() => { setIsVisible(false) }}
                >
                    <AddNewRace closeModal={closeModal} checkVisible={checkVisible} />
                </Modal>

                <Modal animationType="slide" transparent={false}
                    visible={editRaceScreen} onRequestClose={() => { setEditRaceScreen(false) }}
                >
                    <EditRaceScreen closeModal={closeModal} checkVisible={checkVisible} />
                </Modal>

            </ScrollView>
        </ImageBackground>
    )
}

export default Race_Calender