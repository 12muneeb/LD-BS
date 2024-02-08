import {Dimensions, StyleSheet, Platform} from 'react-native';
import {colors, HP, WP, size, family} from '../../../utils';
const {height} = Dimensions?.get('screen');

export const styles = StyleSheet.create({
  innercontainer: {
    backgroundColor: colors.white,
    // position: 'absolute',
    alignSelf: 'center',
    borderRadius: 10,
    padding: 18,
    flexDirection: 'row',
    marginHorizontal: 40,
    marginVertical:15
  },
  container: {flex: 1},
  profile: {width: 60, height: 60, borderRadius:50},
  innersubcontainer: {marginLeft: 10, width: '65%'},
  row: {flexDirection: 'row'},
  marker: {width: 15, height: 15, marginTop: 1},
  txt: {marginLeft: 5 , color:colors.black},
  direction: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -8,
  },
  directionimg: {width: 40, height: 40},
  listempty: {
    flex: 1,
    alignItems: 'center',
    marginTop: 25
},
txtlistempty: {
    color: colors.black,
    fontSize: size.medium,
},
txtLocation :{
  color:colors.black,
  marginLeft:5,
  maxWidth:150
}
});

export default styles;
