import React from 'react';
import {
  GestureResponderEvent,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
// import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import TitleText from './TitleText';

interface Props {
  leftIcon?: JSX.Element;
  rightIcon?: JSX.Element;
  title: string;
  leftIconOnPress?: (e: GestureResponderEvent) => void;
  rightIconOnPress?: () => void;
  titleStyle?: TextStyle;
}

const Header: React.FC<Props> = ({
  leftIcon,
  leftIconOnPress,
  title,
  rightIcon,
  rightIconOnPress,
  titleStyle,
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={e => (leftIconOnPress ? leftIconOnPress(e) : null)}>
        {leftIcon}
      </TouchableOpacity>
      <TitleText styles={{...titleStyle}} text={title} />
      <TouchableOpacity onPress={rightIconOnPress}>
        {rightIcon}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Header;
