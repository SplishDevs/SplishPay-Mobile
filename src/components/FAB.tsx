import React from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  iconName: string;
  onPress: () => void;
  backgroundColor?: string;
}

const FAB: React.FC<Props> = props => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.fabWrapper}>
        <TouchableOpacity
          style={
            props.backgroundColor
              ? {
                  ...styles.containerStyle,
                  backgroundColor: props.backgroundColor,
                }
              : styles.containerStyle
          }
          onPress={props.onPress}>
          <Icon name={props.iconName} size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 32,
    right: 32,
  },
  containerStyle: {
    backgroundColor: '#000',
    borderColor: '#ff0000',
    borderWidth: 1,
    paddingVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 64,
    width: 64,
    borderRadius: 32,
  },
  fabWrapper: {
    // borderLeftWidth: 2,
    // borderColor: '#37B733',
    // borderRadius: 29,
    // paddingLeft: 2,
  },
  textStyle: {
    fontFamily: 'SFUIText-Regular',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default FAB;
