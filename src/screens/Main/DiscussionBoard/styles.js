import {Dimensions, Platform, StyleSheet} from 'react-native';
import {colors, HP, WP, size, family} from '../../../utils';
const {height, width} = Dimensions?.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchWrapper: {
    position: 'relative',
    top: -height * 0.057,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerStyle: {
    borderRadius: 40,
    width: width / 1.35,
  },
  textInputStyles: {
    fontFamily: family?.Poppins_Italic,
    alignSelf: 'center',
  },
  borderStyles: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lineSeparator: {
    height: height / 64,
  },
  customContainerStyles: {
    backgroundColor: colors?.white,
    borderRadius: 50,
  },
  customStylesRow2: {
    flexDirection: 'row',
    gap: 10,
    width: '50%',
  },
  customStylesRow3: {
    width: '25%',
  },
  gap: {
    height: Platform.OS == 'ios' ? 15 : 12,
  },
  circle: {
    borderRadius: 40,
    backgroundColor: colors?.primary,
    height: 55,
    width: 55,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabs: {
    backgroundColor: 'red',
  },
  buttonStyle: {
    backgroundColor: colors?.primary,
    width: '40%',
  },
  tabsHandle: {
    backgroundColor: colors?.white,
    borderRadius: 20,
    flexDirection: 'row',
  },
  footer: {
    position: 'relative',
    bottom: height * 0.14,
    alignSelf: 'center',
  },
  pluscontainer: {
    backgroundColor: colors.lightwhite,
    width: '100%',
    position: 'absolute',
    right: 0,
    bottom: 0,
    paddingVertical: 0,
  },
  plus: {width: 80, height: 80, alignSelf: 'flex-end', bottom: 5},
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  plus: {width: 80, height: 80, alignSelf: 'flex-end', bottom: 5},
  mainCard: {
    backgroundColor: colors.lightBlue,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  name: {
    color: colors.secondary,
    fontSize: size.small,
    fontFamily: family.Poppins_Medium,
    maxWidth:250
  },
  desc: {
    color: colors.secondary,
    fontSize: size.xxsmall,
    fontFamily: family.Poppins_Medium,
  },
  customIconStyle: {
    borderRadius: 50,
  },
  imagesContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    left:20
  },
  threedots:{
    width:20,
    height:20
  },
  forrowdots:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginVertical:8
  },
  customIconWrapper: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: colors?.white,
    marginLeft: -15,
  },
  listempty: {
    flex: 1,
    alignItems: 'center',
    marginTop: 25
},
txtlistempty: {
    color: colors.black,
    fontSize: size.medium,
},
});

export default styles;
