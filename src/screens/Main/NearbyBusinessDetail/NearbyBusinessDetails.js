import React, {Component, createRef} from 'react';
import {Dimensions, Keyboard, TouchableOpacity, View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {connect} from 'react-redux';
import {appIcons} from '../../../assets';
import CustomIcon from '../../../components/CustomIcon';
import CustomText from '../../../components/CustomText';
import CustomTextInput from '../../../components/CustomTextInput';
import GooglePlaceAutocomplete from '../../../components/GooglePlaceAutocomplete';
import Map from '../../../containers/Popup/Map';
import NavService from '../../../helpers/NavService';
import {colors, family, size} from '../../../utils';
import MapView, {Marker, Polyline} from 'react-native-maps';
import {styles} from './styles';
const {width} = Dimensions.get('window');
export class NearbyBusinessDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLocations: [
        {
          latitude: '',
          location: '',
          longitude: '',
          industryName: 'Lorem ispum industry',
        },
      ],
    };
    const {coordinates} = this?.props;
    console.log('consoleMyLocation', coordinates);
    this.mapViewRef = React.createRef();
    this.myLocation = {
      latitude: coordinates?.latitude,
      longitude: coordinates?.longitude,
    };
    const {lat, long} = this?.props?.route?.params;
    console.log('whatisuserLat', lat, 'whatisUserLong', long);
    this.otherPersonLocation = {
      latitude: parseFloat(lat),
      longitude: parseFloat(long),
    };
  }

  componentDidMount() {
    if (this.mapViewRef.current) {
      // Fit the map to show both markers
      const coordinates = [this.myLocation, this.otherPersonLocation];
      this.mapViewRef.current.fitToCoordinates(coordinates, {
        edgePadding: {top: 50, right: 50, bottom: 50, left: 50},
        animated: true,
      });
    }
  }

  calculateDirection() {
    // Calculate the direction between two points
    const direction = Math.atan2(
      this.otherPersonLocation.longitude - this.myLocation.longitude,
      this.otherPersonLocation.latitude - this.myLocation.latitude,
    );
    const degrees = (direction * 180) / Math.PI;

    return degrees;
  }

  render() {
    const direction = this.calculateDirection();
    const {latitude, longitude, location, currentLocations, industryName} =
      this.state;
    const {coordinates} = this.props;
    const {lat, long} = this?.props?.route?.params;
    const handleBack = () => {
      NavService.goBack();
      Keyboard.dismiss();
    };
    const saveAddress = (address, geometry) => {
      this.setState({address: address});
      this.setState({location: geometry?.location});
    };
    return (
      <View style={styles.container}>
        <MapView
          ref={this.mapViewRef}
          style={styles.map}
          region={{
            ...this.myLocation,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}>
          {/* Marker for my location */}
          <Marker coordinate={this.myLocation} title="My Location" />

          {/* Marker for the other person's location */}
          <Marker
            coordinate={this.otherPersonLocation}
            title="Other Person's Location"
          />

          {/* Polyline to indicate direction */}
          <Polyline
            coordinates={[this.myLocation, this.otherPersonLocation]}
            strokeColor="#FF0000" // Line color
            strokeWidth={2}
          />
        </MapView>

        {/* <View style={styles.directionContainer}>
          <Text style={styles.directionText}>
            Direction: {direction} degrees
          </Text>
        </View> */}
        <View style={styles.directionContainer}>
        <TouchableOpacity
            onPress={() => NavService?.goBack()}
            activeOpacity={0.9}>
            <CustomIcon src={appIcons?.back} size={22} color={colors?.black} style={{width:25, height:25}} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps({appReducer}) {
  console.log('appReducerappReducerappReducer', appReducer);
  return {
    coordinates: appReducer?.currentUserLocation,
  };
}

export default connect(mapStateToProps)(NearbyBusinessDetails);
