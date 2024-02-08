import React, {Component} from 'react';
import AppBackground from '../../../components/AppBackground';
import {styles} from './styles';
import {
  Dimensions,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import CustomTextInput from '../../../components/CustomTextInput';
import {colors, platform} from '../../../utils';
import {appIcons} from '../../../assets';
import {_data, _dataStats} from '../../../utils/dummyData';
import ListHeader from '../../../components/ListHeader';
import appStyles from '../../appStyles';
import NavService from '../../../helpers/NavService';
import Img from '../../../components/Img';
import ModalPopup from '../../../containers/Popup/modalPopup';
import {connect} from 'react-redux';
import {getAlUser} from '../../../redux/actions/authAction';
import {ASSETS_URL} from '../../../config/WebService';
const {width, height} = Dimensions?.get('screen');

export class Employees extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      isModalVisible: false,
      data: [],
    };
  }

  ItemSeparatorComponent = () => {
    return <View style={styles.lineSeparator} />;
  };
  componentDidMount() {
    this?.props?.navigation?.addListener('focus', () => {
      this.setState({search: ''});
    });
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
  render() {
    const {isModalVisible, data} = this.state;
    const handleSubmit = () => {
      this.setState({isModalVisible: true});
    };
    const handleClick = () => {
      this.setState({isModalVisible: false});
      Keyboard.dismiss();
    };
    console.log('datadatadata', data);
    return (
      <AppBackground
        menu
        title={'Employees'}
        notification
        marginHorizontal={false}
        marginBottom={height / 32}>
        <View style={styles?.container}>
          <CustomTextInput
            placeholder="Search here..."
            placeholderColor={colors?.gray}
            textInputStyles={styles?.textInputStyles}
            containerStyle={styles?.containerStyle}
            search={appIcons?.search}
            value={this?.state?.search}
            borderStyles={styles?.borderStyles}
            onChangeText={text => {
              this.setState({search: text});
            }}
          />
          <View style={styles?.gap} />
          <ListHeader
            stats={false}
            _title2="Employee"
            _title3="Team"
            _title4="Revenue"
            customStylesRow2={styles?.customStylesRow2}
            customStylesRow3={styles?.customStylesRow3}
            customStylesRow4={styles?.customStylesRow3}
            disabled={true}
          />
          <View style={styles.flatcontainer}>
            <FlatList
              bounces={false}
              style={{marginTop: height / 64}}
              contentContainerStyle={{
                paddingBottom: width * 0.28,
              }}
              showsVerticalScrollIndicator={false}
              keyExtractor={_index => _index.toString()}
              data={data}
              ListEmptyComponent={() => {
                return (
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: 450,
                    }}>
                    <Text style={styles.found}>No User found</Text>
                  </View>
                );
              }}
              ItemSeparatorComponent={this?.ItemSeparatorComponent}
              renderItem={({item}) => (
                console.log('=====-----item', item),
                (
                  <ListHeader
                    disabled={item?.first_name == null ? true : false}
                    stats={false}
                    leaderBoardData={false}
                    _item={item}
                    customContainerStyles={styles?.customContainerStyles}
                    color={colors?.secondary}
                    customLine={{borderColor: colors?.primary}}
                    customStylesRow2={styles?.customStylesRow2}
                    customStylesRow3={styles?.customStylesRow3}
                    customStylesRow4={styles?.customStylesRow3}
                    color4={colors?.primary}
                    color3={colors?.black}
                    onPress={() =>
                      NavService?.navigate('EmployeeDetail', {userData: item})
                    }
                    image={
                      
                      item?.profile_image
                        ?{uri: ASSETS_URL + item.profile_image}

                        : appIcons.userPlaceholder
                    }
                  />
                )
              )}
            />
            <View style={styles.pluscontainer}>
              <TouchableOpacity activeOpacity={0.9} onPress={handleSubmit}>
                <Img
                  local
                  src={appIcons.sub}
                  resizeMode={'cover'}
                  style={styles.plus}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <ModalPopup
          value={'AddEmployee'}
          isVisible={isModalVisible}
          handleCross={() => this.setState({isModalVisible: false})}
          onGoBack={handleClick}
          pass
        />
      </AppBackground>
    );
  }
}

const actions = {getAlUser};
export default connect(null, actions)(Employees);
