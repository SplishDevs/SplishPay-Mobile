import React from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../util/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TitleText from '../../components/TitleText';

interface Props {
  navigation: any;
}

const FundWallet: React.FC<Props> = ({navigation}) => {
  const moneyFraction = '20';
  const moneyWholeNumber = '1,000';
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor={'#69e6a2'}
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
      />
      <View style={{flex: 1}}>
        <View style={styles.greenContainer}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="chevron-back-outline"
                size={40}
                color={Colors.WHITE}
              />
            </TouchableOpacity>
            <View
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <TitleText text="Fund Wallet" styles={{fontWeight: 'normal'}} />
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <TitleText
              text="Your Balance is"
              styles={{fontWeight: 'normal', fontSize: 16}}
            />
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 20,
            }}>
            <Text
              style={[
                styles.smallText,
                {
                  color: Colors.BLACK,
                  fontSize: 24,
                  fontWeight: 'bold',
                },
              ]}>
              {moneyWholeNumber}.
              {/* <View style={{position: 'absolute', right: -0, top: 10}}> */}
              <View
                style={{
                  position: 'absolute',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  right: -1000,
                  top: 0,
                  width: 60,
                  // height: 20,
                  // backgroundColor: Colors.GREEN,
                }}>
                <View
                  style={{
                    position: 'absolute',
                    right: 30,
                    top: -10,
                  }}>
                  <Text
                    style={[
                      styles.smallText,
                      {
                        color: Colors.BLACK,
                        fontSize: 24,
                        fontWeight: 'bold',
                      },
                    ]}>
                    {moneyFraction}
                  </Text>
                </View>
              </View>
              {/* </View> */}
            </Text>
          </View>
        </View>
        <View style={{paddingHorizontal: 16, paddingVertical: 16, flex: 1}}>
          <View style={{flex: 1}}>
            <TitleText
              text="Fund Wallet Via"
              styles={{color: Colors.GRAY_1, fontSize: 16}}
            />
            <View
              style={{
                backgroundColor: Colors.WHITE,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
                marginVertical: 8,
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TitleText
                  text="Bank Tranfer"
                  styles={{color: Colors.GRAY_1, fontSize: 14}}
                />
                <Ionicons name="copy-outline" size={24} color={Colors.GRAY_1} />
              </View>
              <View style={{marginVertical: 4}}>
                <TitleText
                  text="2000809090 / REMA Bank"
                  styles={{color: Colors.BLACK, fontSize: 14}}
                />
              </View>
            </View>
            <View
              style={{
                backgroundColor: Colors.WHITE,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
                marginVertical: 8,
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TitleText
                  text="Payment Link"
                  styles={{color: Colors.GRAY_1, fontSize: 14}}
                />
                <Ionicons name="copy-outline" size={24} color={Colors.GRAY_1} />
              </View>
              <View style={{marginVertical: 4}}>
                <TitleText
                  text="pay.splishpay.com/luxuryfitng"
                  styles={{color: Colors.BLACK, fontSize: 14}}
                />
              </View>
            </View>
            <View
              style={{
                backgroundColor: Colors.WHITE,
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 8,
                marginVertical: 8,
              }}>
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <TitleText
                  text="SplishPay to SplishPay"
                  styles={{color: Colors.GRAY_1, fontSize: 14}}
                />
                <Ionicons
                  name="share-social-outline"
                  size={24}
                  color={Colors.GRAY_1}
                />
              </View>
              <View style={{marginVertical: 4}}>
                <TitleText
                  text="@luxuryfitng"
                  styles={{color: Colors.BLACK, fontSize: 14}}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 16,
            }}>
            <TitleText
              text="Sending money through any form above puts money"
              styles={{
                fontWeight: 'normal',
                fontSize: 14,
                color: Colors.GRAY_1,
              }}
            />
            <TitleText
              text="directly into your SplishPay account"
              styles={{
                fontWeight: 'normal',
                fontSize: 14,
                color: Colors.GRAY_1,
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  greenContainer: {
    backgroundColor: '#69e6a2',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  smallText: {
    fontFamily: 'SFUIText-Regular',
    fontSize: 10,
    color: Colors.GRAY_2,
    marginLeft: 8,
  },
});

export default FundWallet;
