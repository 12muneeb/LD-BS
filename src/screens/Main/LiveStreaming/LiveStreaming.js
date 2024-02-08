import React, { Component } from 'react';
import { BackHandler, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import NavService from '../../../helpers/NavService';

export class LiveStreaming extends Component {
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.onBackPress,
    );

    this.openCamera();
  }

  componentWillUnmount() {
    this.backHandler.remove();
  }

  onBackPress = () => {
    NavService.navigate('BottomTabs', {screen: 'Dashboard'});

    return true;
  };

  openCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      });

      console.log(image);
      NavService.navigate('BottomTabs', {screen: 'Dashboard'});
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'gray',
        }}
      />
    );
  }
}

export default LiveStreaming;
