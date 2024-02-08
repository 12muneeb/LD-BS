import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors,family,size } from '../../../utils'
import appStyles from '../../appStyles'
const {width,height} = Dimensions.get('screen')
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
      },
      heading: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.black,
        marginVertical: '8%',
      },
      emailinput: {
        width: '100%',
        backgroundColor:colors.white
      },
      phoneContainer: {
        padding: 1,
        height: 55,
        borderWidth: 1,
        width: width - 20,
    
        // width: WP('88%'),
        borderRadius: 30,
        borderColor: colors.secondary,
        backgroundColor: colors.white,
      },
      countryPickerButtonStyle: {
        width: 55,
        borderRadius: 30,
        height: 50,
        backgroundColor: colors.white,
      },
      textContainerPhone: {
        marginLeft: 10,
        borderRadius: 30,
        height: 50,
        backgroundColor: colors.white,
        borderColor: colors.primary,
      },
      uploadView: {
        marginLeft: 10,
        marginVertical: 10,
      },
      uploaddocuments: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
      },
      textInputStyles: {
        // backgroundColor:'red'
      },
      uploaddoctext: {
        ...appStyles.font15,
        color: colors.black,
        ...appStyles.family_Poppins_SemiBold,
      },
      uploaddocsubtext: {
        ...appStyles.font13,
        color: colors.black,
        ...appStyles.family_Poppins_Medium,
      },
      mainContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 150,
        width: 150,
        ...Shadows.shadow5,
        backgroundColor: '#B0F0FF',
        borderRadius: 100,
        alignSelf:'center',
        marginTop:25
      },
      bottomView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 40,
      },
      textNormal: {
        marginVertical: 20,
      },
      applogo: {
        width: width * 0.91,
        height: height * 0.22,
        resizeMode: 'contain',
        marginVertical: '12%',
      },
      logoStyle: {
        position: 'relative',
      },
      upload: {
        position: 'absolute',
        bottom: '16%',
        zIndex: 20,
        right: '28%',
      },
      uploadheading:{
        textAlign:'center',
        marginVertical:15,
        fontFamily:family.Poppins_SemiBold
      },
      locate:{
        width:'100%'
      },
      buttonStyle:{
        alignSelf:'center',
        position:'absolute',
        bottom:10
       

      },
      dropdown: {
        height: 51,
        width: '100%',
        alignSelf: 'center',
        borderRadius: 26,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor:colors.white,
        borderWidth:0
      },
      label: {
        color: colors.white,
        width: '100%',
        alignSelf: 'center',
        backgroundColor:colors.white
      },
      imgBorder:{
        backgroundColor:colors.primary,
        borderRadius: 100,
        width: 120,
        height: 120,
        alignItems: 'center',
        justifyContent: 'center',
      },
      imgStyle:{
        backgroundColor: colors.primary,
        borderRadius: 100,
        width: 116,
        height: 116,
        alignItems: 'center',
        justifyContent: 'center',
      },
      img:{
        width: 110,
        height: 110,
        borderRadius: 79,
      },
})