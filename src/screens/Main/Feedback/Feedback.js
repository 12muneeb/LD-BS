import React, {Component} from 'react';
import {Dimensions, FlatList, Keyboard, ScrollView, View} from 'react-native';
import {Image as ImageCompressor} from 'react-native-compressor';
import Toast from 'react-native-toast-message';
import {connect} from 'react-redux';
// import ModalPopup from '../../../containers/Popup/modalPopup';
import {appIcons} from '../../../assets';
import AppBackground from '../../../components/AppBackground';
import CustomButton from '../../../components/CustomButton';
import CustomTextInput from '../../../components/CustomTextInput';
import ImagePicker from '../../../components/ImagePicker';
import ImageSelectedView from '../../../components/ImageSelectedView';
import Img from '../../../components/Img';
import ModalPopup from '../../../containers/Popup/modalPopup/modalPopup';
import NavService from '../../../helpers/NavService';
import {postFeedBack} from '../../../redux/actions/appAction';
import {colors, size} from '../../../utils';
import styles from './styles';
const {height} = Dimensions?.get('window');
class Feedback extends Component {
  constructor() {
    super();
    this.state = {
      message: '',
      subject: '',
      imageArray: [],
      showModal: false,
      setKeyboardStatus: false,
    };
  }
  onSubmit = () => {
    const {subject, message, imageArray} = this.state;
    if (!subject) {
      Toast.show({
        text1: 'Subject field can`t be empty',
        type: 'error',
        visibilityTime: 3000,
      });
    } else if (!message) {
      Toast.show({
        text1: 'Message field can`t be empty',
        type: 'error',
        visibilityTime: 3000,
      });
    } else {
      Keyboard.dismiss();
      let payload = new FormData();
      payload.append('subject', subject);
      payload.append('message', message);
      if (imageArray.length > 0) {
        imageArray.map(item => {
          payload.append('image', item);
        });
      }
      console.log('payload', payload);
      this?.props?.postFeedBack(payload);
      setTimeout(() => {
        this.setState({showModal: true});
      }, 850);
    }
  };
  render() {
    const {showModal, setKeyboardStatus} = this.state;
    const handleGoBack = () => {
      this.setState({showModal: false});
      setTimeout(() => {
        NavService.goBack(NavService?.closeDrawer());
        Toast.show({
          text1: 'Thankyou for your feedback',
          type: 'success',
          visibilityTime: 3000,
        });
      }, 850);
    };
    const handleClose = () => {
      this.setState({showModal: false});
    };
    const PlusButton = () => {
      return (
        <ImagePicker
        style={{width:100, height:100}}
          isMultiple={true}
          onImageChange={(path, mime, type) => {
            UploadData(path, mime, type);
          }}>
          <View style={[styles.plusContainer]}>
            <View style={styles.iconPlus}>
              <Img local src={appIcons.plus} style={styles.icon} />
            </View>
          </View>
        </ImagePicker>
      );
    };
    // SELECTED DATA FUNCTION
    UploadData = async (path, mime, type) => {
      const {imageArray} = this.state;
      let multipleImages = [];
      if (Array.isArray(path)) {
        const arr = path?.map(async item => {
          let result;
          result = await ImageCompressor.compress(item.path, {
            maxHeight: 400,
            maxWidth: 400,
            quality: 1,
          });
          let imageObject = {
            uri: result,
            name: `image${Date.now()}.${item?.mime.slice(
              item?.mime.lastIndexOf('/') + 1,
            )}`,
            type: item?.mime,
          };
          multipleImages.push(imageObject);
        });
        await Promise.all(arr);
        const mergeImagesWithExistingGalleryAssets = [
          ...imageArray,
          ...multipleImages,
        ];

        this.setState({imageArray: mergeImagesWithExistingGalleryAssets});
      } else {
        const getExistingGalleryAssets = [...imageArray];
        const assetObject = {
          uri: path,
          name: `image${Date.now()}.${mime.slice(mime.lastIndexOf('/') + 1)}`,
          type: mime,
        };
        getExistingGalleryAssets.push(assetObject);
        this.setState({imageArray: getExistingGalleryAssets});
      }
    };
    // REMOVE FROM LIST
    removeSelectedItem = asset => {
      const {imageArray} = this.state;
      const remainingImages = imageArray.filter(item => {
        return item ? item !== asset : item.uri !== asset;
      });
      this.setState({imageArray: remainingImages});
    };
    onSubmit = () => {
      const {subject, message} = this.state;
      if (!subject) {
        Toast.show({
          text1: 'Please enter subject',
          type: 'error',
          visibilityTime: 3000,
        });
      } else if (!message) {
        Toast.show({
          text1: 'Please enter message',
          type: 'error',
          visibilityTime: 3000,
        });
      } else {
        Keyboard.dismiss();
      }
    };
    const {imageArray, subject, message} = this.state;
    return (
      <AppBackground
        showLogo={false}
        back
        iconColor={'black'}
        title={'Help & Feedback'}
        // marginHorizontal={false}
      >
        <ScrollView
          contentContainerStyle={{}}
          showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <View style={styles.content}>
              <CustomTextInput
                textAlignVertical="top"
                maxLength={30}
                placeholder={'Subject'}
                value={subject}
                color={'black'}
                placeholderColor={colors.lightGray}
                borderRadius={30}
                isBorderShow
                borderColor={colors.primary}
                keyboardType={'email-address'}
                onChangeText={value => this.setState({subject: value})}
                TextInputStyling={{padding: 15, width: 350}}
                containerStyle={{borderRadius: 30}}
              />

              <CustomTextInput
                textAlignVertical="top"
                maxLength={350}
                multiline
                numberOfLines={8}
                placeholder={'Type your message here...'}
                value={message}
                color={'black'}
                placeholderColor={colors.lightGray}
                borderRadius={30}
                isBorderShow
                borderColor={colors.primary}
                keyboardType={'email-address'}
                onChangeText={value => this.setState({message: value})}
                // TextInputStyling={{padding: 15, width: 350, height: 300}}
                containerStyle={{borderRadius: 30, height: 200}}
              />
              {imageArray?.length == 0 && <PlusButton />}
              {imageArray.length == 1 && (
                <FlatList
                  style={{flexGrow: 0}}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                    flexGrow: 1,
                    // backgroundColor:'red',
                    marginTop: 10,
                  }}
                  // ListFooterComponent={() => {
                  //   return <PlusButton />;
                  // }}
                  keyExtractor={(item, index) => index.toString()}
                  data={imageArray}
                  renderItem={({item}) => (
                    <ImageSelectedView
                      item={item}
                      backgroundColor="white"
                      color={'red'}
                      removeImage={() => removeSelectedItem(item)}
                    />
                  )}
                />
              )}
            </View>
            <ModalPopup
              modalActive
              value={'Success'}
              isVisible={showModal}
              desc={`Your Feedback has been submitted \n to admin.`}
              title={'Thank You!'}
              onGoBack={handleGoBack}
              handleClose={handleClose}
              onBackButtonPress={handleClose}
              onBackdropPress={handleClose}
            />
            <View style={{flex: 1}}>
              <CustomButton
                onPress={this.onSubmit}
                title=" Submit"
                buttonStyle={[styles.pressAble1]}
                textStyle={{fontSize: size.small, color: colors.white}}
              />
            </View>
          </View>
        </ScrollView>
      </AppBackground>
    );
  }
}

const actions = {postFeedBack};
export default connect(null, actions)(Feedback);
