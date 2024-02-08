import {Dimensions, Platform, StyleSheet} from 'react-native';
import {colors, HP, WP, size, family} from '../../../utils';
import appStyles from '../../appStyles';
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
  subcontainer: {
    flexDirection: 'row',
    marginLeft: 10,
    gap: 10,
  },
  profileimage: {
    height: 60,
    width: 60,
    borderRadius: 100,
  },
  nameContainer: {
    justifyContent: 'center',
  },
  dash: {
    height: 70,
    borderWidth: 1.5,
    borderRadius: 100,
    borderColor: colors.primary,
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
  },
  profiletext: {
    ...appStyles.font14,
  },
  containerStyle: {
    borderRadius: 40,
    width: width / 1.35,
  },
  back: {
    height: 15,
    width: 15,
  },
  viewprofile: {
    backgroundColor: '#E3FCFF',
    flexDirection: 'row',
    gap: 10,
    borderRadius: 10,
    // marginLeft: 10,
    paddingVertical: 15,
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
  lineSeparator1: {
    height: 0.75,
    marginTop:10,
    backgroundColor:colors.gray
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
  viewStyle1:{
    backgroundColor: colors.backgroundBlue,
    borderRadius:10,
    paddingVertical:20,
    paddingHorizontal:12,
    marginVertical:10
  },
  viewStyle2:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  txt:{
    fontFamily:family.Poppins_Medium,
    color:colors.secondary,
    fontSize:size.medium
  },
  txt1:{
    fontFamily:family.Poppins_Light,
    color:colors.secondary,
    fontSize:size.small
  },
  txt2:{
    fontFamily:family.Poppins_Medium,
    color:colors.black,
    fontSize:size.small
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
