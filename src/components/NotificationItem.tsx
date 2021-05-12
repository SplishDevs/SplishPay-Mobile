import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// import { defineAnimation } from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../util/Colors';

export enum TransactionType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
}

export interface ITransaction {
  type: TransactionType;
  amount: string;
  sender: string;
  recipient: string;
  date: Date;
  paymentMethod?: string;
}

interface Props {
  data: ITransaction;
  onItemPress?: (data: ITransaction) => void;
}

const getDateMessage = (date: Date) => {
  const dateDifference =
    (new Date().getTime() - new Date(date).getTime()) / (1000 * 24 * 3600);
  if (Math.round(dateDifference) == 0)
    return (
      <Text>
        Today at <Text>{getTime(date)}</Text>
      </Text>
    );
  else if (Math.round(dateDifference) === 1)
    return (
      <Text>
        Yesterday at <Text>{getTime(date)}</Text>
      </Text>
    );
  return (
    <Text>
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

const NotificationItem: React.FC<Props> = ({data, onItemPress}) => {
  return (
    <TouchableOpacity
      style={{width: '100%'}}
      onPress={() => (onItemPress ? onItemPress(data) : null)}>
      <View style={styles.contaner}>
        <View
          style={{flexDirection: 'row', marginBottom: 10, paddingVertical: 8}}>
          <View
            style={
              data.type === TransactionType.CREDIT
                ? styles.bgCredit
                : styles.bgDebit
            }>
            <View
              style={{
                transform: [{rotate: '45deg'}],
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
              }}>
              <Ionicons
                size={24}
                color={
                  data.type === TransactionType.CREDIT ? '#57bb32' : '#ee514b'
                }
                name={
                  data.type === TransactionType.CREDIT
                    ? 'arrow-down-outline'
                    : 'arrow-up-outline'
                }
              />
            </View>
          </View>
          <View style={{flex: 1, marginLeft: 8}}>
            <View>
              <Text
                style={{fontFamily: 'SFUIText-Regular', color: Colors.GRAY_1}}>
                You {data.type === TransactionType.CREDIT ? 'received' : 'sent'}
                <Text style={{color: Colors.BLACK}}> {data.amount}</Text>{' '}
                {data.type === TransactionType.CREDIT ? 'from' : 'to'}
                <Text style={{color: Colors.BLACK}}> @{data.recipient}</Text>
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
                      data.type === TransactionType.CREDIT
                        ? [styles.dotCredit]
                        : [styles.dotDebit]
                    }></View>
                  <Text
                    style={
                      data.type === TransactionType.CREDIT
                        ? [styles.descCredit]
                        : [styles.descDebit]
                    }>
                    {data.type === TransactionType.CREDIT
                      ? 'Fund Wallet'
                      : 'Send Money'}
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

export default NotificationItem;
