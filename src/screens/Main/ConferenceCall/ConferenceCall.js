import {
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
} from 'react-native';
import React, {Component} from 'react';
import AppBackground from '../../../components/AppBackground';
import {FlatList} from 'react-native';
import {ConferenceCallData} from '../../../utils/dummyData';
import {styles} from './styles';
import {colors, family, size} from '../../../utils';
import CustomText from '../../../components/CustomText';
import Img from '../../../components/Img';
import {appIcons} from '../../../assets';
import NavService from '../../../helpers/NavService';
const {width, height} = Dimensions.get('screen');
export class ConferenceCall extends Component {
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      this.onBackPress,
    );
  }
  componentWillUnmount() {
    this.backHandler.remove();
  }

  onBackPress = () => {
    NavService.navigate('BottomTabs', {screen: 'Dashboard'});
    return true;
  };
  render() {
    const handleCall = () => {
      NavService.navigate('CallParticipants');
    };

    return (
      <AppBackground back={false} title={'Conference Call'} onback>
        <View
          style={{alignSelf: 'center', width: '90%', height: height / 1.25}}>
          <CustomText
            text="Past Calls"
            color={colors.black}
            font={family.Poppins_SemiBold}
            size={size.normal}
            style={{marginVertical: 15}}
          />
          <FlatList
            bounces={false}
            contentContainerStyle={{
              flexGrow: 1,
              gap: 10,
              paddingBottom: height * 0.1,
            }}
            showsVerticalScrollIndicator={false}
            keyExtractor={_index => _index.toString()}
            data={ConferenceCallData}
            ItemSeparatorComponent={this?.ItemSeparatorComponent}
            renderItem={({item}) => {
              return (
                <View style={styles.maincontainer}>
                  <View style={styles.subcontainer}>
                    <CustomText
                      text="Title"
                      color={colors.secondary}
                      font={family.Poppins_Medium}
                      size={size.normal}
                    />
                    <View style={styles.flex}>
                      <CustomText
                        text="Date:"
                        color={colors.secondary}
                        font={family.Poppins_Medium}
                        size={size.xsmall}
                        style={styles.spacingheading}
                      />
                      <CustomText
                        text={item.date}
                        color={colors.darkGray}
                        font={family.Poppins_Regular}
                        size={size.xxsmall}
                      />
                    </View>
                  </View>
                  <View style={styles.subcontainer}>
                    <CustomText
                      text={item.title}
                      color={colors.black}
                      font={family.Poppins_Regular}
                      size={size.xsmall}
                      style={{marginTop: -9}}
                    />
                    <View style={styles.flex}>
                      <CustomText
                        text="Start Time:"
                        color={colors.secondary}
                        font={family.Poppins_Medium}
                        size={size.xsmall}
                        style={styles.spacingheading}

                      />
                      <CustomText
                        text={item.starttime}
                        color={colors.darkGray}
                        font={family.Poppins_Regular}
                        size={size.xxsmall}
                      />
                    </View>
                  </View>
                  <View style={styles.subcontainer}>
                    <CustomText
                      text="Description"
                      color={colors.secondary}
                      font={family.Poppins_Medium}
                      size={size.normal}
                      style={{marginTop: 10}}
                    />
                    <View style={styles.flex}>
                      <CustomText
                        text="End Time:"
                        color={colors.secondary}
                        font={family.Poppins_Medium}
                        size={size.xsmall}
                        style={styles.spacingheading}

                      />
                      <CustomText
                        text={item.starttime}
                        color={colors.darkGray}
                        font={family.Poppins_Regular}
                        size={size.xxsmall}
                      />
                    </View>
                  </View>
                  <View>
                    <CustomText
                      text={item.description}
                      color={colors.black}
                      font={family.Poppins_Regular}
                      size={size.xxsmall}
                      numberOfLines={2}
                    />
                    <CustomText
                      text="Participants"
                      color={colors.secondary}
                      font={family.Poppins_Medium}
                      size={size.normal}
                      style={{marginTop: 10}}
                    />
                    <FlatList
                      data={item?.participants}
                      horizontal
                      contentContainerStyle={{gap: 10}}
                      renderItem={({item}) => (
                        <View>
                          <Img
                            local
                            src={item.img}
                            resizeMode={'cover'}
                            style={styles.multipleimg}
                          />
                        </View>
                      )}
                    />
                  </View>
                </View>
              );
            }}
          />
          <View style={styles.pluscontainer}>
            <TouchableOpacity activeOpacity={0.9} onPress={handleCall}>
              <Img
                local
                src={appIcons.covercell}
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

export default ConferenceCall;
