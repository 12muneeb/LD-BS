import {StyleSheet, Dimensions, Platform} from 'react-native';
import {colors, HP, WP, size} from '../../../utils';
import appStyles from '../../appStyles';
import Shadows from '../../../helpers/Shadows';
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  heading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.black,
    marginVertical: '8%',
  },
  bottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Platform.OS == 'ios' ? 20 : 10,
  },
  applogo: {
    width: 223,
    height: 223,
    resizeMode: 'contain',
    marginTop: '10%',
  },
  title: {
    color: colors.black,
    ...appStyles.family_Poppins_Regular,
    fontSize: size.xsmall,
    textAlign: 'center',
  },
  disabledResend: {
    color: colors.gray,
  },
  underlineStyleBase: {
    width: 50,
    height: 50,
    borderWidth: 0,
    borderRadius: 100,
    backgroundColor: colors.white,
    ...Shadows.shadow3,
    // borderColor: '#ffffff',
    // borderWidth: 2,
    color: 'black',
    fontSize: 17,
  },
  textNormal: {
    ...appStyles.font15,
    ...appStyles.family_Poppins_Regular,
    // fontWeight: '700',
    color: colors.black,
  },
  textNormalWithColor: {
    color: colors.secondary,
    ...appStyles.font15,
    // fontWeight: '700',
    marginTop: -2,
    ...appStyles.family_Poppins_Bold,
  },
  time: {
    color: colors.black,
    ...appStyles.family_Poppins_SemiBold,
  },
  otpInput: {
    width: '90%',
    height: 50,
    marginVertical: 30,
    paddingHorizontal:5,
  },
  timerText: {
    alignSelf: 'flex-end',
    color: 'black',
    fontSize: 13,
    marginBottom: 10,
    marginRight: 27,
  },
});

export default styles;
