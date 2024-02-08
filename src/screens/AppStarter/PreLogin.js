import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  Linking,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
// import {Colors} from '../../../config';
import CustomBackground from '../../components/CustomBackground';
import { colors, family, size } from '../../utils';
// import SocialSignin from '../../../components/SocialSignin';
// import Icons from '../../../assets/Icons';
import { connect } from 'react-redux';
import { appIcons } from '../../assets/index';
import CustomText from '../../components/CustomText';
import Logo from '../../components/Logo';
import SocialSignin from '../../components/SocialSignin';
import NavService from '../../helpers/NavService';
import { getDeviceToken } from '../../redux/actions/appAction';
import { socialSignin } from '../../redux/actions/authAction';
import styles from './styles';

const {width} = Dimensions.get('window');

class App extends Component {
  state = {
    agreementModal: false,
    terms: false,
    policy: false,
    navigator: '',
  };

  render() {
    const {agreementModal, terms, policy, navigator} = this.state;
    const proceedSocialLogin = async socialType => {
      const fcmToken = await getDeviceToken();
      if (socialType == 'google') {
        const userDetails = await SocialSignin?.Google();
        if (userDetails) {
          let payload = {
            social_token: userDetails?.uid,
            social_type: userDetails?.socialType,
            device_type: Platform.OS,
            device_token: fcmToken,
            // user_role: 'User',
            user_type: 'business',
          };
          console.log(payload, 'payloadpayload');
          this.props.socialSignin(payload,userDetails?.userData?.email);
        }
      } else if (socialType == 'apple') {
        const userDetails = await SocialSignin.Apple();
        if (userDetails) {
          let payload = {
            social_token: userDetails?.uid,
            social_type: userDetails?.socialType,
            device_type: Platform.OS,
            device_token: fcmToken,
            // user_role: 'User',
            user_type: 'business',
          };
          console.log(payload, 'payloadpayload');
          this.props.socialSignin(payload, userDetails?.userData[0]?.email);
        }
      }
    };
    const methods = [
      {
        name: 'Email Address',
        icon: appIcons.email,
        onPress: () => NavService.navigate('Login'),
        color: colors.primary,
      },
      {
        name: 'Phone Number',
        icon: appIcons.phone,
        color: colors.secondary,
        onPress: () => NavService.navigate('PhoneLogin'),

        // onPress: SocialSignin.Facebook,
      },

      {
        name: 'Apple',
        icon: appIcons.apple,
        color: colors.black,
        onPress: () => proceedSocialLogin('apple'),
        // onPress: SocialSignin.Apple,
      },
      {
        name: 'Google',
        icon: appIcons.googlePlus,
        color: colors.google,
        onPress: () => proceedSocialLogin('google'),
        // onPress: SocialSignin.Google,
      },
    ];
    const {navigation} = this.props;
    return (
      <CustomBackground
        backgroundImage
        back={false}
        onback={false}
        showLogo={false}
        titleText={'Pre-Login'}>
        <View style={[styles.container, {padding: 40}]}>
          <View style={styles.space}>
            <Logo size={210} />
          </View>
          <View style={styles.space}>
            {methods.map((method, i) => {
              const {color, name, icon, onPress} = method;
              if (Platform.OS !== 'ios' && name === 'Apple') return null;
              return (
                <TouchableOpacity
                  onPress={onPress}
                  key={i}
                  activeOpacity={0.8}
                  style={[styles.buttonContainer, {backgroundColor: color}]}>
                  <Image
                    source={icon}
                    style={[
                      styles.buttonInnerImage,
                      {
                        left:
                          name == 'Apple' || name == 'Google'
                            ? width / 5
                            : width / 8,
                      },
                    ]}
                  />
                  <Text
                    style={[
                      styles.buttonInnerText,
                      {
                        left:
                          name == 'Apple' || name == 'Google'
                            ? width / 3.6
                            : width / 4.9,
                      },
                    ]}>
                    Sign-in with {name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <View style={styles.bottomView}>
            <CustomText
              style={styles.txt1}
              text={'By Sign-in, You Agree to our'}
            />

            <View style={styles.main}>
              <TouchableOpacity
                onPress={() => Linking.openURL('https://google.com/')}>
                <CustomText
                  font={family?.Poppins_Bold}
                  size={size?.xsmall}
                  color={colors?.secondary}
                  text={'Terms & Conditions'}
                />
              </TouchableOpacity>
              <CustomText
                font={family?.Poppins_Regular}
                size={size?.xsmall}
                color={colors?.black}
                style={{marginHorizontal: 4}}
                text={'and'}
              />

              <TouchableOpacity
                onPress={() => Linking.openURL('https://google.com/')}>
                <CustomText
                  font={family?.Poppins_Bold}
                  size={size?.xsmall}
                  color={colors?.secondary}
                  text={'Privacy Policy'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </CustomBackground>
    );
  }
}


const actions = {socialSignin};
export default connect(null, actions)(App);