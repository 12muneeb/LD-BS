import React, {Component} from 'react';
import {Text, FlatList} from 'react-native';
import {connect} from 'react-redux';
import { getContent } from '../../../redux/actions/appAction';
import AppBackground from '../../../components/AppBackground';
import styles from './styles';

class AboutApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      getContent:''
    };
  }

  renderTextItem = ({item}) => {
    return <Text style={styles.para}>{item}</Text>;
  };
  getContent = params => {
    this.props.getContent(params, response => {
      this.setState({
        getContent: response,
      });
    });
  };
  getContentPP = params1 => {
    this.props.getContent(params1, response => {
      console.log('logForPP', response);
      this.setState({
        getContentPP: response,
      });
    });
  };
  componentDidMount() {
    this.focusListener = this.props.navigation.addListener(
      'focus',
      async () => {
        let params = {
          key: 'type',
          value: 'aa',
        };
        this?.getContent(params);
      },
    );
  }
  componentWillUnmount() {
    this.focusListener();
  }
  render() {
    const textData = [
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley",
    ];
    const {getContent} = this?.state;
    console.log('aboutappcontent', getContent)
    return (
      <AppBackground back title={'About App '} marginHorizontal={false}>
        {/* <FlatList
          data={textData}
          renderItem={this.renderTextItem}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={{flexGrow: 1}}
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}
        /> */}
        <Text style={styles.para}>{getContent?.url}</Text>
      </AppBackground>
    );
  }
}
const actions = {getContent};
export default connect(null, actions)(AboutApp);
