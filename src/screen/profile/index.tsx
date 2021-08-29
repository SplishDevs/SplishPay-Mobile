import {ListItem, Text, View} from 'native-base';
import React, {useEffect, useState} from 'react';
import {
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StatusBarStyle,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Image} from 'react-native-elements';
import TitleText from '../../components/TitleText';
import {Colors} from '../../util/Colors';
import * as Progress from 'react-native-progress';
import {getStatusBarHeight} from 'react-native-status-bar-height';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomIcon from '../../../CustomIcon';
import Button from '../../components/Button';
import TextArea from '../../components/TextArea';
import helpers from '../../helpers';
import {CommonActions, useNavigation} from '@react-navigation/native';
// import { NavigationActions } from 'react-navigation';
import {StackActions} from '@react-navigation/native';

const profileImage = require('../../../assets/images/profile.png');

const shield = require('../../../assets/images/shield.png');

const team = require('../../../assets/images/icons/team.png');
const mail = require('../../../assets/images/icons/mail.png');
const notification = require('../../../assets/images/icons/notification.png');
const lock = require('../../../assets/images/icons/lock.png');
const customer = require('../../../assets/images/icons/customer.png');
const logout = require('../../../assets/images/icons/logout.png');
// import {StackActions} from '@react-navigation/native';
import http_service from '../../http_service';
import {withNavigation} from '@react-navigation/compat';

interface IProps {
  navigation: any;
}

