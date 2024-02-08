import React, {useRef} from 'react';
import {View, Image, TouchableOpacity, Dimensions} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';

import mapStyle from './mapStyle.json';

import {appIcons} from '../../../assets';
import {colors, size} from '../../../utils';
import appStyles from '../../../screens/appStyles';
import CustomText from '../../../components/CustomText';
import {UseSelector, useSelector} from 'react-redux';
const Map = ({
  cord,
  onMarkerPress,
  mark,
  customMapStyles,
  polylineProps,
  markerProps,
  currentLocations,
}) => {
  const currentLocation = useSelector(
    state => state?.appReducer?.currentUserLocation,
  );
  console.log('currentLocationcurrentLocation', currentLocation);
  const lat =
    currentLocations?.[0]?.latitude || currentLocation?.latitude || 37.78825;
  const lon =
    currentLocations?.[0]?.longitude || currentLocation?.longitude || -122.4324;
  const loc = currentLocations?.[0]?.location;
  const markers = [
    {
      latitude: currentLocation?.latitude,
      longitude: currentLocation?.longitude,
      icon: appIcons.maker,
      StoreName: 'Lorem Ipsum',
    },
    {
      latitude: currentLocation?.latitude + 0.009,
      longitude: currentLocation?.longitude + 0.0095,
      icon: appIcons.maker,
      StoreName: 'Lorem Ipsum',
    },
    {
      latitude: currentLocation?.latitude - 0.0115,
      longitude: currentLocation?.longitude - 0.01,
      icon: appIcons.maker,
      StoreName: 'Lorem Ipsum',
    },
    {
      latitude: currentLocation?.latitude + 0.023,
      longitude: currentLocation?.longitude,
      icon: appIcons.maker,
      StoreName: 'Lorem Ipsum',
    },
  ];
  const polylines = [
    {
      latitude: lat,
      longitude: lon,
      icon: appIcons.maker,
      StoreName: 'Lorem Ipsum',
    },
  ];
  console.log('----lat----lat', lat);
  console.log('lonlon', lon);
  const mapRef = useRef(null);
  return (
    <MapView
      region={{
        latitude: lat,
        longitude: lon,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
      provider={PROVIDER_GOOGLE}
      mapType="terrain"
      zoomEnabled
      customMapStyle={mapStyle}
      ref={mapRef}
      style={[{width: '100%', height: '100%'}, customMapStyles]}>
      {markerProps
        ? markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker?.latitude || 37.78825,
                longitude: marker?.longitude || -122.4324,
              }}>
              <View style={{}}>
                <CustomText
                  text={marker.StoreName}
                  size={size.small}
                  style={{
                    color: colors.black,
                    ...appStyles.family_RedHatDisplay_Bold,
                  }}
                />
                <CustomText
                  text={marker.StoreName}
                  size={size.xxsmall}
                  style={{
                    color: colors.black,
                    ...appStyles.family_RedHatDisplay_Bold,
                  }}
                />
                <Image
                  source={marker.icon}
                  style={{
                    resizeMode: 'contain',
                    width: 30,
                    height: 30,
                    tintColor: colors.secondary,
                  }}
                />
              </View>
            </Marker>
          ))
        : null}

      {polylineProps
        ? polylines?.map((polylines, index) => {
            console.log('polylines', polylines);
            return (
              <>
                <Polyline
                  coordinates={[
                    {
                      latitude: polylines?.latitude || 37.78825,
                      longitude: polylines?.longitude || -122.4324,
                    },
                    {
                      latitude: currentLocation?.latitude || 37.78825 + 0.009,
                      longitude:
                        currentLocation?.longitude || -122.4324 + 0.009,
                    },
                  ]}
                  strokeColor={colors?.secondary}
                  strokeColors={[
                    '#7F0000',
                    '#00000000',
                    '#B24112',
                    '#E5845C',
                    '#238C23',
                    '#7F0000',
                  ]}
                  strokeWidth={0.5}
                />
                <Marker
                  coordinate={{
                    latitude: lat,
                    longitude: lon,
                  }}>
                  <Image
                    source={appIcons?.maker}
                    style={{
                      width: 28,
                      height: 28,
                      resizeMode: 'contain',
                      tintColor: colors?.secondary,
                    }}
                  />
                </Marker>
                <Marker
                  coordinate={{
                    latitude: currentLocation?.latitude || 37.78825 + 0.009,
                    longitude: currentLocation?.longitude || -122.4324 + 0.009,
                  }}>
                  <Image
                    source={appIcons?.maker}
                    style={{
                      width: 28,
                      height: 28,
                      resizeMode: 'contain',
                      tintColor: colors?.secondary,
                    }}
                  />
                </Marker>
              </>
            );
          })
        : null}
    </MapView>
  );
};
export default Map;
