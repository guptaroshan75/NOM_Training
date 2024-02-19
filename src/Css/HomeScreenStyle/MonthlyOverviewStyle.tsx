import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import { responsiveWidth } from "react-native-responsive-dimensions";

const MonthlyOverviewStyle = StyleSheet.create({
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
        marginTop: responsiveHeight(3),
        marginBottom: responsiveHeight(3),
    },

    back: {
        width: 27,
        height: 25,
        tintColor: '#fff'
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
    },

    addText: {
        color: '#fff',
        fontSize: responsiveFontSize(2.3),
        fontWeight: "500",
    },
})

export default MonthlyOverviewStyle