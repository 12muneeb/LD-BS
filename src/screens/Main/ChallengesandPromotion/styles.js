import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors,family,size } from '../../../utils'


export const styles = StyleSheet.create({
    tab:{marginVertical: 10,},
    pluscontainer: {
        backgroundColor: colors.lightwhite,
        width: '100%',
        position: 'absolute',
        right: 0,
        bottom: 0,
        paddingVertical: 0,
      },
      plus: {width: 80, height: 80, alignSelf: 'flex-end', bottom: 5},
      flexRow: {
     flexDirection:'row',
     alignItems:'center'
    },

    BtnView: {
       width:'70%',
       alignItems:'center',
       justifyContent:'space-between',
        borderRadius: 50,
        paddingHorizontal: 5,
        paddingVertical: 10,
        height: 60,
        backgroundColor: colors.white,
        alignSelf:'center'

    },
    buttonStyle:{
      width:'48%',
      height:45
    },
    buttonStyle1:{
      width:'48%',
      height:45,
      backgroundColor:colors.white
    },
    btnTitle1:{
      color:colors.black
    },
    btnTitle:{
      color:colors.white
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
})