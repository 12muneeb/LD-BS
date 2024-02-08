import {StyleSheet, Dimensions,Platform} from 'react-native';
import {colors, HP, WP, size, family, platform} from '../../../utils';
import appStyles from '../../appStyles';
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
  btn: {
    ...appStyles.margin2Percent,
  },
  bottomView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  subText: {
    fontSize: 17,
    fontWeight: '600',
    color: colors.white,
    marginVertical: 20,
  },
  textNormal: {
    fontSize: 17,
    fontWeight: '700',
    color: colors.white,
  },
  textNormalWithColor: {
    color: colors.primary,
    textDecorationColor: colors.primary,
    fontSize: 17,
    fontWeight: '700',
  },
  applogo: {
    width: 223,
    height: 223,
    resizeMode: 'cover',
  },
  logoStyle: {
    marginBottom: 25,
  },
  inputContainer: {
    borderBottomWidth: 0,
    top: 8,
    left: Platform.OS == 'ios' ? 0 : -5,
  },
  input: {
    height: 50,
    fontSize: size.xsmall,
    fontFamily: family.Poppins_Medium,
    color: colors.secondary,
  },
  labelcontainer: {
    width: width - 40,
    backgroundColor: colors.white,
    height: 50,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconimg: {width: 20, height: 20, marginLeft: 15},
  labelsubcontainer: {
    height: 30,
    width: 2,
    borderRightWidth: 0.8,
    marginLeft: 10,
  },
  labelcontent: {
    width: '85%',
    height: 50,
    borderRadius: 20,
  },
  labeltext: {
    position: 'absolute',
    left: Platform.OS == 'ios'  ? 8 : 10 ,
    fontFamily: family.Poppins_SemiBold,
    color: colors.secondary,
    fontSize: size.xsmall,
  },
});
export default styles;