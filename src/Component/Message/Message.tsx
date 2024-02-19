import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { responsiveWidth } from "react-native-responsive-dimensions";

interface Message {
    message: string
    time: string,
    isLeft: any,
    isRight: any,
}

const Message: React.FC<Message> = ({ time, isLeft, message, isRight }) => {
    const isOnLeft = () => {
        const baseStyle: any = {
            borderTopRightRadius: 0,
        };

        if (isLeft) {
            return {
                ...baseStyle,
                alignSelf: "flex-start",
                backgroundColor: "#23c6eb",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                borderBottomLeftRadius: 0,
            };
        } else if (isRight) {
            return {
                ...baseStyle,
                alignSelf: "flex-end",
                backgroundColor: "rgba(213, 155, 7, 1)",
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 10,
            };
        }
    };

    return (
        <View style={styles.container}>
            <View style={[styles.messageContainer, isOnLeft()]}>
                <View style={{ maxWidth: "80%" }}>
                    <Text style={styles.message}>{message}</Text>
                </View>
                <View style={styles.timeView}>
                    <Text style={styles.time}> {time} </Text>
                </View>
            </View>
        </View>
    );
};

export default Message

const styles = StyleSheet.create({
    container: {
        paddingVertical: responsiveWidth(1),
        marginVertical: responsiveWidth(1),
    },

    messageContainer: {
        backgroundColor: '#dbee28',
        maxWidth: "80%",
        alignSelf: "flex-end",
        flexDirection: "row",
        borderRadius: 15,
        paddingHorizontal: 10,
        marginHorizontal: 10,
        textAlign: 'justify',
        paddingTop: 5,
        paddingBottom: 10,
    },

    timeView: {
        justifyContent: "flex-end",
        paddingLeft: 10,
    },

    message: {
        color: "#fff",
        alignSelf: "flex-start",
        fontSize: 15,
    },

    time: {
        color: "#fff",
        alignSelf: "flex-end",
        justifyContent: 'flex-end',
        fontSize: 10,
    },
});
