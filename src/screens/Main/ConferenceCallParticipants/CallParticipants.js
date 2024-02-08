import {
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {Component} from 'react';
import AppBackground from '../../../components/AppBackground';
import {
  _Participants,
  _messagePage,
  multiImages,
} from '../../../utils/dummyData';
import CustomText from '../../../components/CustomText';
import CustomList from '../../../components/CustomList';
const {height, width} = Dimensions?.get('screen');
import {styles} from './styles';
import {colors, family, size} from '../../../utils';
import CustomButton from '../../../components/CustomButton';
import NavService from '../../../helpers/NavService';
export class CallParticipants extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedId: [0, 3, 5],
      isAllSelected: false,
    };
  }
  ItemSeparatorComponent = () => {
    return <View style={styles.lineSeparator} />;
  };
  render() {
    const {selectedId, isAllSelected} = this.state;

    const handleGroup = () => {
      NavService.navigate('GroupCall');
    };
    const handleCheck = id => {
      console.log(
        '🚀 ~ file: CallParticipants.js:33 ~ CallParticipants ~ handleCheck ~ id:',
        id,
      );
      const isSelected = this.state.selectedId.includes(id);
      if (isSelected) {
        this.setState({
          selectedId: selectedId.filter(selected => selected !== id),
        });
      } else {
        this.setState({selectedId: [...selectedId, id]});
      }
    };
    return (
      <AppBackground back title={'Participants'} marginHorizontal={false}>
        <View style={{flex: 1, marginTop: 15}}>
          <View style={styles.Customtext}>
            <CustomText
              text="26 Participants"
              color={colors.black}
              font={family.Poppins_Medium}
              size={size.normal}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                if (isAllSelected) {
                  this.setState({isAllSelected: false});
                  this.setState({selectedId: []});
                } else {
                  this.setState({isAllSelected: true});
                  this.setState({selectedId: [0, 1, 2, 3, 4, 5, 6, 7, 8]});
                }
              }}>
              <CustomText
                text={isAllSelected ? 'Unselect All' : 'Select All'}
                color={colors.primary}
                font={family.Poppins_Medium}
                size={size.normal}
                textDecorationLine={'underline'}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            bounces={false}
            style={{flex: 1, marginTop: height / 64}}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: width * 0.1,
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={index => index?.id?.toString()}
            data={_Participants}
            ItemSeparatorComponent={this?.ItemSeparatorComponent}
            renderItem={({item, index}) => (
              <CustomList
                key={index}
                _item={item}
                select
                handleCheck={() => handleCheck(item?.id)}
                selectedCheckBox={selectedId}
              />
            )}
          />
          <View style={{bottom: 10}}>
            <CustomButton title={'Start Conference'} onPress={handleGroup} />
          </View>
        </View>
      </AppBackground>
    );
  }
}

export default CallParticipants;
