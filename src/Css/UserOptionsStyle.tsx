import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import { responsiveWidth } from "react-native-responsive-dimensions";

const UserOptionsStyle = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: responsiveWidth(2.5),
    },

    mainContent: {
        fontSize: responsiveFontSize(3.6),
        fontWeight: '700',
        color: '#fff',
        marginTop: responsiveHeight(3),
        marginBottom: responsiveHeight(2.4),
    },

    icon: {
        width: 23,
        height: 23,
        tintColor: '#fff'
    },

    iconlogo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: responsiveHeight(2),
        paddingBottom: responsiveHeight(2),
        marginHorizontal: responsiveWidth(2),
        borderBottomWidth: 1,
        borderBottomColor: '#d6d2d2'
    },

    text: {
        fontSize: responsiveFontSize(3),
        fontWeight: '500',
        color: '#fff',
        marginHorizontal: responsiveWidth(3.3),
    }
})

export default UserOptionsStyle