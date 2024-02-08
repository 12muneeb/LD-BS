import React, {Component, createRef} from 'react';
import {
  Dimensions,
  TouchableOpacity,
  ScrollView,
  View,
  Text,
  FlatList,
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
import CustomButton from '../../../components/CustomButton';
import Img from '../../../components/Img';
import NavService from '../../../helpers/NavService';
import {appIcons, appImages} from '../../../assets';
import {colors, family, size, WP} from '../../../utils';
import CustomTextInput from '../../../components/CustomTextInput';
import GooglePlaceAutocomplete from '../../../components/GooglePlaceAutocomplete';
import ProfileImage from '../../../components/ProfileImage';
import ImagePicker from '../../../components/ImagePicker';
import {ASSETS_URL} from '../../../config/WebService';
import {getAlUser} from '../../../redux/actions/authAction';
import {updateDiscussionGroup} from '../../../redux/actions/appAction';

class EditDiscussionBoard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Eventname: this?.props?.route?.params?.itemByID?.title,
      EventDescription: this?.props?.route?.params?.itemByID?.description,
      profileImage: null,
      data: [],
      selectedUserIds: this?.props?.route?.params?.itemByID?.users?.map(
        item => item?.pivot?.user_id,
      ),
      selected: '',
    };
    this.actionSheetStateRef = createRef();
  }
  onSubmit = () => {
    const {itemByID} = this?.props?.route?.params;
    const {Eventname, EventDescription, selectedUserIds, profileImage} =
      this.state;
    const invalidChars = /[.,@]/;
    if (Eventname == '') {
      Toast.show({
        text1: 'Title field can`t be empty',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!EventDescription) {
      Toast.show({
        text1: 'Description field can`t be empty',
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
      payload.append('discussion_group_id', itemByID?.id);
      if (selectedUserIds?.length > 0) {
        payload.append('users', JSON.stringify(selectedUserIds));
      }
      this?.props?.updateDiscussionGroup(payload);
      NavService.goBack();
      console.log('paylaodofcooooom', payload);
    }
  };
  componentDidMount() {
    this?.props?.navigation?.addListener('focus', () => {
      this.setState({search: ''});
    });
    this.focusListener = this.props.navigation.addListener('focus', () => {
      this.props.getAlUser(data => {
        console.log('data,datadata', data);
        if (data) {
          this.setState({data: data});
        } else {
          this.setState({data: null});
        }
      });
    });
  }
  componentWillUnmount() {
    this?.focusListener();
  }
  render() {
    const {Eventname, EventDescription, profileImage, data, selectedUserIds} =
      this.state;
    console.log('selectedUserIdsselectedUserIds', selectedUserIds);
    const handleSelectUser = userId => {
      this.setState(prevState => {
        const isSelected = prevState.selectedUserIds.includes(userId);

        if (isSelected) {
          return {
            selectedUserIds: prevState.selectedUserIds.filter(
              id => id !== userId,
            ),
          };
        } else {
          return {
            selectedUserIds: [...prevState.selectedUserIds, userId],
          };
        }
      });
    };
    const {itemByID, userData} = this?.props?.route?.params;
    const addedIdsOfUsers = itemByID?.users?.map(item => item?.pivot?.user_id);

    console?.log('idddssssss', addedIdsOfUsers);
    const RenderItem = ({item, index}) => {
      if (addedIdsOfUsers.includes(item?.id)) {
        return null;
      } else {
        return (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              left: 25,
              marginHorizontal: 10,
              alignSelf: 'center',
            }}>
            <TouchableOpacity
              style={[
                styles.tchStyle1,
                {
                  backgroundColor: selectedUserIds?.includes(item?.id)
                    ? 'red'
                    : 'white',
                },
              ]}
              key={item?.id}
              onPress={() => {
                handleSelectUser(item?.id);
              }}></TouchableOpacity>

            <View>
              <Img
                local={true}
                style={styles.userImg}
                resizeMode={'cover'}
                src={
                  item?.profile_image
                    ? {uri: ASSETS_URL + item?.profile_image}
                    : appIcons.userPlaceholder
                }
              />

              <Text numberOfLines={1} style={styles.name}>
                {item?.first_name}
              </Text>
            </View>
          </View>
        );
      }
    };

    const updateImageInGallery = (path, mime, type) => {
      this.setState({profileImage: {path, mime, type}});
    };
    return (
      <AppBackground
        back
        title={'Edit Discussion Board'}
        leftIcon={appIcons.drawer}>
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
                        : {height: '100%', width: '100%', resizeMode: 'contain'}
                    }
                    innerAsset={profileImage == null ? true : false}
                    imageUri={
                      profileImage == null &&
                      (itemByID?.image == null || itemByID?.image == '')
                        ? appIcons.userPlaceholder
                        : itemByID?.image !== '' && profileImage == null
                        ? {uri: ASSETS_URL + itemByID?.image}
                        : profileImage?.path
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
              </View>
              <FlatList
                bounces={false}
                horizontal
                style={{flex: 1, marginTop: height / 64}}
                contentContainerStyle={{
                  flexGrow: 1,
                  paddingBottom: width * 0.32,
                  paddingRight: width * 0.2,
                }}
                showsVerticalScrollIndicator={false}
                keyExtractor={_index => _index.toString()}
                data={data}
                ItemSeparatorComponent={this?.ItemSeparatorComponent}
                renderItem={({item}) => {
                  return <RenderItem item={item} />;
                }}
              />
            </View>
            <CustomButton
              title="Create"
              onPress={this.onSubmit}
              buttonStyle={{marginTop: 50}}
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

const actions = {loginUser, getAlUser, updateDiscussionGroup};
export default connect(mapStateToProps, actions)(EditDiscussionBoard);
