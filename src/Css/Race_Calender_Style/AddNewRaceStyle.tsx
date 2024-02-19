import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const AddNewRaceStyle = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: responsiveWidth(3.5),
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: responsiveHeight(4),
    },

    back: {
        width: 27,
        height: 25,
        tintColor: '#fff'
    },

    mainContent: {
        fontSize: responsiveFontSize(3.2),
        fontWeight: '400',
        color: '#fff',
        marginHorizontal: responsiveWidth(4),
        textTransform: 'capitalize'
    },

    date: {
        width: responsiveWidth(95),
        marginVertical: responsiveHeight(1.2),
    },

    teleCalender: {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.63)',
        flexDirection: 'row',
        marginHorizontal: responsiveHeight(1),
        borderRadius: responsiveHeight(1.5),
        paddingVertical: responsiveHeight(2),
        paddingHorizontal: responsiveHeight(1.6),
    },

    selectDate: {
        color: '#fff',
        textAlign: 'center',
        paddingLeft: responsiveHeight(2),
        fontSize: responsiveFontSize(2.2)
    },

    inputView: {
        width: responsiveWidth(95),
    },

    inputText: {
        paddingVertical: responsiveHeight(2),
        marginHorizontal: responsiveHeight(1),
        marginVertical: responsiveHeight(1),
        backgroundColor: 'rgba(0, 0, 0, 0.63)',
        borderRadius: responsiveHeight(1.5),
        paddingLeft: responsiveHeight(6.3),
        color: '#fff',
        fontSize: responsiveFontSize(2.2)
    },

    icon: {
        position: "absolute",
        left: responsiveHeight(2.3),
        top: responsiveHeight(3),
    },

    addBtn: {
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

    addText: {
        color: '#fff',
        fontSize: responsiveFontSize(2.3),
        fontWeight: "500",
    },
})

export default AddNewRaceStyle;