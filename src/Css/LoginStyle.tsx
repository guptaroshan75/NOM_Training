import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import { responsiveWidth } from "react-native-responsive-dimensions";

const LoginStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0a0a',
        alignItems: 'center',
        paddingTop: responsiveHeight(10),
    },

    logo: {
        marginBottom: responsiveHeight(6)
    },

    mainContent: {
        fontSize: responsiveFontSize(3),
        textAlign: 'center',
        fontWeight: '700',
        color: '#fff',
        marginTop: responsiveHeight(3),
        marginBottom: responsiveHeight(1.5)
    },

    mainField: {
        backgroundColor: '#1c1b1b',
        borderTopLeftRadius: responsiveHeight(4.5),
        borderTopRightRadius: responsiveHeight(4.5)
    },

    inputView: {
        width: responsiveWidth(100),
        color: '#fff'
    },

    inputText: {
        paddingVertical: responsiveHeight(1.8),
        marginVertical: responsiveHeight(1.5),
        marginHorizontal: responsiveHeight(1.2),
        backgroundColor: '#292828',
        borderRadius: responsiveHeight(1.5),
        paddingLeft: responsiveHeight(7.6),
        color: '#fff',
        elevation: 3,
    },

    icon: {
        position: "absolute",
        left: responsiveHeight(3),
        top: responsiveHeight(3.4)
    },

    lockIcon: {
        position: "absolute",
        right: responsiveHeight(3),
        top: responsiveHeight(3.4)
    },

    bottom: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: responsiveHeight(1.5),
    },

    forget: {
        marginTop: 2.4,
        marginRight: responsiveWidth(2.5),
        color: '#fff',
    },

    loginBtn: {
        width: responsiveWidth(94.5),
        backgroundColor: "#cf0e0e",
        paddingVertical: responsiveHeight(1.8),
        borderRadius: responsiveHeight(1.5),
        marginHorizontal: responsiveHeight(1.2),
        alignItems: "center",
        justifyContent: "center",
        elevation: 3,
        marginTop: responsiveHeight(3.8),
        marginBottom: responsiveHeight(1.4)
    },

    loginText: {
        color: '#fff',
        fontSize: responsiveFontSize(2.3),
        fontWeight: "500",
    },

    mainor: {
        position: 'relative',
        marginTop: 25,
        marginBottom: 25,
        marginHorizontal: responsiveHeight(5.7),
    },

    ortext: {
        marginTop: responsiveHeight(2.1),
        fontSize: responsiveFontSize(2.5),
        marginBottom: responsiveHeight(2.5),
        position: 'absolute',
        bottom: -27,
        left: 110,
        backgroundColor: '#1c1b1b',
        color: '#fff'
    },

    ortextborder: {
        borderColor: '#cf0e0e',
        borderTopWidth: 1,
        width: 270,
    },

    mainsign: {
        flexDirection: 'row',
        justifyContent: 'center',
    },

    sign: {
        fontSize: 15,
        fontWeight: '600',
        color: '#cf0e0e',
    },
})

export default LoginStyle