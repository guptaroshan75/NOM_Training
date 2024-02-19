import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import { responsiveWidth } from "react-native-responsive-dimensions";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6"

interface CustomeTextInput {
    value: any,
    placeholder: string,
    onChangeText: (text: string) => void;
    icon: string
}

const CustomeTextInput: React.FC<CustomeTextInput> = (props) => {
    const handleTextChange = (text: string) => {
        props.onChangeText(text);
    };

    return (
        <View style={styles.inputView}>
            <TextInput style={styles.inputText} autoCapitalize='none' cursorColor='#3154e0'
                value={props.value} placeholder={props.placeholder} autoCorrect={false}
                onChangeText={handleTextChange} placeholderTextColor="#fff"
            />
            <FontAwesome6 name={props.icon}
                size={24} color="#fff" style={styles.icon}
            />
        </View>
    )
}

export default CustomeTextInput

const styles = StyleSheet.create({
    inputView: {
        width: responsiveWidth(95),
        color: '#fff'
    },

    inputText: {
        paddingVertical: responsiveHeight(1.8),
        marginHorizontal: responsiveHeight(1),
        marginVertical: responsiveHeight(1),
        backgroundColor: 'rgba(0, 0, 0, 0.59)',
        borderRadius: responsiveHeight(1.5),
        paddingLeft: responsiveHeight(7.6),
        color: '#fff',
        fontSize: responsiveFontSize(2.2)
    },

    icon: {
        position: "absolute",
        left: responsiveHeight(3),
        top: responsiveHeight(3.1)
    },
})