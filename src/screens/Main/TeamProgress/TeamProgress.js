import React, {Component} from 'react';
import AppBackground from '../../../components/AppBackground';
import {
  Alert,
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {connect} from 'react-redux';
import {getBusinessDashboardStatsDetails} from '../../../redux/actions/appAction';
import CustomList from '../../../components/CustomList';
import {
  EmployeeDetails,
  _dataStats,
  _messagePage,
  _ongoingGoals,
} from '../../../utils/dummyData';
import NavService from '../../../helpers/NavService';
import styles from './styles';
import {colors} from '../../../utils';
import CustomTabView from '../../../components/CustomTabView';
import CustomText from '../../../components/CustomText';
import SocialSheetPopup from '../../../containers/Popup/socialSheetPopup';
import ModalPopup from '../../../containers/Popup/modalPopup';
const {height, width} = Dimensions?.get('screen');
export class TeamProgress extends Component {
  constructor() {
    super();
    this.state = {
      isActive: 0,
      isActiveMonth: 0,
      isVisible: false,
      isModal: false,
      isModalVisible: false,
      showPopup: false,
      getBusinessDashboardStatsDetails: [],
      dummyData: [
        {
          weel1: 'Week One',
          description: 'Lorem Ipsum dolar sit',
          price: '$3000',
        },
      ],
      weekData: [],
      monthData: [],
      yearData: [],
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
    setTimeout(() => {
      NavService.goBack();
    }, 850);
  };
  getBusinessDashboardStatsDetails = () => {
    this.props.getBusinessDashboardStatsDetails(null, response => {
      const weekData1 =
        response?.week_and_its_day_wise_target_achieved_user_data?.filter(
          val => val.dayname === 'monday',
        );
      this.setState({
        getBusinessDashboardStatsDetails: response,
        weekData: weekData1,
      });
    });
  };
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      'focus',
      async () => {
        this?.getBusinessDashboardStatsDetails();
      },
    );
  }
  componentWillUnmount() {
    this.focusListener();
  }
  render() {
    const {
      isActive,
      isActiveMonth,
      isVisible,
      weekData,
      isModalVisible,
      getBusinessDashboardStatsDetails,
      monthData,
      yearData,
    } = this?.state;
    console.log('monthDatamonthData', monthData);
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
    ];
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

    const buttonTabsDays = [
      {id: 0, btn: 'Mon', key: 'monday'},
      {id: 1, btn: 'Tue', key: 'tuesday'},
      {id: 2, btn: 'Wed', key: 'wednesday'},
      {id: 3, btn: 'Thu', key: 'thursday'},
      {id: 4, btn: 'Fri', key: 'friday'},
      {id: 5, btn: 'Sat', key: 'saturday'},
      {id: 6, btn: 'Sun', key: 'sunday'},
    ];
    const buttonTabsMonths = [
      {id: 0, btn: 'Jan', key: 'january'},
      {id: 1, btn: 'Feb', key: 'febuary'},
      {id: 2, btn: 'Mar', key: 'march'},
      {id: 3, btn: 'Apr', key: 'april'},
      {id: 4, btn: 'May', key: 'may'},
      {id: 5, btn: 'Jun', key: 'june'},
      {id: 6, btn: 'Jul', key: 'july'},
      {id: 7, btn: 'Aug', key: 'august'},
      {id: 8, btn: 'Sep', key: 'september'},
      {id: 9, btn: 'Oct', key: 'october'},
      {id: 10, btn: 'Nov', key: 'november'},
      {id: 11, btn: 'Dec', key: 'december'},
    ];
    const handleTabs = id => {
      this?.setState({isActive: id});
      if (id === 0) {
        handleTabsWeek(isActiveMonth);
      } else if (id === 1) {
        handleTabsMonth(isActiveMonth);
      } else {
        handleTabsYears(isActiveMonth);
      }
    };
    const handleTabsWeek = id => {
      const weekData1 =
        getBusinessDashboardStatsDetails?.week_and_its_day_wise_target_achieved_user_data?.filter(
          val => val.dayname === buttonTabsDays[id]?.key,
        );
      this.setState({isActiveMonth: id, weekData: weekData1});
    };
    const handleTabsMonth = id => {
      console.log('iddddddddd', id);
      const weekData1 =
        getBusinessDashboardStatsDetails?.month_and_its_day_wise_target_achieved_user_data?.filter(
          val => val.day === id + 1,
        );
      this.setState({isActiveMonth: id, monthData: weekData1});
    };
    const handleTabsYears = id => {
      const weekData1 =
        getBusinessDashboardStatsDetails?.year_and_its_month_wise_target_achieved_user_data?.filter(
          val => val.month === buttonTabsMonths[id]?.key,
        );
      this.setState({isActiveMonth: id, yearData: weekData1});
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
    const getDaysInMonth = (month, year) => {
      return new Date(year, month, 0).getDate();
    };

    const currentYear = new Date().getFullYear();
    const currentMonthIndex = new Date().getMonth(); // 0-based index
    const daysInCurrentMonth = getDaysInMonth(
      currentMonthIndex + 1,
      currentYear,
    );
    const daysArray = Array.from(
      {length: daysInCurrentMonth},
      (_, dayIndex) => ({
        id: dayIndex,
        btn: `${dayIndex + 1}`, // Adding 1 to convert from 0-based to 1-based day
      }),
    );
    console.log('daysArraydaysArray', daysArray);
    const weekLablels = ['Week 01', 'Week 02', 'Week 03', 'Week 04'];
    const monthLablels = ['Month 01', 'Month 02', 'Month 03', 'Month 04'];
    const yearLablels = ['Year 01', 'Year 02', 'Year 03', 'Year 04'];

    const totalTargetAchievedWeeks =
      getBusinessDashboardStatsDetails?.weekly_chart_data?.map(item =>
        parseFloat(item.total_target_achieved),
      );
    const totalTargetAchievedMonths =
      getBusinessDashboardStatsDetails?.monthly_chart_data?.map(item =>
        parseFloat(item.total_target_achieved),
      );
    const totalTargetAchievedYears =
      getBusinessDashboardStatsDetails?.yearly_chart_data?.map(item =>
        parseFloat(item.total_target_achieved),
      );
    const RenderItem = ({item, index}) => {
      console.log('ItemInsideee', item);
      return (
        <View style={styles.viewStyle1}>
          <Text style={styles.txt}>{item?.user?.first_name}</Text>
          <View style={styles.viewStyle2}>
            <Text style={styles.txt1}>Total Target Achived</Text>
            <Text style={styles.txt2}>{item?.total_target_achieved}</Text>
          </View>
        </View>
      );
    };
    return (
      <AppBackground back title={'Team Progress'} marginHorizontal={false}>
        <View style={styles?.container}>
          <View style={{flex: 1, marginTop: 10, gap: 12}}>
            <CustomTabView
              item={buttonTabs}
              isActive={isActive}
              onPress={handleTabs}
              width={width - 40}
              btnWidth={(width - 50) / 3}
            />
            {/* LineChart */}
            <View>
              {getBusinessDashboardStatsDetails?.weekly_chart_data?.length &&
              getBusinessDashboardStatsDetails?.monthly_chart_data?.length &&
              getBusinessDashboardStatsDetails?.yearly_chart_data?.length ? (
                <LineChart
                  data={{
                    labels:
                      isActive == 0
                        ? weekLablels
                        : isActive == 1
                        ? monthLablels
                        : isActive == 2
                        ? yearLablels
                        : '',
                    datasets: [
                      {
                        data:
                          isActive == 0
                            ? totalTargetAchievedWeeks
                            : isActive == 1
                            ? totalTargetAchievedMonths
                            : isActive == 2
                            ? totalTargetAchievedYears
                            : '',
                      },
                    ],
                  }}
                  width={360}
                  height={200}
                  yAxisLabel="$"
                  yAxisSuffix=""
                  yAxisInterval={1}
                  chartConfig={chartConfig2}
                  bezier
                  style={{
                    borderRadius: 16,
                  }}
                />
              ) : null}
            </View>
            <CustomTabView
              item={
                isActive == 0
                  ? buttonTabsDays
                  : isActive == 1
                  ? daysArray
                  : isActive == 2
                  ? buttonTabsMonths
                  : ''
              }
              isActive={isActiveMonth}
              onPress={id =>
                isActive === 0
                  ? handleTabsWeek(id)
                  : isActive === 1
                  ? handleTabsMonth(id)
                  : handleTabsYears(id)
              }
              width={width - 40}
              btnWidth={(width - 50) / 6}
            />
            <FlatList
              contentContainerStyle={{
                flexGrow: 1,
                marginTop: 10,
                paddingBottom: '10%',
              }}
              data={
                isActive == 0 ? weekData : isActive == 1 ? monthData : yearData
              }
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
                    <Text style={styles.txtlistempty}>No Data Found</Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
        <ModalPopup
          value={'Employee'}
          isVisible={isModalVisible}
          handleCross={() => this.setState({isModalVisible: false})}
          onGoBack={() => this.setState({isModalVisible: false})}
        />
        <SocialSheetPopup
          isVisible={isVisible}
          data={EmployeeDetails}
          onPress={handleModalOption}
        />
      </AppBackground>
    );
  }
}

const actions = {getBusinessDashboardStatsDetails};
export default connect(null, actions)(TeamProgress);
