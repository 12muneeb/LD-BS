// @app
import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  View,
  StyleSheet,
  Alert,
  Linking,
  PermissionsAndroid,
} from 'react-native';
import {connect} from 'react-redux';
import SplashScreen from 'react-native-splash-screen';
import Orientation from 'react-native-orientation-locker';
// @navigations
import AuthNavigation from './stacks/authNavigation';
import AppNavigation from './stacks/appNavigation';
import {_AppLayout} from '../redux/actions';
// Nav Service
import NavService from '../helpers/NavService';
import GeoLocation from '@react-native-community/geolocation';
import {enableLatestRenderer} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {saveCurrentUserLocation} from '../redux/actions/appAction';
import {openSettings} from 'react-native-permissions';

const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      {
        title: 'Leader Dash Business',
        message: 'Leader dash business App access to your location ',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can use the location');
    } else {
      console.log('location permission denied');
      showLocationPermissionSettings();
    }
  } catch (err) {
    console.log(
      '🚀 ~ file: index.js:43 ~ requestLocationPermission ~ err:',
      err,
    );
  }
};

const showLocationPermissionSettings = () => {
  openSettings();
};

// const showPermissionExplanation = () => {
//   Alert.alert(
//     'Location Permission Required',
//     'This app requires access to your location to function properly. Please enable location permissions in your device settings.',
//     [
//       { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
//       { text: 'Open Settings', onPress: showLocationPermissionSettings },
//     ],
//     { cancelable: false }
//   );
// };

class MainNavigation extends Component {
  async componentDidMount() {
    Platform.OS === 'ios'
      ? await GeoLocation.requestAuthorization()
      : await requestLocationPermission();
    this.getCurrentLocation();
    enableLatestRenderer();
    setTimeout(() => {
      SplashScreen.hide();
    }, 2500);
    Orientation.lockToPortrait();
    // SplashScreen.hide();
  }
  componentWillUnmount() {
    Geolocation.clearWatch(this.watchID);
  }
  getCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      async info => {
        console.log(
          '🚀 ~ file: index.js:58 ~ MainNavigation ~ getCurrentLocation= ~ info:',
          info,
        );
        if (info.PERMISSION_DENIED) {
          console.log(info.PERMISSION_DENIED, 'info.PERMISSION_DENIED');
        }
        const {latitude, longitude} = info.coords;

        let currentPosition = {
          latitude: latitude,
          longitude: longitude,
        };
        console.log(currentPosition, '==currentPosition');
        this.props.saveCurrentUserLocation(currentPosition);
      },
      error => {
        console.log(error.message);
        return;
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000,
      },
    );
  };

  render() {
    const loggedInUser = this.props?.user;
    return (
      <NavigationContainer ref={ref => NavService.setTopLevelNavigator(ref)}>
        <View style={styles.container}>
          {/* IF USER PROFILE STORE IS NOT EMPTY */}
          {loggedInUser ? (
            <AppNavigation initialRoute={undefined} />
          ) : (
            // <AppNavigation initialRoute={undefined} />
            <AuthNavigation initialRoute={undefined} />
          )}
          {/* IF USER PROFILE STORE IS EMPTY */}
        </View>
      </NavigationContainer>
    );
  }
}
function mapStateToProps({authReducer: {user}}) {
  return {
    user: user,
  };
}
const action = {saveCurrentUserLocation};
export default connect(mapStateToProps, action)(MainNavigation);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
