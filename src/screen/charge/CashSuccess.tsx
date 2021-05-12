import React from 'react';
import {
  StatusBar,
  SafeAreaView,
  Platform,
  View,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {TouchableOpacity} from 'react-native-gesture-handler';

const cashIcon = require('../../../assets/images/cash.png');

interface Props {
  navigation: any;
}
const CashSuccess: React.FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar
        backgroundColor="#fff"
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
      />
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <View style={[styles.my10, {marginRight: 20}]}>
              <Ionicons name="close-outline" size={48} />
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <Ionicons name="checkmark-circle-outline" size={50} color="#37B733" />
          <View
            style={[styles.my10, styles.flexRow, {justifyContent: 'center'}]}>
            <Image
              source={cashIcon}
              style={{width: 20, height: 20}}
              resizeMethod="auto"
              resizeMode="contain"
            />
            <Text
              style={[
                styles.ml10,
                {fontFamily: 'SFUIText-Regular', fontSize: 16},
              ]}>
              Cash Collected
            </Text>
          </View>
          <View style={[styles.mb10, styles.flexRow]}>
            <Text style={[styles.mr10, styles.SFUITextRegular]}>Payment</Text>
            <Text
              style={[styles.mr10, styles.SFUITextRegular, styles.colorBlue]}>
              2,500
            </Text>
            <Text style={[styles.SFUITextRegular]}>received and recorded</Text>
          </View>
          <View
            style={[
              styles.flexRow,
              {justifyContent: 'center', alignItems: 'center'},
            ]}>
            <Text
              style={[
                styles.SFUITextRegular,
                styles.colorBlue,
                styles.textUnderline,
              ]}>
              View in Transactions
            </Text>
            <Ionicons name="log-out-outline" color="#007AFF" size={32} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  closeWindow: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  colorBlue: {
    color: '#007AFF',
  },
  textUnderline: {
    textDecorationLine: 'underline',
  },
  SFUITextRegular: {
    fontFamily: 'SFUIText-Regular',
    fontSize: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mb10: {
    marginBottom: 10,
  },
  mt10: {
    marginTop: 10,
  },
  my10: {
    marginVertical: 10,
  },
  mx10: {
    marginHorizontal: 10,
  },
  ml10: {
    marginLeft: 10,
  },
  mr10: {
    marginRight: 10,
  },
  flexRow: {
    flexDirection: 'row',
  },
});

export default CashSuccess;
