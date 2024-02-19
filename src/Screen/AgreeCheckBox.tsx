import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { responsiveWidth } from 'react-native-responsive-dimensions';

interface AgreeCheckBox {
    rememberMe: any,
    setRememberMe: any,
    lable: string
}

const AgreeCheckBox: React.FC<AgreeCheckBox> = ({ setRememberMe, rememberMe, lable }) => {
    return (
        <TouchableOpacity style={styles.checkboxContainer}
            onPress={() => setRememberMe(!rememberMe)}
        >
            <MaterialCommunityIcons size={24} style={{ marginRight: 5 }}
                name={rememberMe ? 'checkbox-marked' : 'checkbox-blank-outline'}
                color={rememberMe ? '#cf0e0e' : '#cf0e0e'}

            />
            <Text style={{ color: '#fff'}}>
                {rememberMe ? `${lable}` : `${lable}`}
            </Text>
        </TouchableOpacity>
    )
}

export default AgreeCheckBox;

const styles = StyleSheet.create({
    checkboxContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: responsiveWidth(2.3),
    },
})