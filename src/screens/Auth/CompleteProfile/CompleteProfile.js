import React, { Component } from 'react';
import {
  BackHandler,
  Dimensions,
  Image,
  Keyboard,
  Text,
  View
} from 'react-native';
import Toast from 'react-native-toast-message';
import { connect } from 'react-redux';

// import DocumentPicker from 'react-native-document-picker';
import { SelectList } from 'react-native-dropdown-select-list';
import { appIcons } from '../../../assets/index';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import CustomText from '../../../components/CustomText';
import CustomTextInput from '../../../components/CustomTextInput';
import GooglePlaceAutocomplete from '../../../components/GooglePlaceAutocomplete';
import ImagePicker from '../../../components/ImagePicker';
import Img from '../../../components/Img';
import ProfileImage from '../../../components/ProfileImage';
import NavService from '../../../helpers/NavService';
import { completeProfile } from '../../../redux/actions/authAction';
import { colors, family, size } from '../../../utils';
import styles from './styles';

const {width} = Dimensions.get('window');
class CompleteProfile extends Component {
  state = {
    Firstname: '',
    phoneNumber: '',
    profileImage: null,
    Backimage: null,
    frontimage: null,
    pickedDocument: null,
    latitude: '',
    longitude: '',
    location: '',
    address: '',
    bio: '',
    selected: '',
    locationNew: '',
    address: null,
  };

