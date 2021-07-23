import React, {useEffect, useState} from 'react';
import {
  Keyboard,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {StatusIOSBar} from '.';
import Header from '../../components/Header';
import {Colors} from '../../util/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Image} from 'react-native-elements';
import TitleText from '../../components/TitleText';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import {Text} from 'native-base';
import helpers from '../../helpers';
import http_service from '../../http_service';
import {connect} from 'react-redux';
import * as actions from '../../actions';

interface IProps {
  navigation: any;
  customers: any[];
  getCustomers: Function;
}

const Customer: React.FC<IProps> = ({navigation, customers, getCustomers}) => {
  const [isAddCustomerVisible, setAddCustomerVisible] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleShowAddCusomterModale = () => {
    setAddCustomerVisible(true);
  };
  const handeSaveCustomer = async () => {
    try {
      if (email.trim() === '') {
        return helpers.dispayMessage({
          message: 'Validation failed',
          description: 'Email is required',
          icon: 'info',
          type: 'info',
        });
      }
      if (name.trim() === '') {
        return helpers.dispayMessage({
          message: 'Validation failed',
          description: 'Customer Name is required',
          icon: 'info',
          type: 'info',
        });
      }
      if (phoneNumber.trim() === '') {
        return helpers.dispayMessage({
          message: 'Validation failed',
          description: 'Phone Number is required',
          icon: 'info',
          type: 'info',
        });
      }
      setIsLoading(true);
      const response = await http_service.createCustomer({
        name,
        email,
        phoneNumber,
      });

      setIsLoading(false);
      helpers.dispayMessage({
        message: 'Operation successful',
        description: 'Customer added successfully',
        icon: 'success',
        type: 'success',
      });
      console.log(response);
      setEmail('');
      setPhoneNumber('');
      setName('');
      setAddCustomerVisible(false);
      getCustomers();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      helpers.catchHttpError(error);
    }
  };
  useEffect(() => {
    getCustomers();
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: Colors.WHITE}}>
      <StatusIOSBar backgroundColor={Colors.WHITE} barStyle={'dark-content'} />
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor={Colors.WHITE} barStyle={'dark-content'} />
        <Header
          title="Customers"
          titleStyle={{fontWeight: '800'}}
          leftIcon={<Ionicons name="chevron-back-outline" size={32} />}
          leftIconOnPress={() => navigation.goBack()}
          rightIcon={<Ionicons name="add-outline" size={32} />}
          rightIconOnPress={handleShowAddCusomterModale}
        />
        {customers.length > 0 ? (
          <CustomerList customers={customers} />
        ) : (
          <NoItems handleAddNumberCustomer={handleShowAddCusomterModale} />
        )}

        {/*  */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={isAddCustomerVisible}
          onRequestClose={() => {
            setAddCustomerVisible(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TitleText
                styles={{
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: 'normal',
                  marginBottom: 10,
                }}
                text="Add New Customer"
              />
              <View style={{marginBottom: 10}}>
                <TextField
                  value={name}
                  onChange={text => setName(text)}
                  labelName="Name"
                  placeholder="Name"
                />
              </View>

              <View style={{marginBottom: 10}}>
                <TextField
                  labelName="Phone Number"
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChange={text => setPhoneNumber(text)}
                  keyboardType={'phone-pad'}
                />
              </View>
              <View style={{marginBottom: 10}}>
                <TextField
                  keyboardType={'email-address'}
                  labelName="Email"
                  value={email}
                  onChange={text => setEmail(text)}
                  placeholder="Email"
                />
              </View>
              <View style={{height: 50, marginBottom: 20}}>
                <Button
                  isLoading={isLoading}
                  onPress={handeSaveCustomer}
                  text="Save"
                />
              </View>
              <View style={{height: 50}}>
                <Button
                  styles={{backgroundColor: Colors.WHITE}}
                  textColor={Colors.RED}
                  onPress={() => setAddCustomerVisible(false)}
                  text="Cancel"
                />
              </View>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </View>
  );
};

const account = require('../../../assets/images/icons/account.png');

interface IPropsNOItem {
  handleAddNumberCustomer?: () => void;
}

const NoItems: React.FC<IPropsNOItem> = ({handleAddNumberCustomer}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <View style={{paddingHorizontal: 16}}>
        <View style={{alignItems: 'center', marginBottom: 10}}>
          <Image
            source={account}
            style={{width: 100, height: 100}}
            resizeMethod="resize"
            resizeMode="contain"
          />
        </View>
        <TitleText
          styles={{
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
            textAlign: 'center',
          }}
          text="No Customers yet"
        />
        <View style={{alignItems: 'center', marginBottom: 20}}>
          <TitleText
            styles={{
              fontSize: 12,
              fontWeight: '400',

              textAlign: 'center',
            }}
            text="Connect with customers. Make"
          />
          <TitleText
            styles={{
              fontSize: 12,
              fontWeight: '400',

              textAlign: 'center',
            }}
            text="sales easier and faster"
          />
        </View>
        <View style={{height: 56}}>
          <Button
            text="Add New Customer"
            onPress={() =>
              handleAddNumberCustomer ? handleAddNumberCustomer() : null
            }
          />
        </View>
      </View>
    </View>
  );
};

interface ICustomerList {
  customers: any[];
}

const CustomerList: React.FC<ICustomerList> = ({customers}) => {
  const [isShowingCustomer, setIsShowingCustomer] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customerToShow, setCustomerToShow] = useState<any>({});
  const showCusomterInfo = (customer: any) => {
    setCustomerToShow(customer);
    setIsShowingCustomer(true);
  };
  const CustomerListItem: React.FC<{customer: any}> = ({customer}) => {
    return (
      <TouchableOpacity
        onPress={() => showCusomterInfo(customer)}
        style={{
          borderBottomWidth: 1,
          borderBottomColor: '#e7e7e7',
          marginBottom: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 16,
          }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#EBF8EA',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={{color: '#32BA30', fontWeight: 'bold', fontSize: 16}}>
              {getInitials(customer.name)}
            </Text>
          </View>
          <View style={{flex: 1, marginLeft: 8}}>
            <Text>{customer.name}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const handleDelete = () => {
    setIsShowingCustomer(false);
  };
  const getInitials = (name: string) => {
    if (!name) return '';
    const namesPart = name.split(' ');
    return `${namesPart[0].charAt(0).toUpperCase()}${namesPart[1]
      .charAt(0)
      .toUpperCase()}`;
  };
  const handleEdit = () => {
    setIsShowingCustomer(false);
  };
  return (
    <View style={{flex: 1, paddingHorizontal: 16, paddingBottom: 20}}>
      <TextField
        containerStyle={{marginBottom: 20}}
        iconName="search-outline"
        placeholder="seach for customer"
      />
      <ScrollView style={{flex: 1}}>
        {customers.map(item => (
          <CustomerListItem customer={item} key={item.id} />
        ))}
      </ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isShowingCustomer}
        onRequestClose={() => {
          setIsShowingCustomer(false);
        }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, {backgroundColor: '#FAFAFA'}]}>
            <View>
              <View style={{alignItems: 'center'}}>
                <View
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 20,
                    backgroundColor: '#32BA30',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>
                    {getInitials(customerToShow?.name)}
                  </Text>
                </View>
              </View>
              <TitleText
                styles={{
                  fontSize: 16,
                  fontWeight: '800',
                  marginBottom: 10,
                  textAlign: 'center',
                }}
                text={customerToShow?.name}
              />
              <View
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                  backgroundColor: '#fff',
                }}>
                <View
                  style={{
                    paddingBottom: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#e7e7e7',
                    marginBottom: 10,
                  }}>
                  <Text style={{color: '#878787', marginBottom: 10}}>
                    Phone Number
                  </Text>
                  <Text style={{color: '#007AFF'}}>
                    {customerToShow?.phoneNumber}
                  </Text>
                </View>
                <View
                  style={{
                    paddingBottom: 10,
                    borderBottomWidth: 1,
                    borderBottomColor: '#e7e7e7',
                  }}>
                  <Text style={{color: '#878787', marginBottom: 10}}>
                    Email Address
                  </Text>
                  <Text style={{color: '#007AFF'}}>
                    {customerToShow?.email}
                  </Text>
                </View>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 10,
                }}>
                <TouchableOpacity onPress={handleEdit}>
                  <Text style={{color: '#007AFF', fontSize: 14}}>
                    Edit this Contact
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete}>
                  <Text style={{color: Colors.RED, fontSize: 14}}>Delete </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: Colors.BLACK,
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});

const mapStateToProps = (state: any) => {
  const {
    product: {customers},
  } = state;
  console.log('customers: ', customers);
  return {customers};
};

export default connect(mapStateToProps, actions)(Customer);
