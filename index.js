/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import messaging from '@react-native-firebase/messaging';
import NavigationService from './src/Component/NavigationService';

// messaging().setBackgroundMessageHandler(async remoteMessage => {
//     if (!!remoteMessage?.data && remoteMessage?.data) {
        // setTimeout(() => {
        //     NavigationService.navigate("MessageScreen", { data: remoteMessage?.data })
        // }, 1200)
//     }
// });


AppRegistry.registerComponent(appName, () => App);