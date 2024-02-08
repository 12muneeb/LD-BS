import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';
import {getStatusBarHeight} from 'react-native-status-bar-height';
const {width, height} = Dimensions.get('screen');

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  directionContainer: {
    position: 'absolute',
    left: 20,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    top:40
  },
  directionText: {
    fontSize: 16,
  },
});
