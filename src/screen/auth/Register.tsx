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

  const handleNextButtonCLick = () => {
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
    if (!helpers.strongPasswordCheck(password)) {
      return helpers.dispayMessage({
        message: 'Password Strength Validation Failed',
        icon: 'danger',
        type: 'danger',
        description: `Password must have atleast one lowercase, atleast one uppercase,
        atleast one special character, must be atleast 8 characters`,
      });
    }
    registerProfileLoadedPageOne({fullname, email, phoneNumber, password});
    navigation.navigate('businessDetailRegister');
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
        backgroundColor="#fff"
      />
      <View style={styles.containerStyle}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.titleWrapper}>
            <TitleText text="Personal Details" />
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
              <TextField
                obscureText={true}
                labelName="Password"
                iconName="lock-closed-outline"
                value={password}
                onChange={text => setPassword(text)}
              />
            </View>
          </View>
          <View style={{marginTop: 16}}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('login');
              }}>
              <Text style={styles.loginText}>Log In</Text>
            </TouchableOpacity>
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
      <FAB iconName="chevron-forward-outline" onPress={handleNextButtonCLick} />
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
