import {Dimensions, StyleSheet, Platform} from 'react-native';
import {colors, HP, WP, size, family} from '../../../utils';
const {height} = Dimensions?.get('screen');

export const styles = StyleSheet.create({
  container: {
    // flex: 1,
    height: height / 1.35,
  },
  containerStyle: {
    borderRadius: 40,
    position: 'absolute',
    width: '100%',
    top: -height * 0.057,
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
    width:"99%"
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
    height: Platform.OS == 'ios' ? 30 : 20,
  },
  pluscontainer: {
    backgroundColor: colors.lightwhite,
    width: '100%',
    position: 'absolute',
    right: 0,
    bottom: 0,
    paddingVertical: 0,
  },
  plus: {width: 80, height: 80, alignSelf: 'flex-end', bottom: Platform.OS == 'ios' ? 0 : 15},
  flatcontainer: {height: Platform.OS == 'ios' ? height / 1.6 : height / 1.6},
  found:{
    color: colors.gray,
    fontSize:size.medium,
    marginVertical:20,
    paddingTop:20
  },
});

export default styles;
