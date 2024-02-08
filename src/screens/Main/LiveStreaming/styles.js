import { StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { colors } from '../../../utils';


export const styles = StyleSheet.create({
    cover:{
        width: '100%',
        height: '100%',
      },
      crossbutton:{
        position:'absolute',
        right:15,
        top:10
      },
      cross:{width: 40, height: 40},
      streamcontainer:{
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
      },
      streambutton:{
        borderWidth: 4,
        borderColor: colors.white,
        padding: 30,
        borderRadius: 35,
        marginVertical:10
      },
      container:{
        marginTop: getStatusBarHeight(),
        backgroundColor:'red'
      }
})