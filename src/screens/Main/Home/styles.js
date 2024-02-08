import {Dimensions, StyleSheet} from 'react-native';
import {colors, HP, WP, size, family} from '../../../utils';
import appStyles from '../../appStyles';
const {height, width} = Dimensions?.get('screen');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  text1: {
    color: colors.black,
    ...appStyles.font16,
    fontFamily:family.Poppins_Medium
  },
  ViewText: {
    // backgroundColor: 'pink',
    ...appStyles.margin2Percent,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ViewText1: {
    // backgroundColor: 'pink',
    // ...appStyles.margin2Percent,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  ViewDetails: {
    color: colors.primary,
    textDecorationLine: 'underline',
    ...appStyles.font14,
    ...appStyles.family_Poppins_SemiBold,
  },
  lineSeparator: {
    height: 0.75,
    backgroundColor:colors.gray
  },
  secondcontent:{
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    margin: 5,
  },
  contentimg:{width: 12, height: 12},
  flatcard:{marginTop:-10,marginLeft:-4}
});

export default styles;
