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
import {appIcons} from '../../../assets';
import NavService from '../../../helpers/NavService';
import {getDiscussionsGroup} from '../../../redux/actions/appAction';
import styles from './styles';
import CustomIcon from '../../../components/CustomIcon';
import CustomText from '../../../components/CustomText';
import {colors, family, size} from '../../../utils';
import {ASSETS_URL} from '../../../config/WebService';

const {height, width} = Dimensions?.get('screen');
export class DiscussionBoard extends Component {
  constructor() {
    super();
    this.state = {
      isActive: 0,
      getDiscussionsGroup: [],
    };
  }
  ItemSeparatorComponent = () => {
    return <View style={styles.lineSeparator} />;
  };
  getDiscussionsGroup = () => {
    this.props.getDiscussionsGroup(null, response => {
      this.setState({getDiscussionsGroup: response});
    });
  };
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      'focus',
      async () => {
        this?.getDiscussionsGroup();
      },
    );
  }
  componentWillUnmount() {
    this.focusListener();
  }
  render() {
    const {getDiscussionsGroup} = this?.state;
    console.log('getDiscussionsGroupgetDiscussionsGroup', getDiscussionsGroup);
    const RenderItem = ({item, index}) => {
      console.log('iteeeeeGoals', item);
      return (
        <>
          <View style={styles.mainCard}>
            <View style={styles.forrowdots}>
              <Text numberOfLines={1} style={styles.name}>
                {item?.title}
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() =>
                  NavService.navigate('DiscussionBoardDetail', {id: item?.id})
                }>
                <Img
                  local={true}
                  style={styles.threedots}
                  src={appIcons.dots}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            </View>
            <Text numberOfLines={4} style={styles.desc}>
              {item?.description}
            </Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={styles.imagesContainer}>
                {item?.users?.map(item => {
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
                  text={item?.users?.length}
                  color={colors?.black}
                  font={family?.Poppins_Light}
                  size={size?.xsmall}
                />
              </View>
              <Text style={styles.name}>Created by Admin</Text>
            </View>
          </View>
        </>
      );
    };
    return (
      <AppBackground back title={'Discussion Board'} marginHorizontal={false}>
        <View style={styles?.container}>
          <View style={{flex: 1, marginTop: 10}}>
            <FlatList
              bounces={false}
              style={{flex: 1, marginTop: height / 64}}
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: width * 0.32,
              }}
              showsVerticalScrollIndicator={false}
              keyExtractor={_index => _index.toString()}
              data={getDiscussionsGroup}
              ItemSeparatorComponent={this?.ItemSeparatorComponent}
              renderItem={({item}) => {
                return <RenderItem item={item} />;
              }}
              ListEmptyComponent={() => {
                return (
                  <View style={styles.listempty}>
                    <Text style={styles.txtlistempty}>No discussion board Found</Text>
                  </View>
                );
              }}
            />
          </View>
          <View style={styles.pluscontainer}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => NavService.navigate('CreateDiscussionBoard')}>
              <Img
                local
                src={appIcons.sub}
                resizeMode={'cover'}
                style={styles.plus}
              />
            </TouchableOpacity>
          </View>
        </View>
      </AppBackground>
    );
  }
}
const actions = {getDiscussionsGroup};
export default connect(null, actions)(DiscussionBoard);
