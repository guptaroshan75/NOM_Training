import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const BioImpedanzStyle = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: responsiveWidth(4.5),
        paddingVertical: responsiveHeight(2),
        backgroundColor: '#8a9191'
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

    image: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        width: responsiveWidth(90),
        resizeMode: 'contain',
    },
})

export default BioImpedanzStyle;