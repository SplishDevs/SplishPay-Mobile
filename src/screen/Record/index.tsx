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
interface Props {
  navigation: any;
  cart: any;
  getCart: Function;
  startLoading: Function;
  stopLoading: Function;
}

const Record: React.FC<Props> = function ({
  navigation,
  cart,
  getCart,
  startLoading,
  stopLoading,
}) {
  const getAuthState = async () => {
    try {
      // await helpers.removeItem('xxx-token');

      console.log('herre');
      const token = await helpers.getItem('xxx-token');
      console.log('record 1: ', token);
      if (!token) {
        console.log('record 2');
        // navigation.navigate('home');
        const resetAction = StackActions.push('home');
        navigation.dispatch(resetAction);
        return;
      }
      console.log('record 3');
    } catch (error) {
      console.log(error);
      return;
    }
  };
  const [amount, setAmount] = useState<string[]>([]);
  const handleDelete = () => {
    setAmount(amount => {
      amount.splice(amount.length - 1, 1);
      return [...amount];
    });
  };
  const getCartItems = async () => {
    try {
      await getCart();
      setNumberOfItemsInCart(cart.length);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', (e: any) => {
      // Prevent default action
      // e.preventDefault();
      console.log('lets get authstate');
      getAuthState();
      console.log('called here');
    });
    getAuthState();
    return unsubscribe;
  }, [navigation]);

  const [pageNumber, setPageNumber] = useState(0);
  const [pageSize] = useState(20);
  const [topStories, setTopStories] = useState<any[]>([]);
  const [isRefreshing, setIsFreshing] = useState(false);

  const loadNewsFeed = async () => {
    try {
      startLoading();
      const response = await Axios.get(
        'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
      );

      const news = [];

      [].slice;

      const newsToLoad = response.data.slice(
        pageNumber * pageSize,
        response.data.length > pageNumber * pageSize + pageSize
          ? pageNumber * pageSize + pageSize
          : response.data.length,
      );

      for (let i = 0; i < newsToLoad.length; i++) {
        const response2 = await Axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${newsToLoad[i]}.json?print=pretty`,
        );
        news.push(response2.data);
      }
      setTopStories(news);
      stopLoading();
      console.log(news.slice(0, 10));
    } catch (error) {
      console.log('errr: ', error);
    }
  };
  useEffect(() => {
    loadNewsFeed();
  }, [pageNumber]);
  const refreshNewsApp = async () => {
    try {
      startLoading();
      const response = await Axios.get(
        'https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty',
      );

      const news = [];

      [].slice;

      const newsToLoad = response.data.slice(
        0,
        response.data.length > pageSize ? pageSize : response.data.length,
      );

      for (let i = 0; i < newsToLoad.length; i++) {
        const response2 = await Axios.get(
          `https://hacker-news.firebaseio.com/v0/item/${newsToLoad[i]}.json?print=pretty`,
        );
        news.push(response2.data);
      }
      setTopStories(news);
      stopLoading();
      setPageNumber(0);
      setIsFreshing(false);
      console.log(news.slice(0, 10));
    } catch (error) {
      console.log('errr: ', error);
    }
  };
  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('WebView', item)}
        style={{marginBottom: 10}}>
        <Card>
          <Card.Content>
            <Paragraph>{item.by}</Paragraph>
            <Title>{item.title}</Title>
          </Card.Content>

          <Card.Actions>
            <Button icon="hexagram-outline">{item.score}</Button>
          </Card.Actions>
        </Card>
      </TouchableOpacity>
    );
  };
  const [numberOfItemsInCart, setNumberOfItemsInCart] = useState(cart.length);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar
        backgroundColor="#fff"
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
      />
      <KeyboardAvoidingView style={{flex: 1}} behavior={'height'}>
        <View
          style={{backgroundColor: '#f3f3f3', paddingVertical: 20, flex: 1}}>
          <FlatList
            data={topStories}
            renderItem={renderItem}
            keyExtractor={(item: any) => `${item.id}`}
            style={{flex: 1}}
            onRefresh={() => refreshNewsApp()}
            refreshing={isRefreshing}
          />
          <View>
            <View
              style={{
                flexDirection: 'row',
                paddingHorizontal: 20,
                justifyContent: 'space-between',
              }}>
              <Button
                mode="contained"
                onPress={() =>
                  setPageNumber(currentIndex =>
                    currentIndex - 1 < 0 ? 0 : currentIndex - 1,
                  )
                }>
                Previous
              </Button>
              <Button
                mode="contained"
                onPress={() =>
                  setPageNumber(currentIndex =>
                    currentIndex + 1 > 10 ? 10 : currentIndex + 1,
                  )
                }
                color={Colors.RED}>
                Next
              </Button>
            </View>
          </View>
        </View>
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

export default connect(mapStateToProps, actions)(Record);
