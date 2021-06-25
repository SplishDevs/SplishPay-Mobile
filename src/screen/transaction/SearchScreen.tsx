import {NavigationContainer} from '@react-navigation/native';
import {Tab, TabHeading, Tabs, Text} from 'native-base';
import React from 'react';
import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StatusBarIOS,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {TextSpecificProps} from 'react-native-svg';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Indicator from '../../components/Indicator';
import TextField from '../../components/TextField';
import TitleText from '../../components/TitleText';
import {Colors} from '../../util/Colors';

interface IProps {
  navigation: any;
}

const TransactionSearchScreen: React.FC<IProps> = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.WHITE}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.WHITE} />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={{
          backgroundColor: Colors.WHITE,
          paddingHorizontal: 16,
          paddingVertical: 16,
        }}>
        {/* <TitleText
          text="Transactions"
          styles={{textAlign: 'center', fontWeight: 'normal', fontSize: 18}}
        /> */}
        <View style={{flexDirection: 'row', alignContent: 'center'}}>
          <View style={{flex: 1}}>
            <TextField
              autoFocus
              iconName="search-outline"
              placeholder="search transactions"
            />
          </View>
          <View
            style={{marginLeft: 8, marginTop: -8, justifyContent: 'center'}}>
            <Pressable onPress={() => navigation.goBack()}>
              <TitleText
                text="Cancel"
                styles={{fontSize: 18, color: '#878787'}}
              />
            </Pressable>
          </View>
        </View>
        {/* <View></View> */}
        <View
          style={{
            flexWrap: 'wrap',
            flexDirection: 'row',
          }}>
          <Buttons
            text="Cash"
            backgroundColor="#EBF8EA"
            textColor={Colors.LEMON_GREEN}
          />
          <Buttons
            backgroundColor="#EBE6F2"
            textColor={Colors.PURPLE}
            text="Bank Tranfer"
          />
          <Buttons
            backgroundColor="#E6F2FF"
            textColor="#007AFF"
            text="Hardware"
          />
          <Buttons
            backgroundColor="#E7E7E7"
            textColor="#0F0F0F"
            text="Custom Date"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

interface IButtonProps {
  text: string;
  textColor?: string;
  backgroundColor?: string;
  viewStyle?: ViewStyle;
  textStyle?: TextStyle;
}
const Buttons: React.FC<IButtonProps> = ({
  text,
  textColor,
  backgroundColor,
  viewStyle,
  textStyle,
}) => {
  return (
    <View
      style={{
        paddingHorizontal: 10,
        borderColor: `${backgroundColor ? backgroundColor : Colors.GRAY_1}`,
        borderWidth: 1,
        paddingVertical: 10,
        borderRadius: 10,

        marginRight: 8,
        marginBottom: 8,
        backgroundColor: `${backgroundColor ? backgroundColor : Colors.GRAY_1}`,
        ...viewStyle,
      }}>
      <Text
        style={{
          fontFamily: 'SFUIText-Regular',
          color: `${textColor ? textColor : Colors.GRAY_1}`,
          ...textStyle,
        }}>
        {text}
      </Text>
    </View>
  );
};

export interface ITransaction {
  status: 'Pending' | 'Completed';
  amount: string;
  date: Date;
  channel: 'Bank Transfer' | 'Cash' | 'Hardware';
}
const getDateMessage = (date: Date) => {
  const dateDifference =
    (new Date().getTime() - new Date(date).getTime()) / (1000 * 24 * 3600);
  if (Math.round(dateDifference) == 0)
    return (
      <Text
        style={{
          fontFamily: 'SFUIText-Regular',
          color: Colors.GRAY_1,
          fontSize: 13,
        }}>
        Today at{' '}
        <Text
          style={{
            fontFamily: 'SFUIText-Regular',
            color: Colors.GRAY_1,
            fontSize: 13,
          }}>
          {getTime(date)}
        </Text>
      </Text>
    );
  else if (Math.round(dateDifference) === 1)
    return (
      <Text
        style={{
          fontFamily: 'SFUIText-Regular',
          color: Colors.GRAY_1,
          fontSize: 13,
        }}>
        Yesterday at{' '}
        <Text
          style={{
            fontFamily: 'SFUIText-Regular',
            color: Colors.GRAY_1,
            fontSize: 13,
          }}>
          {getTime(date)}
        </Text>
      </Text>
    );
  return (
    <Text
      style={{
        fontFamily: 'SFUIText-Regular',
        color: Colors.GRAY_1,
        fontSize: 13,
      }}>
      {new Date(date).toDateString()} at {`${getTime(date)}`}
    </Text>
  );
};

