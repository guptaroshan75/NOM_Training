import { View, Text, Image, ImageBackground } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';
import ErnährungsplanStyle from '../../Css/DocumentsStyle/ErnährungsplanStyle';
import Pdf from 'react-native-pdf';

interface Ernährungsplan {
    checkVisible: any
    showData: any;
}

const Ernährungsplan: React.FC<Ernährungsplan> = ({ checkVisible, showData }) => {

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
                    <Image source={{ uri: showData }} style={ErnährungsplanStyle.image} />
                );
            default:
                return null;
        }
    };

    return (
        <ImageBackground source={require('../../Images/cycle_climb.png')} style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={ErnährungsplanStyle.header}>
                    <TouchableOpacity onPress={() => checkVisible(false)}>
                        <Image source={require('../../Icons/arrow.png')} 
                        style={ErnährungsplanStyle.back} 
                        />
                    </TouchableOpacity>
                    <Text style={ErnährungsplanStyle.mainContent}>
                        Ernährungsplan
                    </Text>
                </View>
                    {handleShowDataBio()}
            </View>
        </ImageBackground>
    )
}

export default Ernährungsplan