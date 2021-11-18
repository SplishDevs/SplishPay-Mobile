import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import Header from '../../components/Header';
import {Colors} from '../../util/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from '../../components/Button';
import TextField from '../../components/TextField';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import http_service from '../../http_service';
import helpers from '../../helpers';
import {StackActions} from '@react-navigation/routers';

interface Props {
  navigation: any;
  startLoading: Function;
  stopLoading: Function;
}

const PersonalProfile: React.FC<Props> = ({
  navigation,
  startLoading,
  stopLoading,
}) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [bvn, setBVN] = useState('');
  useEffect(() => {
    const getProfile = async () => {
      try {
        startLoading();
        // const {data}: any = await http_service.getUserProfile();
        const dataString: any = await helpers.getItem('xxx-user');
        const data = JSON.parse(dataString);
        stopLoading();

        setName(data.name);
        setPhoneNumber(data.phoneNumber);
        setEmail(data.email);
      } catch (error) {
        stopLoading();
        helpers.catchHttpError(error);
      }
    };
    getProfile();
  }, []);
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

      console.log('done removing');
    } catch (error) {
      console.log('error is ', error);
      helpers.catchHttpError(error);
    }
  };
  return (
    <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
      <StatusBar backgroundColor="#000" barStyle={'light-content'} />
      <View
        style={{
          paddingVertical: 10,
          paddingLeft: 16,
          backgroundColor: Colors.BLACK,
        }}>
        <Header
          title="Personal Profile"
          titleStyle={{fontWeight: '400', color: Colors.WHITE}}
        />
      </View>
      <SafeAreaView
        style={{flex: 1, paddingHorizontal: 32, backgroundColor: Colors.BLACK}}>
        <ScrollView style={{flex: 1}}>
          <View style={{marginBottom: 10}}>
            <TextField
              inputStyle={{color: Colors.WHITE}}
              color={Colors.WHITE}
              labelName="Name"
              containerStyle={{
                backgroundColor: '#575757',
                borderColor: '#575757',
              }}
              editable={false}
              value={name}
              onChange={text => setName(text)}
              selectionColor={Colors.WHITE}
            />
          </View>
          <View style={{marginBottom: 10}}>
            <TextField
              inputStyle={{color: Colors.WHITE}}
              color={Colors.WHITE}
              labelName="Phone Number"
              containerStyle={{
                backgroundColor: '#575757',
                borderColor: '#575757',
              }}
              editable={false}
              value={phoneNumber}
              onChange={text => setPhoneNumber(text)}
              selectionColor={Colors.WHITE}
            />
          </View>
          <View style={{marginBottom: 10}}>
            <TextField
              inputStyle={{color: Colors.WHITE}}
              color={Colors.WHITE}
              labelName="Email"
              containerStyle={{
                backgroundColor: '#575757',
                borderColor: '#575757',
              }}
              value={email}
              editable={false}
              onChange={text => setEmail(text)}
              selectionColor={Colors.WHITE}
            />
          </View>

          <View style={{height: 50, marginTop: 40}}>
            <Button
              onPress={handleLogout}
              text="Log Out"
              styles={{
                backgroundColor: Colors.WHITE,
              }}
              textColor={Colors.BLACK}
              textStyles={{fontWeight: '400', fontSize: 24}}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = (state: any) => ({});

export default connect(mapStateToProps, actions)(PersonalProfile);
