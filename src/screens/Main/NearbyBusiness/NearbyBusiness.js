import React, {Component} from 'react';
import AppBackground from '../../../components/AppBackground';
import {connect} from 'react-redux';
import {styles} from './styles';
import {Dimensions, FlatList, Text, TouchableOpacity, View} from 'react-native';
import {getNearByBusiness} from '../../../redux/actions/appAction';
import CustomTextInput from '../../../components/CustomTextInput';
import {colors, family, size} from '../../../utils';
import {appIcons, appImages} from '../../../assets';
import {_data, _dataStats} from '../../../utils/dummyData';
import ListHeader from '../../../components/ListHeader';
import appStyles from '../../appStyles';
import NavService from '../../../helpers/NavService';
import Img from '../../../components/Img';
import Map from '../../../containers/Popup/Map';
import CustomText from '../../../components/CustomText';
import {ASSETS_URL} from '../../../config/WebService';
const {width, height} = Dimensions?.get('screen');

export class NearbyBusiness extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      getNearByBusiness: [],
    };
  }
  getNearByBusiness = () => {
    this.props.getNearByBusiness(null, response => {
      this.setState({getNearByBusiness: response});
    });
  };
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      'focus',
      async () => {
        this?.getNearByBusiness();
      },
    );
  }
  componentWillUnmount() {
    this.focusListener();
  }
  render() {
    const {getNearByBusiness} = this?.state;
    console.log('getNearByBusiness', getNearByBusiness);

    const RenderItem = ({item, index}) => {
      console.log('item-insdie', item);
      return (
        <View style={styles.innercontainer}>
          <Img
            local
            src={
              item?.profile_image == null
                ? appIcons.userPlaceholder
                : {uri: ASSETS_URL + item?.profile_image}
            }
            resizeMode={'cover'}
            style={styles.profile}
          />
          <View style={styles.innersubcontainer}>
            <CustomText
              numberOfLines={1}
              text={item?.company_name}
              size={size.small}
              font={family.Poppins_Regular}
              color={colors.black}
              style={styles.txtLocation}
            />
            <View style={styles.row}>
              <Img
                local
                src={appIcons.maker}
                resizeMode={'contain'}
                style={styles.marker}
              />
              <CustomText
                text={item?.location}
                size={size.tiny}
                font={family.Poppins_Light}
                numberOfLines={2}
                color={colors.black}
                style={styles.txtLocation}
              />
            </View>
            {/* <View style={styles.row}>
              <Img
                local
                src={appIcons.cell}
                resizeMode={'contain'}
                style={styles.marker}
              />
              <CustomText
                text={item?.phone_number}
                size={size.tiny}
                font={family.Poppins_Light}
                color={colors.black}
                numberOfLines={2}
                style={styles.txt}
              />
            </View> */}
          </View>
          <TouchableOpacity
            onPress={() =>
              NavService.navigate('NearbyBusinessDetail', {
                lat: item?.latitude,
                long: item?.longitude,
              })
            }
            activeOpacity={0.9}
            style={styles.direction}>
            <Img
              local={true}
              src={appIcons.direction}
              resizeMode={'contain'}
              style={styles.directionimg}
            />
            <CustomText
              text="Direction"
              size={size.tiny}
              font={family.Poppins_Regular}
              color={colors.secondary}
              style={styles.txt}
            />
          </TouchableOpacity>
        </View>
      );
    };
    return (
      <AppBackground menu title={'Nearby Business'} notification>
        <View style={styles.container}>
          {/* <Map onMarkerPress={this.handleMarkerPress} markerProps /> */}
          <FlatList
            contentContainerStyle={{
              flexGrow: 1,
              marginTop: 20,
              paddingBottom: '25%',
            }}
            data={getNearByBusiness}
            // refreshControl={
            //   <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            // }
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              return <RenderItem item={item} />;
            }}
            ListEmptyComponent={() => {
              return (
                <View style={styles.listempty}>
                  <Text style={styles.txtlistempty}>
                    No Nearby business Found
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </AppBackground>
    );
  }
}
const actions = {getNearByBusiness};
export default connect(null, actions)(NearbyBusiness);
