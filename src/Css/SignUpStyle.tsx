import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import { responsiveWidth } from "react-native-responsive-dimensions";

const SignUpStyle = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: responsiveWidth(2.5)
    },

    mainContent: {
        fontSize: responsiveFontSize(3.6),
        fontWeight: '700',
        color: '#fff',
        marginTop: responsiveHeight(3),
        marginBottom: responsiveHeight(1.5),
    },

    mainField: {
        flex: 1,
        zIndex: 1
    },

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
    },

    inputPhone: {
        paddingVertical: responsiveHeight(1.8),
        marginHorizontal: responsiveHeight(1),
        marginVertical: responsiveHeight(1),
        backgroundColor: 'rgba(0, 0, 0, 0.59)',
        borderRadius: responsiveHeight(1.5),
        paddingLeft: responsiveHeight(14),
        color: '#fff',
        elevation: 3,
    },

    icon: {
        position: "absolute",
        left: responsiveHeight(3),
        top: responsiveHeight(3)
    },

    lockIcon: {
        position: "absolute",
        right: responsiveHeight(3),
        top: responsiveHeight(2.8)
    },

    country_code: {
        marginVertical: responsiveHeight(1.2),
        marginHorizontal: responsiveHeight(1.2),
        position: "absolute",
        zIndex: 111,
        borderTopLeftRadius: responsiveHeight(1.5),
        borderBottomLeftRadius: responsiveHeight(1.5),
    },

    teleCode: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.59)',
        flexDirection: 'row',
        borderTopLeftRadius: responsiveHeight(1.5),
        borderBottomLeftRadius: responsiveHeight(1.5),
        paddingVertical: responsiveHeight(1.8),
        paddingHorizontal: responsiveHeight(1.6),
        width: responsiveWidth(25),
    },

    phonenumber: {
        color: "#fff",
        fontSize: 17,
    },

    date: {
        width: responsiveWidth(95),
        marginVertical: responsiveHeight(1.2),
    },

    teleCalender: {
        alignItems: 'center',
        backgroundColor: '#292828',
        flexDirection: 'row',
        marginHorizontal: responsiveHeight(1),
        borderRadius: responsiveHeight(1.5),
        paddingVertical: responsiveHeight(1.8),
        paddingHorizontal: responsiveHeight(1.6),
    },

    selectDate: {
        color: '#fff',
        textAlign: 'center',
        paddingLeft: responsiveHeight(2.8),
    },

    bottom: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: 'center',
        marginTop: responsiveHeight(1.5),
        marginLeft: responsiveWidth(20)
    },

    signUpBtn: {
        width: responsiveWidth(90),
        backgroundColor: "#cf0e0e",
        paddingVertical: responsiveHeight(1.8),
        borderRadius: responsiveHeight(1.5),
        marginHorizontal: responsiveHeight(1),
        alignItems: "center",
        justifyContent: "center",
        elevation: 3,
        marginTop: responsiveHeight(2.4),
        marginBottom: responsiveHeight(1.4)
    },

    signUpText: {
        color: '#fff',
        fontSize: responsiveFontSize(2.3),
        fontWeight: "500",
    },
})

export default SignUpStyle