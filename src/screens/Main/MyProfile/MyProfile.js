//MyProfile

import React, {Component} from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import AppBackground from '../../../components/AppBackground';
import {appIcons, appImages} from '../../../assets';
import CustomText from '../../../components/CustomText';
import ProfileImage from '../../../components/ProfileImage';
import appStyles from '../../appStyles';
import {colors, size} from '../../../utils';
import {ProfileInfo, event, itemInfo} from '../../../utils/dummyData';
import CustomSingleList from '../../../components/CustomSingleList';
import NavService from '../../../helpers/NavService';
import {loginUser} from '../../../redux/actions/authAction';
import styles from './styles';
import Img from '../../../components/Img';
import {ASSETS_URL} from '../../../config/WebService';

class MyProfile extends Component {
  
  state = {
    profileImage: null,
  };
  render() {
    const {profileImage} = this.state;
    console.log('usersssss', this?.props?.user)
    const myProfileData = [
      {
        heading: 'Industry',
        subHeading: this?.props?.user?.industry,
      },
      {
        heading: 'Phone Number',
        subHeading: this?.props?.user?.phone_number,
        verify: true,
      },
      {
        heading: 'Email Address',
        subHeading: this?.props?.user?.email,
        verify: true,
      },
      {
        heading: 'Status',
        subHeading: 'Active',
        active: true,
      },

      {
        heading: 'Location',
        subHeading: this?.props?.user?.location,
      },
    ];
    const ItemSeparatorComponent = () => {
      return <View style={styles.lineSeparator} />;
    };
    const handleProfile = () => {
      NavService.navigate('EditProfile');
    };
    const userdata = this.props.user;
  console.log('gggygjhhjghjgh',userdata);
    return (
      <AppBackground
        menu
        title={'My Profile'}
        notification
        marginHorizontal={false}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View
            style={[
              appStyles.directionColumn,
              appStyles.alignCenter,
              appStyles.borderBottomColor,

              {gap: 7, marginTop: 20},
            ]}>
            <TouchableOpacity
              style={styles.editcontent}
              activeOpacity={0.8}
              onPress={handleProfile}>
              <Img
                local
                src={appIcons.editgoal}
                resizeMode={'contain'}
                style={styles.editimg}
              />
            </TouchableOpacity>

            <View style={styles.Profile}>
              <ProfileImage
                ViewStyle={styles.viewstyles}
                widthsize={110}
                heightsize={110}
                ImageborderRadius={140}
                // ViewBorderWidth={0}
                ViewborderColor={colors.secondary}
                innerAsset={profileImage == null ? true : false}
                imageUri={{uri: ASSETS_URL + userdata?.profile_image}}
              />
            </View>

            <CustomText
              text={userdata?.company_name}
              size={size.normal}
              style={{
                ...appStyles.family_Montserrat_Semi_Bold,
                color: colors.secondary,
              }}
            />
          </View>
          <FlatList
            contentContainerStyle={styles.containerstyle}
            ItemSeparatorComponent={value =>
              value?.leadingItem?.subHeading !== null
                ? ItemSeparatorComponent()
                : null
            }
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
            data={myProfileData}
            renderItem={({item}) => <CustomSingleList item={item} />}
          />
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

const actions = {loginUser};
export default connect(mapStateToProps, actions)(MyProfile);
