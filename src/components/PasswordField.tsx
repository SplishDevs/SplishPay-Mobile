import React, {LegacyRef, Ref, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  ViewStyle,
  KeyboardType,
  TouchableOpacityBase,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Colors} from '../util/Colors';

interface Props {
  onChange?: (text: string) => void;
  iconName?: string;
  keyboardType?: KeyboardType;
  obscureText?: boolean;
  placeholder?: string;
  labelName?: string;
  color?: string;
  backgroundColor?: Colors;
  labelColor?: Colors;
  inputStyle?: TextStyle;
  editable?: boolean;
  autoFocus?: boolean;
  value?: string;
  containerStyle?: ViewStyle;
  inputRef?: LegacyRef<TextInput>;
}

const PasswordField: React.FC<Props> = ({
  editable = true,
  autoFocus = false,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <View style={[styles.container]}>
      {props.labelName && (
        <View>
          <Text
            style={
              props.color
                ? {...styles.labelStyle, color: props.color}
                : styles.labelStyle
            }>
            {props.labelName}
          </Text>
        </View>
      )}
      <View
        style={
          props.backgroundColor
            ? [
                {
                  ...styles.inputContainer,
                  backgroundColor: props.backgroundColor,
                },
                props.containerStyle,
              ]
            : [styles.inputContainer, props.containerStyle]
        }>
        <View style={styles.inputWrapper}>
          {props.iconName && (
            <Icon
              name={props.iconName}
              size={20}
              color={props.color ? props.color : '#BDBDBD'}
            />
          )}
          <View style={{marginLeft: 8, flex: 1}}>
            <TextInput
              autoFocus={autoFocus}
              editable={editable}
              onChangeText={props.onChange}
              autoCapitalize="none"
              placeholder={props.placeholder ? props.placeholder : ''}
              keyboardType={props.keyboardType ? props.keyboardType : 'default'}
              secureTextEntry={isOpen}
              value={props?.value}
              ref={props.inputRef}
              style={
                props.color
                  ? {color: props.color, width: '100%', ...props.inputStyle}
                  : {color: '#000', width: '100%', ...props.inputStyle}
              }
            />
          </View>
          <TouchableOpacity onPress={() => setIsOpen(state => !state)}>
            <Icon
              name={isOpen ? 'eye-off-outline' : 'eye-outline'}
              size={20}
              color={props.color ? props.color : '#000'}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 16,
  },
  inputContainer: {
    height: 50,
    backgroundColor: '#F2F2F2',
    borderColor: '#F2F2F2',
    borderWidth: 2,

    borderRadius: 4,
    marginBottom: 8,
    justifyContent: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  inputStyle: {
    marginLeft: 16,
    color: '#BDBDBD',
    fontFamily: 'SFUIText-Regular',
    fontSize: 16,
    flex: 1,
  },
  labelStyle: {
    fontSize: 16,
    fontFamily: 'SFUIText-Regular',
    color: Colors.GRAY_2,
    fontWeight: 'bold',
  },
});

export default PasswordField;
