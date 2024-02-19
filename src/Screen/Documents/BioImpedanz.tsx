import React from 'react';
import { View, Text, Image, ImageBackground } from 'react-native';
import { TouchableOpacity } from 'react-native';
import BioImpedanzStyle from '../../Css/DocumentsStyle/BioImpedanzStyle'; 
import Pdf from 'react-native-pdf'; 

interface BioImpedanz {
    checkVisible: any;
    showData: any;
}

const BioImpedanz: React.FC<BioImpedanz> = ({ checkVisible, showData }) => {

    const showDataExt = showData?.split('.').pop()?.toLowerCase();
    const handleShowDataBio = () => {
        switch (showDataExt) {
            case 'pdf':
                return (
                    <Pdf enablePaging={true} horizontal={true} trustAllCerts={false}
                        source={{ uri: showData }} style={{ flex: 1, opacity: 0.9 }}
                    />
                );
            case 'jpg':
            case 'png':
            case 'jpeg':
                return (
                    <Image source={{ uri: showData }} style={BioImpedanzStyle.image} />
                );
            default:
                console.log('Unsupported file format:', showDataExt);
                return null;
        }
    };

    return (
        <ImageBackground source={require('../../Images/cycle_climb.png')} style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={BioImpedanzStyle.header}>
                    <TouchableOpacity onPress={() => checkVisible(false)}>
                        <Image source={require('../../Icons/arrow.png')} style={BioImpedanzStyle.back} />
                    </TouchableOpacity>
                    <Text style={BioImpedanzStyle.mainContent}>
                        BioImpedanz
                    </Text>
                </View>
                    {handleShowDataBio()}
            </View>
        </ImageBackground>
    );
}

export default BioImpedanz;
