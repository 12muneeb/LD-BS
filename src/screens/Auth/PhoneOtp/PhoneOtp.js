import React, {useState} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  Keyboard,
  Platform,
} from 'react-native';
import Toast from 'react-native-toast-message';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import CustomBackground from '../../../components/CustomBackground';
import NavService from '../../../helpers/NavService';
import {appLogos} from '../../../assets/index';
import styles from './styles';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import CustomText from '../../../components/CustomText';
import {colors} from '../../../utils';
import {useDispatch} from 'react-redux';
import {
  otpVerify,
  resendOTP,
  socialSignin,
} from '../../../redux/actions/authAction';
import {
  getDeviceToken,
  loaderStart,
  loaderStop,
} from '../../../redux/actions/appAction';

const PhoneOtp = ({navigation, route}) => {
    const {screenName, data, phoneNumber} = route.params;
  let timer;
  const [code, setCode] = useState('');
  const [timerCode, setTimerCode] = useState(59);
  const [resend, setResend] = useState(false);
  const [key, setKey] = useState(0);
  const dispatch = useDispatch();

  const onSubmit = async () => {

    console.log('codecode', code);
    if (code?.length > 0) {
      try {
        Keyboard.dismiss();
        dispatch(loaderStart());
        const result = await data?.confirm(code);
        const fcmToken = await getDeviceToken();
        console.log('resultresult', result);
        let payload = {
          social_token: result?.user?.uid,
          social_type: 'phone',
          device_type: Platform.OS,
          device_token: fcmToken,
          // user_role: 'User',
          user_type: 'business',
        };
        dispatch(socialSignin(payload, phoneNumber));
      } catch (error) {
        console.log('error', error);
        Toast.show({
          text1: 'OTP is invalid',
          type: 'error',
          visibilityTime: 3000,
        });
      } finally {
        dispatch(loaderStop());
      }
      // else {
      //   navigation.navigate('ChangePassword');
      // }
    } else {
      Toast.show({
        text1: 'OTP code is required',
        type: 'error',
        visibilityTime: 3000,
      });
    }
  };
  const startInterval = () => {
    clearInterval(timer);
    timer = setInterval(() => {
      setTimerCode(timerCode => {
        if (timerCode > 0) {
          return timerCode - 1;
        } else {
          setResend(true);
          clearInterval(timer);
          return 0;
        }
      });
    }, 1000);
  };
  const handleReset = async () => {
    const result = await SocialSignin.signInWithPhoneNumber(phoneNumber, true);
    console.log('result', result, 'result');
    setCodeConfirmation(result);
    if (resend) {
      setKey(prevKey => prevKey + 1);
      setResendOtpActive(false);
      setResend(false);
      setTimerCode(60);
      setCode();
      startInterval();
    } else {
      Toast.show({
        text1: 'Please wait untill timer finishes!',
        type: 'error',
        visibilityTime: 3000,
      });
    }
  };
  const onCompleteTimer = () => {
    // setResendOtpActive(true);
    setResend(true);
  };

  return (
    <CustomBackground
      showLogo={false}
      backgroundImage
      titleText={'Verification'}
      back={false}>
      <View style={styles.container}>
        <View style={[styles.container, {marginTop: 0}]}>
          <View style={styles.logoStyle}>
            <Image style={styles.applogo} source={appLogos.appLogo} />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={styles.title}>
              We have sent you a six-digits onetime {'\n'} password on your
              email address / phone {'\n'} number with instructions. Please
              follow the {'\n'} instructions to sign-in.
            </Text>
          </View>
          <OTPInputView
            selectionColor="black"
            keyboardType="numeric"
            style={styles.otpInput}
            pinCount={6}
            autoFocusOnLoad={false}
     
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeChanged={c => {
                const cleanNumber = c.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '');
                setCode(cleanNumber);
                if (cleanNumber?.length == 6) {
                  onSubmit();
                }
              }}
              onCodeFilled={c => {
                const cleanNumber = c.replace(/[- #*;,.<>\{\}\[\]\\\/]/gi, '');
                setCode(cleanNumber);
              }}
            code={code}
          />
          <View style={styles.clock}>
            <CountdownCircleTimer
              isPlaying
              rotation={'counterclockwise'}
              key={key}
              duration={30}
              colors={[colors.secondary, colors.primary]}
              colorsTime={[6, 4]}
              size={110}
              trailStrokeWidth={3}
              trailColor="transparent"
              onComplete={onCompleteTimer}>
              {({remainingTime}) => {
                const minutes = Math.floor((remainingTime % 3600) / 59);
                const seconds = remainingTime % 59;
                return (
                  <View
                    style={{
                      backgroundColor: '#7AD8FC',
                      height: 100,
                      width: 100,
                      borderRadius: 100,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <CustomText
                      text={`00:${
                        minutes < 10
                          ? '0' + minutes && seconds
                          : minutes && seconds
                      }`}
                      style={styles.time}
                    />
                  </View>
                );
              }}
            </CountdownCircleTimer>
          </View>
        </View>
        <View style={styles.bottomView}>
          <Text style={styles.textNormal}>Code didn't received? </Text>
          <TouchableOpacity
            disabled={resend ? false : true}
            onPress={() => handleReset()}>
            <Text
              style={[
                styles.textNormalWithColor,
                !resend ? styles.disabledResend : {},
              ]}>
              Resend
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </CustomBackground>
  );
};

export default PhoneOtp;
