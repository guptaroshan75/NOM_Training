import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { TouchableWithoutFeedback } from 'react-native'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions'
import { responsiveWidth } from 'react-native-responsive-dimensions'

interface CustomeHeader {
    navigation: any,
    lable: string
}

const CustomeHeader:React.FC<CustomeHeader> = (props) => {    
    return (
        <View style={styles.header}>
            <TouchableWithoutFeedback onPress={() => props.navigation.goBack()}>
                <Image source={require('../Icons/arrow.png')} style={styles.back} />
            </TouchableWithoutFeedback>
            <Text style={styles.mainContent}> {props.lable} </Text>
        </View>
    )
}

export default CustomeHeader

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: responsiveHeight(4),
    },

    back: {
        width: 30,
        height: 25,
        tintColor: '#fff'
    },

    mainContent: {
        fontSize: responsiveFontSize(3.6),
        fontWeight: '400',
        color: '#fff',
        marginHorizontal: responsiveWidth(4),
        textTransform: 'capitalize'
    },
})