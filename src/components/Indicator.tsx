import React from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';

interface Props {
  isActive: Boolean;
  backgroundColor?: string;
  activeColor?: string;
  onPress?: () => void;
}

const Indicator: React.FC<Props> = props => {
  return (
    <TouchableWithoutFeedback style={styles.container} onPress={props.onPress}>
      <View style={{marginRight: 8}}>
        {props.isActive && (
          <View
            style={
              props.activeColor
                ? {
                    ...styles.dotActiveStyle,
                    borderColor: props.backgroundColor,
                    backgroundColor: props.activeColor,
                    flex: 1,
                  }
                : styles.dotActiveStyle
            }></View>
        )}
        {!props.isActive && (
          <View
            style={
              props.backgroundColor
                ? {
                    ...styles.dotStyle,
                    borderColor: props.backgroundColor,
                    backgroundColor: props.backgroundColor,
                  }
                : styles.dotStyle
            }></View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 20,
    width: 20,
  },
  dotActiveStyle: {
    backgroundColor: '#BDBDBD',
    height: 10,
    width: 10,
    borderRadius: 5,
    borderColor: '#BDBDBD',
    borderWidth: 1,
  },
  dotStyle: {
    backgroundColor: '#F2F2F2',
    height: 10,
    width: 10,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default Indicator;
