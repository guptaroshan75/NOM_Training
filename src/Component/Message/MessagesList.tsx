import React, { useState } from "react";
import { ImageBackground, ScrollView, StyleSheet } from "react-native";
import { TextInput, TouchableOpacity, View } from "react-native";
import Message from "./Message";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { responsiveFontSize, responsiveWidth } from "react-native-responsive-dimensions";

interface MessagesList {
    messages: any[],
    onSendMessage: (newMessage: any) => void
}

const MessagesList: React.FC<MessagesList> = ({ messages, onSendMessage }) => {
    const [textmessage, setTextMessage] = useState("");
    const handleSendMessage = () => {
        if (textmessage.trim() !== "") {
            onSendMessage(textmessage);
            setTextMessage("");
        }
    };

    const sortedMessages = [...messages].sort(
        (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime()
    );

    const truncatePlaceholder = (maxLength: number): string => {
        const text = 'Geben Sie Eine Nachricht Ein'
        if (text?.length > maxLength) {
            return text.slice(0, maxLength + 3) + '...'; 
        }
        return text;
    };
    const maxLength = 25;

    return (
        <ImageBackground source={require('../../Images/cycle_run.png')} style={{ flex: 1 }}>
            <ScrollView style={{ backgroundColor: '#28228c9', flex: 1 }}>
                {sortedMessages.slice(0).reverse().map((message, index) => (
                    <Message key={index} time={message.message_time}
                        isRight={message.current_user === true}
                        isLeft={message.current_user === false}
                        message={message.message}
                    />
                ))}
            </ScrollView>

            <View style={styles.inputText}>
                <View style={styles.inputField}>
                    <TextInput multiline 
                    // placeholder={'Geben Sie Eine Nachricht Ein .....'}
                        style={styles.input} value={textmessage} cursorColor='#3154e0'
                        onChangeText={(textmessage) => setTextMessage(textmessage)}
                        placeholderTextColor="#fff"
                        placeholder={truncatePlaceholder(maxLength)}
                    />
                </View>

                <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
                    <FontAwesome name={"send"} size={23} color='#fff' style={styles.icon} />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default MessagesList;

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

    messageView: {
        maxWidth: "80%",
    },

    timeView: {
        justifyContent: "flex-end",
        paddingLeft: 10,
    },

    message: {
        color: "#000",
        alignSelf: "flex-start",
        fontSize: 15,
    },

    time: {
        color: "#000",
        alignSelf: "flex-end",
        justifyContent: 'flex-end',
        fontSize: 10,
    },

    inputText: {
        paddingHorizontal: responsiveWidth(2.5),
        paddingVertical: responsiveWidth(1.3),
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
    },

    inputField: {
        flexDirection: "row",
        borderWidth: 1,
        borderColor: '#fff',
        flex: 1,
        marginRight: 7,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "space-between",
    },

    input: {
        paddingLeft: responsiveWidth(5),
        color: '#ffff',
        flex: 1,
        fontSize: responsiveFontSize(2),
        height: 50,
        alignSelf: "center",
    },

    sendButton: {
        backgroundColor: '#d1250f',
        borderRadius: 50,
        alignItems: "center",
    },

    icon: {
        position: 'relative',
        height: 50,
        width: 50,
        right: 2,
        top: 12,
        textAlign: 'center',
    }
});