import { View, Text, StyleSheet, Platform } from 'react-native'
import React from 'react'
import { responsiveFontSize, responsiveHeight } from 'react-native-responsive-dimensions';
import { responsiveWidth } from 'react-native-responsive-dimensions';
import { TextInput } from 'react-native';

interface CustomeEditText {
    lable: string,
    value: any,
    placeholder: string,
    onChangeText: (text: string) => void;
}

const CustomeEditText: React.FC<CustomeEditText> = (props) => {
    const handleTextChange = (text: string) => {
        props.onChangeText(text);
    };

    const truncatePlaceholder = (text: string, maxLength: number): string => {
        if (text?.length > maxLength) {
            return text.slice(0, maxLength - 3) + '...'; 
        }
        return text;
    };
    const maxLength = 18;

    return (
        <View style={styles.maininputView}>
            <Text style={styles.lable}>{props.lable}</Text>
            <TextInput style={[styles.inputText]} autoCapitalize='none'
                value={props.value} textAlign='center' 
                placeholder={truncatePlaceholder(props.placeholder, maxLength)}
                onChangeText={handleTextChange} autoCorrect={false}
                cursorColor='#3154e0' placeholderTextColor="#ffffffa1"
            />
        </View>
    )
}

export default CustomeEditText

const styles = StyleSheet.create({
    maininputView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: responsiveWidth(3),
        marginVertical: responsiveHeight(1)
    },

    lable: {
        color: '#ffffff',
        fontSize: responsiveFontSize(2),
        fontWeight: '500',
        width: responsiveWidth(40),
    },

    inputText: {
        width: responsiveWidth(45),
        backgroundColor: 'rgba(0, 0, 0, 0.63)',
        borderRadius: responsiveHeight(1.5),
        color: '#fff',
        fontSize: responsiveFontSize(2.2),
    },
})