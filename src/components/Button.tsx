import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../util/Colors';
// import { Colors } from 'react-native/Libraries/NewAppScreen';
interface Props {
  text: string;
  onPress: () => void;
  backgroundColor?: string;
  textColor?: string;
  iconName?: string;
  iconColor?: string;
  styles?: ViewStyle;
  textStyles?: TextStyle;
  isLoading?: boolean;
  spinnerColor?: string;
}

const Button: React.FC<Props> = props => {
  return (
    <TouchableOpacity
      style={
        props.backgroundColor
          ? {
              ...styles.containerStyle,
              backgroundColor: props.backgroundColor,
              ...props.styles,
            }
          : {...styles.containerStyle, ...props.styles}
      }
      onPress={props.onPress}>
      {props.isLoading ? (
        <View style={{marginRight: 10}}>
          <ActivityIndicator
            size="large"
            color={props.spinnerColor ? props.spinnerColor : Colors.WHITE}
          />
        </View>
      ) : null}
      {props.iconName && (
        <Ionicons
          name={props.iconName}
          size={20}
          color={props.iconColor ? props.iconColor : Colors.WHITE}
        />
      )}
      <Text
        style={
          props.textColor
            ? {...styles.textStyle, color: props.textColor, ...props.textStyles}
            : {...styles.textStyle, ...props.textStyles}
        }>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: '#0F0F0F',

    borderColor: '#0F0F0F',
    borderWidth: 1,
    flex: 1,
    flexDirection: 'row',

    paddingVertical: 8,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    borderRadius: 8,
  },
  textStyle: {
    fontFamily: 'SFUIText-Regular',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    paddingLeft: 8,
  },
});

export default Button;
