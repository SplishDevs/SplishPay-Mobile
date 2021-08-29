import {Row} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  StatusBar,
  TouchableWithoutFeedback,
  Platform,
  Image,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollViewBase,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';
import TitleText from '../../components/TitleText';
import {Colors} from '../../util/Colors';
import {StatusIOSBar} from '../profile';
import {Image as FastImage} from 'react-native-elements/dist/image/Image';
import helpers from '../../helpers';
import {SwipeListView} from 'react-native-swipe-list-view';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import http_service from '../../http_service';

const bankIcon = require('../../../assets/images/bank.png');
const hardwareIcon = require('../../../assets/images/hardware.png');
const cashIcon = require('../../../assets/images/cash.png');

const connectBg = require('../../../assets/images/connect.png');

export enum PaymentMethod {
  BANK_TRANSFER = 'BANK_TRANSFER',
  CASH = 'CASH',
  HARDWARE = 'HARDWARE',
}

interface PaymentRowProps {
  onDropdownItemPressed: (paymentMethod: PaymentMethod) => void;
  onMenuItemPressed: () => void;
  showDropDownMenu: boolean;
  selectedPaymentMethod: PaymentMethod;
}

interface getPaymentMethodProps {
  paymentMethod: PaymentMethod;
}

const getPaymentMethod = (
  paymentMethod: PaymentMethod,
  onMenuItemPressed: () => void,
) => {
  switch (paymentMethod) {
    case PaymentMethod.BANK_TRANSFER:
      return (
        <TouchableOpacity style={styles.paymentRow} onPress={onMenuItemPressed}>
          <Image
            source={bankIcon}
            style={{width: 16, height: 16}}
            resizeMethod="auto"
            resizeMode="contain"
          />
          <View style={{flex: 1}}>
            <Text style={{paddingLeft: 16}}>Bank Transfer</Text>
          </View>
          <Ionicons name="chevron-down-outline" size={24} />
        </TouchableOpacity>
      );
    case PaymentMethod.CASH:
      return (
        <TouchableOpacity style={styles.paymentRow} onPress={onMenuItemPressed}>
          <Image
            source={cashIcon}
            style={{width: 16, height: 16}}
            resizeMethod="auto"
            resizeMode="contain"
          />
          <View style={{flex: 1}}>
            <Text style={{paddingLeft: 16}}>Cash</Text>
          </View>
          <Ionicons name="chevron-down-outline" size={24} />
        </TouchableOpacity>
      );
    case PaymentMethod.HARDWARE:
      return (
        <TouchableOpacity style={styles.paymentRow} onPress={onMenuItemPressed}>
          <Image
            source={hardwareIcon}
            style={{width: 16, height: 16}}
            resizeMethod="auto"
            resizeMode="contain"
          />
          <View style={{flex: 1}}>
            <Text style={{paddingLeft: 16}}>Connect Hardware</Text>
          </View>
          <Ionicons name="chevron-down-outline" size={24} />
        </TouchableOpacity>
      );
    default:
      return <View></View>;
  }
};

const PaymentRow: React.FC<PaymentRowProps> = ({
  showDropDownMenu,
  selectedPaymentMethod,
  onMenuItemPressed,
  onDropdownItemPressed,
}) => {
  return (
    <View>
      {getPaymentMethod(selectedPaymentMethod, onMenuItemPressed)}

      {showDropDownMenu && (
        <DropDown
          selectedPayemntMethod={selectedPaymentMethod}
          onDropdownItemPressed={onDropdownItemPressed}
        />
      )}
    </View>
  );
};

interface DropDownProps {
  selectedPayemntMethod: PaymentMethod;
  onDropdownItemPressed: (text: PaymentMethod) => void;
}

