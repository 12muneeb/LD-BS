import React, {Component} from 'react';
import AppBackground from '../../../components/AppBackground';
import {Alert, Dimensions, FlatList, View} from 'react-native';
import CustomList from '../../../components/CustomList';
import {
  _dataStats,
  _messagePage,
  _notifications,
  _ongoingGoals,
} from '../../../utils/dummyData';
import styles from './styles';
import {colors, family, size} from '../../../utils';
import {connect} from 'react-redux';
import {getContent} from '../../../redux/actions/appAction';
import CustomText from '../../../components/CustomText';
const {height, width} = Dimensions?.get('screen');
export class TermsAndConditions extends Component {
  constructor() {
    super();
    this.state = {
      isActive: 0,
      getContent: [],
    };
  }
  getContent = params => {
    this.props.getContent(params, response => {
      this.setState({
        getContent: response,
      });
    });
  };
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      'focus',
      async () => {
        let params = {
            key:'type',
            value:'tc'
        }
        this?.getContent(params);
      },
    );
  }
  componentWillUnmount() {
    this.focusListener();
  }
  ItemSeparatorComponent = () => {
    return <View style={styles.lineSeparator} />;
  };
  render() {
    const {getContent} = this?.state;

    return (
      <AppBackground back title={'Terms & Condition'} marginHorizontal={false}>
        <View style={styles?.container}>
          <FlatList
            bounces={false}
            style={{flex: 1, marginTop: height / 64}}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: width * 0.03,
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={_index => _index?.toString()}
            data={_notifications}
            ItemSeparatorComponent={this?.ItemSeparatorComponent}
            renderItem={({item}) => (
              <View style={styles.subcontainer}>
                <View style={styles.subcontent}>
                  <CustomText
                    text={item.name}
                    font={family.Poppins_Medium}
                    size={size.normal}
                    color={colors.secondary}
                  />
                  <CustomText
                    text={item.status}
                    font={family.Poppins_Regular}
                    size={size.xsmall}
                    color={colors.primary}
                  />
                </View>
                <CustomText
                  text={item.description}
                  font={family.Poppins_Regular}
                  size={size.small}
                  color={colors.black}
                />
              </View>
            )}
          />
        </View>
      </AppBackground>
    );
  }
}
const actions = {getContent};
export default connect(null, actions)(TermsAndConditions);