const getTime = (date: Date): string => {
  const hours = new Date(date).getHours() % 12;
  const minutes = new Date(date).getMinutes();
  const timeofDay = new Date(date).getHours() > 12 ? 'PM' : 'AM';

  return `${hours}:${minutes} ${timeofDay}`;
};

interface ITransactionProps {
  data: ITransaction;
  onItemPress?: (data: ITransaction) => void;
}

const TxRow: React.FC<ITransactionProps> = ({data, onItemPress}) => {
  return (
    <TouchableOpacity
      style={{width: '100%'}}
      onPress={() => (onItemPress ? onItemPress(data) : null)}>
      <View style={styles.contaner}>
        <View
          style={{flexDirection: 'row', marginBottom: 10, paddingVertical: 8}}>
          <View
            style={
              data.status === 'Completed'
                ? {
                    ...styles.bgCredit,
                    backgroundColor: '#EBF8EA',
                    width: 40,
                    height: 40,
                  }
                : {
                    ...styles.bgDebit,
                    backgroundColor: '#FCF7E6',
                    width: 40,
                    height: 40,
                  }
            }>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <FontAwesome
                size={24}
                color={data.status === 'Completed' ? Colors.GREEN : '#ee514b'}
                name="exchange-alt"
              />
            </View>
          </View>
          <View style={{flex: 1, marginLeft: 8}}>
            <View>
              <Text
                style={{fontFamily: 'SFUIText-Regular', color: Colors.GRAY_1}}>
                You{' '}
                {data.status === 'Completed' ? 'received ' : ' are to receive '}
                <Text
                  style={{
                    fontFamily: 'SFUIText-Regular',
                    color: Colors.BLACK,
                    fontSize: 14,
                  }}>
                  {data.amount}
                </Text>
              </Text>
              <View style={{flexDirection: 'row', marginTop: 4}}>
                <Text
                  style={{
                    fontFamily: 'SFUIText-Regular',
                    color: Colors.GRAY_1,
                    fontSize: 12,
                  }}>
                  {getDateMessage(data.date)}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <View
                    style={
                      data.channel === 'Bank Transfer'
                        ? [
                            styles.dotCredit,
                            {
                              backgroundColor: Colors.PURPLE,
                            },
                          ]
                        : data.channel === 'Cash'
                        ? [
                            styles.dotCredit,
                            {
                              backgroundColor: Colors.GREEN,
                            },
                          ]
                        : data.channel === 'Hardware'
                        ? [
                            styles.dotCredit,
                            {
                              backgroundColor: Colors.BLUE,
                            },
                          ]
                        : [styles.dotCredit]
                    }></View>
                  <Text
                    style={
                      data.channel === 'Bank Transfer'
                        ? [
                            styles.descCredit,
                            {
                              color: Colors.PURPLE,
                            },
                          ]
                        : data.channel === 'Cash'
                        ? [
                            styles.descCredit,
                            {
                              color: Colors.GREEN,
                            },
                          ]
                        : data.channel === 'Hardware'
                        ? [
                            styles.descCredit,
                            {
                              color: Colors.BLUE,
                            },
                          ]
                        : [styles.descCredit]
                    }>
                    {data.channel}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contaner: {
    width: '100%',
  },
  bgCredit: {
    width: 32,
    height: 32,
    backgroundColor: '#EBF8EA',
    borderRadius: 8,
    borderColor: '#EBF8EA',
    borderWidth: 1,
  },
  bgDebit: {
    width: 32,
    height: 32,
    backgroundColor: '#FFECEB',
    borderRadius: 8,
    borderColor: '#FFECEB',
    borderWidth: 1,
  },
  descCredit: {
    color: '#57bb32',
    fontFamily: 'SFUIText-Regular',
    fontSize: 12,
  },
  descDebit: {
    color: '#ee514b',
    fontFamily: 'SFUIText-Regular',
    fontSize: 12,
  },
  dotCredit: {
    backgroundColor: '#57bb32',
    height: 8,
    width: 8,
    borderRadius: 4,
    marginLeft: 8,
    marginRight: 4,
  },
  dotDebit: {
    backgroundColor: '#ee514b',
    height: 8,
    width: 8,
    borderRadius: 4,
    marginLeft: 8,
    marginRight: 4,
  },
});

export default TransactionSearchScreen;