const ListItem: React.FC = () => {
  return (
    <View>
      <View style={{flexDirection: 'row'}}>
        <View style={{marginRight: 10}}>
          <FastImage
            source={bankIcon}
            resizeMethod="resize"
            resizeMode="cover"
            style={{
              width: 64,
              height: 64,
              borderRadius: 4,
              borderWidth: 1,
              borderColor: '#E7E7E7',
            }}
          />
        </View>
        <View style={{flex: 1}}>
          <View>
            <TitleText
              styles={{
                color: Colors.BLACK,
                fontWeight: 'normal',
                fontSize: 16,
              }}
              text={`Asos Design Sweatshirt (Size XL, Color Multicolored ...)`}
            />
            <TitleText
              styles={{fontSize: 18, paddingVertical: 8}}
              text={`N ${helpers.formatAsMoney('200000')}`}
            />
          </View>
        </View>
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: Colors.GRAY_3,
              width: 24,
              height: 24,
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: Colors.BLACK, textAlign: 'center'}}>-</Text>
          </View>
          <View style={{paddingVertical: 4}}>
            <Text>1</Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: Colors.GRAY_3,
              width: 24,
              height: 24,
              borderRadius: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: Colors.BLACK}}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const DropDown: React.FC<DropDownProps> = ({
  onDropdownItemPressed,
  selectedPayemntMethod,
}) => {
  return (
    <View style={styles.dropDownContainer}>
      <TouchableWithoutFeedback
        onPress={e => onDropdownItemPressed(PaymentMethod.HARDWARE)}>
        <View style={styles.dropDownWrapper}>
          <Image
            source={hardwareIcon}
            style={{width: 16, height: 16}}
            resizeMethod="auto"
            resizeMode="contain"
          />
          <View style={{flex: 1}}>
            <Text style={{paddingLeft: 16}}>Connect Hardware</Text>
          </View>
          {selectedPayemntMethod === PaymentMethod.HARDWARE && (
            <Ionicons name="checkmark-outline" size={24} color="#51a3f7" />
          )}
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={e => onDropdownItemPressed(PaymentMethod.CASH)}>
        <View style={styles.dropDownWrapper}>
          <Image
            source={cashIcon}
            style={{width: 16, height: 16}}
            resizeMethod="auto"
            resizeMode="contain"
          />
          <View style={{flex: 1}}>
            <Text style={{paddingLeft: 16}}>Cash</Text>
          </View>
          {selectedPayemntMethod === PaymentMethod.CASH && (
            <Ionicons name="checkmark-outline" size={24} color="#51a3f7" />
          )}
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        onPress={e => onDropdownItemPressed(PaymentMethod.BANK_TRANSFER)}>
        <View style={styles.dropDownWrapper}>
          <Image
            source={bankIcon}
            style={{width: 16, height: 16}}
            resizeMethod="auto"
            resizeMode="contain"
          />
          <View style={{flex: 1}}>
            <Text style={{paddingLeft: 16}}>Bank Transfer</Text>
          </View>
          {selectedPayemntMethod === PaymentMethod.BANK_TRANSFER && (
            <Ionicons name="checkmark-outline" size={24} color="#51a3f7" />
          )}
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

interface Props {
  navigation: any;
  getCart: Function;
  cart: any[];
  decreaseCartItemQuantity: Function;
  increaseCartItemQuantity: Function;
  removeCartItem: Function;
  startLoading: Function;
  stopLoading: Function;
  clearLocalCart: Function;
}

const Cart: React.FC<Props> = ({
  navigation,
  getCart,
  cart,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  removeCartItem,
  startLoading,
  stopLoading,
  clearLocalCart,
}) => {
  const [selectedPaymentMethod, onPaymentChange] = useState<PaymentMethod>(
    PaymentMethod.BANK_TRANSFER,
  );
  const listViewData = Array(20)
    .fill('')
    .map((_, i) => ({key: `${i}`, text: `item #${i}`}));

  const [showMenutItems, onShowMenuItems] = useState(false);
  const handleChargeOnPress = async () => {
    try {
      if (cart.length === 0) return;
      if (selectedPaymentMethod === PaymentMethod.CASH) {
        // submit online
        startLoading();

        await http_service.recordTransactionFromCart(
          cart,
          selectedPaymentMethod,
          `${getCartSum()}`,
        );

        clearLocalCart();

        //stop loading
        stopLoading();

        navigation.navigate('cashSuccess', {totalAmount: getCartSum()});
      }
    } catch (error) {
      helpers.catchHttpError(error);
    }
  };
  const renderHiddenItem = (data: any) => {
    console.log('hidden item: ', data);
    return (
      <View style={styles.rowBack}>
        <Text></Text>
        {/* <View style={[styles.backRightBtn, styles.backRightBtnLeft]}>
        <Text style={styles.backTextWhite}>Left</Text>
      </View> */}
        <TouchableOpacity
          onPress={() => deleteCartItem(data.item)}
          style={[
            styles.backRightBtn,
            styles.backRightBtnRight,
            {backgroundColor: '#FF3E38'},
          ]}>
          <Ionicons name="trash-outline" size={32} color={Colors.WHITE} />
        </TouchableOpacity>
      </View>
    );
  };
  const deleteRow = (rowMap: any, rowKey: any) => {
    closeRow(rowMap, rowKey);
    const newData = [...listViewData];
    const prevIndex = listViewData.findIndex(item => item.key === rowKey);
    newData.splice(prevIndex, 1);
  };

  const closeRow = (rowMap: any, rowKey: any) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };

  const openRowRef = useRef(null);

  const onRowDidOpen = (rowKey: any, rowMap: any) => {
    openRowRef.current = rowMap[rowKey];
  };

  const deleteCartItem = (data: any) => {
    removeCartItem(data);
  };
  const incrementQuantity = (item: any) => {
    increaseCartItemQuantity(item);
  };

  const decrementQuantity = (item: any) => {
    decreaseCartItemQuantity(item);
  };

  const renderItem = ({item}: any) => {
    return (
      <TouchableHighlight style={styles.rowFront} underlayColor={'#AAA'}>
        {/* <View>
        <Text>I am {data.item.text} in a SwipeListView</Text>
      </View> */}
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          <View style={{marginRight: 10}}>
            <FastImage
              source={{
                uri: item.mainImageUrl,
              }}
              resizeMethod="resize"
              resizeMode="cover"
              style={{
                width: 64,
                height: 64,
                borderRadius: 4,
                borderWidth: 1,
                borderColor: '#E7E7E7',
              }}
            />
          </View>
          <View style={{flex: 1}}>
            <View style={{justifyContent: 'space-between', flex: 1}}>
              <TitleText
                styles={{
                  color: Colors.BLACK,
                  fontSize: 18,
                }}
                text={`${item.name} ${
                  item.extraInfo.length > 0
                    ? `(${item.extraInfo.join(',')})`
                    : ''
                }`}
              />
              <TitleText
                styles={{
                  fontSize: 16,
                  paddingVertical: 8,
                  fontWeight: 'normal',
                }}
                text={`N ${helpers.formatAsMoney(item.price)}`}
              />
            </View>
          </View>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              onPress={() => decrementQuantity(item)}
              style={{
                backgroundColor: Colors.GRAY_3,
                width: 24,
                height: 24,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: Colors.BLACK, textAlign: 'center'}}>-</Text>
            </TouchableOpacity>
            <View style={{paddingVertical: 4}}>
              <Text>{item.quantity}</Text>
            </View>
            <TouchableOpacity
              onPress={() => incrementQuantity(item)}
              style={{
                backgroundColor: Colors.GRAY_3,
                width: 24,
                height: 24,
                borderRadius: 12,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{color: Colors.BLACK}}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableHighlight>
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      getCart;
    });
    // clearLocalCart();

    getCart();

    return unsubscribe;
  }, []);

  const getCartSum = () => {
    const total = cart.reduce(
      (preValue, item) =>
        (preValue += parseInt(item.quantity) * parseInt(item.price)),
      0,
    );
    return total;
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      {/* <StatusBar backgroundColor={Colors.BLACK} barStyle="light-content" /> */}
      <StatusIOSBar barStyle="light-content" backgroundColor={Colors.BLACK} />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="chevron-back-outline"
            size={32}
            color={Colors.WHITE}
          />
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <View style={{flexDirection: 'row', justifyContent: 'center'}}>
            <View style={{marginRight: 4}}>
              <Ionicons color={Colors.WHITE} name="cart-outline" size={32} />
            </View>
            <TitleText
              text={`Cart(${cart.length})`}
              styles={{color: Colors.WHITE}}
            />
          </View>
        </View>
      </View>

      {/* <ScrollView style={[styles.container, {flex: 1}]}> */}
      <View style={{flex: 1, marginHorizontal: 16}}>
        <SwipeListView
          data={cart?.map((item: any) => ({...item, key: item.id}))}
          renderItem={renderItem}
          renderHiddenItem={renderHiddenItem}
          leftOpenValue={0}
          rightOpenValue={-85}
          previewRowKey={'0'}
          previewOpenValue={-40}
          previewOpenDelay={3000}
          style={{backgroundColor: Colors.WHITE}}
          onRowDidOpen={onRowDidOpen}
        />
      </View>
      {/* </ScrollView> */}
      <View
        style={{
          justifyContent: 'center',
          marginBottom: 20,
          marginTop: 20,
        }}>
        {getConnectStatus(selectedPaymentMethod)}
      </View>
      <View
        style={{flexDirection: 'row', marginBottom: 16, marginHorizontal: 16}}>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.BLACK,
            borderColor: Colors.BLACK,
            width: 60,
            height: 60,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {}}>
          <Ionicons name="cart-outline" size={40} color={Colors.WHITE} />
        </TouchableOpacity>
        <View style={{flex: 1, marginLeft: 8, justifyContent: 'space-between'}}>
          <TitleText text="Total" styles={{color: '#575757', fontSize: 16}} />
          <TitleText
            text={`N ${helpers.formatAsMoney(`${getCartSum()}`)}`}
            styles={{color: Colors.BLACK, fontSize: 16}}
          />
        </View>
      </View>

      <View style={styles.lowerBanner}>
        <View style={styles.paymentMethodTextContainer}>
          <Text style={styles.paymentMethodText}>Payment Method</Text>
        </View>
        <View>
          <View>
            <PaymentRow
              selectedPaymentMethod={selectedPaymentMethod}
              onMenuItemPressed={() => onShowMenuItems(state => !state)}
              showDropDownMenu={showMenutItems}
              onDropdownItemPressed={method => {
                onShowMenuItems(false);
                onPaymentChange(method);
              }}
            />
            <View style={{height: 55, marginVertical: 16}}>
              <Button
                backgroundColor={
                  selectedPaymentMethod === PaymentMethod.HARDWARE
                    ? '#808080'
                    : '#0F0F0F'
                }
                text={
                  selectedPaymentMethod === PaymentMethod.HARDWARE
                    ? 'Charge'
                    : 'Confirm'
                }
                onPress={handleChargeOnPress}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const getConnectStatus = (paymentMethod: PaymentMethod) => {
  switch (paymentMethod) {
    case PaymentMethod.BANK_TRANSFER:
      return (
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: '#f8f2f3',
              width: 180,
              height: 40,
              borderRadius: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#3b2280', fontFamily: 'SFUIText-Regular'}}>
              Bank Tranfer
            </Text>
          </View>
        </View>
      );
    case PaymentMethod.CASH:
      return (
        <View style={{alignItems: 'center'}}>
          <View
            style={{
              backgroundColor: '#f2fdf2',
              width: 180,
              height: 40,
              borderRadius: 40,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#65a062', fontFamily: 'SFUIText-Regular'}}>
              Cash
            </Text>
          </View>
        </View>
      );
    case PaymentMethod.HARDWARE:
      return (
        <View style={{alignItems: 'center'}}>
          <ImageBackground
            source={connectBg}
            resizeMethod="auto"
            resizeMode="contain"
            style={{width: 180, height: 40}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
              }}>
              <Text>Connect Hardware</Text>
            </View>
          </ImageBackground>
        </View>
      );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: Colors.BLACK,
    paddingVertical: 10,
    paddingHorizontal: 16,
    height: 100,
  },
  headerTitle: {
    flex: 1,
  },
  headerText: {
    textAlign: 'center',
    fontFamily: 'SFUIText-Regular',

    fontSize: 24,
  },
  lowerBanner: {
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#f2f2f2',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  paymentMethodTextContainer: {
    marginBottom: 20,
  },
  paymentMethodText: {
    color: '#808080',
    fontFamily: 'SFUIText-Regular',
    fontSize: 18,
  },
  paymentRow: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  dropDownContainer: {
    position: 'absolute',
    top: -115,
    left: 0,
    width: '100%',
  },
  dropDownWrapper: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  rowFront: {
    alignItems: 'center',
    backgroundColor: '#fff',
    // borderBottomColor: 'black',
    // borderBottomWidth: 1,
    justifyContent: 'center',
    height: 90,
  },
  rowBack: {
    alignItems: 'center',
    // backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnLeft: {
    backgroundColor: 'blue',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
  backTextWhite: {
    color: '#FFF',
  },
});

const mapStateToProps = (state: any) => {
  const {
    product: {cart},
  } = state;
  console.log('cart length: ', cart);
  return {cart};
};

export default connect(mapStateToProps, actions)(Cart);
