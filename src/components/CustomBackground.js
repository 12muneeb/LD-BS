import React from 'react';
import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { appIcons, appImages } from '../assets';
import NavService from '../helpers/NavService';
import { colors, family, size } from '../utils';
import Logo from './Logo';

export default ({
  children,
  showLogo = true,
  back = true,
  title = true,
  titleText,
  onback = true,
  backgroundImage,
}) => {
  return (
    <ImageBackground
      source={backgroundImage ? appImages.backgroundImage : null}
      style={{flex: 1}}>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        bounces={false}
        showsVerticalScrollIndicator={false}
        style={{flex: 1}}
        contentContainerStyle={{
          alignItems: 'center',
          flexGrow: 1,
          paddingTop: showLogo ? 0 : getStatusBarHeight(),
        }}>
        {back && (
          <TouchableOpacity
            onPress={() => 
              NavService.goBack()
            }
            style={{
              position: 'absolute',
              left: 20,
              marginTop: getStatusBarHeight() + 5,
            }}>
            <Image
              source={appIcons.backIcon}
              style={{
                width: 25,
                height: 25,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        )}
         {onback && (
          <TouchableOpacity
            onPress={() => 
              NavService.navigate('AppStarter')
            }
            style={{
              position: 'absolute',
              left: 20,
              marginTop: getStatusBarHeight() + 5,
            }}>
            <Image
              source={appIcons.backIcon}
              style={{
                width: 25,
                height: 25,
                resizeMode: 'contain',
              }}
            />
          </TouchableOpacity>
        )}
        {title && (
          <View>
            <Text style={styles.headerSignInText}>{titleText}</Text>
          </View>
        )}
        {showLogo && (
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Logo size={220} />
          </View>
        )}
        <View style={{flex: 3}}>{children}</View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  headerSignInText: {
    color: colors.black,
    textAlign: 'center',
    fontSize: size.normal,
    fontFamily: family.Poppins_Medium,
    top: 5,
  },
  headerContainer: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backButtonContainer: {
    position: 'absolute',
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyle: {width: 25, height: 25, tintColor: '#9c9c9c'},
});
