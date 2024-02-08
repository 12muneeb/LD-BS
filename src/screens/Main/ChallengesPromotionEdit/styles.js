import { Dimensions, StyleSheet } from 'react-native';
import { colors, family, size } from '../../../utils';
import appStyles from '../../appStyles';

const {width} = Dimensions.get('screen');

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: '5%',
    flex: 1,
    gap: 10,
  },
  caption: {
    alignSelf: 'flex-start',
    ...appStyles.family_Montserrat_Medium,
    marginHorizontal: 10,
  },
  headerText: {
    marginTop: 10,
    marginRight: 'auto',
    ...appStyles.font16,
    ...appStyles.family_Poppins_Regular,
  },
  interest: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '90%',
    bottom: 10,
    marginLeft: 10,
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    // marginTop: 5,
  },
  remove: {
    height: 10,
    width: 10,
    // top:4,
    marginLeft: 5,
  },
  tagtxt: {
    color: colors.white,
    fontFamily: family.Jost_Medium,
  },

  tag: {
    padding: 10,
    margin: 5,
    backgroundColor: '#31A0FF',
    borderRadius: 30,
    alignItems: 'center',
    flexDirection: 'row',
  },
  textinputstyling: {
    height: 200,
    borderRadius: 10,
    paddingLeft: 15,
    paddingTop: 15,
  },
  itemSeperator: {
    width: 20,
  },
  mainView: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  // icon: {
  //   width: 18,
  //   height: 18,
  //   resizeMode: 'cover',
  // },
  text: {
    marginHorizontal: 10,
    ...appStyles.family_Poppins_Regular,
  },
  border: {
    height: 1,
    ...appStyles.w100,
  },
  footerMainView: {
    flexDirection: 'row',
  },
  pressAble1: {
    alignSelf: 'center',
    backgroundColor: colors.primary,
    position: 'absolute',
    bottom: 10,
  },
  btnTextStyle: {
    ...appStyles.font16,
    color: 'white',
    ...appStyles.family_Jost_Bold,
  },
  inputBox: {
    height: 200,
    borderRadius: 10,
    alignItems: 'flex-start',
  },
  videoStyle: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundForGalleryAsset: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  wrapper: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 5,
    position: 'relative',
  },
  playIcon: {
    width: 25,
    height: 25,
    justifyContent: 'center',
    position: 'absolute',
    top: '35%',
    left: '35%',
  },
  crossIconView: {
    position: 'absolute',
    zIndex: 1000,
    right: 3,
    top: 0.7,
  },
  crossBtn: {
    borderRadius: 100,
    width: 22,
    height: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  crossText: {
    ...appStyles.font12,
  },
  plusContainer: {
    width: '30.5%',
    height: 100,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: colors.darkBlue,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  iconPlus: {
    width: 25,
    height: 25,
    // borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 30,
    height: 30,
  },
  calendarrow: {
    flexDirection: 'row',
    width: '90%',
    gap: 20,
    height: 45,
  },
  dateBtn: {
    width: '47.5%',
    borderRadius: 30,
    justifyContent: 'center',
    paddingLeft: 20,
  },
  dropdown: {
    height: 50,
    width: width - 40,
    alignSelf: 'center',
    borderRadius: 26,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 0,
  },
  label: {
    width: width - 40,
    // width: '100%',
    alignSelf: 'center',
    backgroundColor: colors.white,
  },
  placeHolderText: {
    fontSize: size.xsmall,
    fontFamily: family.Poppins_Medium,
    color: colors.black,
  },
});
export default styles;
