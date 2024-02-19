import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { responsiveFontSize, responsiveHeight } from "react-native-responsive-dimensions";
import { responsiveWidth } from "react-native-responsive-dimensions";

interface ChatHeader {
    userName: string,
    userProfile: string,
    status: string,
}

const ChatHeader: React.FC<ChatHeader> = ({ userName, userProfile, status }) => {
    return (
        <View style={styles.container}>
            <View style={styles.profile}>
                <TouchableOpacity>
                    <Image style={styles.image} source={{ uri: userProfile }} />
                </TouchableOpacity>

                <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.username}> {userName} </Text>
                    <Text style={styles.onlineStatus}> {status} </Text>
                </View>
            </View>
        </View>
    );
};

export default ChatHeader;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: 'rgba(0, 0, 0, 0.43)',
        paddingHorizontal: responsiveWidth(2.5),
        paddingVertical: responsiveHeight(1.5)
    },

    profile: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },

    image: {
        height: 40,
        width: 40,
        borderRadius: 100,
        marginRight: responsiveWidth(2.8)
    },

    username: {
        color: '#fff',
        fontSize: responsiveFontSize(2.5),
        fontWeight: "500",
    },

    onlineStatus: {
        color: '#fff',
        fontSize: responsiveFontSize(1.9),
    },
});