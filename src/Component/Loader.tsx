import React from 'react';
import { StyleSheet, View, Modal, ActivityIndicator, Text } from 'react-native';
import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';

interface Loader {
    loading: any
}

const Loader: React.FC<Loader> = ({ loading }) => {

    return (
        <Modal transparent={true} animationType={'none'} visible={loading}
            onRequestClose={() => { console.log('close modal') }}
        >
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator animating={loading} color="#00aaf0" size="large" />
                    <Text style={styles.text}>Loading... </Text>
                </View>
            </View>
        </Modal>
    );
};

export default Loader;

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000050',
    },

    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: '70%',
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },

    text: {
        fontSize: responsiveFontSize(3),
        fontWeight: '500',
        color: '#00aaf0',
        marginHorizontal: responsiveWidth(4)
    }
});