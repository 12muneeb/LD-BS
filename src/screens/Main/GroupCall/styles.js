import {StyleSheet} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {colors} from '../../../utils';
export const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    marginTop: getStatusBarHeight(),
  },
  name: {
    textAlign: 'center',
    marginBottom: 10,
    position: 'absolute',
    bottom: 3,
    alignSelf: 'center',
    zIndex: 999,
  },
  groupchat: {
    position: 'absolute',
    top: 60,
    zIndex: 9999,
    right: 10,
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupadd: {
    position: 'absolute',
    top: 20,
    zIndex: 9999,
    right: 10,
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  calladded:{
    backgroundColor:colors.secondary,
    width:'100%',
    zIndex:9999,
    position:'absolute',
    bottom:0,
    padding:20,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    gap:20
  },
  grpadd:{width: 15, height: 15},
  grpcell:{width: 50, height: 50},
  groupadmin:{
    width:150,
    height:150
  },
  admincontainer:{
    position: 'absolute',
    zIndex: 9999,
    right: 0,
    bottom: '30%',
  }
});
