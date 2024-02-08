import React, {Component} from 'react';
import {Dimensions, Image, Keyboard, ScrollView, View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import {connect} from 'react-redux';
import {appIcons} from '../../../assets';
import AppBackground from '../../../components/AppBackground';
import CustomButton from '../../../components/CustomButton';
import CustomText from '../../../components/CustomText';
import CustomTextInput from '../../../components/CustomTextInput';
import GooglePlaceAutocomplete from '../../../components/GooglePlaceAutocomplete';
import ImagePicker from '../../../components/ImagePicker';
import Img from '../../../components/Img';
import {ASSETS_URL} from '../../../config/WebService';
import {updateProfile} from '../../../redux/actions/authAction';
import {colors, family} from '../../../utils';
import {styles} from './styles';

const {width, height} = Dimensions.get('window');
export class EditProfile extends Component {
  state = {
    Firstname: this.props.user?.company_name,
    profileImage: null,
    Backimage: null,
    frontimage: null,
    pickedDocument: null,
    latitude: this.props.user?.latitude,
    longitude: this.props.user?.longitude,
    location: '',
    address: this.props.user?.location,
    bio: this.props.user?.description,
    selected: '',
  };

  onSubmit = () => {
    const {
      Firstname,
      profileImage,
      latitude,
      longitude,
      location,
      address,
      bio,
      selected,
    } = this.state;

    Keyboard.dismiss();
    let payload = new FormData();
    // payload.append('phone_number', phoneNumber);
    payload.append('company_name', Firstname);
    payload.append('push_notification', '1');
    payload.append('location', address);
    payload.append('latitude', latitude);
    payload.append('longitude', longitude);
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
    console.log('locatedca', payload);
    this.props.updateProfile(payload);
  };

  callback = (address, geometry) => {
    if (address) {
      this.setState({
        latitude: geometry?.location.lat,
        location: address,
        longitude: geometry?.location.lng,
      });
    } else {
      this.setState({location: ''});
    }
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
      longitude,
      location,
      bio,
      selected,
    } = this.state;
    const data = [
      {key: '0', value: 'Healthcare'},
      {key: '1', value: 'Construction'},
      {key: '2', value: 'Manufacturing'},
      {key: '3', value: 'Education'},
      {key: '4', value: 'Automobile Engineering'},
      {key: '5', value: 'Automotive industry'},
    ];

    const updateImageInGallery = (path, mime, type) => {
      this.setState({
        profileImage: {path, mime, type},
      });
    };
    const userdata = this.props.user;
    console.log(
      '🚀 ~ file: EditProfile.js:103 ~ EditProfile ~ render ~ userdata:',
      selected,
    );
    const saveAddress = (address, geometry) => {
      this.setState({address: address});
      this.setState({location: geometry?.location});
    };
    return (
      <AppBackground title={'Edit Profile'} back>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}>
          <View style={{flex: 1, height: height / 1.2}}>
            <View style={styles.mainContainer}>
              <ImagePicker
                onImageChange={(path, mime, type) => {
                  updateImageInGallery(path, mime, type);
                }}>
                <View style={styles.imgBorder}>
                  <View style={styles.imgStyle}>
                    {profileImage?.path ? (
                      <Image
                        style={styles.img}
                        source={{uri: profileImage?.path}}
                      />
                    ) : (
                      <Image
                        style={styles.img}
                        source={{uri: ASSETS_URL + userdata?.profile_image}}
                      />
                    )}
                  </View>
                </View>
              </ImagePicker>
            </View>
            <CustomText
              text="Upload Logo"
              color={colors.black}
              style={styles.uploadheading}
            />
            <View style={{gap: 10, marginHorizontal: 15, flex: 1}}>
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
                placeholder={userdata?.industry}
                disabledCheckBoxStyles={styles.label}
                dropdownStyles={styles.label}
                dropdownTextStyles={{color: colors.black}}
                inputStyles={{color: colors.black}}
              />
              <GooglePlaceAutocomplete
                addressText={location}
                placeholder={address ? address : 'Address'}
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
                title={'Save'}
                buttonStyle={styles.buttonStyle}
                onPress={this.onSubmit}
              />
            </View>
          </View>
        </ScrollView>
      </AppBackground>
    );
  }
}

function mapStateToProps({authReducer}) {
  return {
    user: authReducer?.user,
  };
}

const actions = {updateProfile};
export default connect(mapStateToProps, actions)(EditProfile);
