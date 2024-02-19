import { View, Text, ImageBackground, Image } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native'
import UpgradeStyle from '../Css/UpgradeStyle'
import CustomeHeader from '../Component/CustomeHeader'

interface Upgrade {
    navigation: any
}

const Upgrade:React.FC<Upgrade> = ({ navigation }) => {
    return (
        <ImageBackground source={require('../Images/cycle_blur.png')} style={{ flex: 1 }}>
            <ScrollView>
                <View style={UpgradeStyle.container}>
                    <CustomeHeader lable={'Upgrade'} navigation={navigation} />

                    <View style={UpgradeStyle.documentsContainer}>
                        <View style={UpgradeStyle.iconlogo}>
                            <Image source={require('../Icons/up.png')}
                                style={UpgradeStyle.right_icon}
                            />
                            <Text style={UpgradeStyle.text}> Aktuelles Paket </Text>
                        </View>
                    </View>

                    <View style={UpgradeStyle.documentsContainer}>
                        <View style={UpgradeStyle.iconlogo}>
                            <Image source={require('../Icons/up.png')}
                                style={UpgradeStyle.right_icon}
                            />
                            <Text style={UpgradeStyle.text}> Upgrade to Advanced </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
    )
}

export default Upgrade