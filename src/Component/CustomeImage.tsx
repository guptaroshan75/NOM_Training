import React from 'react'
import { View, Text, StyleSheet, Image, Modal, TouchableWithoutFeedback } from 'react-native'
import { TouchableOpacity } from 'react-native';
import { responsiveHeight, responsiveFontSize } from "react-native-responsive-dimensions";
import { responsiveWidth } from "react-native-responsive-dimensions";
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

interface CustomeImage {
    isVisible: any,
    setIsVisible: any,
    setSelectedImageURI: (imageURI: any) => void;
}

const CustomeImage: React.FC<CustomeImage> = ({
    setIsVisible, isVisible, setSelectedImageURI
}) => {
    const takeImage = async () => {
        setIsVisible(false);
        const takePhoto = await launchCamera({
            mediaType: 'photo',
            quality: 0,
        });

        if (!takePhoto.didCancel && takePhoto.assets && takePhoto.assets.length > 0) {
            setSelectedImageURI(takePhoto.assets[0].uri);
        }
    };

    const selectImage = async () => {
        setIsVisible(false)
        const selectGallery = await launchImageLibrary({
            mediaType: 'photo',
            quality: 0,
        })
        if (!selectGallery.didCancel && selectGallery.assets && selectGallery.assets.length > 0) {
            setSelectedImageURI(selectGallery.assets[0].uri);
        }
    }

    const handleModalClose = () => {
        if (isVisible) {
            setIsVisible(false);
        }
    };

    const handleModalInnerPress = () => { };

    return (
        <Modal transparent={true} animationType={'none'} visible={isVisible}
            onRequestClose={() => setIsVisible(false)}
        >
            <TouchableWithoutFeedback onPress={handleModalClose}>
                <View style={styles.modalBackground}>
                    <TouchableWithoutFeedback onPress={handleModalInnerPress}>
                        <View style={styles.modelContainer}>
                            <Text style={styles.choose}> Choose Option </Text>

                            <TouchableOpacity onPress={selectImage}>
                                <View style={styles.iconlogo}>
                                    <Image source={require('../Icons/gallery.png')}
                                        style={styles.icon}
                                    />
                                    <Text style={styles.text}> Gallery </Text>
                                </View>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={takeImage}>
                                <View style={styles.iconlogo}>
                                    <Image source={require('../Icons/photo-camera.png')}
                                        style={styles.icon}
                                    />
                                    <Text style={styles.text}> Camera </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>

                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default CustomeImage

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#00000040',
    },

    modelContainer: {
        backgroundColor: '#fff',
        height: responsiveHeight(27),
        width: responsiveWidth(80),
        borderRadius: 20,
        borderTopWidth: responsiveWidth(1)
    },

    choose: {
        fontSize: responsiveFontSize(2.6),
        color: '#42abff',
        fontWeight: '500',
        marginLeft: responsiveWidth(5.7),
        marginVertical: responsiveHeight(2),
    },

    iconlogo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: responsiveHeight(2),
        paddingBottom: responsiveHeight(2),
        marginHorizontal: responsiveWidth(8),
        borderTopWidth: 0.5,
        borderTopColor: '#42abff'
    },

    icon: {
        width: 25,
        height: 25,
        tintColor: '#42abff',
        marginHorizontal: responsiveWidth(4),
    },

    text: {
        fontSize: responsiveFontSize(2.4),
        marginLeft: responsiveWidth(6),
    },
})
