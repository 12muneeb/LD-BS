import React, {Component} from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';
import {connect} from 'react-redux';
import {appIcons, appImages} from '../../../assets';
import AppBackground from '../../../components/AppBackground';
import CustomSingleList2 from '../../../components/CustomSingleList2';
import CustomText from '../../../components/CustomText';
import Img from '../../../components/Img';
import ListProgressBar from '../../../components/ListProgressBar';
import ModalPopup from '../../../containers/Popup/modalPopup';
import NavService from '../../../helpers/NavService';
import {colors, family, size} from '../../../utils';
import {_progressBar, challengesparticipate} from '../../../utils/dummyData';
import {
  getChallengesList,
  deleteChallenge,
  exitChallenge,
  getChallengesListDetails,
} from '../../../redux/actions/appAction';
import {styles} from './styles';
import {ASSETS_URL} from '../../../config/WebService';
import moment from 'moment';
const {height, width} = Dimensions.get('screen');
export class ChallengesPromotionDetails extends Component {
  constructor() {
    super();
    this.state = {
      isActive: 0,
      progressBarData: _progressBar,
      showPopup: false,
      getChallengesList: [],
      getOnlyUsersList: [],
    };
  }
  handleClose = () => {
    this.setState({showPopup: false});
  };
  handleDelete = () => {
    this.setState({showPopup: false});
    const {id} = this?.props?.route?.params;
    let params = {
      challenge_id: id,
    };
    this.props.deleteChallenge(params);
    setTimeout(() => {
      NavService.goBack();
    }, 850);
  };
  getChallengesList = params => {
    this.props.getChallengesListDetails(params, response => {
      console.log('responseeeeeeeeeeeNowwwwww', response);
      this.setState({
        getChallengesList: response,
        getOnlyUsersList: response?.users,
      });
    });
  };
  componentDidMount() {
    const {id} = this?.props?.route?.params;
    console.log('Idofchallenge', id);
    this.focusListener = this.props.navigation.addListener(
      'focus',
      async () => {
        this?.getChallengesList(id);
      },
    );
  }
  componentWillUnmount() {
    this.focusListener();
  }
  render() {
    const {getOnlyUsersList, showPopup, getChallengesList} = this.state;
    console.log('getChallengesListgetChallengesList1', getChallengesList);
    const ItemSeparatorComponent = () => {
      return <View style={styles.lineSeparator} />;
    };

    const handleRemove = id => {
      let paylaod = {
        user_id: id,
        challenge_id: getChallengesList?.id,
      };
      this?.props?.exitChallenge(paylaod);
      const updatedProgressBarData = getOnlyUsersList.filter(
        item => id !== item?.pivot?.user_id,
      );
      this.setState({getOnlyUsersList: updatedProgressBarData});
    };
    return (
      <AppBackground
        back
        rightTwoIcon={appIcons?.editnew}
        rightOneIcon={appIcons?.deletegoal}
        title={'Challenges and Promotions'}
        rightOnePress={() => {
          this.setState({showPopup: true});
        }}
        checkCompleted={getChallengesList?.is_completed}
        rightTwoPress={() => {
          NavService.navigate('ChallengesPromotionEdit', {
            getChallengesList: getChallengesList,
          });
        }}
        rightOptions={true}
        marginHorizontal={false}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flex: 1}}>
            <View style={styles?.gap} />

            <View style={styles?.bannerWrapper}>
              <Img
                src={{uri: ASSETS_URL + getChallengesList?.image}}
                style={styles?.banner}
                local
                resizeMode={'cover'}
              />
            </View>
            <View style={styles?.gap2} />

            <CustomText
              text={moment(getChallengesList?.created_at).format('MM-DD-YYYY')}
              color={colors?.black}
              font={family?.Poppins_SemiBold}
              size={size?.xxsmall}
            />
            <CustomText
              text={getChallengesList?.title}
              color={colors?.secondary}
              font={family?.Poppins_Medium}
              size={size?.xsmall}
            />
            <CustomText
              text={getChallengesList?.description}
              color={colors?.black}
              font={family?.Poppins_Light}
              size={size?.tiny}
            />
            <View style={styles?.lineSeparator} />

            <CustomSingleList2
              color={colors.primary}
              item={getChallengesList?.users}
              endDate={getChallengesList?.end_date}
              count={getChallengesList?.users?.length}
            />

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
              disableLeftSwipe={getChallengesList?.is_completed == 1}
            />
          </View>
          <ModalPopup
            congratulation
            value={'Confirmation'}
            isVisible={showPopup}
            desc="Are you sure you want to delete this challenge?"
            sucessText="Yes, Delete"
            unsuccessText="No"
            handleClose={this?.handleClose}
            onBackButtonPress={this?.handleClose}
            onBackdropPress={this?.handleClose}
            onYesPress={this?.handleDelete}
            onNoPress={this?.handleClose}
          />
        </ScrollView>
      </AppBackground>
    );
  }
}
const actions = {
  getChallengesList,
  deleteChallenge,
  exitChallenge,
  getChallengesListDetails,
};
export default connect(null, actions)(ChallengesPromotionDetails);
