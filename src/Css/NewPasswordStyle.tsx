import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const NewPasswordStyle = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: responsiveWidth(2.5),
    },

    logo: {
        alignSelf: 'center',
        marginVertical: responsiveHeight(10),
    },

    inputView: {
        width: responsiveWidth(95),
        color: '#fff'
    },

    inputText: {
        paddingVertical: responsiveHeight(1.8),
        marginHorizontal: responsiveHeight(1),
        marginVertical: responsiveHeight(1),
        backgroundColor: 'rgba(38, 36, 36, 0.82)',
        borderRadius: responsiveHeight(1.5),
        paddingLeft: responsiveHeight(7.3),
        color: '#fff',
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

    newPasswordBtn: {
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

    newPasswordText: {
        color: '#fff',
        fontSize: responsiveFontSize(2.3),
        fontWeight: "500",
    },
})

export default NewPasswordStyle;