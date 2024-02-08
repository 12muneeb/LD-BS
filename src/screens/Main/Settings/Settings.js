import React, {Component} from 'react';
import {
  Linking,
  Text,
  View,
  TouchableOpacity,
  Image,
  Switch,
  Dimensions,
  Share,
  Platform,
} from 'react-native';
import AppBackground from '../../../components/AppBackground';
import {appIcons} from '../../../assets';
import styles from './styles';
import Img from '../../../components/Img';
import CustomText from '../../../components/CustomText';
import {colors} from '../../../utils';
import appStyles from '../../appStyles';
import {Toast} from 'react-native-toast-message/lib/src/Toast';
import {
  deleteUser,
  deleteAccount,
  logoutUser,
} from '../../../redux/actions/authAction';
import {connect} from 'react-redux';
import {getContent} from '../../../redux/actions/appAction';
import NavService from '../../../helpers/NavService';

const {width} = Dimensions.get('screen');

class Settings extends Component {
  constructor(props) {
    super(props);
    const {user} = this?.props;
    this.state = {
      index: 0,
      set: '',
      geo: '',
      sharing: false,
      isNotification: '',
      isGeoLocation: '',
      getContent: '',
      getContentPP: '',
    };
  }
  getContent = params => {
    this.props.getContent(params, response => {
      this.setState({
        getContent: response,
      });
    });
  };
  getContentPP = params1 => {
    this.props.getContent(params1, response => {
      console.log('logForPP', response);
      this.setState({
        getContentPP: response,
      });
    });
  };
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      'focus',
      async () => {
        let params = {
          key: 'type',
          value: 'tc',
        };
        let params1 = {
          key: 'type',
          value: 'pp',
        };
        this?.getContent(params);
        this?.getContent(params1);
      },
    );
  }
  componentWillUnmount() {
    this.focusListener();
  }
  shareMessage = async () => {
    const {isGeoLocation, isNotification, sharing} = this.state;
    if (sharing) return;

    this.setState({sharing: true}); // Set the sharing flag to true

    setTimeout(async () => {
      try {
        const result = await Share.share({
          message: 'Hello, I am sharing this text!',
        });

        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            console.log(`Shared via ${result.activityType}`);
          } else {
            console.log('Shared successfully');
          }
        } else if (result.action === Share.dismissedAction) {
          console.log('Share sheet dismissed');
        }
      } catch (error) {
        console.error('Error sharing:', error.message);
      } finally {
        setTimeout(() => this.setState({sharing: false}), 500); // Reset the sharing flag after a delay
      }
    }, 100);
  };

  render() {
    const {getContentPP, isNotification, sharing, getContent} = this.state;
    console.log('getContentgetContent', getContent);
    console.log('logForPPlogForPPlogForPP', getContentPP);
    const openTerms = () => {
      let params = {
        key: 'type',
        value: 'tc',
      };
      this?.getContent(params);
      setTimeout(() => {
        Linking.openURL(getContent?.url);
      }, 850);
    };
    const openPrivacyPolicy = () => {
      let params = {
        key: 'type',
        value: 'pp',
      };
      this?.getContent(params);
      setTimeout(() => {
        Linking.openURL(getContent?.url);
      }, 850);
    };
    const methods = [
      {
        name: 'Terms & Conditions',
        icon: appIcons.chevronforward,
        onPress: () => openTerms(),
        color: colors.primary,
      },
      {
        name: 'Privacy Policy',
        icon: appIcons.chevronforward,
        color: colors.primary,
        onPress: () => openPrivacyPolicy(),
      },
      {
        name: 'About App',
        icon: appIcons.chevronforward,
        color: colors.primary,
        onPress: () => navigation.navigate('AboutApp'),
      },
      {
        name: 'Share App',
        icon: appIcons.chevronforward,
        color: colors.primary,
        onPress: this.shareMessage,
      },
      {
        name: 'Delete Account',
        icon: appIcons.chevronforward,
        color: colors.primary,
        onPress: () => {
          this.props.deleteAccount();
          this.props.logoutUser();
        },
      },
    ];
    const {navigation} = this.props;

    return (
      <AppBackground
        newBack
        leftIcon={appIcons.back}
        title={'Settings'}
        marginHorizontal={false}
        back>
        <View style={appStyles.margin1Percent}>
          <View style={styles.viewStyle1}>
            <Img
              tintColor={colors.secondary}
              local
              src={appIcons.notification}
              style={[styles.buttonInnerImage, {left: width / 50}]}
            />
            <CustomText text="Push Notifications  " style={styles.textStyle1} />
            <Switch
              style={{
                transform: [
                  {scaleX: Platform.OS == 'android' ? 0.99 : 0.8},
                  {scaleY: Platform.OS == 'android' ? 0.99 : 0.8},
                ],
              }}
              trackColor={{false: colors.secondary, true: '#10B5FA'}}
              thumbColor={isNotification ? 'white' : 'white'}
              ios_backgroundColor={
                isNotification ? colors.secondary : colors.primary
              }
              value={isNotification}
              onValueChange={newValue => {
                if (newValue) {
                  Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Notification is on',
                    visibilityTime: 2000,
                  });
                } else {
                  Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Notification is off',
                    visibilityTime: 2000,
                  });
                }
                this.setState({isNotification: newValue});
              }}
            />
          </View>

          <View style={styles.viewStyle2}>
            <View style={styles.space}>
              {methods.map((method, i) => {
                const {color, name, icon, onPress} = method;
                return (
                  <TouchableOpacity
                    onPress={onPress}
                    key={i}
                    activeOpacity={0.8}
                    style={[styles.buttonContainer, {backgroundColor: color}]}>
                    <Img
                      tintColor={colors.white}
                      local
                      src={icon}
                      style={styles.buttonInnerImage}
                    />
                    <CustomText text={name} style={styles.buttonInnerText} />
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </View>
      </AppBackground>
    );
  }
}

const actions = {deleteUser, getContent, deleteAccount, logoutUser};
export default connect(null, actions)(Settings);
