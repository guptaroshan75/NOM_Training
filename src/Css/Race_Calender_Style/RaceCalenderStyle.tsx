import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const RaceCalenderStyle = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: responsiveWidth(3.5),
        // backgroundColor: '#aaa'
    },

    mainfield: {
        width: responsiveWidth(95),
    },

    addRaceField: {
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.63)',
        flexDirection: 'row',
        marginHorizontal: responsiveHeight(1),
        borderRadius: responsiveHeight(1.5),
        paddingVertical: responsiveHeight(1.5),
        paddingHorizontal: responsiveHeight(1.3),
    },

    showRaceField: {
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0, 0, 0, 0.63)',
        flexDirection: 'column',
        marginHorizontal: responsiveHeight(1),
        borderRadius: responsiveHeight(1.5),
        paddingHorizontal: responsiveHeight(1.5),
        marginTop: responsiveHeight(3)
    },

    showDataParent: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingVertical: responsiveHeight(1),
    },

    showData: {
        alignItems: 'center',
        flexDirection: 'row',
    },

    icon: {
        width: 24,
        height: 24,
        tintColor: '#fff',
        marginRight: responsiveWidth(1.5)
    },

    text: {
        color: '#fff',
        textAlign: 'center',
        paddingLeft: responsiveHeight(1.8),
        fontSize: responsiveFontSize(2.3)
    },
})

export default RaceCalenderStyle;