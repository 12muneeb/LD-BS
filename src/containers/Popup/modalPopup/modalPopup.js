import * as EmailValidator from 'email-validator';
import LottieView from 'lottie-react-native';
import React, {Component} from 'react';
import {
  Dimensions,
  FlatList,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import {connect} from 'react-redux';
import {appAnimation, appIcons} from '../../../assets';
import CustomButton from '../../../components/CustomButton';
import CustomIcon from '../../../components/CustomIcon';
import CustomModal from '../../../components/CustomModal';
import CustomText from '../../../components/CustomText';
import CustomTextInput from '../../../components/CustomTextInput';
import Img from '../../../components/Img';
import {
  addUser,
  loginUser,
  logoutUser,
} from '../../../redux/actions/authAction';
import appStyles from '../../../screens/appStyles';
import {colors, family, size} from '../../../utils';
import {AssignRole} from '../../../utils/dummyData';
import {styles} from './styles';

const {height} = Dimensions.get('window');
class ModalPopup extends Component {
  state = {
    isVisible: false,
    showModal: false,
    selectedItems: {},
    email: '',
    bio: '',
    passwords: '',
    titleinput: '',
    data: {},
    isPassword: true,
  };
  toggleItemSelection(index) {
    this.setState(prevState => {
      const updatedSelectedItems = {...prevState.selectedItems};
      if (updatedSelectedItems[index]) {
        updatedSelectedItems[index] = false;
      } else {
        for (const itemIndex in updatedSelectedItems) {
          updatedSelectedItems[itemIndex] = false;
        }
        updatedSelectedItems[index] = true;
      }
      return {selectedItems: updatedSelectedItems};
    });
  }
  resetSelectedItems = () => {
    this.setState({selectedItems: {}});
  };
  render() {
    const {
      togglePopup,
      isVisible,
      onBackButtonPress,
      onBackdropPress,
      modalActive,
      title,
      onYesPress,
      onNoPress,
      desc,
      sucessText,
      unsuccessText,
      congratulation,
      value,
      onGoBack,
      handleCross,
      text,
      placeholdertext,
      buttontitle,
      password,
      pass,
      description,
      titlefield,
      emailinput,
      data,
    } = this.props;
    const {email, bio, passwords, titleinput, isPassword} = this.state;
    const user = this.props.user;
    console.log(user, 'userrrr');
    console.log('value', value);
    const onAddUser = () => {
      if (email === '') {
        Toast.show({
          text1: `Email field can't be empty.`,
          type: 'error',
          visibilityTime: 3000,
        });
      } else if (!EmailValidator.validate(email)) {
        Toast.show({
          text1: `Please enter a valid email address.`,
          type: 'error',
          visibilityTime: 3000,
        });
      } else if (passwords === '') {
        Toast.show({
          text1: `Password field can't be empty.`,
          type: 'error',
          visibilityTime: 3000,
        });
      } else if (passwords.length < 8) {
        Toast.show({
          text1: `Password must be at least 8 characters.`,
          type: 'error',
          visibilityTime: 3000,
        });
      } else if (!/[A-Z]/.test(passwords)) {
        Toast.show({
          text1: `Password must contain at least one uppercase letter.`,
          type: 'error',
          visibilityTime: 3000,
        });
      } else if (!/\d/.test(passwords)) {
        Toast.show({
          text1: `Password must contain at least one number.`,
          type: 'error',
          visibilityTime: 3000,
        });
      } else if (!/[!@#$%^&*(),.?":{}|<>]/.test(passwords)) {
        Toast.show({
          text1: `Password must contain at least one special character.`,
          type: 'error',
          visibilityTime: 3000,
        });
      } else {
        let payload = new FormData();
        payload.append('email', email);
        payload.append('password', passwords);
        this.props.addUser(payload);
        let data = {
          email: email,
          profile_image: null,
          first_name: '',
          last_name: '',
        };
        this.setState({data: data});
        this.setState({email: '', passwords: ''});
        onGoBack();
        Keyboard.dismiss();
      }
    };

    const onSaveDetail = () => {
      const invalidChars = /[.,@]/;
      if (titleinput == '') {
        Toast.show({
          text1: `Title field can't be empty.`,
          type: 'error',
          visibilityTime: 3000,
        });
      } else if (invalidChars.test(titleinput)) {
        Toast.show({
          text1: `Title contains invalid characters (, @)`,
          type: 'error',
          visibilityTime: 3000,
        });
      } else if (bio == '') {
        Toast.show({
          text1: `Description field can't be empty.`,
          type: 'error',
          visibilityTime: 3000,
        });
      } else {
        onGoBack();
        Keyboard.dismiss();
      }
    };
    const renderView = () => {
      console.log('vbalue', value);
      let type = value;
      console.log('type0', type);
      if (type == 'Confirmation') {
        return (
          <View
            style={[
              appStyles.gap_10,
              appStyles.alignCenter,
              appStyles.paddingVertical_1,
              {borderRadius: 10},
            ]}>
            <View style={styles.lottieContainer}>
              {congratulation && (
                <LottieView
                  // ref={animationRef}
                  source={appAnimation?.delete}
                  autoPlay
                  loop
                  style={{height: 100, width: 100}}
                />
              )}
            </View>
            <CustomText style={styles.desc} text={desc} />
            <View
              style={[
                appStyles.directionRow,
                {...appStyles.paddingVertical_1},
              ]}>
              <CustomButton
                onPress={onYesPress}
                title={sucessText}
                buttonStyle={[styles.press, {backgroundColor: colors.primary}]}
                textStyle={[styles.btnstext, {color: colors.white}]}
              />
              <CustomButton
                onPress={onNoPress}
                title={unsuccessText}
                buttonStyle={[styles.press2, {backgroundColor: colors.white}]}
                textStyle={[styles.btnstext2, {color: colors.black}]}
              />
            </View>
          </View>
        );
      } else if (type == 'Success') {
        return (
          <View
            style={[
              appStyles.gap_10,
              appStyles.alignCenter,
              appStyles.paddingVertical_3,
            ]}>
            <View style={styles.lottieContainer}>
              {congratulation ? (
                <LottieView
                  // ref={animationRef}
                  source={require('./animation.json')}
                  autoPlay
                  loop
                  style={{height: 100, width: 100}}
                />
              ) : (
                <CustomIcon src={appIcons?.success} size={134} />
              )}
              <CustomText style={styles.title} text={title} />
              <CustomText style={styles.desc} text={desc} />
              <CustomButton
                onPress={onGoBack}
                title={'Go Back'}
                buttonStyle={styles.btnStyles}
                textStyle={styles.btnTextStyles}
              />
            </View>
          </View>
        );
      } else if (type === 'Employee') {
        return (
          <View style={{alignItems: 'center'}}>
            <CustomText
              text="Assign Role"
              color={colors.black}
              font={family.Poppins_Medium}
              size={size.normal}
              style={{textAlign: 'center'}}
            />
            <TouchableOpacity
              style={{position: 'absolute', right: 20}}
              onPress={() => {
                handleCross();
                this.resetSelectedItems();
              }}>
              <Img
                local
                src={appIcons.cross}
                resizeMode={'contain'}
                style={{width: 30, height: 30, bottom: 3}}
              />
            </TouchableOpacity>
            <View>
              <View style={{height: height * 0.4, marginVertical: 20}}>
                <FlatList
                  data={AssignRole}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={_index => _index.toString()}
                  contentContainerStyle={{gap: 10}}
                  renderItem={({item, index}) => (
                    <>
                      <View style={styles.rolecontainer}>
                        <CustomText
                          text={item.name}
                          color={colors.black}
                          size={size.small}
                          font={family.Poppins_Medium}
                        />
                        <TouchableOpacity
                          style={[
                            styles.rolecontent,
                            {
                              backgroundColor: this.state.selectedItems[index]
                                ? colors.primary
                                : 'transparent',
                            },
                          ]}
                          activeOpacity={0.8}
                          onPress={() => this.toggleItemSelection(index)}>
                          {this.state.selectedItems[index] ? (
                            <Img
                              local
                              src={appIcons.checkRight}
                              resizeMode={'contain'}
                              tintColor={colors.white}
                              style={{width: 15, height: 15}}
                            />
                          ) : null}
                        </TouchableOpacity>
                      </View>
                    </>
                  )}
                />
              </View>
            </View>
            <CustomButton
              onPress={() => {
                onGoBack();
                this.resetSelectedItems();
              }}
              title={'Confirm'}
              buttonStyle={styles.btnStyles}
              textStyle={styles.btnTextStyles}
            />
          </View>
        );
        // <FlatList
        // data={}

        // />
      } else if (type === 'AddEmployee') {
        return (
          <View style={{alignSelf: 'center'}}>
            <CustomText
              text={text ? text : 'Add New Employee'}
              color={colors.black}
              font={family.Poppins_Medium}
              size={size.normal}
              style={{textAlign: 'center'}}
            />
            <TouchableOpacity
              style={{position: 'absolute', right: 10}}
              onPress={() => {
                this.setState({email: '', passwords: ''});
                handleCross()
              }}>
              <Img
                local
                src={appIcons.cross}
                resizeMode={'contain'}
                style={{width: 30, height: 30, bottom: 3}}
              />
            </TouchableOpacity>

            <CustomTextInput
              Lineiconcolor={colors.gray}
              Iconcolor={colors.secondary}
              placeholder={placeholdertext ? placeholdertext : 'Email Address'}
              value={email}
              keyboardType={'email-address'}
              onChangeText={value => this.setState({email: value})}
              containerStyle={styles.emailinput}
            />
            {pass && (
              <CustomTextInput
                Lineiconcolor={colors.gray}
                Iconcolor={colors.secondary}
                placeholder={placeholdertext ? placeholdertext : 'Password'}
                value={passwords}
                hide={true}
                keyboardType={'default'}
                onChangeText={value => this.setState({passwords: value})}
                rightIcon={true}
                containerStyle={styles.emailinput}
              />
            )}
            <CustomButton
              onPress={() => {
                onAddUser();
              }}
              title={buttontitle ? buttontitle : 'Submit'}
              buttonStyle={styles.btnStyles}
              textStyle={styles.btnTextStyles}
            />
          </View>
        );
      } else if (type === 'AddField') {
        return (
          <View style={{alignSelf: 'center'}}>
            <CustomText
              text={text ? text : 'Save Details'}
              color={colors.black}
              font={family.Poppins_Medium}
              size={size.normal}
              style={{textAlign: 'center'}}
            />
            <TouchableOpacity
              style={{position: 'absolute', right: 10}}
              onPress={handleCross}>
              <Img
                local
                src={appIcons.cross}
                resizeMode={'contain'}
                style={{width: 30, height: 30, bottom: 3}}
              />
            </TouchableOpacity>

            <CustomTextInput
              Lineiconcolor={colors.gray}
              Iconcolor={colors.secondary}
              placeholder={'Title'}
              value={titleinput}
              keyboardType={'email-address'}
              onChangeText={value => this.setState({titleinput: value})}
              containerStyle={styles.emailinput}
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
              textInputStyles={{height: 120}}
              containerStyle={{
                height: 120,
                width: '100%',
                borderWidth: 0.4,
                borderColor: colors.primary,
                marginBottom: 10,
              }}
            />

            <CustomButton
              onPress={() => {
                onSaveDetail();
              }}
              title={buttontitle ? buttontitle : 'Submit'}
              buttonStyle={styles.btnStyles}
              textStyle={styles.btnTextStyles}
            />
          </View>
        );
      } else {
        <View>
          <Text>jkhdjkasghdkh</Text>
        </View>;
      }
    };
    return (
      <CustomModal
        onBackdropPress={onBackdropPress}
        onBackButtonPress={onBackButtonPress}
        visible={isVisible}
        animationIn="slideInRight"
        animationOut="slideOutLeft"
        togglePopup={togglePopup}
        value={value}>
        <View style={[styles.main]}>{renderView()}</View>
      </CustomModal>
    );
  }
}

function mapStateToProps({authReducer}) {
  return {
    user: authReducer?.user,
  };
}

const actions = {loginUser, logoutUser, addUser};
export default connect(mapStateToProps, actions)(ModalPopup);
