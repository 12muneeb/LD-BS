import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import Swiper from 'react-native-swiper';
import {appImages} from '../../../assets';
import {styles} from './styles';
import CustomText from '../../../components/CustomText';
import CustomButton from '../../../components/CustomButton';
import NavService from '../../../helpers/NavService';
import {connect} from 'react-redux';
import {loginUser} from '../../../redux/actions/authAction';
import Toast from 'react-native-toast-message';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import {colors} from '../../../utils';

class Description extends Component {
  swiperRef = React.createRef();
  handleNext = () => {
    const {index} = this.swiperRef.current.state;
    const totalSlides = this.swiperRef.current.props.children.length;

    if (index < totalSlides - 1) {
      this.swiperRef.current.scrollBy(1);
    } else {
      if (index === totalSlides - 1) {
        let payload = {
          role: 'user',
          email: 'abc@gmail.com',
          password: '123456',
        };
        Toast.show({
          text1: 'User Login Successfully',
          type: 'success',
          visibilityTime: 3000,
        });
        this.props.loginUser(payload);
      }
    }
  };
  onSubmit = () => {
    let payload = {
      role: 'user',
      email: 'abc@gmail.com',
      password: '123456',
    };
    Toast.show({
      text1: 'User Login Successfully',
      type: 'success',
      visibilityTime: 3000,
    });
    this.props.loginUser(payload);
  };

  render() {
    return (
      <View style={{flex: 1, marginTop: getStatusBarHeight()}}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={this.onSubmit}
          style={styles.skipbutton}>
          <CustomText text="Skip" style={styles.txtheading} />
        </TouchableOpacity>
        <Swiper
          ref={this.swiperRef}
          showsButtons={false}
          loop={false}
          dotStyle={styles.inactivedot}
          activeDotStyle={styles.activedot}
          renderPagination={this.renderPagination}>
          <View style={styles.slide}>
            <Image
              source={appImages.bussnies1}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.header}>
              <Text style={styles.text}>
                Lorem Ipsum dolor sit amet{'\n'}consectetur
              </Text>
              <Text style={styles.text1}>
                Nulla paedo sum amet ac frijuilum. Lorem ipsum dolor sit amet,
                consectetuer adipiscing elit. Etiam eget nisl. Nullam felis.
              </Text>
            </View>
          </View>

          <View style={styles.slide}>
            <Image
              source={appImages.bussnies2}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.header}>
              <Text style={styles.text}>
                Lorem Ipsum dolor sit amet{'\n'}consectetur
              </Text>
              <Text style={styles.text1}>
                Nulla paedo sum amet ac frijuilum. Lorem ipsum dolor sit amet,
                consectetuer adipiscing elit. Etiam eget nisl. Nullam felis.
              </Text>
            </View>
          </View>
          <View style={styles.slide}>
            <Image
              source={appImages.business3}
              style={styles.image}
              resizeMode="contain"
            />
            <View style={styles.header}>
              <Text style={styles.text}>
                Lorem Ipsum dolor sit amet{'\n'}consectetur
              </Text>
              <Text style={styles.text1}>
                Nulla paedo sum amet ac frijuilum. Lorem ipsum dolor sit amet,
                consectetuer adipiscing elit. Etiam eget nisl. Nullam felis.
              </Text>
            </View>
          </View>
        </Swiper>
        <View style={styles.btncontainer}>
          <CustomButton title={'Next'} onPress={this.handleNext} />
        </View>
      </View>
    );
  }
}

const actions = {loginUser};
export default connect(null, actions)(Description);
