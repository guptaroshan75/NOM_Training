import { StyleSheet } from "react-native";
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import { responsiveWidth } from "react-native-responsive-dimensions";

const EditTrainingStyle = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: responsiveWidth(2.5),
    },

    mainContent: {
        fontSize: responsiveFontSize(2.7),
        fontWeight: '400',
        color: '#fff',
        marginHorizontal: responsiveWidth(1.2),
        textTransform: 'capitalize'
    },

    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: responsiveHeight(2),
        marginBottom: responsiveHeight(2),
        justifyContent: 'space-between',
    },

    back: {
        width: 25,
        height: 25,
        tintColor: '#fff'
    },

    mainpage: {
        backgroundColor: 'rgba(83, 83, 83, 0.54)',
        marginHorizontal: responsiveWidth(2),
        paddingVertical: responsiveWidth(3),
        borderRadius: 20,
        paddingBottom: responsiveHeight(1.8)
    },

    btntext: {
        fontSize: responsiveFontSize(2),
        fontWeight: '400',
        color: '#fff',
        textTransform: 'capitalize'
    },
    
    mainpause: {
        marginTop: responsiveHeight(2),
        backgroundColor: 'rgba(83, 83, 83, 0.54)',
        marginHorizontal: responsiveWidth(2),
        paddingVertical: responsiveWidth(3),
        borderRadius: 20,
    },
    
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(136, 136, 136, 0.95)',
        marginHorizontal: responsiveWidth(3),
        marginBottom: responsiveHeight(2.8),
    },

    mainheadtext: {
        textAlign: 'center',
        fontSize: responsiveFontSize(3.2),
        fontWeight: '500',
        color: '#fff',
        marginVertical: responsiveHeight(1.2)
    },

    mainpageContent: {
        backgroundColor: 'rgba(83, 83, 83, 0.54)',
        marginHorizontal: responsiveWidth(2),
        paddingVertical: responsiveWidth(2),
        borderRadius: 20,
    },

    emojiContainer: {
        flexDirection: 'row',
        marginTop: responsiveHeight(2),
        marginHorizontal: responsiveWidth(1.8)
    },

    maininputView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: responsiveWidth(3),
        marginVertical: responsiveHeight(1)
    },

    lable: {
        color: 'rgba(234, 12, 12, 0.79)',
        fontSize: responsiveFontSize(2.5),
        fontWeight: '500',
    },

    inputText: {
        width: responsiveWidth(45),
        backgroundColor: 'rgba(0, 0, 0, 0.63)',
        borderRadius: responsiveHeight(1.5),
        color: '#fff',
        fontSize: responsiveFontSize(2.2),
        textAlignVertical: 'center',
    },
})

export default EditTrainingStyle