import React, {Component, createRef} from 'react';
import {
  Dimensions,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  Pressable,
  Keyboard,
} from 'react-native';
import Toast from 'react-native-toast-message';
const {width, height} = Dimensions.get('window');
import styles from './styles';
import {loginUser} from '../../../redux/actions/authAction';
import {connect} from 'react-redux';
import ActionSheetComponent from '../../../components/ActionSheetComponent';
import AppBackground from '../../../components/AppBackground';
import appStyles from '../../appStyles';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import CustomButton from '../../../components/CustomButton';
import Img from '../../../components/Img';
import NavService from '../../../helpers/NavService';
import {appIcons, appImages} from '../../../assets';
import {colors, family, size, WP} from '../../../utils';
import CustomTextInput from '../../../components/CustomTextInput';
import GooglePlaceAutocomplete from '../../../components/GooglePlaceAutocomplete';
import ProfileImage from '../../../components/ProfileImage';
import ImagePicker from '../../../components/ImagePicker';
import SocialSheetPopup from '../../../containers/Popup/socialSheetPopup/socialSheetPopup';
import {SelectList} from 'react-native-dropdown-select-list';
import {rewardList, createChallenge} from '../../../redux/actions/appAction';

class ChallengesPromotionCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Eventname: '',
      EventDescription: '',
      selectFormat: 0,
      date: '',
      date2: '',
      profileImage: '',
      isDatePickerVisible: false,
      selectedDate: '',
      isDatePickerVisible2: false,
      selectedDate2: '',
      profileImage: null,
      selected: '',
      target: '',
      rewardList: [],
    };
    this.actionSheetStateRef = createRef();
  }
  onSubmit = () => {
    const {
      Eventname,
      EventDescription,
      date,
      date2,
      selected,
      target,
      profileImage,
    } = this.state;
    const invalidChars = /[.,@]/;
    const momentStartDate = moment(date);
    const momentEndDate = moment(date2);
    if (profileImage == null) {
      Toast.show({
        text1: 'Profile Image can`t be empty',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (Eventname == '') {
      Toast.show({
        text1: 'Title field can`t be empty',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (invalidChars.test(Eventname)) {
      Toast.show({
        text1: 'Title contains invalid characters (, @)',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!EventDescription) {
      Toast.show({
        text1: 'Description field can`t be empty',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (date == '') {
      Toast.show({
        text1: 'Start Date field can`t be empty',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (date2 == '') {
      Toast.show({
        text1: 'End Date field can`t be empty',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (momentStartDate.isAfter(momentEndDate)) {
      Toast.show({
        text1: 'End date must be less than start date',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (target == '') {
      Toast.show({
        text1: 'Target field can`t be empty',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!selected) {
      Toast.show({
        text1: "Industry field can't be empty",
        type: 'error',
        visibilityTime: 3000,
      });
    } else {
      Keyboard.dismiss();
      let payload = new FormData();
      if (profileImage !== null) {
        payload.append('image', {
          uri: profileImage?.path,
          name: `Profile${Date.now()}.${profileImage?.mime?.slice(
            profileImage?.mime?.lastIndexOf('/') + 1,
          )}`,
          type: profileImage?.mime,
        });
      }
      payload.append('title', Eventname);
      payload.append('description', EventDescription);
      payload.append('start_date', date);
      payload.append('end_date', date2);
      payload.append('target', target);
      payload.append('reward_id', selected == 'Education' ? 1 : 2);
      this.props.createChallenge(payload);
      console.log('paylaodofcooooom', payload);
      // Toast.show({
      //   text1: 'Event Created successfully',
      //   type: 'success',
      //   visibilityTime: 3000,
      // });
      NavService.navigate('BottomTabs', {screen: 'BusinessProfile'});
    }
  };
  rewardList = () => {
    this.props.rewardList(null, response => {
      this.setState({rewardList: response});
    });
  };
  componentDidMount() {
    this.rewardList();
  }
  render() {
    const {
      Eventname,
      EventDescription,
      date,
      profileImage,
      isDatePickerVisible,
      selectedDate,
      isDatePickerVisible2,
      selectedDate2,
      date2,
      target,
      rewardList,
    } = this.state;
    // console.log('rewardList', rewardList?.id[0]);

    const updateImageInGallery = (path, mime, type) => {
      this.setState({profileImage: {path, mime, type}});
    };
    const data = rewardList.map(item => item.name);
    const ids = rewardList.map(item => item.name);
    console.log('isdssss', ids);

    return (
      <AppBackground
        back
        title={'Create Challenges & Promotions'}
        leftIcon={appIcons.drawer}>
        <ActionSheetComponent
          ref={this.actionSheetStateRef}
          title="Select Gender"
          dataset={ids}
          onPress={item => {
            this.setState({
              gender: item,
            });
          }}
        />
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{alignItems: 'center'}}>
            <View
              style={[
                appStyles.alignCenter,
                appStyles.paddingVertical_2,
                appStyles.gap_5,
                {
                  flex: 1,
                },
              ]}>
              <View style={{marginTop: 20}}>
                <ImagePicker
                  onImageChange={(path, mime, type) => {
                    updateImageInGallery(path, mime, type);
                  }}>
                  <ProfileImage
                    ViewborderColor={colors.gray}
                    ViewBorderWidth={2}
                    borderRadiii
                    ViewStyle={{
                      height: 150,
                      width: width - 40,
                      borderRadius: 20,
                      backgroundColor: colors?.white,
                      borderStyle: 'dashed',
                    }}
                    tintColor={colors.red}
                    backheight
                    borderWWidth={profileImage?.path ? 0 : 1}
                    backwidth
                    resizeMode={'cover'}
                    backgroundColor={colors.white}
                    borderWidth
                    name={'UserName'}
                    style={
                      profileImage?.path
                        ? {height: '100%', width: '100%', borderRadius: 20}
                        : {height: 100, width: 100, resizeMode: 'contain'}
                    }
                    innerAsset={profileImage == null ? true : false}
                    imageUri={
                      profileImage !== null
                        ? profileImage?.path
                        : appIcons.uploadimg
                    }
                  />
                </ImagePicker>
              </View>

              <View
                style={[
                  appStyles.gap_15,
                  {
                    marginTop: 10,
                    alignItems: 'center',
                    justifyContent: 'center',
                  },
                ]}>
                <CustomTextInput
                  maxLength={35}
                  isBorderShow
                  placeholderColor={colors.black}
                  placeholder={'Title'}
                  value={Eventname}
                  keyboardType={'default'}
                  onChangeText={value => this.setState({Eventname: value})}
                  containerStyle={{
                    borderRadius: 30,
                  }}
                />
                <CustomTextInput
                  maxLength={350}
                  multiline
                  isBorderShow
                  placeholderColor={colors.black}
                  placeholder={'Description'}
                  value={EventDescription}
                  height={100}
                  borderRadius={5}
                  keyboardType={'default'}
                  onChangeText={value =>
                    this.setState({EventDescription: value})
                  }
                  textAlignVertical={'top'}
                  containerStyle={{
                    height: 100,
                    borderRadius: 30,
                    marginHorizontal: 20,
                  }}
                />
                <View style={styles.calendarrow}>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({selectFormat: 0});
                      this.setState({isDatePickerVisible2: false});
                      this.setState({isDatePickerVisible: true});
                    }}
                    style={[styles.dateBtn, {backgroundColor: 'white'}]}>
                    <Text
                      style={[
                        styles.placeHolderText,
                        date === selectedDate && {color: colors.black},
                      ]}>
                      {date ? moment(date).format('MM-DD-YYYY') : 'Start Date'}
                    </Text>
                    <Img
                      tintColor={'#2F66F9'}
                      local
                      style={[styles.calenderIcon]}
                      src={appIcons.calendar}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({isDatePickerVisible: false});
                      this.setState({isDatePickerVisible2: true});
                    }}
                    style={[styles.dateBtn, {backgroundColor: 'white'}]}>
                    <Text
                      style={[
                        styles.placeHolderText,
                        date2 === selectedDate2 && {color: colors.black},
                      ]}>
                      {date2 ? moment(date2).format('MM-DD-YYYY') : 'End Date'}
                    </Text>
                    <Img
                      tintColor={'#2F66F9'}
                      local
                      style={[styles.calenderIcon]}
                      src={appIcons.calendar}
                    />
                  </TouchableOpacity>
                </View>
                <CustomTextInput
                  maxLength={6}
                  isBorderShow
                  placeholderColor={colors.black}
                  placeholder={'Target'}
                  value={target}
                  keyboardType={'phone-pad'}
                  onChangeText={value => this.setState({target: value})}
                  containerStyle={{
                    borderRadius: 30,
                  }}
                />
                {/* <TouchableOpacity
                  activeOpacity={0}
                  style={styles.inputstyle}
                  onPress={() => this.actionSheetStateRef.current.show()}>
                  <Text style={styles.dateOfbirth}>
                    { 'Select Gender'}
                  </Text>
                  <Img
                    style={{width: 15, height: 15, resizeMode: 'contain'}}
                    source={appIcons.arrowDown}
                  />
                </TouchableOpacity> */}
                <SelectList
                  setSelected={selected => this.setState({selected})}
                  fontFamily={family.Poppins_Regular}
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
                  placeholder="Rewards"
                  disabledCheckBoxStyles={styles.label}
                  dropdownStyles={styles.label}
                  dropdownTextStyles={{color: colors.black}}
                  inputStyles={{
                    color: colors.black,
                    fontFamily: family.Poppins_Medium,
                    fontSize: size.small,
                  }}
                />
                <View style={{height: 55}} />
              </View>
            </View>
            <DateTimePickerModal
              minimumDate={new Date()}
              themeVariant="light"
              date={date ? new Date(date) : new Date()}
              isDarkModeEnabled={false}
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={date => {
                const confirmDate = moment(date).format('YYYY-MM-DD');
                this.setState({
                  isDatePickerVisible: false,
                  date: confirmDate,
                });
              }}
              onCancel={() => this.setState({isDatePickerVisible: false})}
            />
            <DateTimePickerModal
              date={date2 ? new Date(date2) : new Date()}
              minimumDate={date ? new Date(date) : new Date()}
              themeVariant="light"
              isDarkModeEnabled={false}
              isVisible={isDatePickerVisible2}
              mode="date"
              onConfirm={date => {
                const confirmDate = moment(date).format('YYYY-MM-DD');
                this.setState({
                  isDatePickerVisible2: false,
                  date2: confirmDate,
                });
              }}
              onCancel={() => this.setState({isDatePickerVisible2: false})}
            />

            <CustomButton
              title="Create"
              onPress={this.onSubmit}
              buttonStyle={{position: 'absolute', bottom: 0}}
              textStyle={styles.btnstext}
            />
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

const actions = {loginUser, rewardList, createChallenge};
export default connect(mapStateToProps, actions)(ChallengesPromotionCreate);
