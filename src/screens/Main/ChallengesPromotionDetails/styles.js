import {Dimensions, StyleSheet} from 'react-native';
import {colors, HP, WP, size} from '../../../utils';
const {height, width} = Dimensions?.get('screen');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },

  gap: {
    height: Platform.OS == 'ios' ? 30 : 20,
  },
  gap2: {
    height: Platform.OS == 'ios' ? 10 : 10,
  },
  banner: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  bannerWrapper: {
    height: 167,
    width: '100%',
    borderRadius: 10,
  },
  lineSeparator: {
    height: 0.8,
    marginVertical: 8,
    backgroundColor: colors?.gray,
  },
  customContainerStyles: {
    backgroundColor: colors?.white,
    borderRadius: 50,
  },
  sperator: {
    height: 10,
  },
  removeBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    paddingRight: 2,
  },
  found:{
    color: colors.gray,
    fontSize:size.medium,
    marginVertical:20,
    paddingTop:20
  },
});

export default styles;
