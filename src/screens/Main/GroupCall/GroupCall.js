import React, {Component} from 'react';
import {View, Dimensions, PixelRatio, Alert} from 'react-native';
import {ImageBackground, Text, TouchableOpacity} from 'react-native';
import {GroupCallData} from '../../../utils/dummyData';
import CustomText from '../../../components/CustomText';
import {colors, family, size} from '../../../utils';
import {styles} from './styles';
import LinearGradient from 'react-native-linear-gradient';
import Img from '../../../components/Img';
import {appIcons, appImages} from '../../../assets';
import ModalPopup from '../../../containers/Popup/modalPopup';
import {connect} from 'react-redux';
import {drawerPosition} from '../../../redux/actions/appAction';
import AppBackground from '../../../components/AppBackground';
import NavService from '../../../helpers/NavService';

class GroupCall extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemHeight: 0,
      numColumns: 2,
      isModalVisible: false,
    };
  }

  componentDidMount() {
    const screenWidth = Dimensions.get('window').width;
    const screenHeight = Dimensions.get('window').height;
    const pixelRatio = PixelRatio.get();
    const itemCount = GroupCallData.length;

    let numColumns = 2;

    if (itemCount === 1) {
      numColumns = 1;
    } else if (itemCount === 2) {
      numColumns = 1;
    }

    const itemHeight = (screenHeight - 10) / Math.ceil(itemCount / numColumns);

    this.setState({itemHeight, numColumns});
  }
  handleAdd = () => {
    NavService.navigate('AddUser');
  };
  render() {
    const {itemHeight, numColumns, isModalVisible} = this.state;
    const itemCount = GroupCallData.length;
    const columns = [];

    for (let i = 0; i < itemCount; i += numColumns) {
      const rowData = GroupCallData.slice(i, i + numColumns);
      columns.push(rowData);
    }
    const handleCall = () => {
      // NavService.goBack();
      setTimeout(() => {
        this.setState({isModalVisible: true});
      }, 850);
    };
    const handleOpenDrawer = () => {
      this.props.drawerPositions();
      NavService.openDrawer();
    };
    return (
      <View style={styles.container}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.groupadd}
          onPress={this.handleAdd}>
          <Img
            local={true}
            src={appIcons.groupadd}
            resizeMode={'contain'}
            style={styles.grpadd}
          />
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.groupchat}
          onPress={() => handleOpenDrawer()}>
          <Img
            local={true}
            src={appIcons.groupchat}
            resizeMode={'contain'}
            style={styles.grpadd}
          />
        </TouchableOpacity>
        <View style={styles.calladded}>
          <TouchableOpacity activeOpacity={0.8}>
            <Img
              local={true}
              src={appIcons.groupsound}
              resizeMode={'contain'}
              style={styles.grpcell}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8}>
            <Img
              local={true}
              src={appIcons.groupmicro}
              resizeMode={'contain'}
              style={styles.grpcell}
            />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} onPress={handleCall}>
            <Img
              local={true}
              src={appIcons.groupcell}
              resizeMode={'contain'}
              style={styles.grpcell}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.admincontainer}>
          <Img
            local={true}
            src={appImages.groupimg2}
            resizeMode={'contain'}
            style={styles.groupadmin}
          />
        </View>
        {columns.map((row, rowIndex) => (
          <View key={rowIndex} style={{flexDirection: 'row'}}>
            {row.map((item, itemIndex) => (
              <View
                key={item.id}
                style={[styles.imageContainer, {height: itemHeight}]}>
                <ImageBackground
                  source={item.img}
                  style={styles.imageBackground}
                  resizeMode="cover">
                  <ImageBackground
                    source={item.img1}
                    style={styles.imageBackground}
                    resizeMode="cover">
                    <CustomText
                      text={item.name}
                      color={colors.white}
                      font={family.Poppins_Medium}
                      size={size.small}
                      style={styles.name}
                    />
                  </ImageBackground>
                </ImageBackground>
              </View>
            ))}
          </View>
        ))}
        <ModalPopup
        titlefield
          text={'Save Details'}
          buttontitle={'Save'}
          value={'AddField'}
          description
          isVisible={isModalVisible}
          handleCross={() => this.setState({isModalVisible: false})}
          onGoBack={() => {
            this.setState({isModalVisible: false});
            setTimeout(() => {
              NavService.navigate('ConferenceCall');
            }, 760);
          }}
          onBackdropPress={() => this.setState({isModalVisible: false})}
          onBackButtonPress={() => this.setState({isModalVisible: false})}
        />
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    drawerPositions: () => dispatch(drawerPosition('right')),
  };
};

export default connect(null, mapDispatchToProps)(GroupCall);
