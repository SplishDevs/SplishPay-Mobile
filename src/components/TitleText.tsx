import React from 'react';
import {StyleSheet, View, Text, ViewStyle, TextStyle} from 'react-native';

interface Props {
  text: string;
  color?: string;
  styles?: TextStyle;
}

const TitleText: React.FC<Props> = props => {
  return (
    <View>
      <Text
        style={
          props.color
            ? {...styles.textStyle, color: props.color, ...props.styles}
            : {...styles.textStyle, ...props.styles}
        }>
        {props.text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 24,
    fontFamily: 'SFUIText-Light',
    fontWeight: 'bold',
  },
});

export default TitleText;
