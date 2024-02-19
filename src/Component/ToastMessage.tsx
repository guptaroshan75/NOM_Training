import { StyleSheet, Text, View } from 'react-native';
import { responsiveFontSize } from 'react-native-responsive-dimensions';

const ToastMessage = {
    Toast: (props: any) => (
        <View style={styles.container}>
            <Text style={styles.text}>{props.text1}</Text>
        </View>
    ),

    TabsAbove: (props: any) => (
        <View style={styles.tabcontainer}>
            <Text style={styles.text}>{props.text1}</Text>
        </View>
    ),

    TabsTopOnBottom: (props: any) => (
        <View style={styles.tabOnAboveBottom}>
            <Text style={styles.text}>{props.text1}</Text>
        </View>
    ),

    Notify: (props: any) => (
        <View style={styles.notify}>
            <Text style={styles.text}>{props.text1}</Text>
        </View>
    )
};

export default ToastMessage

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#000000a1',
        position: 'absolute',
        width: '70%',
        borderRadius: 7,
        padding: 13,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    tabcontainer: {
        backgroundColor: '#000000a1',
        position: 'absolute',
        width: '80%',
        borderRadius: 7,
        padding: 13,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    tabOnAboveBottom: {
        backgroundColor: '#000000a1',
        position: 'absolute',
        width: '80%',
        bottom: 20, 
        borderRadius: 7,
        padding: 13,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    notify: {
        backgroundColor: '#000',
        position: 'absolute',
        bottom: 22,
        width: '80%',
        borderRadius: 7,
        padding: 13,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        fontSize: responsiveFontSize(2.3),
        fontWeight: '400',
        color: '#fff',
        textAlign: 'center'
    },
})