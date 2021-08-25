import {Text} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
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
import Button from '../../components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../util/Colors';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import helpers from '../../helpers';

interface Props {
  navigation: any;
  cart: any;
  getCart: Function;
}

const Record: React.FC<Props> = function ({navigation, cart, getCart}) {
  const getAuthState = async () => {
    try {
      // await helpers.removeItem('xxx-token');

      console.log('herre');
      const token = await helpers.getItem('xxx-token');
      console.log('record 1');
      if (!token) {
        console.log('record 2');
        return navigation.navigate('onBoarding');
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
      getAuthState();
      console.log('called here');
    });
    return unsubscribe;
  }, [navigation]);
  useEffect(() => {
    console.log('calledagain');
    getCartItems();
  }, [cart.length]);
  const [numberOfItemsInCart, setNumberOfItemsInCart] = useState(cart.length);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar
        backgroundColor="#fff"
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
      />
      <KeyboardAvoidingView style={{flex: 1}} behavior={'height'}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={{backgroundColor: '#fff'}}>
          <View>
            <Text style={styles.titleHeader}>Record Transaction</Text>
          </View>
          <View
            style={{
              flex: 2,
              justifyContent: 'center',
              alignItems: 'flex-end',
              paddingHorizontal: 16,
            }}>
            <Text
              style={{
                fontFamily: 'SFUIText-Regular',
                fontSize: 28,
                fontWeight: 'normal',
                letterSpacing: 2,
              }}>
              {amount.join('').replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            </Text>
          </View>
          <View
            style={[
              styles.noteContainer,
              {flexDirection: 'row', justifyContent: 'center'},
            ]}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <Text style={{textAlign: 'right', paddingRight: 8}}>Note</Text>
              <Ionicons name="pencil-outline" size={24} />
            </View>
            <View style={{flex: 3, marginLeft: 8}}>
              <TextInput style={{flex: 1, textAlign: 'center'}} />
            </View>
            {/* <View style={{flex: 3}}></View> */}
          </View>
          <View style={{flex: 3}}>
            <View style={{flexDirection: 'row', flex: 1}}>
              <TouchableOpacity
                style={styles.keyPadStyle}
                onPress={() => setAmount(amount => [...amount, '1'])}>
                <View>
                  <Text style={styles.keyPadText}>1</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.keyPadStyle}
                onPress={() => setAmount(amount => [...amount, '2'])}>
                <View>
                  <Text style={styles.keyPadText}>2</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.keyPadStyle}
                onPress={() => setAmount(amount => [...amount, '3'])}>
                <View>
                  <Text style={styles.keyPadText}>3</Text>
                </View>
              </TouchableOpacity>
            </View>

            <View style={{flexDirection: 'row', flex: 1}}>
              <TouchableOpacity
                style={styles.keyPadStyle}
                onPress={() => setAmount(amount => [...amount, '4'])}>
                <View>
                  <Text style={styles.keyPadText}>4</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.keyPadStyle}
                onPress={() => setAmount(amount => [...amount, '5'])}>
                <View>
                  <Text style={styles.keyPadText}>5</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.keyPadStyle}
                onPress={() => setAmount(amount => [...amount, '6'])}>
                <View>
                  <Text style={styles.keyPadText}>6</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', flex: 1}}>
              <TouchableOpacity
                style={styles.keyPadStyle}
                onPress={() => setAmount(amount => [...amount, '7'])}>
                <View>
                  <Text style={styles.keyPadText}>7</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.keyPadStyle}
                onPress={() => setAmount(amount => [...amount, '8'])}>
                <View>
                  <Text style={styles.keyPadText}>8</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.keyPadStyle}
                onPress={() => setAmount(amount => [...amount, '9'])}>
                <View>
                  <Text style={styles.keyPadText}>9</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', flex: 1}}>
              <TouchableOpacity
                style={styles.keyPadStyle}
                onPress={() => setAmount(amount => [...amount, '00'])}>
                <View>
                  <Text style={styles.keyPadText}>00</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.keyPadStyle}
                onPress={() => setAmount(amount => [...amount, '0'])}>
                <View>
                  <Text style={styles.keyPadText}>0</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.keyPadStyle]}
                onPress={handleDelete}>
                <View>
                  <Text
                    style={[
                      styles.keyPadText,
                      {color: Colors.RED, fontWeight: 'bold'},
                    ]}>
                    {' '}
                    {'<'}{' '}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <View style={styles.buttonWrapper}>
            <Button
              text="Charge"
              onPress={() =>
                navigation.navigate('chargeScreen', {screen: 'charge'})
              }
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('cart');
          }}
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 16,
            paddingBottom: 16,
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Ionicons name="cart-outline" size={32} color={Colors.BLACK} />
            <Text
              style={{
                fontFamily: 'SFUIText-Regular',
                fontSize: 16,
                fontWeight: 'bold',
                marginLeft: 4,
              }}>
              CART({numberOfItemsInCart})
            </Text>
          </View>
          <Ionicons
            name="chevron-forward-outline"
            size={32}
            color={Colors.BLACK}
          />
        </TouchableOpacity>
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
