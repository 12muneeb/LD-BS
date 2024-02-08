import React, {Component} from 'react';
import {Dimensions, FlatList, View, TouchableOpacity} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {appIcons, appImages} from '../../../assets';
import AppBackground from '../../../components/AppBackground';
import CustomList from '../../../components/CustomList';
import CustomTabView from '../../../components/CustomTabView';
import CustomText from '../../../components/CustomText';
import Img from '../../../components/Img';
import ModalPopup from '../../../containers/Popup/modalPopup';
import SocialSheetPopup from '../../../containers/Popup/socialSheetPopup';
import NavService from '../../../helpers/NavService';
import {colors, size} from '../../../utils';
import {EmployeeDetails, _ongoingGoals} from '../../../utils/dummyData';
import {getAlUser, deleteUser} from '../../../redux/actions/authAction';

import styles from './styles';
import {connect} from 'react-redux';
import {ASSETS_URL} from '../../../config/WebService';
import appStyles from '../../appStyles';
const {height, width} = Dimensions?.get('screen');
export class EmployeeDetail extends Component {
  constructor() {
    super();
    this.state = {
      isActive: 0,
      isActiveMonth: 0,
      isVisible: false,
      isModal: false,
      isModalVisible: false,
      showPopup: false,
      data: [],
    };
  }
  componentDidMount() {
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
  ItemSeparatorComponent = () => {
    return <View style={styles.lineSeparator} />;
  };
  handleClose = () => {
    this.setState({showPopup: false});
  };
  handleDelete = id => {
    console.log('idinparamasss', id);
    let params = {
      key: 'user_id',
      value: id,
    };
    this.props.deleteUser(params);
    this.setState({showPopup: false});
    setTimeout(() => {
      NavService.goBack();
    }, 850);
  };
  render() {
    const {
      isActive,
      isActiveMonth,
      isVisible,
      isModal,
      isModalVisible,
      showPopup,
      data,
    } = this?.state;
    const {userData} = this?.props?.route?.params;
    console.log('userData,userData', userData);
    const buttonTabs = [
      {
        id: 0,
        btn: 'Weekly',
      },
      {
        id: 1,
        btn: 'Monthly',
      },
      {
        id: 2,
        btn: 'Yearly',
      },
      {
        id: 3,
        btn: 'Document',
      },
    ];

    const buttonTabsMonths = [
      {id: 0, btn: 'Jan'},
      {id: 1, btn: 'Feb'},
      {id: 2, btn: 'Mar'},
      {id: 3, btn: 'Apr'},
      {id: 4, btn: 'May'},
      {id: 5, btn: 'Jun'},
      {id: 6, btn: 'Jul'},
      {id: 7, btn: 'Aug'},
      {id: 8, btn: 'Sep'},
      {id: 9, btn: 'Oct'},
      {id: 10, btn: 'Nov'},
      {id: 11, btn: 'Dec'},
    ];

    const handleTabs = id => {
      this?.setState({isActive: id});
    };
    const handleTabsMonths = id => {
      this?.setState({isActiveMonth: id});
    };
    const handleRightPress = () => {
      this?.setState({isVisible: true});
    };
    const BackDrop = () => {
      this?.setState({isVisible: false});
    };
    const handleModalOption = _id => {
      if (_id == 0) {
        this?.setState({isVisible: false});
        setTimeout(() => {
          this?.setState({isModalVisible: true});
        }, 850);
      } else {
        this?.setState({isVisible: false});
        setTimeout(() => {
          this?.setState({showPopup: true});
        }, 850);
      }
    };
    let payloadChat ={
      sender_id: this?.props?.user?.id,
      reciever_id:userData?.id
    }

    return (
      <AppBackground
        back
        title={'Employees'}
        Rightimage
        rightIcon={appIcons.dots}
        marginHorizontal={false}
        OnPressRight={handleRightPress}>
        <View style={styles?.container}>
          <View style={{flex: 1, marginTop: 10, gap: 12}}>
            <View style={styles.viewprofile}>
              <View style={styles.subcontainer}>
                <View style={styles.dash}>
                  <Img
                    local
                    src={
                      userData?.profile_image == null
                        ? appIcons.userPlaceholder
                        : {uri: ASSETS_URL + userData?.profile_image}
                    }
                    style={styles.profileimage}
                  />
                </View>
                <View style={styles.nameContainer}>
                  <CustomText
                    color={colors?.black}
                    text={userData?.first_name + ' ' + userData?.last_name}
                  />

                  <CustomText
                    color={colors?.primary}
                    style={styles.profiletext}
                    text={'Manager'}
                  />
                  <TouchableOpacity
                  style={styles.sendMessage}
                    activeOpacity={0.8}
                    onPress={() => NavService.navigate('Chat', {payloadChat:payloadChat})}>
                    <CustomText
                     text={'Send Message'}
                    color={colors?.black} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View style={[styles.lineSeparator1]} />
            <CustomTabView
              item={buttonTabs}
              isActive={isActive}
              onPress={handleTabs}
              width={width - 40}
              btnWidth={(width - 50) / 4}
            />

            {/* LineChart */}

            {isActive === 3 ? (
              <View
                style={[
                  appStyles.directionRow,
                  {gap: 15, marginTop: 5, alignSelf: 'center'},
                ]}>
                <View
                  style={{
                    height: 100,
                    width: 155,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderRadius: 5,
                    borderStyle: 'dashed',
                  }}>
                  {data?.image_front == null ? (
                    <CustomText
                      size={size?.tiny}
                      color={colors?.lightGray}
                      text="No Front Image Found"
                    />
                  ) : (
                    <Img
                      resizeMode={'cover'}
                      local
                      src={ASSETS_URL + data?.image_front}
                      style={styles.maplocation}
                    />
                  )}
                </View>
                <View
                  style={{
                    // backgroundColor: 'red',
                    height: 100,
                    width: 155,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: 1,
                    borderRadius: 10,
                    borderStyle: 'dashed',
                  }}>
                  {data?.image_back == null ? (
                    <CustomText
                      size={size?.tiny}
                      color={colors?.lightGray}
                      text="No Back Image Found"
                    />
                  ) : (
                    <Img
                      resizeMode={'cover'}
                      local
                      src={ASSETS_URL + data?.image_back}
                      style={styles.maplocation}
                    />
                  )}
                </View>
              </View>
            ) : (
              <View>
                <LineChart
                  data={{
                    labels: [
                      'Week 1',
                      'Week 2',
                      'Week 3',
                      'Week 4',
                      'Week 5',
                      'Week 6',
                    ],
                    datasets: [
                      {
                        data: [
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                          Math.random() * 100,
                        ],
                      },
                    ],
                  }}
                  width={360}
                  height={200}
                  yAxisLabel="$"
                  yAxisSuffix="k"
                  yAxisInterval={1}
                  chartConfig={{
                    backgroundColor: '#e26a00',
                    backgroundGradientFrom: 'white',
                    backgroundGradientTo: 'white',
                    decimalPlaces: 2,
                    color: (opacity = 1) => `rgba(16, 181, 250, ${opacity})`,
                    labelColor: (opacity = 1) => 'black',

                    style: {
                      borderRadius: 16,
                    },
                    propsForDots: {
                      r: '4',
                      strokeWidth: '1',
                      stroke: colors.primary,
                    },
                  }}
                  bezier
                  style={{
                    // alignSelf:'center',
                    // marginVertical: 8,
                    // paddingHorizontal: 50,
                    borderRadius: 16,
                  }}
                />
              </View>
            )}
            <CustomTabView
              item={buttonTabsMonths}
              isActive={isActiveMonth}
              onPress={handleTabsMonths}
              width={width - 40}
              btnWidth={(width - 50) / 6}
            />
            <FlatList
              bounces={false}
              style={{flex: 1, marginTop: height / 64}}
              contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: width * 0.03,
              }}
              showsVerticalScrollIndicator={false}
              keyExtractor={_index => _index.toString()}
              data={_ongoingGoals}
              ItemSeparatorComponent={this?.ItemSeparatorComponent}
              renderItem={({item}) => (
                <>
                  <CustomText
                    color={colors?.black}
                    text={item?.assosiate_date_info?.date}
                  />
                  <FlatList
                    bounces={false}
                    style={{flex: 1, marginTop: height / 64}}
                    contentContainerStyle={{
                      flexGrow: 1,
                      paddingBottom: width * 0.32,
                    }}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={_index => _index.toString()}
                    data={item?.assosiate_date_info?.data}
                    ItemSeparatorComponent={this?.ItemSeparatorComponent}
                    renderItem={({item}) => (
                      <CustomList
                        description
                        _item={item}
                        customContainer={{
                          borderRadius: 15,
                          backgroundColor: colors?.lightBlue,
                        }}
                      />
                    )}
                  />
                </>
              )}
            />
          </View>
        </View>
        <ModalPopup
          value={'Employee'}
          isVisible={isModalVisible}
          handleCross={() => this.setState({isModalVisible: false})}
          onGoBack={() => this.setState({isModalVisible: false})}
          onBackButtonPress={() => this.setState({isModalVisible: false})}
          onBackdropPress={() => this.setState({isModalVisible: false})}
        />
        <SocialSheetPopup
          isVisible={isVisible}
          data={EmployeeDetails}
          onPress={handleModalOption}
          onBackButtonPress={BackDrop}
          onBackdropPress={BackDrop}
        />
        <ModalPopup
          congratulation
          value={'Confirmation'}
          isVisible={showPopup}
          desc="Are you sure you want to remove this employee?"
          sucessText="Yes, Remove"
          unsuccessText="No"
          handleClose={this?.handleClose}
          onBackButtonPress={this?.handleClose}
          onBackdropPress={this?.handleClose}
          onYesPress={() => this?.handleDelete(userData?.id)}
          onNoPress={this?.handleClose}
        />
      </AppBackground>
    );
  }
}
function mapStateToProps({authReducer: {user}}) {
  return {
    user: user,
  };
}
const actions = {getAlUser, deleteUser};
export default connect(mapStateToProps, actions)(EmployeeDetail);
