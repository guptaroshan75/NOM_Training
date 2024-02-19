// import { View, Text, StyleSheet, SafeAreaView, Image, Modal } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
// import { responsiveWidth } from 'react-native-responsive-dimensions'
// import { Calendar } from 'react-native-calendars'
// import YourTraining from '../Screen/HomeScreen/YourTraining'

// interface CustomeCalender {
//     get_date_time: any[]
// }

// const CustomeCalender: React.FC<CustomeCalender> = ({ get_date_time }) => {
//     const today = new Date();
//     const todayString = today.toISOString().split('T')[0];

// const [markedDates, setMarkedDates] = useState({
//     [todayString]: { selected: true, selectedColor: '#b4b6ed' },
// });

//     const [selectedDate, setSelectedDate] = useState('');
//     const [isVisible, setIsVisible] = useState(false);

//     get_date_time && (
//         useEffect(() => {
//             const processedDates: any = {};
//             get_date_time?.forEach((dateTime) => {
//                 const dateString = dateTime.dates;
//                 processedDates[dateString] = { selected: true, selectedColor: 'red' };
//             });
//             setMarkedDates(processedDates);
//         }, [get_date_time])
//     )

//     const handleDayPress = (day: any) => {
// setMarkedDates((prevMarkedDates) => {
//     const newMarkedDates = { ...prevMarkedDates };
//     if (selectedDate) {
//         newMarkedDates[selectedDate] = { selected: false, selectedColor: '' };
//     }
//     const selectedColor = day.dateString === todayString ? '#7175e3' : '#b4b6ed';
//     newMarkedDates[day.dateString] = { selected: true, selectedColor: '#7175e3' };

// if (day.dateString !== todayString) {
//     newMarkedDates[todayString] = { selected: true, selectedColor };
// }
//     return newMarkedDates;
// });

//         setSelectedDate(day.dateString);
//         setIsVisible(true);
//     };

//     const closeModal = () => {
//         setIsVisible(false);
//     };

//     return (
//         <SafeAreaView style={{ flex: 1 }}>
//                 <Calendar style={styles.calendar} enableSwipeMonths={true} firstDay={1} theme={{
//                     monthTextColor: '#fff',
//                     arrowColor: '#fff', calendarBackground: 'rgba(0, 0, 0, 0)',
//                     dayTextColor: '#fff', textInactiveColor: 'rgba(255, 255, 255, 0.63)',
//                     textSectionTitleColor: '#fff',
//                     textDisabledColor: 'rgba(255, 255, 255, 0.59)',
//                 }}
//                     markedDates={markedDates}
//                     onDayPress={handleDayPress}
//                 />

//             <View style={styles.raceCount}>
//                 <Image source={require('../Icons/bicycle.png')} style={styles.icon} />
//                 <View style={{ flexDirection: 'column' }}>
//                     <Text style={styles.racetext}> Trainingszeit in Diesem Monat </Text>
//                     <Text style={styles.racetext}> 0 Minuten </Text>
//                 </View>
//             </View>

//             <Text style={styles.data}> No Training Data </Text>

//             <Modal animationType="slide" transparent={true} visible={isVisible}
//                 onRequestClose={closeModal}
//             >
//                 <YourTraining closeModal={closeModal} selectedDate={selectedDate} />
//             </Modal>
//         </SafeAreaView>
//     )
// }

// export default CustomeCalender

// const styles = StyleSheet.create({
//     calendar: {
//         backgroundColor: '#00000a1',
//         margin: responsiveWidth(-2)
//     },

//     icon: {
//         width: 30,
//         height: 30,
//         marginHorizontal: responsiveHeight(1.6),
//         tintColor: '#fff'
//     },

//     raceCount: {
//         width: responsiveWidth(90),
//         backgroundColor: "#cf0e0e",
//         paddingVertical: responsiveHeight(1.3),
//         borderRadius: responsiveHeight(1.5),
//         marginHorizontal: responsiveHeight(1),
//         flexDirection: 'row',
//         alignItems: "center",
//         marginTop: responsiveHeight(3.5)
//     },

//     racetext: {
//         color: '#fff',
//         fontSize: responsiveFontSize(2.1),
//         fontWeight: "400",
//         paddingVertical: responsiveHeight(0.2),
//         marginHorizontal: responsiveHeight(0.7),
//     },

//     data: {
//         color: '#fff',
//         marginTop: responsiveHeight(6.5),
//         textAlign: 'center',
//         fontSize: responsiveFontSize(2.6)
//     }
// })

