//My Profile/ styles
import {StyleSheet} from 'react-native';
import {colors, HP, WP, size} from '../../../utils';
import appStyles from '../../appStyles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  lineSeparator: {
    height: 5,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray,
  },
  profikle: {
    height: 140,
    width: 140,
    borderRadius: 100,
    alignItems: 'center',
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: colors.primary,
    justifyContent: 'center',
  },
  Profile: {
    height: 130,
    width: 130,
    borderRadius: 100,
    alignItems: 'center',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: colors.primary,
    justifyContent: 'center',
  },
  viewstyles: {
    justifyContent: 'center',
    marginTop: 0,
    borderColor: null,
    borderRadius: 140,
  },
  containerstyle: {
    flexGrow: 1,
    ...appStyles.margin1Percent,
    paddingHorizontal: 15,
    backgroundColor:colors.white,
    borderRadius: 15,
    ...Shadows.shadow3,
    marginVertical:10,
    paddingVertical:10
  },
  editcontent:{
    position: 'absolute',
    right: 20,
  },
  editimg:{width: 20, height: 20}
});

export default styles;
