import React, {useEffect, useState} from 'react';
import {Text} from 'react-native';
import {family, colors} from '../utils';

const CustomText = ({
  text = '',
  size = 16,
  style = {},
  font = 'Poppins-Medium',
  onPress = undefined,
  color,
  expandable = false,
  intialLength = 100,
  numberOfLines,
  textDecorationLine,
}) => {
  const [textData, setTextData] = useState(text);

  useEffect(() => {
    if (expandable) {
      setTextData(`${text.slice(0, intialLength)}...`);
    } else {
      setTextData(text);
    }
  }, [text]);

  const toggleExpandable = () => {
    if (textData.length == text.length) {
      setTextData(`${text.slice(0, intialLength)}...`);
    } else {
      setTextData(text);
    }
  };

  const actionBtnLable =
    textData?.length == text?.length ? 'Read Less' : 'Read More';
  return (
    <Text
      numberOfLines={numberOfLines}
      onPress={onPress ?? undefined}
      style={{
        fontSize: size,
        color: color ?? colors.text,
        textDecorationLine: textDecorationLine,
        fontFamily: font,
        ...style,
      }}>
      {textData}
      {expandable ? '  ' : ''}
      {expandable && (
        <Text
          numberOfLines={numberOfLines}
          onPress={toggleExpandable}
          style={{
            color: colors.primary,
            textDecorationLine: textDecorationLine,
            fontFamily: font,
            fontWeight: '500',
          }}>
          {actionBtnLable}
        </Text>
      )}
    </Text>
  );
};

export default CustomText;
