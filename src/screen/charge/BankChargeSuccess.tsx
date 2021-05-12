import React, {useState} from 'react';
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
import {Colors} from '../../util/Colors';
import Indicator from '../../components/Indicator';
import TextField from '../../components/TextField';
import Button from '../../components/Button';

const bankIcon = require('../../../assets/images/bank.png');

enum BankTransactionStatus {
  TRANSACTION_PENDING = 'TRANSACTION_PENDING',
  TRANSACTION_SUCCESS = 'TRANSACTION_SUCCESS',
}

interface Props {
  navigation: any;
}
const BankChargeSuccess: React.FC<Props> = ({navigation}) => {
  const [status, setStatus] = useState<BankTransactionStatus>(
    BankTransactionStatus.TRANSACTION_SUCCESS,
  );
  const [showMenuItems, setShowMenuItems] = useState(false);
  const onStatusChange = (status: BankTransactionStatus) => {
    setStatus(status);
    setShowMenuItems(false);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.BACKGROUND_COLOR}}>
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
              source={bankIcon}
              style={{width: 20, height: 20}}
              resizeMethod="auto"
              resizeMode="contain"
            />
            <Text
              style={[
                styles.ml10,
                {fontFamily: 'SFUIText-Regular', fontSize: 16},
              ]}>
              Bank Tranfer Done
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
        <View style={[styles.my10, {flex: 1}, styles.mx10]}>
          <Text>was the transaction: </Text>
          <View style={[styles.mx10, styles.my10]}>
            <TransactionDropDown
              showMenuItems={showMenuItems}
              selectedStatus={status}
              onStatusChange={onStatusChange}
              onPress={() => setShowMenuItems(state => !state)}
            />
          </View>
        </View>
        {status === BankTransactionStatus.TRANSACTION_PENDING ? (
          <View style={{height: 40, marginBottom: 20, marginHorizontal: 20}}>
            <Button text="Done" onPress={() => {}} />
          </View>
        ) : (
          <View style={styles.lowerBanner}>
            <View style={styles.mb10}>
              <TextField
                labelName="Customer's Phone Number"
                color={Colors.BLACK}
                backgroundColor={Colors.WHITE}
              />
            </View>
            <View style={{height: 40, marginBottom: 10}}>
              <Button text="Done" onPress={() => {}} />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

interface TransactionDropDownProps {
  selectedStatus: BankTransactionStatus;
  onStatusChange: (status: BankTransactionStatus) => void;
  onPress: () => void;
  showMenuItems: boolean;
}

const TransactionDropDown: React.FC<TransactionDropDownProps> = ({
  selectedStatus,
  onPress,
  onStatusChange,
  showMenuItems,
}) => {
  return (
    <View style={styles.transactionDropDownContainer}>
      <TouchableWithoutFeedback style={{flex: 1}} onPress={onPress}>
        {renderSelectedStatus(selectedStatus)}
      </TouchableWithoutFeedback>
      {showMenuItems && (
        <TranscationMenuItems onStatusChange={onStatusChange} />
      )}
    </View>
  );
};

const renderSelectedStatus = (status: BankTransactionStatus) => {
  switch (status) {
    case BankTransactionStatus.TRANSACTION_SUCCESS:
      return (
        <View style={styles.txWrapper}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Indicator isActive={false} backgroundColor={Colors.GREEN} />
            </View>
            <Text style={{fontFamily: 'SFUIText-Regular'}}>
              Transaction Successful
            </Text>
          </View>
          <Ionicons name="chevron-down-outline" />
        </View>
      );
    case BankTransactionStatus.TRANSACTION_PENDING:
      return (
        <View style={styles.txWrapper}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Indicator isActive={false} backgroundColor={Colors.YELLOW} />
            </View>
            <Text style={{fontFamily: 'SFUIText-Regular'}}>
              Transaction Pending
            </Text>
          </View>
          <Ionicons name="chevron-down-outline" />
        </View>
      );
  }
};

interface TranscationMenuItemsProps {
  onStatusChange: (status: BankTransactionStatus) => void;
}

const TranscationMenuItems: React.FC<TranscationMenuItemsProps> = ({
  onStatusChange,
}) => {
  return (
    <View style={styles.TranscationMenuItemsContainer}>
      <TouchableWithoutFeedback
        style={{flex: 1}}
        onPress={() =>
          onStatusChange(BankTransactionStatus.TRANSACTION_SUCCESS)
        }>
        <View style={{...styles.txWrapper, paddingVertical: 8}}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Indicator isActive={false} backgroundColor={Colors.GREEN} />
            </View>
            <Text style={{fontFamily: 'SFUIText-Regular'}}>
              Transaction Successful
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback
        style={{flex: 1}}
        onPress={() =>
          onStatusChange(BankTransactionStatus.TRANSACTION_PENDING)
        }>
        <View style={{...styles.txWrapper, paddingVertical: 8}}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
            <View>
              <Indicator isActive={false} backgroundColor={Colors.YELLOW} />
            </View>
            <Text style={{fontFamily: 'SFUIText-Regular'}}>
              Transaction Pending
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  lowerBanner: {
    paddingTop: 20,
    paddingBottom: 16,
    paddingHorizontal: 16,
    backgroundColor: '#f2f2f2',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  TranscationMenuItemsContainer: {
    position: 'absolute',
    left: 0,
    top: -88,
    width: '100%',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  txWrapper: {
    flexDirection: 'row',
  },
  transactionDropDownContainer: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderColor: '#fff',
    borderWidth: 1,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
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
  paymentRow: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
});

export default BankChargeSuccess;
