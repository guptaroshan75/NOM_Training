import { StyleSheet } from "react-native";
import { responsiveHeight, responsiveWidth } from "react-native-responsive-dimensions";
import { responsiveFontSize } from "react-native-responsive-dimensions";

const DocumentsStyle = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: responsiveWidth(3.5),
    },

    documentsContainer: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#d6d2d2',
    },

    right_icon: {
        width: 25,
        height: 23,
        tintColor: '#fff'
    },

    iconlogo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: responsiveHeight(2.2),
        paddingBottom: responsiveHeight(2.2),
    },

    text: {
        fontSize: responsiveFontSize(2.7),
        fontWeight: '400',
        color: '#fff',
        marginHorizontal: responsiveWidth(2),
    }
})

export default DocumentsStyle;