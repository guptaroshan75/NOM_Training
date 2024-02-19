import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const ProfileStyle = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: responsiveWidth(2.5),
    },

    profile: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },

    main: {
        flexDirection: "row", 
        justifyContent: "center", 
        alignItems: "center",
    },

    profileLogo: {
        width: 100,
        height: 100,
        borderRadius: 100,
        marginBottom: responsiveHeight(2.5)
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

    icon: {
        position: "absolute",
        left: responsiveHeight(3),
        top: responsiveHeight(3)
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

    inputPhone: {
        paddingVertical: responsiveHeight(1.8),
        marginHorizontal: responsiveHeight(1),
        marginVertical: responsiveHeight(1),
        backgroundColor: 'rgba(0, 0, 0, 0.59)',
        borderRadius: responsiveHeight(1.5),
        paddingLeft: responsiveHeight(14),
        color: '#fff',
    },

    date: {
        width: responsiveWidth(95),
        marginVertical: responsiveHeight(1.2),
    },

    teleCalender: {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.59)',
        flexDirection: 'row',
        marginHorizontal: responsiveHeight(1),
        borderRadius: responsiveHeight(1.5),
        paddingVertical: responsiveHeight(1.8),
        paddingHorizontal: responsiveHeight(1.6),
    },

    selectDate: {
        color: '#fff',
        textAlign: 'center',
        paddingLeft: responsiveHeight(2),
    },

    profileBtn: {
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

    profileText: {
        color: '#fff',
        fontSize: responsiveFontSize(2.3),
        fontWeight: "500",
    },
})

export default ProfileStyle;