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
  headingBig: {
    flexDirection: 'row',
    backgroundColor: colors?.backgroundBlue,
    borderRadius: 10,
    alignItems:'center',
    ...Shadows?.shadow3,
    marginHorizontal: 2,
    paddingHorizontal: 10,
    paddingVertical: 10,
    gap:10,
    marginVertical:10
  },
  customIcon: {
    borderWidth: 1.4,
    borderRadius: 30,
    padding: 2,
    borderStyle: 'dashed',
    borderColor: colors?.primary,

  },
});

export default styles;