const Profile: React.FC<IProps> = props => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [customerSupportModal, setCustomerSupportModal] = useState(false);
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const handleCustomerSupportClick = () => {
    setModalVisible(false);
    setCustomerSupportModal(true);
  };

  const navigation = useNavigation();

  const handleLogRequest = async () => {
    try {
      if (text.trim() === '') {
        return helpers.dispayMessage({
          message: 'Empty Text',
          description: 'Your description can not be empty',
          icon: 'info',
          type: 'info',
        });
      }
      setIsLoading(true);
      await http_service.logRequest({text});
      setText('');
      setIsLoading(false);
      helpers.dispayMessage({
        message: 'Request logged successfully',
        description:
          'We have received your request, we shall be get back to you shortly',
        icon: 'success',
        type: 'success',
      });
      setCustomerSupportModal(false);
    } catch (error) {
      setIsLoading(false);
      helpers.catchHttpError(error);
    }
  };

  const removeToken = async () => {
    try {
      await helpers.removeItem('xxx-token');
      await helpers.removeItem('xxx-user');
    } catch (error) {
      helpers.catchHttpError(error);
    }
  };

  const handleLogout = async () => {
    try {
      await removeToken();
      const resetAction = StackActions.push('home');
      navigation.dispatch(resetAction);
      // navigation.dispatch((state: any) => {
      //   // Remove the home route from the stack
      //   const routes = state.routes.filter((r: any) => {
      //     console.log(r);
      //     return r.name !== 'appHome';
      //   });

      //   return CommonActions.reset({
      //     ...state,
      //     routes,
      //     index: 2,
      //   });
      // });

      // navigation.navigate('login');

      // navigation.navigate('login', {
      //   initial: false,
      // });
      // const pa = navigation.dangerouslyGetParent();
      // console.log(pa.);
      // pa.navigate('login');
      // navigation.goBack();
      // navigation.dispatch(StackActions.popToTop());

      console.log('done removing');
    } catch (error) {
      console.log('error is ', error);
      helpers.catchHttpError(error);
    }
  };
  const clearSavedAuth = async () => {
    try {
    } catch (error) {
      console.log(error);
    }
  };
  const getUsername = async () => {
    try {
      const username = await helpers.getUserName();
      setName(username);
    } catch (error) {
      helpers.catchHttpError(error);
    }
  };
  useEffect(() => {
    getUsername();
  }, []);
  return (
    <View style={{flex: 1}}>
      <StatusIOSBar barStyle="light-content" />
      <SafeAreaView style={{flex: 1, backgroundColor: Colors.WHITE}}>
        <Header name={name} onEdit={() => setModalVisible(true)} />
        <ScrollView
          style={{flex: 1, paddingVertical: 20, paddingHorizontal: 16}}>
          <StatsView />
          <View style={{paddingTop: 16, paddingBottom: 16}}>
            <CustomListItem
              leftIcon={customer}
              onPress={() => navigation.navigate('customer')}
              label="Customer"
            />
            <CustomListItem leftIcon={team} label="My Team" />
            <CustomListItem
              onPress={() => navigation.navigate('security')}
              leftIcon={lock}
              label="Security"
            />
            <CustomListItem
              onPress={() => setCustomerSupportModal(true)}
              leftIcon={mail}
              label="Customer Support"
            />
            <CustomListItem
              leftIcon={notification}
              label="Tell another business"
            />
            <CustomListItem
              onPress={handleLogout}
              leftIcon={logout}
              label="Logout"
            />
          </View>
        </ScrollView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={isModalVisible}
          onRequestClose={() => {
            setModalVisible(!isModalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TitleText
                text="Edit Business Name"
                styles={{
                  fontSize: 18,
                  fontWeight: 'normal',
                  textAlign: 'center',
                }}
              />
              <TitleText
                styles={{
                  textAlign: 'center',
                  fontSize: 14,
                  fontWeight: 'normal',
                  justifyContent: 'center',
                  lineHeight: 20,
                  marginBottom: 10,
                  marginTop: 10,
                  color: Colors.GRAY_2,
                }}
                text={`For identification issues, please reach out to our customer support to change your business or personal name. Click the button below to email support.`}
              />
              <View style={{height: 50}}>
                <Button
                  onPress={handleCustomerSupportClick}
                  text="Customer Support"
                />
              </View>
              <View style={{height: 40, marginTop: 10}}>
                <Button
                  backgroundColor={Colors.WHITE}
                  styles={{borderColor: Colors.RED}}
                  textColor={Colors.RED}
                  onPress={() => setModalVisible(false)}
                  text="Cancel"
                />
              </View>
            </View>
          </View>
        </Modal>
        <Modal
          animationType="slide"
          transparent={true}
          visible={customerSupportModal}
          onRequestClose={() => {
            setModalVisible(!customerSupportModal);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TitleText
                text="Customer Support"
                styles={{
                  fontSize: 18,
                  fontWeight: 'normal',
                  textAlign: 'center',
                }}
              />
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 14,
                    fontWeight: 'normal',
                    justifyContent: 'center',
                    lineHeight: 20,
                    marginBottom: 10,
                    marginTop: 10,
                    color: Colors.GRAY_2,
                  }}>
                  Our customer support representatives responds to your enquiry
                  via mail within
                  <Text style={{color: Colors.BLUE}}> 1 hour !</Text>
                </Text>
              </View>
              <View style={{marginBottom: 20}}>
                <TextArea
                  placeholder="Enter description of your enquiry"
                  height={120}
                  labelName="Description"
                  value={text}
                  onChange={text => setText(text)}
                />
              </View>
              <View style={{height: 50}}>
                <Button
                  onPress={handleLogRequest}
                  isLoading={isLoading}
                  text="Send"
                />
              </View>
              <View style={{height: 40, marginTop: 10}}>
                <Button
                  backgroundColor={Colors.WHITE}
                  styles={{borderColor: Colors.RED}}
                  textColor={Colors.RED}
                  onPress={() => setCustomerSupportModal(false)}
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

interface IListItemProps {
  onPress?: () => void;
  label?: string;
  leftIcon?: any;
}

export const CustomListItem: React.FC<IListItemProps> = ({
  label,
  onPress,
  leftIcon,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        marginBottom: 16,
      }}>
      {leftIcon && (
        <Image
          source={leftIcon}
          style={{width: 32, height: 32}}
          resizeMethod="resize"
          resizeMode="contain"
        />
      )}
      <Text style={{flex: 1, marginLeft: 8}}>{label}</Text>
      <Ionicons name="chevron-forward-outline" size={24} color={Colors.BLACK} />
    </TouchableOpacity>
  );
};

interface IHeader {
  onEdit?: () => void;
  name: string;
}

const Header: React.FC<IHeader> = ({onEdit, name}) => {
  return (
    <View style={styles.headerContainer}>
      {Platform.OS === 'ios' ? (
        <StatusBar barStyle={'light-content'} backgroundColor={Colors.BLACK} />
      ) : (
        <StatusBar barStyle={'light-content'} backgroundColor={Colors.BLACK} />
      )}
      <TitleText
        styles={{
          color: Colors.WHITE,
          textAlign: 'center',
          fontWeight: '600',
        }}
        text="Profile"
      />
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 10,
        }}>
        <Image
          source={profileImage}
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            borderColor: Colors.WHITE,
            borderWidth: 2,
          }}
          resizeMethod="resize"
          resizeMode="cover"
        />
        <View style={{paddingHorizontal: 16, flex: 1}}>
          <TitleText
            styles={{
              fontSize: 18,
              fontWeight: 'bold',
              marginBottom: 4,
              color: Colors.WHITE,
            }}
            text={name}
          />
          {/* <TitleText
            styles={{
              fontSize: 18,
              fontWeight: '800',
              marginBottom: 4,
              color: Colors.WHITE,
            }}
            text="Madam Q"
          /> */}
          <TitleText
            styles={{fontSize: 18, fontWeight: '800', color: Colors.WHITE}}
            text="Admin"
          />
        </View>
        <View>
          <Pressable onPress={onEdit}>
            <TitleText
              styles={{fontSize: 18, fontWeight: '800', color: Colors.WHITE}}
              text="Edit"
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

