import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {colors, family, size} from '../utils';
import CustomText from './CustomText';
import CustomIcon from './CustomIcon';
import {appIcons} from '../assets';
import Shadows from '../helpers/Shadows';
import {ASSETS_URL} from '../config/WebService';
const {height, width} = Dimensions?.get('screen');

const ListHeader = props => {
  const {
    _item,
    _title1,
    _title2,
    _title3,
    _title4,
    customContainerStyles,
    color,
    customLine,
    leaderBoardData = false,
    stats = true,
    customStylesRow1,
    customStylesRow2,
    customStylesRow3,
    customStylesRow4,
    color4,
    color3,
    disabled,
    onPress,
    challenges,
    image,
  } = props;

  console.log('new', _item);
  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={0.9}
      onPress={onPress}
      style={[
        styles?.headingContainer,
        customContainerStyles,
        _item?.icon1 ? {backgroundColor: colors?.lightBlue} : null,
      ]}>
      {stats && (
        <>
          <View style={[styles?.heading, customStylesRow1]}>
            {_item?.icon1 && (
              <View style={styles?.rewardWrapper}>
                <CustomIcon
                  size={height / 12}
                  src={_item?.icon1}
                  customIconWrapper={{position: 'absolute', top: -6}}
                />
              </View>
            )}
            <CustomText
              text={_item?.rank ? _item?.rank : _title1}
              color={color ? color : colors?.white}
              font={family?.Poppins_Medium}
              size={size?.xsmall}
              style={{marginTop: _item?.icon1 ? height / 17 : 0}}
            />
          </View>
          <View
            style={[
              styles?.line,
              customLine,
              _item?.icon1 ? {borderColor: colors?.secondary} : null,
            ]}
          />
        </>
      )}
      <View style={[styles?.headingBig, customStylesRow2]}>
        {image && (
          <View style={styles?.imgWrapper}>
            <CustomIcon
              size={height / 18}
              src={image}
              resizeMode="cover"
              customIconStyle={styles?.customIconStyle}
              customIconWrapper={styles?.customIconWrapper}
            />
          </View>
        )}

        <CustomText
          text={
            _title2
              ? _title2
              : _item?.first_name == null
              ? 'N/A'
              : _item?.first_name + ' ' + _item?.last_name
          }
          color={color ? color : colors?.white}
          font={family?.Poppins_Medium}
          size={size?.xsmall}
          numberOfLines={1}
          style={{width: '46%'}}
        />
      </View>
      <View
        style={[
          styles?.line,
          customLine,
          _item?.icon1 ? {borderColor: colors?.secondary} : null,
        ]}
      />

      <View style={[styles?.heading, customStylesRow3]}>
        {leaderBoardData && (
          <View style={styles?.imgWrapper}>
            <CustomIcon size={18} src={appIcons?.group} />
          </View>
        )}
        <CustomText
          text={
            _title3
              ? _title3
              : _item?.user_bussiness?.first_name
              ? _item?.user_bussiness?.first_name
              : _item?.category
          }
          color={color3 ? color3 : colors?.white}
          font={family?.Poppins_Medium}
          size={size?.xsmall}
          numberOfLines={1}
          style={{width: '46%'}}
        />
      </View>
      <View
        style={[
          styles?.line,
          customLine,
          _item?.icon1 ? {borderColor: colors?.secondary} : null,
        ]}
      />
      <View style={[styles?.headingBig, customStylesRow4]}>
        {leaderBoardData && (
          <View style={styles?.imgWrapper}>
            <CustomIcon size={42} src={appIcons?.star} />
          </View>
        )}
        <CustomText
          text={
            _title4
              ? _title4
              : _item?.total_target_achieved
              ? _item?.total_target_achieved
              : _item?.total_target_achieved
          }
          color={color4 ? color4 : colors?.white}
          font={family?.Poppins_Medium}
          size={size?.xsmall}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ListHeader;

const styles = StyleSheet.create({
  headingContainer: {
    flexDirection: 'row',
    backgroundColor: colors?.secondary,
    justifyContent: 'space-between',
    borderRadius: 30,
    // ...Shadows?.shadow3,
    marginHorizontal: 2,
  },
  heading: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height / 66,
    width: '20%',
  },
  headingBig: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: height / 66,
    width: '30%',
  },
  line: {
    width: 1,
    borderWidth: 1,
    borderColor: colors?.white,
    borderStyle: 'dashed',
  },
  customIconStyle: {
    borderRadius: 30,
  },
  customIconWrapper: {
    borderWidth: 1,
    borderRadius: 30,
    padding: 2,
    borderStyle: 'dashed',
    borderColor: colors?.secondary,
  },
  imgWrapper: {
    height: height / 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rewardWrapper: {
    height: height / 10,
    backgroundColor: colors?.red,
    alignItems: 'center',
    position: 'absolute',
    top: 0,
  },
});
