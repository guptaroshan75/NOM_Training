import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react'
import StackNavigator from './src/Screen/StackNavigator'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Store from './src/Redux/Store'
import { Provider } from 'react-redux'
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message'
import ToastMessage from './src/Component/ToastMessage'
import NavigationService from './src/Component/NavigationService'
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native'
import ForegroundHandler from './src/ForegroundHandler'

const App = () => {
  const handleAppStateChange = async () => {
    const initialNotification = await messaging().getInitialNotification();
    if (initialNotification) {
      setTimeout(() => {
        NavigationService.navigate("MessageScreen",
          { data: initialNotification.data, state: 'Kill App' }
        )
      }, 1200)
    }
  };

  const notification = async () => {
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (!!remoteMessage?.data && remoteMessage?.data) {
        setTimeout(() => {
          NavigationService.navigate("MessageScreen", { data: remoteMessage?.data })
        }, 1200)
      }
    })
  }

  const requestUserPermission = async () => {
    const authStatus: any = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
    }
  }

  useEffect(() => {
    if (Platform.OS == 'android') {
      PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS).then((res) => {
        if (!!res && res == 'granted') {
          requestUserPermission()
        }
      }).catch(error => {
        return error
      })
    } else {

    }
  }, [])

  useEffect(() => {
    notification()
    handleAppStateChange()
  }, []);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 1000);
  })

  return (
    <>
      <ForegroundHandler />
      <NavigationContainer ref={(ref) => NavigationService.setTopLevelNavigator(ref)}>
        <Provider store={Store}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <StackNavigator />
            <Toast config={ToastMessage} />
          </GestureHandlerRootView>
        </Provider>
      </NavigationContainer>
    </>
  )
}

export default App