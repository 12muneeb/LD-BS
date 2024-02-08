import React, {Component} from 'react';
import {
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Dimensions,
  StyleSheet,
  UIManager,
} from 'react-native';
import {connect} from 'react-redux';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {colors, family, size} from '../utils';
import NavService from '../helpers/NavService';
import {appIcons, appImages, appLogos} from '../assets';
import ProfileImage from './ProfileImage';
import {logoutUser} from '../redux/actions/authAction';
import CustomText from './CustomText';
import ModalPopup from '../containers/Popup/modalPopup/modalPopup';
import Img from './Img';
import Chat from '../screens/Main/Chat';
import appStyles from '../screens/appStyles';
import Chats from './Chats';
import {TextInput} from 'react-native';
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
      messages: [
        {
          image: appIcons.dummy1,
          username: 'Jay Smith',
          message:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.',
          createdAt: '15 min',
          isMine: false,
        },
        {
          image: appIcons.dummy1,
          username: 'Jay Smith',
          message:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.',
          createdAt: '15 min',
          isMine: false,
        },
        {
          image: appIcons.dummy2,
          username: 'John Smith',
          message:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.',
          createdAt: '15 min',
          isMine: true,
        },
        {
          image: appIcons.dummy2,
          username: 'John Smith',

          message:
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.',
          createdAt: '15 min',
          isMine: true,
        },
      ],
      isModal: false,
      path: '',
    };
  }
  handleClose = () => {
    this?.setState({isVisible: false});
  };
  handleLogout = () => {
    this?.props?.logoutUser();
  };
  render() {
    const {profileImage, isVisible, messages, isModal} = this.state;
    const {user} = this.props;
    // const {name} = this.props.route.params;

    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }

    const sendNewMessage = async (type, image) => {
      if (this.messageInput?.current?.length > 0 || image) {
        const sentMessage = [
          image
            ? {
                username: 'John Smith ',
                createdAt: '12:00 PM',
                isMine: true,
                dataImage: image,
              }
            : {
                username: 'John Smith',
                message: this.messageInput?.current,
                createdAt: '12:00 PM',
                isMine: true,
              },
        ];
        const currentMessages = [...sentMessage, ...messages];
        currentMessages.reverse();
        this.setState({messages: currentMessages});
        this.messageInput.current = '';
        this.messageInput?.clear();
        Keyboard.dismiss();
      } else {
        Toast.show({
          text1: 'Enter message',
          type: 'error',
          visibilityTime: 3000,
        });
      }
    };
    const RenderItem = ({item, index}) => {
      const {title, icon, nav} = item;
      return (
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => {
            if (title === 'Logout') {
              // this.props.logoutUser();
              NavService?.closeDrawer();
              this?.setState({isVisible: true});
            } else if (item?.browser) {
              Linking.openURL(item?.browser);
            } else {
              this.props.navigation.navigate(nav);
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
          backgroundColor: colors.white,
          alignItems: 'center',
          paddingTop: getStatusBarHeight(),
          borderTopLeftRadius: 30,
          borderBottomLeftRadius: 30,
          borderRightColor: colors?.white,
          paddingVertical: 20,
          paddingHorizontal: 20,
        }}>
        <TouchableOpacity
          onPress={() => NavService?.closeDrawer()}
          style={{height: 50, width: 50, alignSelf: 'flex-start'}}>
          <Img
            local
            resizeMode={'contain'}
            src={appIcons.cross}
            style={{height: 30, width: 30, top: 10}}
            // tintColor={colors?.black}
          />
        </TouchableOpacity>
        {/* Chat */}
        <View style={styles.mainCont}>
          <FlatList
            data={messages?.reverse()}
            inverted
            showsVerticalScrollIndicator={false}
            style={styles.flatListStyle}
            contentContainerStyle={styles.listcont}
            renderItem={({item}) => <Chats item={item} />}
          />

          <View style={[styles.flexRow, styles.messageView]}>
            <View style={[styles.flexRow, styles.inputCont]}>
              <TouchableOpacity>
                <ImagePicker
                  onImageChange={(path, mime) => {
                    this.setState({path: path});
                    sendNewMessage('image', path);
                  }}>
                  <Img
                    local
                    src={appIcons.attachement}
                    style={styles.attachmentIcon}
                    resizeMode={'cover'}
                  />
                </ImagePicker>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.9}>
                <Img
                  local
                  src={appIcons.line}
                  style={styles.icon}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
              <TextInput
                ref={input => {
                  this.messageInput = input;
                }}
                style={styles.textInput}
                placeholder="Your message here.....!"
                placeholderTextColor={colors.black}
                value={this.messageInput}
                onChangeText={text => {
                  this.messageInput.current = text;
                }}
              />
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => {
                  sendNewMessage('text');
                }}
                style={styles.sendCont}>
                <Img
                  local
                  src={appIcons.send}
                  style={styles.icon}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps({authReducer: {user}}) {
  return {
    user: user,
  };
}
const actions = {logoutUser};
export default connect(mapStateToProps, actions)(Drawer);

const styles = StyleSheet.create({
  mainCont: {
    ...appStyles.mainContainer,
  },

  flexRow: {
    ...appStyles.directionRow,
    ...appStyles.alignCenter,
  },

  title: {
    ...appStyles.family_Poppins_SemiBold,
    color: colors.black,
    ...appStyles.font15,
  },

  messageView: {
    ...Shadows.shadow5,
    ...appStyles.w100,
    height: 50,
    backgroundColor: '#F5F5F5',
    ...appStyles.justifyCenter,
    ...appStyles.alignCenter,
    borderRadius: 100,
    paddingHorizontal: 10,
  },

  textInput: {
    flex: 1,
    height: '100%',
    color: colors.black,
    ...appStyles.font13,
    ...appStyles.family_Poppins_Regular,
    paddingLeft: 10,
  },
  inputCont: {
    // backgroundColor:'red'
  },

  attachmentIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  sendCont: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    ...Shadows.shadow5,

    backgroundColor: colors.primary,
  },

  icon: {
    width: 20,
    height: 20,
  },

  listcont: {
    paddingBottom: 10,
  },
});