import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Image, Dimensions, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Calendar } from 'react-native-calendars';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { monthlyOverViewDate_Post } from '../Redux/Features/CalenderSlice';
import { getalldate_Post } from '../Redux/Features/CalenderSlice';
import Loader from './Loader';
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { VictoryAxis, VictoryChart, VictoryLine } from "victory-native";

interface CustomeCalenderProps {
    get_date_time: any[];
    navigation: any;
}

const { width, height } = Dimensions.get("screen")

const CustomeCalender: React.FC<CustomeCalenderProps> = ({ get_date_time, navigation }) => {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];

    const [markedDates, setMarkedDates] = useState({
        [todayString]: { selected: true, selectedColor: '#b4b6ed' },
    });

    const [loading, setLoading] = useState<boolean>(false);
    const [getDateTime, setSelectedDate] = useState('');
    const [responseData, setResponseData] = useState<any[]>([]);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    useEffect(() => {
        if (get_date_time) {
            const processedDates: any = {};
            get_date_time.forEach((dateTime) => {
                const dateString = dateTime.dates;
                processedDates[dateString] = { selected: true, selectedColor: 'red' };
            });
            setMarkedDates(processedDates);
        }
    }, [get_date_time]);

    const [currentMonth, setCurrentMonth] = useState<string>(new Date().toLocaleString('default', { month: '2-digit' }));
    const [currentYear, setCurrentYear] = useState<string>(new Date().getFullYear().toString());
    const currentYearMonth = `${currentYear}-${currentMonth.toString().padStart(2, '0')}`;

    const handleDayPress = async (day: any) => {
        setMarkedDates((prevMarkedDates) => {
            const newMarkedDates = { ...prevMarkedDates };
            Object.keys(newMarkedDates).forEach((date) => {
                if (date === day.dateString) {
                    newMarkedDates[date] = { selected: true, selectedColor: '#7175e3' };
                } else if (get_date_time.some((dateTime) => dateTime.dates === date)) {
                    newMarkedDates[date] = { selected: true, selectedColor: 'red' };
                } else {
                    newMarkedDates[date] = { selected: false, selectedColor: '' };
                }
            });
            if (getDateTime) {
                newMarkedDates[day.dateString] = { selected: true, selectedColor: '#7175e3' };
            }
            if (day.dateString !== todayString) {
                newMarkedDates[todayString] = { selected: true, selectedColor: '#b4b6ed' };
            }
            return newMarkedDates;
        });
        const selectedDateString = day.dateString;
        setSelectedDate(selectedDateString);
        setLoading(true)
        const monthlyOverView = { first_date: selectedDateString };
        try {
            const res: any = await dispatch(monthlyOverViewDate_Post(monthlyOverView));
            navigation.navigate('Your_Training', {
                response: res.payload, getDateTime: selectedDateString
            });
            setLoading(false);
        } catch (error) {
            setLoading(false);
            return error;
        }
    };

    useEffect(() => {
        const handleLineChartsGraph = async () => {
            setLoading(true)
            const graph_dates = { user_date: currentYearMonth }
            try {
                const res: any = await dispatch(getalldate_Post(graph_dates))
                setResponseData(res.payload.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.log(error);
            }
        }
        handleLineChartsGraph()
    }, [dispatch, currentYearMonth]);

    const handleMonthChange = (monthObject: any) => {
        const month = monthObject.month;
        setCurrentMonth(month);
        setCurrentYear(monthObject.year.toString());
    };

    let totalSum = 0;
    for (let i = 0; i < responseData.length; i++) {
        totalSum += parseFloat(responseData[i].total_rainingstime);
    }

    // const sortedData = responseData.slice().sort((a, b) => b.total_rainingstime - a.total_rainingstime);
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView>
                <Calendar style={styles.calendar} enableSwipeMonths={true} firstDay={1} theme={{
                    monthTextColor: '#fff', textSectionTitleColor: '#fff',
                    arrowColor: '#fff', calendarBackground: 'rgba(0, 0, 0, 0)',
                    dayTextColor: '#fff', textInactiveColor: 'rgba(255, 255, 255, 0.63)',
                    textDisabledColor: 'rgba(255, 255, 255, 0.59)',
                }}
                    markedDates={markedDates}
                    onDayPress={handleDayPress}
                    onMonthChange={handleMonthChange}
                />

                <View style={styles.raceCount}>
                    <Image source={require('../Icons/bicycle.png')} style={styles.icon} />
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={styles.racetext}> Trainingszeit in Diesem Monat </Text>
                        <Text style={styles.racetext}> {totalSum} Minuten </Text>
                    </View>
                </View>

                {loading && (<Loader loading={loading} />)}

                {responseData.length > 0 ? (
                    <View style={styles.container}>
                        <VictoryChart width={width * 1.145} maxDomain={{ y: 4.5 }}>
                            <Text style={styles.y_axisText}> Gewicht </Text>
                            <VictoryLine data={responseData} sortOrder="ascending"
                                y="total_rainingstime" interpolation="natural"
                                style={{ data: { stroke: "#ab8f03", strokeWidth: 3.5 }}}
                            />
                            <VictoryAxis tickFormat={() => ('')}
                                style={{ axis: { stroke: "#fff" }, tickLabels: { fill: "#fff" } }}
                            />
                            <VictoryAxis dependentAxis tickFormat={() => ('')}
                                style={{ axis: { stroke: "#fff" }, tickLabels: { fill: "#fff" } }}
                            />
                        </VictoryChart>

                        {/* <VictoryBar
                            // sortKey="total_rainingstime"
                            // sortOrder="ascending"
                            animate={{ duration: 3000}}
                            labels={({ datum }) => `${datum.total_rainingstime}`}
                            style={{ data: { fill: 'red', width: 15 }, labels: { fill: "white" } }}
                            data={responseData} x="dates" y="total_rainingstime"
                        // labelComponent={<VictoryLabel dy={10} />}
                        /> */}
                    </View>
                ) : (
                    <Text style={styles.data}> No Training Data </Text>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

export default CustomeCalender;

const styles = StyleSheet.create({
    calendar: {
        backgroundColor: '#00000a1',
        margin: responsiveWidth(-2)
    },

    icon: {
        width: 30,
        height: 30,
        marginHorizontal: responsiveHeight(1.6),
        tintColor: '#fff'
    },

    raceCount: {
        width: responsiveWidth(90),
        backgroundColor: "#cf0e0e",
        paddingVertical: responsiveHeight(1.3),
        borderRadius: responsiveHeight(1.5),
        marginHorizontal: responsiveHeight(1),
        flexDirection: 'row',
        alignItems: "center",
        marginTop: responsiveHeight(3.5)
    },

    racetext: {
        color: '#fff',
        fontSize: responsiveFontSize(2),
        fontWeight: "400",
    },

    y_axisText: {
        color: '#fff',
        marginTop: responsiveHeight(2),
        marginLeft: responsiveWidth(11),
        fontSize: responsiveFontSize(2.4),
        fontWeight: '400'
    },

    container: {
        flex: 1,
        alignItems: "center",
        // marginLeft: responsiveWidth(-9),
        marginTop: responsiveHeight(1.6),
        justifyContent: 'center',
    },

    data: {
        color: '#fff',
        marginTop: responsiveHeight(6),
        textAlign: 'center',
        fontSize: responsiveFontSize(2.6)
    }
});


// import { View, Text, StyleSheet, SafeAreaView, Image } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
// import { responsiveWidth } from 'react-native-responsive-dimensions'
// import { Calendar } from 'react-native-calendars'
// import { useDispatch } from 'react-redux'
// import { ThunkDispatch } from '@reduxjs/toolkit'
// import { getalldate_Post, monthlyOverViewDate_Post } from '../Redux/Features/CalenderSlice'
// import Loader from './Loader'
// import LineCharts from '../Screen/LinCharts/LineCharts'

// interface CustomeCalender {
//     get_date_time: any[],
//     navigation: any,
// }

// const CustomeCalender: React.FC<CustomeCalender> = ({ get_date_time, navigation }) => {
//     const today = new Date();
//     const todayString = today.toISOString().split('T')[0];

//     const [markedDates, setMarkedDates] = useState({
//         [todayString]: { selected: true, selectedColor: '#b4b6ed' },
//     });

//     const [loading, setLoading] = useState<boolean>(false);
//     const [getDateTime, setSelectedDate] = useState('');
//     const [responseData, setResponseData] = useState('');
//     const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

//     get_date_time && (
//         useEffect(() => {
//             const processedDates: any = {};
//             get_date_time?.forEach((dateTime) => {
//                 const dateString = dateTime.dates;
//                 processedDates[dateString] = { selected: true, selectedColor: 'red' };
//             });
//             setMarkedDates(processedDates);
//         }, [get_date_time])
//     )

//     const [currentMonth, setCurrentMonth] = useState<string>(new Date().toLocaleString('default', { month: '2-digit' }));
//     const [currentYear, setCurrentYear] = useState<string>(new Date().getFullYear().toString());
//     const currentYearMonth = `${currentYear}-${currentMonth.toString().padStart(2, '0')}`;

//     // const [currentMonth, setCurrentMonth] = useState<string>(new Date().toLocaleString('default',
//     //     { month: '2-digit' }));
//     // const [currentYear, setCurrentYear] = useState<string>(new Date().getFullYear().toString());
//     // const currentYearMonth = `${currentYear}-${currentMonth.toString().padStart(2, '0')}`;
//     // console.log(currentYearMonth);
//     // console.log(responseData);

//     const handleDayPress = async (day: any) => {
//         const selectedDateString = day.dateString;
//         setSelectedDate(selectedDateString);
//         setLoading(true)
//         const monthlyOverView = { first_date: selectedDateString };
//         try {
//             const res: any = await dispatch(monthlyOverViewDate_Post(monthlyOverView));
//             navigation.navigate('Your_Training', {
//                 response: res.payload,
//                 getDateTime: selectedDateString
//             })
//             setLoading(false)
//         } catch (error) {
//             setLoading(false)
//             return error
//         }
//     };

//     useEffect(() => {
//         const handleLineChartsGraph = async () => {
//             setLoading(true)
//             const graph_dates = { user_date: currentYearMonth }
//             try {
//                 const res: any = await dispatch(getalldate_Post(graph_dates))
//                 setResponseData(res.payload.data)
//                 setLoading(false)
//             } catch (error) {
//                 setLoading(false)
//                 console.log(error);
//             }
//         }
//         handleLineChartsGraph()
//     }, [dispatch, currentYearMonth]);

//     const handleMonthChange = (monthObject: any) => {
//         const month = monthObject.month;
//         setCurrentMonth(month);
//         setCurrentYear(monthObject.year.toString());
//     };

//     return (
//         <SafeAreaView style={{ flex: 1 }}>
// <Calendar style={styles.calendar} enableSwipeMonths={true} firstDay={1} theme={{
//     monthTextColor: '#fff',
//     arrowColor: '#fff', calendarBackground: 'rgba(0, 0, 0, 0)',
//     dayTextColor: '#fff', textInactiveColor: 'rgba(255, 255, 255, 0.63)',
//     textSectionTitleColor: '#fff',
//     textDisabledColor: 'rgba(255, 255, 255, 0.59)',
// }}
//     markedDates={markedDates}
//     onDayPress={handleDayPress}
//     onMonthChange={handleMonthChange}
// />

//             {loading && (<Loader loading={loading} />)}

// <View style={styles.raceCount}>
//     <Image source={require('../Icons/bicycle.png')} style={styles.icon} />
//     <View style={{ flexDirection: 'column' }}>
//         <Text style={styles.racetext}> Trainingszeit in Diesem Monat </Text>
//         <Text style={styles.racetext}> 0 Minuten </Text>
//     </View>
// </View>

//             <View style={{ marginBottom: 23 }}>
//                 <LineCharts response={responseData} />
//             </View>

//             {responseData ? (
//                 <View style={{ marginBottom: 23 }}>
//                     <LineCharts response={responseData} />
//                 </View>
//             ) : null}
//         </SafeAreaView>
//     )
// }

// export default CustomeCalender

// const styles = StyleSheet.create({
// calendar: {
//     backgroundColor: '#00000a1',
//     margin: responsiveWidth(-2)
// },

// icon: {
//     width: 30,
//     height: 30,
//     marginHorizontal: responsiveHeight(1.6),
//     tintColor: '#fff'
// },

// raceCount: {
//     width: responsiveWidth(90),
//     backgroundColor: "#cf0e0e",
//     paddingVertical: responsiveHeight(1.3),
//     borderRadius: responsiveHeight(1.5),
//     marginHorizontal: responsiveHeight(1),
//     flexDirection: 'row',
//     alignItems: "center",
//     marginTop: responsiveHeight(3.5)
// },

// racetext: {
//     color: '#fff',
//     fontSize: responsiveFontSize(2.1),
//     fontWeight: "400",
//     paddingVertical: responsiveHeight(0.2),
//     marginHorizontal: responsiveHeight(0.7),
// },

// data: {
//     color: '#fff',
//     marginTop: responsiveHeight(6.5),
//     textAlign: 'center',
//     fontSize: responsiveFontSize(2.6)
// }
// })