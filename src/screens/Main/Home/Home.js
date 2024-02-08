import React, {Component} from 'react';
import {
  BackHandler,
  Dimensions,
  FlatList,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect} from 'react-redux';
import {BarChart, LineChart} from 'react-native-chart-kit';
import {appImages} from '../../../assets';
import AppBackground from '../../../components/AppBackground';
import CustomCard from '../../../components/CustomCard';
import CustomText from '../../../components/CustomText';
import Img from '../../../components/Img';
import ModalPopup from '../../../containers/Popup/modalPopup';
import NavService from '../../../helpers/NavService';
import {colors, family, size} from '../../../utils';
import {
  getChallengesList,
  getBusinessDashboardStats,
} from '../../../redux/actions/appAction';
import {ProgressData, homeCards} from '../../../utils/dummyData';
import styles from './styles';
const {height, width} = Dimensions.get('screen');
export class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      getChallengesList: [],
      getBusinessDashboardStats: [],
    };
  }
  getChallengesList = () => {
    this.props.getChallengesList(null, response => {
      this.setState({getChallengesList: response});
    });
  };
  getBusinessDashboardStats = () => {
    this.props.getBusinessDashboardStats(null, response => {
      this.setState({getBusinessDashboardStats: response});
    });
  };
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      'focus',
      async () => {
        this?.getChallengesList();
        this?.getBusinessDashboardStats();
      },
    );
  }
  componentWillUnmount() {
    this.focusListener();
  }
  handleClose = () => {
    this?.setState({showPopup: false});
  };
  handleexit = () => {
    this?.setState({showPopup: false});
    setTimeout(() => {
      BackHandler.exitApp();
    }, 850);
  };

  render() {
    const {showPopup, getChallengesList, getBusinessDashboardStats} =
      this?.state;
    const chartConfig = {
      backgroundGradientFrom: '#fff',
      backgroundGradientFromOpacity: 1,
      backgroundGradientTo: '#fff',
      backgroundGradientToOpacity: 5,
      // color: () => '#333',
      color: (opacity = 1) => `rgba(128,128,128, ${opacity})`,
      strokeWidth: 2,
      barPercentage: 0.6,
      propsForLabels: {
        fontSize: '12',
      },
      fillShadowGradient: colors?.chartGreen,
      fillShadowGradientOpacity: 1,
      labelColor: (opacity = 1) => colors.gray,
    };
    const chartConfig2 = {
      backgroundGradientFrom: '#fff',
      backgroundGradientFromOpacity: 1,
      backgroundGradientTo: '#fff',
      backgroundGradientToOpacity: 5,
      decimalPlaces: 2,
      color: (opacity = 1) => `rgba(128,128,128, ${opacity})`,
      strokeWidth: 2,
      barPercentage: 0.6,
      propsForLabels: {
        fontSize: '12',
      },
      fillShadowGradient: colors?.primary,
      fillShadowGradientOpacity: 1,
      labelColor: (opacity = 1) => colors.gray,
      propsForDots: {
        r: '2',
        strokeWidth: '2',
        stroke: colors.primary,
      },
    };
    console.log('getBusinessDashboardStats');
    const totalTargetAchievedArray =
      getBusinessDashboardStats?.team_progress?.map(item =>
        parseFloat(item.total_target_achieved),
      );
    console.log('totalTargetAchievedArray', totalTargetAchievedArray);
    return (
      <AppBackground
        homePress={() => NavService.navigate('MyProfile')}
        menu
        title={'Dashboard'}
        notification
        homeimage={appImages.profile}
        marginHorizontal={false}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{gap: 15}}>
            <View style={styles.lineSeparator} />
            <View style={styles.ViewText1}>
              <CustomText text="Business Progress" style={styles.text1} />
              <TouchableOpacity
                onPress={() => NavService.navigate('TeamProgress')}>
                <CustomText text="View Details" style={styles.ViewDetails} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => NavService.navigate('TeamProgress')}>
              {totalTargetAchievedArray?.length ? (
                <LineChart
                  data={{
                    labels: ['Week 01', 'Week 02' , 'Week 03', 'Week 04'],
                    datasets: [
                      {
                        data: totalTargetAchievedArray,
                      },
                    ],
                  }}
                  width={width - 40}
                  height={230}
                  yAxisLabel="$"
                  yAxisSuffix=""
                  yAxisInterval={2}
                  chartConfig={chartConfig2}
                  bezier
                  style={{
                    overflow: 'hidden',
                    borderRadius: 20,
                  }}
                />
              ) : null}
            </TouchableOpacity>
            {/* <View style={styles.lineSeparator} /> */}
            {/* <View style={styles.ViewText1}>
              <CustomText text="Business's Progress" style={styles.text1} />
            </View> */}
            {/* <View style={styles.flatcard}>
              <FlatList
                bounces={false}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                keyExtractor={_index => _index?.id?.toString()}
                data={ProgressData}
                renderItem={({item}) => {
                  return (
                    <View style={styles.secondcontent}>
                      <Img
                        local
                        src={item.img}
                        resizeMode={'contain'}
                        style={styles.contentimg}
                      />
                      <CustomText
                        text={item.name}
                        color={colors.black}
                        size={size.tiny}
                        font={family?.Poppins_Medium}
                      />
                    </View>
                  );
                }}
              />
            </View> */}
            {/* <View style={{marginTop: -30}}>
              <BarChart
                data={{
                  labels: ['Week 01', 'Week 02', 'Week 03', 'Week 04'],
                  datasets: [
                    {
                      data: [100, 80, 60, 20],
                    },
                  ],
                }}
                width={width - 40}
                height={250}
                yAxisSuffix="%"
                chartConfig={chartConfig}
                style={{
                  borderRadius: 20,
                  paddingTop: 25,
                }}
              />
            </View> */}

            <View style={styles.lineSeparator} />

            <View style={styles.ViewText1}>
              <CustomText text="Challenges & Promotions" style={styles.text1} />

              <TouchableOpacity
                onPress={() => NavService.navigate('ChallengesandPromotion')}>
                <CustomText text="View More" style={styles.ViewDetails} />
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            bounces={false}
            horizontal
            style={{flex: 1, marginTop: height / 64}}
            // numColumns={0}

            contentContainerStyle={{
              flexGrow: 1,
              gap: 10,
              paddingBottom: width * 0.32,
            }}
            customContainer={{
              backgroundColor: 'red',
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={_index => _index.toString()}
            data={getChallengesList}
            renderItem={({item}) => {
              return (
                <CustomCard
                  onPress={() => NavService.navigate('ChallengesandPromotion')}
                  item={item}
                />
              );
            }}
          />
        </ScrollView>
        <ModalPopup
          value={'Confirmation'}
          isVisible={showPopup}
          desc="Are you sure you want to exit?"
          sucessText="Yes, exit"
          unsuccessText="No"
          handleClose={this?.handleClose}
          onBackButtonPress={this?.handleClose}
          onBackdropPress={this?.handleClose}
          onYesPress={this?.handleexit}
          onNoPress={this?.handleClose}
        />
      </AppBackground>
    );
  }
}

const actions = {getChallengesList, getBusinessDashboardStats};
export default connect(null, actions)(Home);