  onSubmit = () => {
    const {
      Firstname,
      profileImage,
      phoneNumber,
      address,
      location,
      bio,
      locationNew,
      selected,
    } = this.state;
    const invalidChars = /[.,@]/;
    if (Firstname == '') {
      Toast.show({
        text1: 'Company Name field can`t be empty',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (invalidChars.test(Firstname)) {
      Toast.show({
        text1: 'Company Name contains invalid characters (, @)',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!selected) {
      Toast.show({
        text1: "Industry field can't be empty",
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (location == '') {
      Toast.show({
        text1: `Address field can't be empty`,
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (bio == '') {
      Toast.show({
        text1: 'Description field can`t be empty',
        type: 'error',
        visibilityTime: 3000,
      });
    } else {
      Keyboard.dismiss();
      let payload = new FormData();
      payload.append('company_name', Firstname);
      payload.append('push_notification', '1');
      payload.append('location', location);
      payload.append('latitude', address?.lat);
      payload.append('longitude', address?.lng);
      payload.append('industry', selected);
      payload.append('description', bio);
      if (profileImage !== null) {
        payload.append('profile_image', {
          uri: profileImage?.path,
          name: `Profile${Date.now()}.${profileImage?.mime?.slice(
            profileImage?.mime?.lastIndexOf('/') + 1,
          )}`,
          type: profileImage?.mime,
        });
      }
      console.log('payloadpayload', payload);
      this.props.completeProfile(payload);
    }
  };

  // callback = (address, geometry, newValue) => {

  //   if (address) {
  //     this.setState({location: address,address: geometry?.location});
  //   } else if (newValue.length > 0) {
  //     this.setState({locationNew: newValue,address: geometry?.location});
  //   } else if (address == '') {
  //     this.setState({location: ''});
  //   }
  // };
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.onBackPress,
    );
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }

  onBackPress = () => {
    NavService.navigate('AppStarter');
    
    return true;
  };
  render() {
    const {
      Firstname,
      Backimage,
      frontimage,
      profileImage,
      pickedDocument,
      address,
      latitude,
      selected,
      location,
      bio,
    } = this.state;
    const data = [
      {key: '0', value: 'Healthcare'},
      {key: '1', value: 'Construction'},
      {key: '2', value: 'Manufacturing'},
      {key: '3', value: 'Education'},
      {key: '4', value: 'Automobile Engineering'},
      {key: '5', value: 'Automotive industry'},
    ];
    const {verified, mail} = this?.props?.route?.params;
    // console.log(mail, 'mail');

    const updateImageInGallery = (path, mime, type) => {
      this.setState({
        profileImage: {path, mime, type},
      });
    };
    const saveAddress = (address, geometry) => {
      console.log('addressaddressaddress', address);
      console.log('geometrygeometry', geometry);
      this.setState({location: address, address: geometry?.location});
    };
    console.log('locationlocation', selected);
    return (
      <CustomBackground
        showLogo={false}
        backgroundImage
        titleText={'Create Profile'}
        onback={true}
        back={false}>
        <View style={styles.mainContainer}>
          <ImagePicker
            onImageChange={(path, mime, type) => {
              updateImageInGallery(path, mime, type);
            }}>
            <ProfileImage
              ViewStyle={{
                justifyContent: 'center',
                marginTop: 0,
              }}
              viewHeight={130}
              ViewWidth={130}
              widthsize={profileImage?.path ? 130 : 30}
              heightsize={profileImage?.path ? 130 : 30}
              ImageborderRadius={profileImage?.path ? 100 : 0}
              ViewBorderWidth={2}
              ViewborderColor={colors.secondary}
              innerAsset={profileImage == null ? true : false}
              imageUri={
                profileImage !== null ? profileImage?.path : appIcons.camera
              }
            />
          </ImagePicker>
        </View>
        <CustomText
          text="Upload Logo"
          color={colors.black}
          style={styles.uploadheading}
        />
        <View style={{width: width - 40, gap: 15}}>
          <CustomTextInput
            Lineiconcolor={colors.gray}
            Iconcolor={colors.secondary}
            placeholder={'Company Name'}
            value={Firstname}
            keyboardType={'email-address'}
            onChangeText={value => this.setState({Firstname: value})}
            containerStyle={styles.emailinput}
          />
          <SelectList
            setSelected={selected =>
              this.setState({selected: data[selected]?.value})
            }
            fontFamily={family.Poppins_Medium}
            data={data}
            arrowicon={
              <Img
                local
                src={appIcons.down}
                style={{width: 15, height: 15}}
                resizeMode={'contain'}
              />
            }
            search={false}
            boxStyles={styles.dropdown}
            placeholder="Industry"
            disabledCheckBoxStyles={styles.label}
            dropdownStyles={styles.label}
            dropdownTextStyles={{color: colors.black}}
            inputStyles={{color: colors.black}}
          />
          <View style={styles.dateRow}>
            <Text style={styles.verText}>{verified}</Text>
            <View style={{flexDirection: 'row'}}>
              <Image style={styles.verified} source={appIcons.verify} />
              <CustomText
                text="Verified"
                color={colors.secondary}
                font={family.Poppins_Bold}
                size={size.xxsmall}
              />
            </View>
          </View>
          {/* {mail ? (
            <CustomTextInput
              Lineiconcolor={colors.gray}
              Iconcolor={colors.secondary}
              placeholder={'Email'}
              editable={false}
              value={
                mail.length <= 23 ? mail : `${mail.toString().slice(0, 24)}...`
              }
              rightImage={appIcons.verify}
              tintColor={colors.secondary}
              keyboardType={'email-address'}
              rightimagetext={'Verified'}
              rightimagetextstyle={{color: 'red'}}
              onChangeText={value => this.setState({mail: value})}
              containerStyle={[
                styles.emailinput,
                {
                  borderWidth: 1.5,
                  borderColor: colors.secondary,
                  backgroundColor: 'transparent',
                },
              ]}
              textInputStyles={{}}
            />
          ) : (
            <View style={[appStyles.directionRow]}>
              <View>
                <PhoneInput
                  ref={this.phoneInput}
                  codeTextStyle={{color: colors.black}}
                  textInputProps={{
                    maxLength: 13,
                    color: 'black',
                    right: 10,
                    editable: false,
                    placeholderTextColor: colors.black,
                  }}
                  disabled={true}
                  // defaultValue={phoneNumbers ? phoneNumbers : phoneNumber}
                  defaultCode="US"
                  disableArrowIcon={true}
                  layout="second"
                  containerStyle={styles.phoneContainer}
                  textContainerStyle={styles.textContainerPhone}
                  textInputStyle={{
                    padding: 0,
                    fontSize: size.small,
                  }}
                  textStyle={{fontSize: 10, color: colors.black}}
                  countryPickerButtonStyle={[styles.countryPickerButtonStyle]}
                  onChangeText={text => {
                    this.setState({phoneNumber: text});
                  }}
                  onChangeFormattedText={text => {
                    this.setState({formattedValue: text});
                  }}
                  withDarkTheme
                  autoFocus
                />
                <Img
                  tintColor={colors.gray}
                  local
                  src={appIcons.line}
                  resizeMode={'cover'}
                  style={{
                    height: 40,
                    width: 0.75,
                    left: 55,
                    top: 8,
                    position: 'absolute',
                  }}
                />
              </View>
              <View
                style={{
                  position: 'absolute',
                  // bottom: 0,
                  height: 55,
                  alignItems: 'center',
                  flexDirection: 'row',
                  right: 10,
                }}>
                <Img
                  tintColor={colors.secondary}
                  local
                  src={appIcons.verify}
                  resizeMode={'contain'}
                  style={{height: 20, width: 20, right: 5}}
                />
                <CustomText
                  text="Verified"
                  size={size?.xxsmall}
                  color={colors.secondary}
                  style={{
                    marginRight: 10,
                    ...appStyles.family_Poppins_SemiBold,
                  }}
                />
              </View>
            </View>
          )} */}
          <GooglePlaceAutocomplete
            addressText={location}
            placeholder={'Address'}
            rightIcon={appIcons.location}
            CheckIn={true}
            backgroundColor={'transparent'}
            isBorderShow
            callback={saveAddress}
            wrapperStyles={styles.wrapmper}
            contStyles={styles.contStyles}
            rightImg={false}
            locationNew
          />

          <CustomTextInput
            textAlignVertical="top"
            maxLength={350}
            multiline
            placeholder={'Description'}
            value={bio}
            color={'black'}
            isBorderShow
            borderColor={colors.primary}
            keyboardType={'default'}
            onChangeText={value => this.setState({bio: value})}
            textInputStyles={{height: 150}}
            containerStyle={{
              height: 150,
              width: '100%',
            }}
          />
          <CustomButton
            title={'Continue'}
            buttonStyle={styles.buttonStyle}
            onPress={this.onSubmit}
          />
        </View>
      </CustomBackground>
    );
  }
}

const actions = {completeProfile};
export default connect(null, actions)(CompleteProfile);
