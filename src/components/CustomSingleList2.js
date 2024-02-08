import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import {colors, family, size} from '../utils';
import appStyles from '../screens/appStyles';
import ProfileImage from './ProfileImage';
import {appIcons, appImages} from '../assets';
import Img from './Img';
import CustomButton from './CustomButton';
import NavService from '../helpers/NavService';
import {TouchableOpacity} from 'react-native';
import CustomIcon from './CustomIcon';
import {multiImages} from '../utils/dummyData';
import {ASSETS_URL} from '../config/WebService';

const CustomSingleList2 = ({item, endDate, count}) => {
  console.log('whatItemInside', item);
  return (
    <View>
      <View style={[styles?.container]}>
        <CustomText
          text={'Participated'}
          color={colors?.black}
          font={family?.Poppins_Medium}
          size={size?.xsmall}
        />
        <View style={styles.imagesContainer}>
          {item?.map(item => {
            return (
              <>
                <CustomIcon
                  customIconWrapper={styles?.customIconWrapper}
                  customIconStyle={styles?.customIconStyle}
                  src={
                    item?.profile_image
                      ? {uri: ASSETS_URL + item?.profile_image}
                      : appIcons.userPlaceholder
                  }
                  size={size?.h2}
                  resizeMode="cover"
                />
              </>
            );
          })}
          <CustomText
            text={count}
            color={colors?.black}
            font={family?.Poppins_Light}
            size={size?.xsmall}
          />
        </View>
      </View>
      <View style={styles.container}>
        <CustomText
          text={'End Date'}
          color={colors?.black}
          font={family?.Poppins_Medium}
          size={size?.xsmall}
        />
        <CustomText
          text={endDate}
          color={colors?.black}
          font={family?.Poppins_Light}
          size={size?.xsmall}
        />
      </View>
    </View>
  );
};

export default CustomSingleList2;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  customIconWrapper: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors?.white,
    marginLeft: -20,
  },
  customIconStyle: {
    borderRadius: 50,
  },
  imagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
});
