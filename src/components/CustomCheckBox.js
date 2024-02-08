import {
  Clipboard,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors} from '../utils';
import Img from './Img';
import {appIcons} from '../assets';
const CustomCheckBox = ({isCheck, index, handleCheck}) => {
  console.log(
    '🚀 ~ file: CustomCheckBox.js:13 ~ CustomCheckBox ~ isCheck:',
    isCheck,
  );
  //   console.log('🚀 ~ f isCheck:', isCheck[index] === index);
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: isCheck ? colors.primary : colors.white,
          borderColor: isCheck ? colors.primary : colors.primary,
        },
      ]}
      key={index}
      onPress={handleCheck}>
      {isCheck && (
        <Img
          src={appIcons.checkRight}
          local
          style={styles.image}
          resizeMode={'contain'}
          tintColor={colors?.white}
        />
      )}
    </TouchableOpacity>
  );
};
export default CustomCheckBox;
const styles = StyleSheet.create({
  container: {
    height: 24,
    width: 24,
    borderRadius: 30,
    borderWidth: 2,
    backgroundColor: colors.white,
    borderColor: colors.skyBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 12,
    width: 12,
  },
});
