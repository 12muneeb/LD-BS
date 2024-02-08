import React, { Component } from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { appIcons, appImages } from '../../../assets';
import AppBackground from '../../../components/AppBackground';
import CustomIcon from '../../../components/CustomIcon';
import CustomSingleList2 from '../../../components/CustomSingleList2';
import CustomText from '../../../components/CustomText';
import Img from '../../../components/Img';
import ListProgressBar from '../../../components/ListProgressBar';
import ModalPopup from '../../../containers/Popup/modalPopup';
import NavService from '../../../helpers/NavService';
import { colors, family, size } from '../../../utils';
import {
  _progressBar,
  challengesparticipate
} from '../../../utils/dummyData';
import { styles } from './styles';
const {height, width} = Dimensions.get('screen');
export class ChallengesPromotionCompleted extends Component {
  constructor() {
    super();
    this.state = {
      isActive: 0,
      progressBarData: _progressBar,
      showPopup: false,
    };
  }
  handleClose = () => {
    this.setState({showPopup: false});
  };
  handleDelete = () => {
    this.setState({showPopup: false});
    setTimeout(() => {
      NavService.goBack();
    }, 850);
  };
  render() {
    const {progressBarData, showPopup} = this.state;
    const ItemSeparatorComponent = () => {
      return <View style={styles.lineSeparator} />;
    };

    const handleRemove = id => {
      const updatedProgressBarData = progressBarData.filter(
        item => id != item?.id,
      );
      this.setState({progressBarData: updatedProgressBarData});
    };
    return (
      <AppBackground
        back
        rightTwoIcon={appIcons?.deletegoal}
        title={'Challenges and Promotions'}
        rightTwoPress={() => {
          this.setState({showPopup: true});
        }}
        rightOptions={true}
        marginHorizontal={false}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{flex: 1}}>
            <View style={styles?.gap} />

            <View style={styles?.bannerWrapper}>
              <Img
                src={appImages?.sales}
                style={styles?.banner}
                local
                resizeMode={'cover'}
              />
            </View>
            <View style={styles?.gap2} />

            <CustomText
              text={'Posted July 05, 2023'}
              color={colors?.black}
              font={family?.Poppins_SemiBold}
              size={size?.xxsmall}
            />
            <CustomText
              text={
                'Lorem ipsum dolor sit amet, consectetur adipisc elit sed do'
              }
              color={colors?.secondary}
              font={family?.Poppins_Medium}
              size={size?.xsmall}
            />
            <CustomText
              text={
                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.'
              }
              color={colors?.black}
              font={family?.Poppins_Light}
              size={size?.tiny}
            />
            <View style={styles?.lineSeparator} />
            <FlatList
              ItemSeparatorComponent={val =>
                val?.leadingItem?.id == 2 ||
                val?.leadingItem?.id == 3 ||
                val?.leadingItem?.id == 4
                  ? ItemSeparatorComponent()
                  : null
              }
              keyExtractor={(item, index) => index.toString()}
              scrollEnabled={false}
              data={challengesparticipate}
              renderItem={({item}) => (
                <CustomSingleList2 color={colors.primary} item={item} />
              )}
            />
            <View style={[styles?.headingBig]}>
              <View>
                <CustomIcon
                  size={height / 14}
                  src={appImages?.profile}
                  resizeMode="cover"
                  customIconStyle={styles?.customIcon}
                  customIconWrapper={styles?.customIcon}
                />
              </View>
              <View>
                <CustomText
                  text={'John Smith'}
                  color={colors?.secondary}
                  font={family?.Poppins_SemiBold}
                  size={size?.xsmall}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 5,
                  }}>
                  <CustomIcon
                    size={size?.xxsmall}
                    src={appIcons?.trophy}
                    resizeMode="cover"
                  />
                  <CustomText
                    text={'Winner'}
                    color={colors?.primary}
                    font={family?.Poppins_Medium}
                    size={size?.xsmall}
                  />
                </View>

                <CustomText
                  text={'Completed Challenge - July 07.2023'}
                  color={colors?.black}
                  font={family?.Poppins_Light}
                  size={size?.xtiny}
                />
              </View>
            </View>
            <SwipeListView
              style={{marginTop: 6}}
              data={progressBarData}
              renderItem={({item}, rowMap) => (
                <ListProgressBar
                  _item={item}
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
                  onPress={() => handleRemove(item?.id)}>
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

export default ChallengesPromotionCompleted;
