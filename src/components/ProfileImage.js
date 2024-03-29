import React from 'react';
import {Image, Text, View} from 'react-native';
import {colors} from '../utils';
import appStyles from '../screens/appStyles';

const ProfileImage = ({
  size = '100%',
  imageUri,
  innerAsset = false,
  name = '',
  style,
  ViewStyle,
  widthsize,
  heightsize,
  ViewBorderWidth,
  ImageborderRadius,
  ViewborderColor,
  viewHeight,
  ViewWidth,
  label,
}) => {
  if (imageUri)
    return (
      <View
        style={[
          {
            marginTop: -20,
            backgroundColor: colors.primary || backgroundColor,
            height:  viewHeight,
            width: ViewWidth,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 72.5,
            borderWidth: ViewBorderWidth,
            borderColor: ViewborderColor,

          },
          ViewStyle,
        ]}>
        <Image
          source={innerAsset ? imageUri : {uri: imageUri}}
          style={[
            {
              width: widthsize,
              height: heightsize,
              resizeMode: 'cover',
              borderRadius: ImageborderRadius,
            },
            style,
          ]}
        />
        {label && (
          <Text
            style={{
              top: 10,
              color: colors.secondary,
              ...appStyles.family_Poppins_SemiBold,
              ...appStyles.font12,
            }}>
            {name}
          </Text>
        )}
      </View>
    );
  return (
    <View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          borderWidth: size / 50,
          borderColor: colors.primary,
          backgroundColor: colors.secondary,
          alignItems: 'center',
          justifyContent: 'center',
        },
        style,
      ]}>
      <Text
        numberOfLines={1}
        style={{
          color: colors.primary,
          fontSize: size * 0.75,
          fontWeight: '800',
          width: '100%',
          textAlign: 'center',
        }}>
        jellll
        {name[0].toUpperCase()}
      </Text>
    </View>
  );
};

export default ProfileImage;
