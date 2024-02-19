import { View, Text, TouchableOpacity, Image } from 'react-native';
import { ImageBackground } from 'react-native';
import React from 'react';
import LeistungsdiagnostikStyle from '../../Css/DocumentsStyle/LeistungsdiagnostikStyle';
import Pdf from 'react-native-pdf';

interface Leistungsdiagnostik {
    checkVisible: any;
    showData: any;
}

const Leistungsdiagnostik: React.FC<Leistungsdiagnostik> = ({ checkVisible, showData }) => {    
    console.log(showData);

    const showDataExt = showData?.split('.').pop()?.toLowerCase();
    const handleShowData = () => {
        switch (showDataExt) {
            case 'pdf':
                return (
                    <Pdf enablePaging={true} horizontal={true} trustAllCerts={false}
                        source={{ uri: showData }} style={{ flex: 1, opacity: 0.9 }}
                    />
                );
            case 'png':
            case 'jpg':
            case 'jpeg':
                return <Image source={{ uri: showData }} style={LeistungsdiagnostikStyle.image} />
            default:
                return null;
        }
    };

    return (
        <ImageBackground source={require('../../Images/cycle_climb.png')} style={{ flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={LeistungsdiagnostikStyle.header}>
                    <TouchableOpacity onPress={() => checkVisible(false)}>
                        <Image source={require('../../Icons/arrow.png')}
                            style={LeistungsdiagnostikStyle.back}
                        />
                    </TouchableOpacity>
                    <Text style={LeistungsdiagnostikStyle.mainContent}>
                        Leistungsdiagnostik
                    </Text>
                </View>
                {handleShowData()}
            </View>
        </ImageBackground>
    );
};

export default Leistungsdiagnostik;
