/**
 * Boiler Plate React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect} from 'react';
import {
  KeyboardAvoidingView,
  View,
  StatusBar,
  Platform,
  LogBox,
  StyleSheet,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PersistGate} from 'redux-persist/integration/react';
import Toast, {BaseToast, ErrorToast} from 'react-native-toast-message';
import {Provider} from 'react-redux';
import store, {persistor} from './src/redux';
import Loader from './src/helpers/Loader';
import MainNavigation from './src/routes';
import ErrorBoundary from './src/components/ErrorBoundary';
import {io} from 'socket.io-client';
import {saveScoket} from './src/redux/actions/authAction';
import {WEB_SOCKET_URL} from './src/config/WebService';
import {colors} from './src/utils';
// ignore warnings
LogBox.ignoreAllLogs();

const toastConfig = {
  success: props => (
    <BaseToast
      {...props}
      text1NumberOfLines={5}
      style={{
        borderLeftColor: colors.primary,
        maxHeight: 120,
        height: '100%',
        paddingVertical: 20,
      }}
      text1Style={{
        fontSize: 14,
        color: colors.black,
      }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      text1NumberOfLines={5}
      style={{
        borderLeftColor: colors.red,
        maxHeight: 120,
        height: '100%',
        paddingVertical: 20,
      }}
      text1Style={{
        fontSize: 14,
        color: colors.black,
      }}
    />
  ),
};

const App = () => {
  let socket = null;
  const saveCurrebtSocket = () => {
    socket = io(WEB_SOCKET_URL);
    console.log('socketoutside', socket);
    socket?.on('connect', () => {
      if (socket.connected) {
        console.log('socketindidefunction', socket);
        saveScoket(socket);
      } else {
        console.log('socket', socket);
        saveScoket(null);
      }
    });
  };
  useEffect(() => {
    saveCurrebtSocket();
    // return () => {
    //   if (socket !== null) {
    //     socket?.disconnect();
    //   }
    // };
  }, []);

  return (
    <Wrapper>
      <GestureHandlerRootView style={styles.container}>
        <StatusBar
          translucent={true}
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <Loader />
            <ErrorBoundary>
              <MainNavigation />
            </ErrorBoundary>
            <Toast config={toastConfig} />
          </PersistGate>
        </Provider>
      </GestureHandlerRootView>
    </Wrapper>
  );
};

export default App;

const Wrapper = ({children}) => {
  if (Platform.OS === 'ios')
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <View style={[styles.container, styles.containerWhiteBackground]}>
          {children}
        </View>
      </KeyboardAvoidingView>
    );
  return (
    <View style={[styles.container, styles.containerWhiteBackground]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerWhiteBackground: {
    backgroundColor: colors.white,
  },
});
