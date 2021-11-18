import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  StatusBar,
  Platform,
  StyleSheet,
  Text,
} from 'react-native';
import TextField from '../../components/TextField';
import TitleText from '../../components/TitleText';
import FAB from '../../components/FAB';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import helpers from '../../helpers';
import PasswordField from '../../components/PasswordField';
import Button from '../../components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Colors} from '../../util/Colors';
import {executeSql} from '../../database/executeSql';

interface Props {
  navigation: any;
  registerProfileLoadedPageOne: Function;
}

const Register: React.FC<Props> = ({
  navigation,
  registerProfileLoadedPageOne,
}) => {
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConFirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleNextButtonCLick = async () => {
    try {
      if (
        fullname.trim() === '' ||
        email.trim() === '' ||
        phoneNumber.trim() === '' ||
        password.trim() === ''
      ) {
        return helpers.dispayMessage({
          message: 'Validation Failed',
          icon: 'info',
          type: 'info',
          description: 'Please fill all fields',
        });
      }
      if (!helpers.validateEmail(email)) {
        return helpers.dispayMessage({
          message: 'Email Address Validation Failed',
          description: 'Email Provided is not valid',
          icon: 'danger',
          type: 'danger',
        });
      }
      if (password !== confirmPassword) {
        return helpers.dispayMessage({
          message: 'Passwords Mismatch',
          description: 'Password and Confirm Password do not match',
          icon: 'danger',
          type: 'danger',
        });
      }
      // if (!helpers.strongPasswordCheck(password)) {
      //   return helpers.dispayMessage({
      //     message: 'Password Strength Validation Failed',
      //     icon: 'danger',
      //     type: 'danger',
      //     description: `Password must have atleast one lowercase, atleast one uppercase,atleast one special character and must be atleast 8 characters`,
      //   });
      // }
      setIsLoading(true);
      const result = await executeSql(`select * from users where email = ?`, [
        email,
      ]);

      if (result.rows.length > 0) {
        setIsLoading(false);
        return helpers.dispayMessage({
          message: 'Operation failed',
          description: 'Email already exits',
          icon: 'info',
          type: 'info',
        });
      }
      await executeSql(
        `insert into users(name, email, password,phoneNumber )values(?,?,?,?)`,
        [fullname, email, password, phoneNumber],
      );
      setIsLoading(false);
      helpers.dispayMessage({
        message: 'Operation successful',
        description: 'Account created successfully',
        icon: 'success',
        type: 'success',
      });
    } catch (error) {
      console.log('error: is : ', error);
      setIsLoading(false);
      helpers.catchHttpError(error);
    }
    // navigation.navigate('businessDetailRegister');
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
        backgroundColor="#fff"
      />
      <View style={styles.containerStyle}>
        <ScrollView style={{flex: 1}}>
          <View>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={{marginLeft: 8}}>
              <Ionicons
                color={Colors.BLACK}
                name="chevron-back-outline"
                size={40}
              />
            </TouchableOpacity>
            <View style={[styles.titleWrapper, {justifyContent: 'center'}]}>
              <TitleText text="Personal Details" />
            </View>
          </View>
          <View>
            <View style={styles.inputWrapper}>
              <TextField
                value={fullname}
                onChange={text => setFullName(text)}
                labelName="Full Name"
                iconName="person-outline"
              />
            </View>
            <View style={styles.inputWrapper}>
              <TextField
                keyboardType="email-address"
                labelName="Email"
                iconName="mail-outline"
                value={email}
                onChange={text => setEmail(text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <TextField
                keyboardType="phone-pad"
                labelName="Phone Number"
                iconName="call-outline"
                value={phoneNumber}
                onChange={text => setPhoneNumber(text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <PasswordField
                labelName="Password"
                iconName="lock-closed-outline"
                value={password}
                onChange={text => setPassword(text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <PasswordField
                labelName="Confirm Password"
                iconName="lock-closed-outline"
                value={confirmPassword}
                onChange={text => setConFirmPassword(text)}
              />
            </View>
          </View>
          <View style={{height: 60, marginTop: 20}}>
            <Button
              isLoading={isLoading}
              text="Register"
              onPress={handleNextButtonCLick}
            />
          </View>
        </ScrollView>
      </View>
      {/* <View style={{marginTop: 16}}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('login');
          }}>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    marginHorizontal: 20,
    marginTop: 8,
    flex: 1,
  },
  titleWrapper: {
    marginTop: 16,
    marginBottom: 28,
  },
  inputWrapper: {
    marginBottom: 16,
  },
  loginWrapper: {
    position: 'absolute',
    left: 20,
    bottom: 64,
  },
  loginText: {
    color: '#007AFF',
    fontFamily: 'SFUIText-Regular',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps, actions)(Register);
