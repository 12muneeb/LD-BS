import React, {Component} from 'react';
import {
  TouchableOpacity,
  View,
  Image,
  Keyboard,
  Alert,
  Platform,
  Dimensions,
} from 'react-native';
import {connect} from 'react-redux';
import * as EmailValidator from 'email-validator';
import CustomBackground from '../../../components/CustomBackground';
import CustomButton from '../../../components/CustomButton';
import CustomTextInput from '../../../components/CustomTextInput';
import Toast from 'react-native-toast-message';
import NavService from '../../../helpers/NavService';
import {schema} from '../../../utils/validation';
import {colors, family, size} from '../../../utils';
import {appIcons, appLogos} from '../../../assets/index';
import {loginUser, signUpUser} from '../../../redux/actions/authAction';
import styles from './styles';
import {Input} from 'react-native-elements';
import Img from '../../../components/Img';
import {Text, TextInput} from 'react-native-elements';

const {width} = Dimensions.get('screen');
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocused: false,
      email: '',
      setKeyboardStatus: false,
      showLabel: false,
    };
    this.inputRef = React.createRef();
  }
  handleInputFocus = () => {
    this.setState({isFocused: true, showLabel: true});
  };
  handleInputBlur = () => {
    this.setState({isFocused: false, showLabel: false});
  };
  handleLabelClick = () => {
    this.inputRef.current.focus();
    this.setState({showLabel: true});
  };
  onSubmit = () => {
    const {email} = this.state;
    Keyboard.dismiss();
    if (!email) {
      Toast.show({
        text1: 'Email address field can`t be empty.',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!EmailValidator.validate(email)) {
      Toast.show({
        text1: 'Please enter a valid email address.',
        type: 'error',
        visibilityTime: 3000,
      });
    } else {
      let payload = {
        email: email,
        device_type: Platform.OS,
        device_token: '123214324',
        user_type:'business'
      };
      Keyboard.dismiss();
      // Alert.alert('kln')
      this.props.signUpUser(payload, {verified: email}, this);
    }
  };
  componentDidMount() {
    const {setKeyboardStatus} = this.state;
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      this.setState({setKeyboardStatus: true});
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      this.setState({setKeyboardStatus: false, showLabel: false});
    });
    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }
  handleBackButtonClick() {
    NavService.navigate('AppStarter');
    return true;
  }
  render() {
    const {email, password, setKeyboardStatus, isFocused, showLabel} =
      this.state;
    const {label, ...inputProps} = this.props;
    return (
      <CustomBackground
        showLogo={false}
        backgroundImage
        titleText={'Login'}
        Back={true}>
        <View
          style={
            setKeyboardStatus == true
              ? {bottom: '2%', alignItems: 'center', alignSelf: 'center'}
              : {alignItems: 'center', alignSelf: 'center', marginTop: 10}
          }
          >
          <View style={styles.container}>
            <View style={[styles.container, {marginTop: 30}]}>
              <View style={styles.logoStyle}>
                <Image style={styles.applogo} source={appLogos.appLogo} />
              </View>
              <View style={styles.labelcontainer}>
                <Img
                  local={true}
                  src={appIcons.email}
                  resizeMode={'contain'}
                  style={styles.iconimg}
                  tintColor={colors.black}
                />
                <View style={styles.labelsubcontainer} />
                <View style={styles.labelcontent}>
                  <Text
                    style={[
                      {
                        top: email === '' && !setKeyboardStatus ? 14 : 5,
                      },
                      styles.labeltext,
                    ]}
                    onPress={() => {
                      if (email !== '') {
                        this.setState({showLabel: false});
                      }
                    }}>
                    Email
                  </Text>
                  <Input
                    placeholderTextColor={colors.secondary}
                    inputContainerStyle={styles.inputContainer}
                    style={styles.input}
                    ref={this.inputRef}
                    onFocus={this.handleInputFocus}
                    keyboardType='email-address'
                    onBlur={() => {
                      if (email !== '' && !this.inputRef.current.isFocused) {
                        this.setState({showLabel: false});
                      }
                    }}
                    placeholder={showLabel ? '' : ''}
                    onChangeText={value => this.setState({email: value})}
                    maxLength={30}
                    value={email}
                  />
                </View>
              </View>
              <CustomButton
                title="Next"
                onPress={this.onSubmit}
                buttonStyle={styles.btn}
              />
            </View>
          </View>
        </View>
      </CustomBackground>
    );
  }
}
const actions = {loginUser,signUpUser};
export default connect(null, actions)(Login);