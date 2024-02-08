import React, { Component } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Linking,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { connect } from 'react-redux';
import { appIcons } from '../assets';
import ProfileImage from '../components/ProfileImage';
import { ASSETS_URL } from '../config/WebService';
import ModalPopup from '../containers/Popup/modalPopup/modalPopup';
import NavService from '../helpers/NavService';
import { logoutCurrentUser, logoutUser } from '../redux/actions/authAction';
import { colors, family, size } from '../utils';
import CustomText from './CustomText';
import Img from './Img';
const {width, height} = Dimensions?.get('screen');
const menuItems = [
  {
    icon: appIcons.myprofile,
    title: 'My Profile',
    nav: 'MyProfile',
  },
  {
    icon: appIcons.challenge,
    title: 'Challenges & Promotion',
    nav: 'ChallengesandPromotion',
  },
  {
    icon: appIcons.discussion,
    title: 'Discussion Board',
    nav: 'DiscussionBoard',
  },
  {
    icon: appIcons.call,
    title: 'Conference Call',
    nav: 'ConferenceCall',
  },
  {
    icon: appIcons.live,
    title: 'Live Streaming',
    nav: 'LiveStreaming',
  },
  {
    icon: appIcons.setting,
    title: 'Settings',
    nav: 'Settings',
  },
  {
    icon: appIcons.feed,
    title: 'Help & Feedback',
    nav: 'HelpCenter',
    nav: 'Feedback',
  },
  {
    icon: appIcons.logout,
    title: 'Logout',
    nav: 'logout',
  },
];

class Drawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      profileImage: null,
    };
  }
  openCamera = async () => {
    try {
      const image = await ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
      });

      console.log(image);
      NavService.navigate('BottomTabs', {screen: 'Dashboard'});
    } catch (error) {
      console.log(error);
    }
  };
  handleClose = () => {
    this?.setState({isVisible: false});
  };
  handleLogout = () => {
    this?.setState({isVisible: false});
    this.props.logoutCurrentUser();
  };
  render() {
    const {profileImage, isVisible} = this.state;
    const {user} = this.props;
    console.log('-----user-----user', user);
    const RenderItem = ({item, index}) => {
      const {title, icon, nav} = item;
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            if (title === 'Logout') {
              this?.setState({isVisible: true});
            } else if (item?.browser) {
              Linking.openURL(item?.browser);
            } else if (title === 'Live Streaming') {
              NavService.closeDrawer();
              setTimeout(() => {
                this.openCamera();
              }, 750);
            } else {
              NavService.closeDrawer();
              setTimeout(() => {
                this.props.navigation.navigate(nav);
              }, 850);
            }
          }}
          style={{
            width: item?.title == 'Logout' ? '70%' : '100%',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: height / 120,
            paddingHorizontal: width / 12,
            backgroundColor: item?.title == 'Logout' ? colors?.primary : null,
            paddingLeft: item?.title == 'Logout' ? 55 : null,
            gap: 10,
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            marginTop: item?.title == 'Logout' ? 12 : null,
          }}>
          <View
            style={{
              paddingVertical: 10,
              borderRadius: 7,
              marginBottom: 5,
            }}>
            <Image
              source={icon}
              style={{
                width: 26,
                height: 26,
                resizeMode: 'contain',
                tintColor:
                  item?.title == 'Logout'
                    ? colors.white
                    : item?.title == 'Help & Feedback'
                    ? null
                    : colors.primary,
              }}
            />
          </View>
          <CustomText
            // style={{marginTop: -5}}
            text={title}
            font={family?.Poppins_Medium}
            size={size?.xsmall}
            color={colors?.white}
          />
        </TouchableOpacity>
      );
    };
    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: colors.secondary,
          alignItems: 'center',
          paddingTop: getStatusBarHeight(),
          borderTopRightRadius: 30,
          borderBottomRightRadius: 30,
          borderRightColor: colors?.white,
          borderRightWidth: 2,
        }}>
        <TouchableOpacity
          onPress={() => NavService?.closeDrawer()}
          style={{height: 20, width: 20, alignSelf: 'flex-end', right: 20}}>
          <Img
            local
            resizeMode={'contain'}
            src={appIcons.drawerback}
            style={{height: 20, width: 20}}
          />
        </TouchableOpacity>
        <View
          style={{
            marginTop: 20,
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            paddingBottom: 30,
            gap: 5,
            paddingHorizontal: 20,
            position: 'relative',
            top: 20,
            borderBottomWidth: 1.5,
            borderBottomColor: colors?.white,
          }}>
          <View
            style={{
              height: 110,
              width: 110,

              borderRadius: 100,
              alignItems: 'center',
              borderWidth: 1.5,
              borderStyle: 'dashed',
              borderColor: colors.primary,
              justifyContent: 'center',
            }}>
            <ProfileImage
              ViewStyle={{
                justifyContent: 'center',
                marginTop: 0,
                borderColor: null,
                borderRadius: 140,
              }}
              widthsize={90}
              heightsize={90}
              ImageborderRadius={110}
              // ViewBorderWidth={0}
              ViewborderColor={colors.secondary}
              innerAsset={profileImage == null ? true : false}
              imageUri={{uri: ASSETS_URL + user?.profile_image}}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 8,
            }}>
            <CustomText
              text={user?.company_name}
              font={family?.Poppins_Medium}
              size={size?.small}
              color={colors?.white}
            />
            <CustomText
              // style={{marginTop: -4}}
              text={user?.email}
              font={family?.Poppins_Medium}
              size={size?.xsmall}
              color={colors?.white}
            />
          </View>
        </View>
        <View style={{flex: 1, marginTop: height / 20, width: '100%'}}>
          <FlatList
            bounces={false}
            showsVerticalScrollIndicator={false}
            data={menuItems}
            style={{
              height: '100%',
            }}
            renderItem={props => <RenderItem {...props} />}
          />
        </View>
        <ModalPopup
          modalActive
          value={'Confirmation'}
          isVisible={isVisible}
          desc="Are you sure you want to logout?"
          sucessText="Yes, Logout"
          unsuccessText="No"
          title={'Logout'}
          handleClose={this?.handleClose}
          onBackButtonPress={this?.handleClose}
          onBackdropPress={this?.handleClose}
          onYesPress={this?.handleLogout}
          onNoPress={this?.handleClose}
        />
      </View>
    );
  }
}

function mapStateToProps({authReducer: {user}}) {
  return {
    user: user,
  };
}
const actions = {logoutUser, logoutCurrentUser};
export default connect(mapStateToProps, actions)(Drawer);
