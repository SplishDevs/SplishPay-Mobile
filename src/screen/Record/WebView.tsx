import {Text} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../util/Colors';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import helpers from '../../helpers';
import {StackActions} from '@react-navigation/routers';
import {Avatar, Button, Card, Title, Paragraph} from 'react-native-paper';
const LeftContent = (props: any) => <Avatar.Icon {...props} icon="folder" />;
import Axios from 'axios';
import items from '../items';
import {WebView} from 'react-native-webview';
import FAB from '../../components/FAB';
interface Props {
  navigation: any;
  cart: any;
  getCart: Function;
  startLoading: Function;
  stopLoading: Function;
  route: any;
}

const WebViewPage: React.FC<Props> = function ({
  navigation,
  cart,
  getCart,
  startLoading,
  stopLoading,
  route,
}) {
  console.log('route: params: ', route.params);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar
        backgroundColor="#fff"
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
      />
      <KeyboardAvoidingView style={{flex: 1}} behavior={'height'}>
        <View
          style={{
            backgroundColor: '#fff',
            paddingVertical: 20,
            flex: 1,
          }}>
          <WebView source={{uri: route.params.url}} />
        </View>
        <FAB
          iconName="chevron-back-outline"
          backgroundColor={Colors.RED}
          onPress={() => navigation.goBack()}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyPadStyle: {
    flex: 1,
    alignItems: 'center',
  },
  keyPadText: {
    justifyContent: 'center',
    fontFamily: 'SFUIText-Regular',
    fontSize: 24,
    fontWeight: '400',
  },
  buttonWrapper: {
    maxWidth: 300,
    width: '100%',
    height: 40,
  },
  titleHeader: {
    textAlign: 'center',
    fontFamily: 'SFUIText-Regular',
    marginVertical: 20,
    fontSize: 24,
  },
  noteContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: '#F2F2F2',
    borderTopColor: '#F2F2F2',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
});

const mapStateToProps = (state: any) => {
  const {
    product: {cart},
  } = state;
  console.log('cart length: ', cart);
  return {cart};
};

export default connect(mapStateToProps, actions)(WebViewPage);
