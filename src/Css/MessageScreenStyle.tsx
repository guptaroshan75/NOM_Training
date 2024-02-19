import { StyleSheet } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const MessageScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(26, 25, 26, 0.86)'
    },

    chatAllow: {
        textAlign: 'center',
        fontSize: responsiveFontSize(3.7),
        fontWeight: '500',
        color: '#fff'
    },

    userInfo: {
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: 'auto'
    },

    userShowMessage: {
        marginHorizontal: responsiveWidth(3.5),
        textAlign: 'center',
        fontSize: responsiveFontSize(2.3),
        color: '#fff',
        fontWeight: '500'
    },
})

export default MessageScreenStyle;