import {Tab, TabHeading, Tabs, Text} from 'native-base';
import React, {useEffect} from 'react';
import {
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StatusBarIOS,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Indicator from '../../components/Indicator';
import TextField from '../../components/TextField';
import TitleText from '../../components/TitleText';
import {Colors} from '../../util/Colors';
import * as actions from '../../actions';
import {connect} from 'react-redux';
import helpers from '../../helpers';

interface IProps {
  navigation: any;
  transactions: any[];
  getTransactions: Function;
}

const Transaction: React.FC<IProps> = ({
  navigation,
  transactions,
  getTransactions,
}) => {
  const handleInputFieldTap = () => {
    navigation.navigate('transactionSearchScreen');
  };
  useEffect(() => {
    console.log('called here ooooo');
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      getTransactions();
    });
    // clearLocalCart();

    getTransactions();

    return unsubscribe;
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar barStyle={'dark-content'} backgroundColor={Colors.WHITE} />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={{
          backgroundColor: Colors.BACKGROUND_COLOR,
          paddingHorizontal: 16,
          paddingVertical: 16,
        }}>
        <TitleText
          text="Transactions"
          styles={{textAlign: 'center', fontWeight: 'normal', fontSize: 18}}
        />
        <View style={{marginTop: 10}}>
          <Pressable onPress={handleInputFieldTap}>
            <TextField
              editable={false}
              iconName="search-outline"
              placeholder="Search"
              color={'#000'}
              labelColor={Colors.BLACK}
              inputStyle={{width: '100%'}}
            />
          </Pressable>
        </View>
        {/* <View></View> */}

        <Tabs
          style={{backgroundColor: Colors.BLACK, elevation: 0}}
          tabBarBackgroundColor={Colors.BLACK}
          //   tabBarBackgroundColor={Colors.GRAY_1}
          tabBarUnderlineStyle={{
            height: 2,
            backgroundColor: Colors.BLUE,
          }}
          tabContainerStyle={{
            backgroundColor: Colors.BLUE,
            elevation: 0,
            borderWidth: 0,
            borderBottomWidth: 0.5,
            borderBottomColor: Colors.GRAY_1,
          }}
          tabBarActiveTextColor={Colors.GRAY_1}
          tabBarTextStyle={{
            fontFamily: 'SFUIText-Regular',
            backgroundColor: Colors.RED,
          }}>
          <Tab
            tabStyle={{flex: 1, borderBottomWidth: 0}}
            heading={
              <TabHeading
                style={{
                  backgroundColor: Colors.BACKGROUND_COLOR,
                  borderBottomWidth: 0,
                  borderWidth: 0,
                }}>
                <Text
                  style={{
                    fontFamily: 'SFUIText-Regular',
                    color: Colors.BLACK,
                  }}>
                  All
                </Text>
              </TabHeading>
            }>
            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              style={{
                backgroundColor: Colors.BACKGROUND_COLOR,
                paddingTop: 16,
              }}>
              <View style={{marginVertical: 10}}>
                {transactions.map(item => (
                  <OrderTxRow
                    key={item.id}
                    data={{
                      status: 'Completed',
                      amount: item.amount,
                      channel: 'Cash',
                      date: new Date(item.createdAt),
                    }}
                  />
                ))}
              </View>
            </ScrollView>
          </Tab>
          <Tab
            heading={
              <TabHeading style={{backgroundColor: Colors.BACKGROUND_COLOR}}>
                <Indicator isActive={false} backgroundColor={Colors.GREEN} />
                <Text
                  style={{
                    fontFamily: 'SFUIText-Regular',
                    color: Colors.BLACK,
                  }}>
                  Successful
                </Text>
              </TabHeading>
            }>
            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              style={{
                backgroundColor: Colors.BACKGROUND_COLOR,
                paddingTop: 16,
              }}>
              {/* <TitleText
                text="Today"
                styles={{color: Colors.GRAY_1, fontSize: 16}}
              /> */}
              <View style={{marginVertical: 10}}>
                {transactions.map(item => (
                  <OrderTxRow
                    key={item.id}
                    data={{
                      status: 'Completed',
                      amount: item.amount,
                      channel: 'Cash',
                      date: new Date(item.createdAt),
                    }}
                  />
                ))}
              </View>

              {/* <TitleText
                text="Yesterday"
                styles={{color: Colors.GRAY_1, fontSize: 16}}
              />
              <View style={{marginVertical: 10}}>
                <TxRow
                  data={{
                    status: 'Pending',
                    amount: '6000',
                    channel: 'Cash',
                    date: new Date(),
                  }}
                />
              </View> */}
              {/* <TitleText
                text="Other Days"
                styles={{color: Colors.GRAY_1, fontSize: 16}}
              />
              <View style={{marginVertical: 10}}>
                <TxRow
                  data={{
                    status: 'Pending',
                    amount: '6000',
                    channel: 'Cash',
                    date: new Date(),
                  }}
                />
              </View> */}
            </ScrollView>
          </Tab>
          <Tab
            heading={
              <TabHeading style={{backgroundColor: Colors.BACKGROUND_COLOR}}>
                <Indicator isActive={false} backgroundColor={Colors.YELLOW} />
                <Text
                  style={{
                    fontFamily: 'SFUIText-Regular',
                    color: Colors.BLACK,
                  }}>
                  Pending
                </Text>
              </TabHeading>
            }>
            <ScrollView
              contentContainerStyle={{flexGrow: 1}}
              style={{
                backgroundColor: Colors.BACKGROUND_COLOR,
                paddingTop: 16,
              }}></ScrollView>
          </Tab>
        </Tabs>
      </ScrollView>
    </SafeAreaView>
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

const OrderTxRow: React.FC<ITransactionProps> = ({data, onItemPress}) => {
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
                You {'Sold items worth '}
                <Text
                  style={{
                    fontFamily: 'SFUIText-Regular',
                    color: Colors.BLACK,
                    fontSize: 14,
                  }}>
                  {helpers.formatAsMoney(data.amount)}
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

const mapStateToProps = (state: any) => {
  const {
    product: {transactions},
  } = state;
  console.log('transactions length: ', transactions);
  return {transactions};
};

export default connect(mapStateToProps, actions)(Transaction);
