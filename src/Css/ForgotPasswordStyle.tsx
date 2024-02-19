import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const ForgotPasswordStyle = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: responsiveWidth(2.5),
    },

    logo: {
        alignSelf: 'center',
        marginVertical: responsiveHeight(10),
    },
    
    header: {
        color: '#fff',
        fontSize: responsiveFontSize(3),
        fontWeight: '500',
        marginBottom: responsiveHeight(2)
    },

    inputView: {
        width: responsiveWidth(95),
        color: '#fff'
    },

    inputText: {
        paddingVertical: responsiveHeight(1.8),
        marginHorizontal: responsiveHeight(1),
        backgroundColor: 'rgba(38, 36, 36, 0.82)',
        borderRadius: responsiveHeight(1.5),
        paddingLeft: responsiveHeight(7),
        color: '#fff',
    },

    icon: {
        position: "absolute",
        left: responsiveHeight(2.6),
        top: responsiveHeight(1.9)
    },

    forgotBtn: {
        width: responsiveWidth(91),
        backgroundColor: "#cf0e0e",
        paddingVertical: responsiveHeight(1.8),
        borderRadius: responsiveHeight(1.5),
        marginHorizontal: responsiveHeight(1.1),
        alignItems: "center",
        justifyContent: "center",
        elevation: 3,
        marginTop: responsiveHeight(2.4),
        marginBottom: responsiveHeight(1.4)
    },

    forgotText: {
        color: '#fff',
        fontSize: responsiveFontSize(2.3),
        fontWeight: "500",
    },
})

export default ForgotPasswordStyle;