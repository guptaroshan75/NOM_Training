import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import { responsiveWidth } from "react-native-responsive-dimensions";

const YourTrainingStyle = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: responsiveWidth(2.5),
    },

    mainContent: {
        fontSize: responsiveFontSize(3.2),
        fontWeight: '400',
        color: '#fff',
        marginHorizontal: responsiveWidth(4),
        textTransform: 'capitalize'
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: responsiveHeight(4),
        marginBottom: responsiveHeight(3),
    },

    back: {
        width: 27,
        height: 25,
        tintColor: '#fff'
    },

    date: {
        color: '#fff',
        fontSize: responsiveFontSize(2.3),
        textAlign: 'center',
        fontWeight: '500'
    },

    datefound: {
        flex: 1,
        color: '#fff',
        fontSize: responsiveFontSize(3),
        textAlign: 'center',
        marginVertical: responsiveHeight(35)
    },

    mainbtn: {
        marginHorizontal: responsiveWidth(2),
        backgroundColor: 'rgba(83, 83, 83, 0.54)',
        flexDirection: 'row',
        borderRadius: 25,
        marginTop: responsiveHeight(3),
        marginBottom: responsiveHeight(3)
    },

    editbtn: {
        width: 25,
        height: 25,
        tintColor: '#fff',
        marginHorizontal: responsiveWidth(7)
    },

    btntext: {
        fontSize: responsiveFontSize(2.4),
        fontWeight: '500',
        color: '#fff',
        paddingVertical: responsiveWidth(3.5),
    },

    head: {
        borderRightWidth: 1,
        borderRightColor: 'rgba(136, 136, 136, 0.95)',
        alignItems: 'center',
        width: '25.4%'
    },

    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(136, 136, 136, 0.95)',
        marginHorizontal: responsiveWidth(3),
        marginBottom: responsiveHeight(2.8),
    },

    mainbox: {
        backgroundColor: 'rgba(83, 83, 83, 0.54)',
        marginHorizontal: responsiveWidth(2),
        paddingVertical: responsiveWidth(3),
        borderRadius: 20,
    },

    mainheadtext: {
        textAlign: 'center',
        fontSize: responsiveFontSize(3.2),
        fontWeight: '500',
        color: '#fff',
    },

    text: {
        fontSize: responsiveFontSize(2.2),
        fontWeight: '400',
        color: '#fff',
        textAlign: 'left',
        marginHorizontal: responsiveWidth(4),
        marginBottom: 2
    },

    pausemain: {
        flexDirection: 'row', 
        justifyContent: 'space-between',
        marginHorizontal: responsiveWidth(2),
        marginVertical: responsiveWidth(3.5),
    },

    pausetext: {
        fontSize: responsiveFontSize(2.6),
        color: 'rgba(234, 12, 12, 0.79)'
    }
})

export default YourTrainingStyle