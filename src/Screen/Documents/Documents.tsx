import { View, Text, ImageBackground, Image, TouchableOpacity, Modal } from 'react-native'
import React, { useState } from 'react'
import { ScrollView } from 'react-native'
import CustomeHeader from '../../Component/CustomeHeader'
import DocumentsStyle from '../../Css/DocumentsStyle/DocumentsStyle'
import Toast from 'react-native-toast-message'
import Leistungsdiagnostik from './Leistungsdiagnostik'
import BioImpedanz from './BioImpedanz'
import Ernährungsplan from './Ernährungsplan'
import { useDispatch } from 'react-redux'
import { ThunkDispatch } from '@reduxjs/toolkit'
import { Document_Post } from '../../Redux/Features/DocumentSlice'
import CustomeDocShow from '../../Component/CustomeDocShow'

interface Documents {
    navigation: any
}

const Documents: React.FC<Documents> = ({ navigation }) => {
    const [leistungsdiagnostik, setLeistungsdiagnostik] = useState(false);
    const [bioImpedanz, setBioImpedanz] = useState(false);
    const [ernährungsplan, setErnährungsplan] = useState(false);

    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleBio, setIsVisibleBio] = useState(false);
    const [isVisibleNutriton, setIsVisibleNutriton] = useState(false);

    const [selectedDocument, setSelectedDocument] = useState('');

    const [response, setResponse] = useState('');
    const [responseBio, setResponseBio] = useState('');
    const [responseNutriton, setResponseNutriton] = useState('');
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const checkVisible = (item: boolean) => {
        setLeistungsdiagnostik(item)
        setBioImpedanz(item)
        setErnährungsplan(item)
    }

    const handlePerformance = async () => {
        const document_cat = { name: 'name_proof' }
        try {
            const response: any = await dispatch(Document_Post(document_cat));
            const data = response.payload.data;
            if (data && data.length > 0) {
                setIsVisible(true)
                setResponse(data)
            } else {
                Toast.show({
                    type: 'Toast', text1: 'No Document Found',
                    visibilityTime: 2000, position: "bottom"
                });
            }
        } catch (error) {
            return error
        }

    }

    const handleBioImpedance = async () => {
        const document_cat = { name: 'consectetur' }
        try {
            const response = await dispatch(Document_Post(document_cat));
            const data = response.payload.data;
            if (data && data.length > 0) {
                setIsVisibleBio(true)
                setResponseBio(data)
            } else {
                Toast.show({
                    type: 'Toast', text1: 'No Document Found',
                    visibilityTime: 2000, position: "bottom"
                });
            }
        } catch (error) {
            return error
        }
    }

    const handleNutritionPlan = async () => {
        const document_cat = { name: 'adipicing' }
        try {
            const response = await dispatch(Document_Post(document_cat));
            const data = response.payload.data;
            if (data && data.length > 0) {
                setIsVisibleNutriton(true)
                setResponseNutriton(data)
            } else {
                Toast.show({
                    type: 'Toast', text1: 'No Document Found',
                    visibilityTime: 2000, position: "bottom"
                });
            }
        } catch (error) {
            return error
        }
    }

    const handleDocumentPerformance = (documentUrl: string) => {
        setSelectedDocument(documentUrl);
        setIsVisible(false);
        setLeistungsdiagnostik(true);
    };

    const handleDocumentBio = (documentUrl: string) => {
        setSelectedDocument(documentUrl);
        setIsVisibleBio(false);
        setBioImpedanz(true)
    };

    const handleDocumenNutriton = (documentUrl: string) => {
        setSelectedDocument(documentUrl);
        setIsVisibleNutriton(false);
        setErnährungsplan(true)
    };

    return (
        <ImageBackground source={require('../../Images/cycle_blur.png')} style={{ flex: 1 }}>
            <ScrollView>
                <View style={DocumentsStyle.container}>
                    <CustomeHeader lable={'Dokumente'} navigation={navigation} />

                    <TouchableOpacity onPress={handlePerformance}>
                        <View style={DocumentsStyle.documentsContainer}>
                            <View style={DocumentsStyle.iconlogo}>
                                <Image source={require('../../Icons/right-chevron.png')}
                                    style={DocumentsStyle.right_icon}
                                />
                                <Text style={DocumentsStyle.text}> Leistungsdiagnostik </Text>
                            </View>
                            <Image source={require('../../Icons/attach-file.png')}
                                style={DocumentsStyle.right_icon}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleBioImpedance}>
                        <View style={DocumentsStyle.documentsContainer}>
                            <View style={DocumentsStyle.iconlogo}>
                                <Image source={require('../../Icons/right-chevron.png')}
                                    style={DocumentsStyle.right_icon}
                                />
                                <Text style={DocumentsStyle.text}> Bio Impedanz Messung </Text>
                            </View>
                            <Image source={require('../../Icons/attach-file.png')}
                                style={DocumentsStyle.right_icon}
                            />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleNutritionPlan}>
                        <View style={DocumentsStyle.documentsContainer}>
                            <View style={DocumentsStyle.iconlogo}>
                                <Image source={require('../../Icons/right-chevron.png')}
                                    style={DocumentsStyle.right_icon}
                                />
                                <Text style={DocumentsStyle.text}> Ernährungsplan </Text>
                            </View>
                            <Image source={require('../../Icons/attach-file.png')}
                                style={DocumentsStyle.right_icon}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            {selectedDocument && (
                <Modal animationType="none" transparent={false} visible={leistungsdiagnostik}
                    onRequestClose={() => { setLeistungsdiagnostik(false) }}
                >
                    <Leistungsdiagnostik checkVisible={checkVisible}
                        showData={selectedDocument}
                    />
                </Modal>
            )}

            {selectedDocument && (
                <Modal animationType="none" transparent={false}
                    visible={bioImpedanz} onRequestClose={() => { setBioImpedanz(false) }}
                >
                    <BioImpedanz showData={selectedDocument} checkVisible={checkVisible} />
                </Modal>
            )}

            {selectedDocument && (
                <Modal animationType="none" transparent={false}
                    visible={ernährungsplan} onRequestClose={() => { setErnährungsplan(false) }}
                >
                    <Ernährungsplan showData={selectedDocument} checkVisible={checkVisible} />
                </Modal>
            )}

            {isVisible && (
                <CustomeDocShow isVisible={isVisible} setIsVisible={setIsVisible}
                    showDocumentUrl={handleDocumentPerformance} response={response}
                />
            )}

            {isVisibleBio && (
                <CustomeDocShow isVisible={isVisibleBio} setIsVisible={setIsVisibleBio}
                    showDocumentUrl={handleDocumentBio} response={responseBio}
                />
            )}

            {isVisibleNutriton && (
                <CustomeDocShow isVisible={isVisibleNutriton} setIsVisible={setIsVisibleNutriton}
                    showDocumentUrl={handleDocumenNutriton} response={responseNutriton}
                />
            )}
        </ImageBackground>
    )
}

export default Documents