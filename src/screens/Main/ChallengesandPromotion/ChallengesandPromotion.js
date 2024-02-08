import {
  Dimensions,
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import AppBackground from '../../../components/AppBackground';
import CustomButton from '../../../components/CustomButton';
import {_Home, _Promotion, completedData} from '../../../utils/dummyData';
import Promotions from '../../../components/Promotion';
import NavService from '../../../helpers/NavService';
import CustomTabView from '../../../components/CustomTabView';
import {styles} from './styles';
import Img from '../../../components/Img';
import {appIcons} from '../../../assets';
import {getChallengesList} from '../../../redux/actions/appAction';
const {height, width} = Dimensions.get('screen');
export class ChallengesandPromotion extends Component {
  constructor() {
    super();
    this.state = {
      isActive: 0,
      getChallengesListState: [],
      index: 0,
    };
  }
  getChallengesListBusiness = params => {
    this.props.getChallengesList(params, response => {
      console.log('teastestase', response);
      this.setState({
        getChallengesListState: response,
        refresh: !this.state.refresh,
      });
    });
  };
  componentDidMount() {
    let params = {
      key: 'is_completed',
      value: 0,
    };
    this.focusListener = this.props.navigation.addListener(
      'focus',
      async () => {
        this?.getChallengesListBusiness(params);
      },
    );
  }
  componentWillUnmount() {
    this.focusListener();
  }
  render() {
    const {isActive, getChallengesListState, index} = this?.state;
    console.log(
      '🚀 ~ file: ChallengesandPromotion.js:21 ~ ChallengesandPromotion ~ render ~ isActive:',
      isActive,
    );

    const handleNav = id => {
      console.log('consoleMyId', id);
      // if (isActive == 0) {
      //   NavService.navigate('ChallengesPromotionDetails');
      // } else if (isActive == 1) {
      //   NavService.navigate('ChallengesPromotionCompleted');
      // }
      NavService.navigate('ChallengesPromotionDetails', {id: id});
    };
    const handleOnGoing = () => {
      let params = {
        key: 'is_completed',
        value: 0,
      };
      this?.getChallengesListBusiness(params);
    };
    const handleCompleted = () => {
      let params1 = {
        key: 'is_completed',
        value: 1,
      };
      this?.getChallengesListBusiness(params1);
    };
    console.log(index, 'firstState', getChallengesList);
    return (
      <AppBackground
        back
        title={'Challenges and Promotions'}
        marginHorizontal={false}>
        <View style={[styles.flexRow, styles.BtnView]}>
          <CustomButton
            title="Ongoing"
            onPress={() => {
              this.setState({index: 0, getChallengesListState: []}, () =>
                handleOnGoing(),
              );
            }}
            buttonStyle={index == 0 ? styles.buttonStyle : styles.buttonStyle1}
            textStyle={index == 0 ? styles.btnTitle : styles.btnTitle1}
          />
          <CustomButton
            title="Completed"
            onPress={() => {
              this.setState({index: 1, getChallengesListState: []}, () =>
                handleCompleted(),
              );
            }}
            buttonStyle={index == 1 ? styles.buttonStyle : styles.buttonStyle1}
            textStyle={index == 1 ? styles.btnTitle : styles.btnTitle1}
          />
        </View>
        {getChallengesListState?.length === 0 && (
               <View style={styles.listempty}>
                <Text style={styles.txtlistempty}>No Challenges Found</Text>
              </View>
        )}
        <FlatList
          extraData={index}
          bounces={false}
          contentContainerStyle={{
            gap: 10,
            paddingBottom: width * 0.32,
          }}
          showsVerticalScrollIndicator={false}
          keyExtractor={_index => _index.toString()}
          data={getChallengesListState}
          renderItem={({ item }) => { return <Promotions _item={item} /> }}
          ItemSeparatorComponent={this?.ItemSeparatorComponent}
          // ListEmptyComponent={() => {
          //   return (
         
          //   );
          // }}
        />
        <View style={styles.pluscontainer}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => NavService.navigate('ChallengesPromotionCreate')}>
            <Img
              local
              src={appIcons.sub}
              resizeMode={'cover'}
              style={styles.plus}
            />
          </TouchableOpacity>
        </View>
      </AppBackground>
    );
  }
}
const actions = {getChallengesList};
export default connect(null, actions)(ChallengesandPromotion);
