import React, {Component} from 'react';
import AppBackground from '../../../components/AppBackground';
import {
  Alert,
  Dimensions,
  FlatList,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import Img from '../../../components/Img';
import {
  _Challenges,
  _DiscussionBoard,
  _dataStats,
  _messagePage,
  _ongoingGoals,
  completedData,
} from '../../../utils/dummyData';
import {connect} from 'react-redux';
import {ASSETS_URL} from '../../../config/WebService';
import {
  getDiscussionsGroupById,
  removeParticipantsFromBoard,
  deleteDiscussionBoard,
} from '../../../redux/actions/appAction';
import {appIcons} from '../../../assets';
import NavService from '../../../helpers/NavService';
import {colors, family, size} from '../../../utils';
import ModalPopup from '../../../containers/Popup/modalPopup';
import CustomText from '../../../components/CustomText';
import CustomIcon from '../../../components/CustomIcon';
import ListProgressBar from '../../../components/ListProgressBar';
import styles from './styles';

const {height, width} = Dimensions?.get('screen');

export class DiscussionBoardDetail extends Component {
  constructor() {
    super();
    this.state = {
      isActive: 0,
      showPopup: false,
      getDiscussionsGroupById: '',
    };
  }
  ItemSeparatorComponent = () => {
    return <View style={styles.lineSeparator} />;
  };
  handleClose = () => {
    this.setState({showPopup: false});
  };
  handleDelete = () => {
    this.setState({showPopup: false});
    const {id} = this?.props?.route?.params;
    this?.props?.deleteDiscussionBoard(id);
    setTimeout(() => {
      NavService.goBack();
    }, 450);
  };
  getDiscussionsGroupById = params => {
    this.props.getDiscussionsGroupById(params, response => {
      this.setState({
        getDiscussionsGroupById: response,
        getOnlyUsersList: response?.users,
      });
    });
  };
  componentDidMount() {
    const {id} = this?.props?.route?.params;
    this.focusListener = this.props.navigation.addListener(
      'focus',
      async () => {
        this?.getDiscussionsGroupById(id);
      },
    );
  }
  componentWillUnmount() {
    this.focusListener();
  }
  render() {
    const {showPopup, getDiscussionsGroupById, getOnlyUsersList} = this.state;
    console.log(
      'getDiscussionsGroupByIdgetDiscussionsGroupById',
      getDiscussionsGroupById,
    );
    const handleRemove = id => {
      let paylaod = {
        user_id: id,
        discussion_group_id: getDiscussionsGroupById?.id,
      };
      this?.props?.removeParticipantsFromBoard(paylaod);
      setTimeout(() => {
        this?.getDiscussionsGroupById(this?.props?.route?.params?.id);
        const updatedUsersData = getOnlyUsersList.filter(
          item => id !== item?.pivot?.user_id,
        );
        this.setState({getOnlyUsersList: updatedUsersData});
      }, 350);
    };

    return (
      <AppBackground
        back
        title={'Discussion Board Detail'}
        rightTwoIcon={appIcons?.editnew}
        rightOneIcon={appIcons?.deletegoal}
        rightOnePress={() => {
          this.setState({showPopup: true});
        }}
        rightTwoPress={() => {
          NavService.navigate('EditDiscussionBoard', {
            itemByID: getDiscussionsGroupById,
            userData: getDiscussionsGroupById?.users,
          });
        }}
        checkCompleted={0}
        rightOptions={true}
        marginHorizontal={false}>
        <View style={styles?.container}>
          <View style={{flex: 1, marginTop: 10}}>
            <View style={styles.mainCard}>
              <View style={styles.forrowdots}>
                <Text numberOfLines={1} style={styles.name}>
                  {getDiscussionsGroupById?.title}
                </Text>
              </View>
              <Text numberOfLines={4} style={styles.desc}>
                {getDiscussionsGroupById?.description}
              </Text>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={styles.imagesContainer}>
                  {getDiscussionsGroupById?.users?.map(item => {
                    return (
                      <>
                        <CustomIcon
                          customIconWrapper={styles?.customIconWrapper}
                          customIconStyle={styles?.customIconStyle}
                          src={
                            item?.profile_image
                              ? {uri: ASSETS_URL + item?.profile_image}
                              : appIcons.userPlaceholder
                          }
                          size={size?.h2}
                          resizeMode="cover"
                        />
                      </>
                    );
                  })}
                  <CustomText
                    text={getDiscussionsGroupById?.users?.length}
                    color={colors?.black}
                    font={family?.Poppins_Light}
                    size={size?.xsmall}
                  />
                </View>
                <Text style={styles.name}>Created by Admin</Text>
              </View>
            </View>
            <SwipeListView
              style={{marginTop: 6}}
              data={getOnlyUsersList}
              renderItem={({item, index}, rowMap) => (
                <ListProgressBar
                  _item={item}
                  index={index}
                  customContainerStyles={styles?.customContainerStyles}
                  color={colors?.secondary}
                  customLine={{borderColor: colors?.primary}}
                  color4={colors?.secondary}
                  color3={colors?.secondary}
                />
              )}
              ItemSeparatorComponent={() => <View style={styles?.sperator} />}
              renderHiddenItem={({item}, rowMap) => (
                <TouchableOpacity
                  style={styles?.removeBtn}
                  onPress={() => handleRemove(item?.pivot?.user_id)}>
                  <CustomText
                    text="Remove"
                    size={size?.xsmall}
                    font={family?.Poppins_SemiBold}
                    color={'red'}
                    textDecorationLine={'underline'}
                  />
                </TouchableOpacity>
              )}
              disableRightSwipe={true}
              leftOpenValue={0}
              rightOpenValue={-75}
            />
          </View>
        </View>

        <ModalPopup
          congratulation
          value={'Confirmation'}
          isVisible={showPopup}
          desc="Are you sure you want to delete this Board?"
          sucessText="Yes, Delete"
          unsuccessText="No"
          handleClose={this?.handleClose}
          onBackButtonPress={this?.handleClose}
          onBackdropPress={this?.handleClose}
          onYesPress={this?.handleDelete}
          onNoPress={this?.handleClose}
        />
      </AppBackground>
    );
  }
}
const actions = {
  getDiscussionsGroupById,
  removeParticipantsFromBoard,
  deleteDiscussionBoard,
};
export default connect(null, actions)(DiscussionBoardDetail);
