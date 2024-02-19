// import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native'
// import React, { useEffect } from 'react'
// import MonthlyOverviewStyle from '../../Css/HomeScreenStyle/MonthlyOverviewStyle'
// import CustomeCalender from '../../Component/CustomeCalender';
// import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from '../../Redux/Store';
// import { ThunkDispatch } from '@reduxjs/toolkit';
// import { get_Date_Time } from '../../Redux/Features/CalenderSlice';

// interface MonthlyOverview {
//     checkVisible: (visible: boolean) => void;
// }

// const MonthlyOverview: React.FC<MonthlyOverview> = ({ checkVisible }) => {
//     const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
//     const { get_date_time } = useSelector((state: RootState) => state.calender);

//     useEffect(() => {
//         dispatch(get_Date_Time())
//     }, [dispatch]);

//     return (
//         <ImageBackground source={require('../../Images/cycle_run.png')} style={{ flex: 1 }}>
//             <View style={MonthlyOverviewStyle.container}>
//                 <View style={MonthlyOverviewStyle.header}>
//                     <TouchableOpacity onPress={() => checkVisible(false)}>
//                         <Image source={require('../../Icons/arrow.png')}
//                             style={MonthlyOverviewStyle.back}
//                         />
//                     </TouchableOpacity>
//                     <Text style={MonthlyOverviewStyle.mainContent}> Monatsübersicht </Text>
//                 </View>
//                 <CustomeCalender get_date_time={get_date_time} />
//             </View>
//         </ImageBackground>
//     )
// }

// export default MonthlyOverview

import { View, Text, ImageBackground, TouchableOpacity, Image } from 'react-native'
import React, { useEffect } from 'react'
import MonthlyOverviewStyle from '../../Css/HomeScreenStyle/MonthlyOverviewStyle'
import CustomeCalender from '../../Component/CustomeCalender';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../Redux/Store';
import { ThunkDispatch } from '@reduxjs/toolkit';
import { get_Date_Time } from '../../Redux/Features/CalenderSlice';

interface MonthlyOverview {
    navigation: any
}

const MonthlyOverview: React.FC<MonthlyOverview> = ({ navigation }) => {
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const { get_date_time } = useSelector((state: RootState) => state.calender);

    useEffect(() => {
        dispatch(get_Date_Time())
    }, [dispatch]);

    return (
        <ImageBackground source={require('../../Images/cycle_run.png')} style={{ flex: 1 }}>
            <View style={MonthlyOverviewStyle.container}>
                <View style={MonthlyOverviewStyle.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={require('../../Icons/arrow.png')}
                            style={MonthlyOverviewStyle.back}
                        />
                    </TouchableOpacity>
                    <Text style={MonthlyOverviewStyle.mainContent}> Monatsübersicht </Text>
                </View>
                <CustomeCalender get_date_time={get_date_time} navigation={navigation}/>
            </View>
        </ImageBackground>
    )
}

export default MonthlyOverview