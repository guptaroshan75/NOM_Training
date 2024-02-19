import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import { responsiveHeight, responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
import React from 'react'

interface CustomeAlert {
    isVisible: boolean;
    lable: any;
    message: string;
    closeModel: () => void;
}

const CustomeAlert: React.FC<CustomeAlert> = ({ lable, message, closeModel, isVisible }) => {
    const labelColor = lable === 'success' ? '#04b819' : 'red';

    return (
        <Modal animationType='slide' transparent={true} visible={isVisible} onRequestClose={closeModel}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={[styles.modelHeader, { color: labelColor }]}>{lable} !</Text>

                    <Text style={styles.modalText}>{message}</Text>

                    <TouchableOpacity onPress={closeModel}>
                        <View style={styles.modelbtn}>
                            <Text style={styles.modelokbtn}> OK </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default CustomeAlert

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },

    modalContent: {
        backgroundColor: '#fff',
        paddingHorizontal: 12,
        paddingVertical: responsiveHeight(1.4),
        borderRadius: responsiveHeight(2),
        elevation: responsiveHeight(1),
        justifyContent: 'flex-start',
        width: "90%",
    },

    modelHeader: {
        paddingVertical: responsiveHeight(1),
        fontSize: responsiveFontSize(2.8),
        color: "red",
        fontWeight: "500",
        textTransform: 'capitalize'
    },

    modalText: {
        paddingBottom: responsiveHeight(1),
        fontSize: responsiveFontSize(2.3),
        color: "#202020",
        lineHeight: responsiveHeight(3.2)
    },

    modelbtn: {
        alignItems: "flex-end",
        justifyContent: 'flex-end',
        marginTop: 4
    },

    modelokbtn: {
        fontSize: responsiveFontSize(2),
        color: "#cf0e0e",
        borderWidth: 1,
        borderColor: '#cf0e0e',
        paddingHorizontal: responsiveHeight(1.4),
        paddingVertical: responsiveHeight(1),
        borderRadius: responsiveHeight(3)
    }
})
