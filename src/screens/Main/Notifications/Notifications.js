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
import Shadows from '../../../helpers/Shadows';
import CustomText from '../../../components/CustomText';
const {height, width} = Dimensions?.get('screen');
export class Notifications extends Component {
  constructor() {
    super();
    this.state = {
      isActive: 0,
    };
  }
  ItemSeparatorComponent = () => {
    return <View style={styles.lineSeparator} />;
  };
  render() {
    const {isActive} = this?.state;

    return (
      <AppBackground back title={'Notifications'} marginHorizontal={false}>
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

export default Notifications;
