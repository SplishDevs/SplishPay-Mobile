import React from 'react';
import {View, StyleSheet, Text, TextInput, TextStyle} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {Picker, Label} from 'native-base';

interface Props {
  onChange?: (text: string, index: number) => void;
  iconName?: string;
  keyboardType?: any;
  obscureText?: boolean;
  placeholder?: string;
  labelName?: string;
  selectedValue?: string;
  data: PickerProps[];
  iosHeader?: string;
  labelStyle?: TextStyle;
}

interface PickerProps {
  label: string;
  value: string;
}

const Select: React.FC<Props> = props => {
  return (
    <View style={styles.container}>
      {props.labelName && (
        <View>
          <Text style={[styles.labelStyle, props.labelStyle]}>
            {props.labelName}
          </Text>
        </View>
      )}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          {props.iconName && (
            <Icon name={props.iconName} size={20} color="#BDBDBD" />
          )}
          <View style={{marginLeft: 8, flex: 1, width: '100%'}}>
            <Picker
              mode="dropdown"
              iosHeader={props.iosHeader ? props.iosHeader : ''}
              iosIcon={<Icon name="chevron-down-outline" />}
              style={{width: '100%'}}
              selectedValue={props.selectedValue}
              // itemStyle={{width: '100%'}}
              placeholder={props.placeholder}
              onValueChange={props.onChange}>
              <Picker.Item label="Select One" value="" />
              {props.data.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>
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
    height: 40,
    backgroundColor: '#F2F2F2',
    // borderColor: '#F2F2F2',
    // borderWidth: 2,

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
    color: '#E5E5E5',
  },
});

export default Select;
