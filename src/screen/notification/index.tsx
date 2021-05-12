import React, {useState} from 'react';
import {
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StatusBarIOS,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Header from '../../components/Header';
import {Colors} from '../../util/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NotificationItem, {
  ITransaction,
  TransactionType,
} from '../../components/NotificationItem';
import TitleText from '../../components/TitleText';
import Button from '../../components/Button';

interface Props {
  navigation: any;
}

const data: ITransaction[] = [
  {
    amount: '5000',
    type: TransactionType.CREDIT,
    recipient: 'amakamonee',
    sender: 'Charles',
    date: new Date(),
  },
  {
    amount: '5000',
    type: TransactionType.DEBIT,
    recipient: 'amakamonee',
    sender: 'Charles',
    date: new Date(),
  },
];

const response: {
  today?: ITransaction[];
  yesterday?: ITransaction[];
  otherDays?: ITransaction[];
} = {
  today: [
    {
      amount: '5000',
      type: TransactionType.CREDIT,
      recipient: 'amakamonee',
      sender: 'Charles',
      date: new Date(),
      paymentMethod: 'SplishPay to SplishPay',
    },
    {
      amount: '5000',
      type: TransactionType.DEBIT,
      recipient: 'amakamonee',
      sender: 'Charles',
      date: new Date(),
      paymentMethod: 'SplishPay to SplishPay',
    },
  ],
  yesterday: [
    {
      amount: '5000',
      type: TransactionType.CREDIT,
      recipient: 'amakamonee',
      sender: 'Charles',
      date: new Date(new Date(new Date().getTime() - 24 * 1000 * 3600)),
      paymentMethod: 'SplishPay to Bank Account',
    },
    {
      amount: '5000',
      type: TransactionType.DEBIT,
      recipient: 'amakamonee',
      sender: 'Charles',
      date: new Date(new Date().getTime() - 24 * 1000 * 3600),
      paymentMethod: 'SplishPay to SplishPay',
    },
  ],
  otherDays: [
    {
      amount: '5000',
      type: TransactionType.CREDIT,
      recipient: 'amakamonee',
      sender: 'Charles',
      date: new Date(new Date(new Date().getTime() - 4 * 24 * 1000 * 3600)),
      paymentMethod: 'SplishPay to SplishPay',
    },
    {
      amount: '5000',
      type: TransactionType.DEBIT,
      recipient: 'amakamonee',
      sender: 'Charles',
      date: new Date(new Date().getTime() - 3 * 24 * 1000 * 3600),
      paymentMethod: 'SplishPay to SplishPay',
    },
    {
      amount: '5000',
      type: TransactionType.CREDIT,
      recipient: 'amakamonee',
      sender: 'Charles',
      date: new Date(new Date().getTime() - 6 * 24 * 1000 * 3600),
      paymentMethod: 'SplishPay to SplishPay',
    },
  ],
};
const Notification: React.FC<Props> = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [txItem, setTxItem] = useState<ITransaction>();
  const onItemPress = (data: ITransaction) => {
    setModalVisible(true);
    setTxItem(data);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
        backgroundColor={Colors.WHITE}
      />

      <Pressable
        style={{flex: 1}}
        onPress={e => {
          e.stopPropagation();
          setModalVisible(false);
        }}>
        <View style={styles.container}>
          <Header
            leftIcon={<Ionicons size={32} name="chevron-back-outline" />}
            title="Notifications"
            leftIconOnPress={e => {
              e.stopPropagation();
              navigation.goBack();
            }}
            titleStyle={{fontWeight: 'normal'}}
          />
          <ScrollView style={{flex: 1}}>
            {response.today && response.today.length > 0 && (
              <TitleText
                text="Today"
                styles={{color: Colors.GRAY_1, fontSize: 16}}
              />
            )}
            <View style={{marginVertical: 16}}>
              {response.today &&
                response.today.length > 0 &&
                response.today.map((item, i) => (
                  <NotificationItem
                    data={item}
                    key={i}
                    onItemPress={onItemPress}
                  />
                ))}
            </View>
            {response.yesterday && response.yesterday.length > 0 && (
              <TitleText
                text="Yesterday"
                styles={{color: Colors.GRAY_1, fontSize: 16}}
              />
            )}

            <View style={{marginVertical: 16}}>
              {response.yesterday &&
                response.yesterday.length > 0 &&
                response.yesterday.map((item, i) => (
                  <NotificationItem
                    data={item}
                    key={i}
                    onItemPress={onItemPress}
                  />
                ))}
            </View>
            {response.otherDays && response.otherDays.length > 0 && (
              <TitleText
                text="Other Days"
                styles={{color: Colors.GRAY_1, fontSize: 16}}
              />
            )}
            <View style={{marginVertical: 16}}>
              {response.otherDays &&
                response.otherDays.length > 0 &&
                response.otherDays.map((item, i) => (
                  <NotificationItem
                    data={item}
                    key={i}
                    onItemPress={onItemPress}
                  />
                ))}
            </View>
          </ScrollView>
        </View>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={{marginBottom: 8}}>
              <Text
                style={
                  txItem?.type === TransactionType.CREDIT
                    ? {
                        color: Colors.COLOR_CREDIT,
                        fontFamily: 'SFUIText-Regular',
                      }
                    : {
                        color: Colors.COLOR_DEBIT,
                        fontFamily: 'SFUIText-Regular',
                      }
                }>
                {txItem?.type === TransactionType.CREDIT
                  ? 'Money received from'
                  : 'Money sent to'}
              </Text>
              <Text
                style={{
                  fontFamily: 'SFUIText-Regular',
                  marginTop: 4,
                  fontSize: 16,
                }}>
                @{txItem?.recipient}
              </Text>
            </View>
            <View style={{marginBottom: 8}}>
              <Text
                style={{
                  fontFamily: 'SFUIText-Regular',
                  color: Colors.GRAY_1,
                }}>
                Payment Method
              </Text>
              <Text
                style={{
                  fontFamily: 'SFUIText-Regular',
                  marginTop: 4,
                  fontSize: 16,
                }}>
                {txItem?.paymentMethod}
              </Text>
            </View>
            <View style={{marginBottom: 8}}>
              <Text
                style={{
                  fontFamily: 'SFUIText-Regular',
                  color: Colors.GRAY_1,
                }}>
                Amount
              </Text>
              <Text
                style={{
                  fontFamily: 'SFUIText-Regular',
                  marginTop: 4,
                  fontSize: 16,
                }}>
                {txItem?.amount}
              </Text>
            </View>
            <View style={{marginBottom: 8}}>
              <Text
                style={{
                  fontFamily: 'SFUIText-Regular',
                  color: Colors.GRAY_1,
                }}>
                Date
              </Text>
              <Text
                style={{
                  fontFamily: 'SFUIText-Regular',
                  marginTop: 4,
                  fontSize: 16,
                }}>
                {new Date(txItem?.date || new Date()).toDateString()}
              </Text>
            </View>
            <View style={{alignItems: 'center', marginTop: 10}}>
              <View style={{width: '90%', maxWidth: 200, height: 40}}>
                <Button
                  text="Close"
                  onPress={() => setModalVisible(!modalVisible)}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: Colors.WHITE,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    shadowColor: '#000',
    width: '90%',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default Notification;
