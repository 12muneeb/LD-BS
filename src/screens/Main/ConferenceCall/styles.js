import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../../utils'


export const styles = StyleSheet.create({
    maincontainer:{
        backgroundColor: colors.lightBlue,
        width: '100%',
        alignSelf: 'center',
        borderRadius: 10,
        padding: 10,
      },
      subcontainer:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      flex:{flexDirection: 'row', alignItems: 'center'},
      multipleimg:{width: 40, height: 40, borderRadius: 30,borderWidth:1.8,borderColor:colors.white},
      pluscontainer: {
        backgroundColor: colors.lightwhite,
        width: '100%',
        position: 'absolute',
        right: 0,
        bottom: 0,
        paddingBottom: 0,
      },
      plus: {width: 80, height: 80, alignSelf: 'flex-end', bottom: 5},
      spacingheading:{marginRight:5}
})