import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const MessageNotificationStyle = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: responsiveWidth(3.5),
    },

    notifycontainer: {
        marginHorizontal: responsiveWidth(1.9),
    },

    notification: {
        fontSize: responsiveFontSize(2.8),
        fontWeight: '500',
        color: '#fff',
        marginBottom: 3,
        marginTop: responsiveHeight(-1.3)
    },

    textnote: {
        fontSize: responsiveFontSize(2),
        fontWeight: '400',
        color: '#fff'
    },

    messageShow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: responsiveHeight(1.5),
        marginHorizontal: responsiveWidth(0.6),
    },

    messageShowtext: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: responsiveHeight(0.6),
        marginHorizontal: responsiveWidth(0.6),
    },

    datelable: {
        fontWeight: '500',
        color: '#fff',
        fontSize: responsiveFontSize(2.6)
    },

    datetext: {
        color: '#bf3228',
        textAlign: 'center',
        fontSize: responsiveFontSize(2.1)
    },

    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: '#bfbcbb',
        marginTop: responsiveHeight(2),
        marginHorizontal: responsiveWidth(1.7),
    },

    mainsection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    text: {
        fontSize: responsiveFontSize(2.7),
        fontWeight: '400',
        color: '#fff',
        paddingBottom: responsiveHeight(6.5),
    },
})

export default MessageNotificationStyle;