interface ISatusBar {
  backgroundColor?: string;
  barStyle?: StatusBarStyle;
}

export const StatusIOSBar: React.FC<ISatusBar> = ({
  backgroundColor,
  barStyle,
}) => {
  return Platform.OS === 'ios' ? (
    <View
      style={{
        backgroundColor: backgroundColor ? backgroundColor : Colors.WHITE,
        height: getStatusBarHeight(),
      }}>
      <StatusBar
        barStyle={barStyle ? barStyle : 'dark-content'}
        backgroundColor={backgroundColor ? backgroundColor : Colors.WHITE}
      />
    </View>
  ) : (
    <StatusBar
      barStyle={barStyle ? barStyle : 'dark-content'}
      backgroundColor={backgroundColor ? backgroundColor : Colors.WHITE}
    />
  );
};

const StatsView = () => {
  return (
    <View
      style={{
        backgroundColor: Colors.WHITE,
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: Colors.WHITE,
        shadowColor: '#0A0A0A',
        shadowOffset: {width: 0, height: 2},
        elevation: 2,
        shadowOpacity: 0.5,
      }}>
      <View style={{flexDirection: 'row', width: '100%'}}>
        <View style={{flex: 1}}>
          <TitleText
            text="Dashboard"
            styles={{fontWeight: 'bold', fontSize: 18, marginBottom: 20}}
          />
          <TitleText
            text="200"
            styles={{fontWeight: 'bold', fontSize: 18, marginBottom: 10}}
          />
          <TitleText
            text="Sales Recorded"
            styles={{
              fontWeight: 'normal',
              marginBottom: 20,
              marginTop: 0,
              fontSize: 18,
              color: Colors.GRAY_2,
            }}
          />
          <TitleText
            text="200"
            styles={{fontWeight: 'bold', fontSize: 18, marginBottom: 10}}
          />
          <TitleText
            text="Days Usage"
            styles={{
              fontWeight: 'normal',
              marginBottom: 20,
              marginTop: 0,
              fontSize: 18,
              color: Colors.GRAY_2,
            }}
          />
        </View>
        <View
          style={{
            paddingLeft: 0,
            height: '100%',
            marginBottom: 10,
            borderWidth: 1,
            borderStyle: 'dashed',
            borderColor: Colors.GRAY_2,
            borderRadius: 1,
            borderTopColor: Colors.GRAY_2,
          }}></View>
        <View style={{flex: 1, justifyContent: 'center', paddingLeft: 16}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 8,
            }}>
            <TitleText text="25" styles={{fontWeight: 'bold', fontSize: 18}} />
            <View style={{paddingLeft: 8}}>
              <Image
                source={shield}
                style={{width: 30, height: 30}}
                resizeMode="contain"
                resizeMethod="resize"
              />
            </View>
          </View>
          <TitleText
            styles={{
              fontSize: 14,
              color: Colors.GRAY_2,
              marginBottom: 8,
              fontWeight: 'normal',
            }}
            text="Your Splish Score"
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <View></View>
            <CustomProgressBar value={0.4} label={'Mon'} />
            <CustomProgressBar value={0.2} label={'Tue'} />
            <CustomProgressBar value={0.8} label={'Wed'} />
            <CustomProgressBar value={0.6} label={'Thur'} />
            <CustomProgressBar value={0.9} label={'Fri'} />
          </View>
        </View>
      </View>
    </View>
  );
};

interface ICustomProgressBar {
  label?: string;
  value?: number;
}

const CustomProgressBar: React.FC<ICustomProgressBar> = ({
  label,
  value = 0,
}) => {
  return (
    <View style={{alignItems: 'center'}}>
      <TitleText
        styles={{
          color: Colors.GRAY_2,
          fontSize: 12,
          marginBottom: 8,
          fontWeight: 'normal',
        }}
        text={label ? label : ''}
      />
      <View
        style={{
          flexDirection: 'column',
          backgroundColor: '#e8e8e8',
          height: 120,
          width: 8,
          borderTopRightRadius: 8,
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}>
        <View style={{flex: 1 - value}}></View>
        <View
          style={{
            flex: value,
            backgroundColor: Colors.BLUE,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
          }}></View>
      </View>
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

export default Profile;
