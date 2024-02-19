import { View, Text, Modal, TouchableWithoutFeedback, StyleSheet, Linking } from 'react-native'
import React from 'react'
import { responsiveHeight } from 'react-native-responsive-dimensions'
import { responsiveFontSize } from 'react-native-responsive-dimensions'
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface CustomeDocShow {
    isVisible: any,
    setIsVisible: any,
    response: any
   showDocumentUrl: (documentUrl: string) => void;
}

const CustomeDocShow: React.FC<CustomeDocShow> = ({
    setIsVisible, isVisible, showDocumentUrl, response
}) => {
    if (!Array.isArray(response)) {
        return null;
    }

    const pdfDocuments = response.filter(url => url.endsWith('.pdf'));
    const imageDocuments = response.filter(url => url.endsWith('.png')
        || url.endsWith('.jpg') || url.endsWith('.jpeg'));
    const docxDocuments = response.filter(url => url.endsWith('.docx')
    || url.endsWith('.doc') || url.endsWith('.xlsx'));

    const handleModalClose = () => {
        if (isVisible) {
            setIsVisible(false);
        }
    };

    const handleDocumentPress = (documentUrl: string) => {
        if (documentUrl.endsWith('.pdf')) {
            showDocumentUrl(documentUrl);
        } else {
            Linking.openURL(documentUrl).catch((err) => console.error('An error occurred', err));
        }
    };

    const handleModalInnerPress = () => { };
    
    return (
        <Modal animationType={'none'} transparent={true} visible={isVisible}
            onRequestClose={() => setIsVisible(false)}
        >
            <TouchableWithoutFeedback onPress={handleModalClose}>
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        {pdfDocuments.map((documentUrl: string, index: number) => (
                            <TouchableOpacity key={index} style={styles.docItem}
                                onPress={() => showDocumentUrl(documentUrl)}
                            >
                                <View style={styles.docInfo}>
                                    <Icon name="file-pdf-o" size={27} color="red" />
                                    <Text style={styles.docTitle}>Pdf Documents {index + 0}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}

                        {imageDocuments.map((documentUrl: string, index: number) => (
                            <TouchableOpacity key={index} style={styles.docItem}
                                onPress={() => showDocumentUrl(documentUrl)}
                            >
                                <View style={styles.docInfo}>
                                    <Icon name="file-image-o" size={27} color="green" />
                                    <Text style={styles.docTitle}>Images {index + 0}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}

                        {docxDocuments.map((documentUrl: string, index: number) => (
                            <TouchableOpacity key={index} style={styles.docItem}
                                onPress={() => handleDocumentPress(documentUrl)}
                            >
                                <View style={styles.docInfo}>
                                    <Icon name="file-text-o" size={27} color="blue" />
                                    <Text style={styles.docTitle}>Docs File {index + 0}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    )
}

export default CustomeDocShow

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    docInfo: {
        alignItems: 'center',
        flexDirection: 'row',
    },

    docItem: {
        overflow: 'hidden',
        backgroundColor: '#aaa',
        marginBottom: responsiveHeight(1.5),
        padding: 10,
        borderRadius: 10,
    },
    
    docTitle: {
        fontSize: responsiveFontSize(1.9),
        color: '#fff',
        fontWeight: '500',
        marginLeft: responsiveHeight(2),
    },

    modalContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingHorizontal: 13,
        paddingVertical: 15,
        paddingBottom: responsiveHeight(0.5),
        width: '90%',
    },
});