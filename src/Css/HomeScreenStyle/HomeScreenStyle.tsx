import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import { responsiveWidth } from "react-native-responsive-dimensions";

const HomeScreenStyle = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: responsiveWidth(2.5),
    },

    scrollView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    mainContent: {
        fontSize: responsiveFontSize(3.5),
        fontWeight: '700',
        color: '#fff',
        marginTop: responsiveHeight(3.4),
        marginBottom: responsiveHeight(1.5),
    },

    homescreen: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: responsiveHeight(0.8),
    },

    userLogo: {
        width: 54,
        height: 54,
        borderRadius: 100,
        marginLeft: responsiveWidth(2),
    },

    userName: {
        fontSize: responsiveFontSize(2.5),
        color: '#fff',
        fontWeight: '500'
    },

    userEmail: {
        color: '#fff',
        marginTop: responsiveHeight(0.1),
    },

    maintext: {
        fontSize: responsiveFontSize(2),
        fontWeight: '400',
        color: '#fff',
        textAlign: 'center',
        marginTop: responsiveHeight(3.4),
        marginBottom: responsiveHeight(2.5),
    },

    date: {
        width: responsiveWidth(95),
        marginVertical: responsiveHeight(1.2),
        marginBottom: responsiveHeight(2.5),
        marginTop: responsiveHeight(2.5),
    },

    teleCalender: {
        alignItems: 'center',
        backgroundColor: '#cf0e0e',
        flexDirection: 'row',
        marginHorizontal: responsiveHeight(1),
        borderRadius: responsiveHeight(1.5),
        paddingVertical: responsiveHeight(1.5),
        paddingHorizontal: responsiveHeight(1.6),
    },

    textFormate: {
        fontSize: responsiveFontSize(3),
        fontWeight: '400',
        color: '#fff',
        textAlign: 'center',
        marginTop: responsiveHeight(1.5),
    },

    tablecontainer: {
        flex: 1,
        marginHorizontal: responsiveWidth(2.5),
        marginBottom: responsiveWidth(2.5)
    },

    head: {
        height: 55,
        backgroundColor: '#85807f',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },

    text: {
        color: '#fff',
        textAlign: 'center',
    },

    row: {
        flexDirection: 'row',
        borderBottomWidth: 0.8,
        borderBottomColor: '#525151',
        height: 43,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#0f0f0f'
    },

    search: {
        width: 27,
        height: 27,
        tintColor: '#fff'
    },

    dataWrapper: {
        maxHeight: 350,
        marginTop: -1,
    },

    showDate: {
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0, 0, 0, 0.63)',
        flexDirection: 'column',
        marginHorizontal: responsiveHeight(1),
        borderRadius: responsiveHeight(1.5),
        paddingHorizontal: responsiveHeight(1.5),
        marginTop: responsiveHeight(3)
    },

    border: {
        borderLeftWidth: 1.8,
        borderColor: '#fff'
    },

    messageShow: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginVertical: responsiveHeight(2.1)
    },

    datelable: {
        fontWeight: '800',
        color: '#fff',
        fontSize: responsiveFontSize(2)
    },

    datetext: {
        color: '#fff',
        textAlign: 'center',
        fontSize: responsiveFontSize(1.8)
    },

    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: '#6b6b6b',
    },

    icon: {
        width: 20,
        height: 20,
        tintColor: '#fff'
    },
})

export default HomeScreenStyle