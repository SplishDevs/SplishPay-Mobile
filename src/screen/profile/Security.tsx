import React, {LegacyRef, useRef, useState} from 'react';
import {
  Modal,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {StatusIOSBar} from '.';
import Header from '../../components/Header';
import {Colors} from '../../util/Colors';
// import { TitleBar } from '../items/ItemPage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TitleText from '../../components/TitleText';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import helpers from '../../helpers';
import http_service from '../../http_service';
// import { Text, View } from 'native-base';

interface IProps {
  navigation: any;
}

const Security: React.FC<IProps> = ({navigation}) => {
  const [isEnabled, setIsEnable] = useState(false);

  const [enableCreatePin, setEnableCreatePin] = useState(false);
  const [changeCreatePin, setChangePin] = useState(false);
  const [isCreatePinLoading, setIsCreatePinLoading] = useState(false);

  const [isUpdatePIN, setIsUpdatePINLoading] = useState(false);

  const [pin1, setPin1] = useState('');
  const [pin2, setPin2] = useState('');
  const [pin3, setPin3] = useState('');
  const [pin4, setPin4] = useState('');
  const [cpin1, setCPin1] = useState('');
  const [cpin2, setCPin2] = useState('');
  const [cpin3, setCPin3] = useState('');
  const [cpin4, setCPin4] = useState('');

  const [pinb1, setPinb1] = useState('');
  const [pinb2, setPinb2] = useState('');
  const [pinb3, setPinb3] = useState('');
  const [pinb4, setPinb4] = useState('');
  const [cpinb1, setCPinb1] = useState('');
  const [cpinb2, setCPinb2] = useState('');
  const [cpinb3, setCPinb3] = useState('');
  const [cpinb4, setCPinb4] = useState('');

  const toggleSwitch = () => {
    setIsEnable(state => !state);
  };
  const pinRef1 = useRef<TextInput>(null);
  const pinRef2 = useRef<TextInput>(null);
  const pinRef3 = useRef<TextInput>(null);
  const pinRef4 = useRef<TextInput>(null);

  const cpinRef1 = useRef<TextInput>(null);
  const cpinRef2 = useRef<TextInput>(null);
  const cpinRef3 = useRef<TextInput>(null);
  const cpinRef4 = useRef<TextInput>(null);

  const pinRefb1 = useRef<TextInput>(null);
  const pinRefb2 = useRef<TextInput>(null);
  const pinRefb3 = useRef<TextInput>(null);
  const pinRefb4 = useRef<TextInput>(null);

  const cpinRefb1 = useRef<TextInput>(null);
  const cpinRefb2 = useRef<TextInput>(null);
  const cpinRefb3 = useRef<TextInput>(null);
  const cpinRefb4 = useRef<TextInput>(null);
  const handleCreatePin = async () => {
    try {
      if (
        `${pin1}${pin2}${pin3}${pin4}`.trim() !==
        `${cpin1}${cpin2}${cpin3}${cpin4}`.trim()
      ) {
        return helpers.dispayMessage({
          message: 'PIN mismatch',
          description: 'Confirm PIN and PIN mismatch',
          icon: 'info',
          type: 'info',
        });
      }
      setIsCreatePinLoading(true);
      await http_service.cereatePIN({pin: `${pin1}${pin2}${pin3}${pin4}`});
      setPin1('');
      setPin2('');
      setPin3('');
      setPin4('');
      setCPin1('');
      setCPin2('');
      setCPin3('');
      setCPin4('');
      setEnableCreatePin(false);
      setIsCreatePinLoading(false);
      helpers.dispayMessage({
        message: 'PIN created successfully',
        description:
          'Your PIN has been set successfully, please remember to keep it private',
        icon: 'success',
        type: 'success',
      });
    } catch (error) {
      setIsCreatePinLoading(false);
      helpers.catchHttpError(error);
    }
  };

  const hanldeUpdatePIN = async () => {
    try {
      setIsUpdatePINLoading(true);
      await http_service.updatePIN({
        oldPin: `${pinb1}${pinb2}${pinb3}${pinb4}`,
        newPin: `${cpinb1}${cpinb2}${cpinb3}${cpinb4}`,
      });
      setPinb1('');
      setPinb2('');
      setPinb3('');
      setPinb4('');
      setCPinb1('');
      setCPinb2('');
      setCPinb3('');
      setCPinb4('');
      setIsUpdatePINLoading(false);
      setChangePin(false);

      helpers.dispayMessage({
        message: 'PIN Updated successfully',
        description:
          'Your PIN has been updated successfully, please remember to keep it private',
        icon: 'success',
        type: 'success',
      });
    } catch (error) {
      setIsUpdatePINLoading(false);
      helpers.catchHttpError(error);
    }
  };
  const resetForm = () => {
    setPin1('');
    setPin2('');
    setPin3('');
    setPin4('');
    setCPin1('');
    setCPin2('');
    setCPin3('');
    setCPin4('');

    setPinb1('');
    setPinb2('');
    setPinb3('');
    setPinb4('');
    setCPinb1('');
    setCPinb2('');
    setCPinb3('');
    setCPinb4('');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.WHITE}}>
      <StatusIOSBar backgroundColor={Colors.WHITE} barStyle={'dark-content'} />
      <Header
        leftIcon={<Ionicons name="chevron-back-outline" size={32} />}
        title="Security"
        titleStyle={{fontWeight: '800'}}
        leftIconOnPress={() => navigation.goBack()}
      />
      <View style={{paddingVertical: 20, paddingHorizontal: 16}}>
        <View
          style={{
            paddingBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#e7e7e7',
            marginBottom: 20,
          }}>
          <View style={{marginBottom: 10}}>
            <Text style={{color: '#878787'}}>Face ID / Fingerprint</Text>
          </View>
          <View style={{flexDirection: 'row', width: '100%'}}>
            <Text style={{color: Colors.BLACK, fontWeight: '800', flex: 1}}>
              Open app with Face ID / Fingerprint
            </Text>
            <Switch
              trackColor={{false: '#767577', true: '#E6F2FF'}}
              thumbColor={isEnabled ? '#007AFF' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />
          </View>
        </View>
        <View
          style={{
            paddingBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#e7e7e7',
            marginBottom: 20,
          }}>
          <View style={{marginBottom: 10}}>
            <Text style={{color: '#878787'}}>Create PIN</Text>
          </View>
          <TouchableOpacity onPress={() => setEnableCreatePin(true)}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: Colors.BLACK, fontWeight: '800', flex: 1}}>
                Create your transaction PIN
              </Text>
              <Ionicons name="chevron-forward-outline" size={24} />
            </View>
          </TouchableOpacity>
        </View>
        <View
          style={{
            paddingBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#e7e7e7',
            marginBottom: 20,
          }}>
          <View style={{marginBottom: 10}}>
            <Text style={{color: '#878787'}}>Change PIN</Text>
          </View>
          <TouchableOpacity onPress={() => setChangePin(true)}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{color: Colors.BLACK, fontWeight: '800', flex: 1}}>
                Change your transaction PIN
              </Text>
              <Ionicons name="chevron-forward-outline" size={24} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={enableCreatePin}
        onRequestClose={() => {
          setEnableCreatePin(false);
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
              text="Create Transaction PIN"
            />

            <View style={{marginBottom: 10}}>
              <TitleText
                text="PIN"
                styles={{fontSize: 14, fontWeight: 'normal', marginBottom: 10}}
              />
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{width: 60, marginRight: 10}}>
                  <TextField
                    value={pin1}
                    onChange={text => {
                      setPin1(text);
                      if (text.trim() !== '') {
                        pinRef2.current?.focus();
                      }
                    }}
                    inputRef={pinRef1}
                    keyboardType={'phone-pad'}
                  />
                </View>
                <View style={{width: 60, marginRight: 10}}>
                  <TextField
                    value={pin2}
                    onChange={text => {
                      setPin2(text);
                      if (text.trim() !== '') {
                        pinRef3.current?.focus();
                      }
                    }}
                    keyboardType={'phone-pad'}
                    inputRef={pinRef2}
                  />
                </View>
                <View style={{width: 60, marginRight: 10}}>
                  <TextField
                    value={pin3}
                    onChange={text => {
                      setPin3(text);
                      if (text.trim() !== '') {
                        pinRef4.current?.focus();
                      }
                    }}
                    keyboardType={'phone-pad'}
                    inputRef={pinRef3}
                  />
                </View>
                <View style={{width: 60, marginRight: 10}}>
                  <TextField
                    value={pin4}
                    onChange={text => {
                      setPin4(text);
                    }}
                    keyboardType={'phone-pad'}
                    inputRef={pinRef4}
                  />
                </View>
              </View>
            </View>
            <View style={{marginBottom: 10}}>
              <TitleText
                text="Confirm PIN"
                styles={{
                  fontSize: 14,
                  fontWeight: 'normal',
                  color: Colors.BLUE,
                  marginBottom: 10,
                }}
              />
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{width: 60, marginRight: 10}}>
                  <TextField
                    value={cpin1}
                    onChange={text => {
                      setCPin1(text);
                      if (text.trim() !== '') {
                        cpinRef2.current?.focus();
                      }
                    }}
                    inputRef={cpinRef1}
                    keyboardType={'phone-pad'}
                  />
                </View>
                <View style={{width: 60, marginRight: 10}}>
                  <TextField
                    value={cpin2}
                    onChange={text => {
                      setCPin2(text);
                      if (text.trim() !== '') {
                        cpinRef3.current?.focus();
                      }
                    }}
                    keyboardType={'phone-pad'}
                    inputRef={cpinRef2}
                  />
                </View>
                <View style={{width: 60, marginRight: 10}}>
                  <TextField
                    value={cpin3}
                    onChange={text => {
                      setCPin3(text);
                      if (text.trim() !== '') {
                        cpinRef4.current?.focus();
                      }
                    }}
                    keyboardType={'phone-pad'}
                    inputRef={cpinRef3}
                  />
                </View>
                <View style={{width: 60, marginRight: 10}}>
                  <TextField
                    value={cpin4}
                    onChange={text => {
                      setCPin4(text);
                    }}
                    keyboardType={'phone-pad'}
                    inputRef={cpinRef4}
                  />
                </View>
              </View>
            </View>

            <View style={{height: 50, marginBottom: 20}}>
              <Button
                isLoading={isCreatePinLoading}
                onPress={handleCreatePin}
                text="Save"
              />
            </View>
            <View style={{height: 50}}>
              <Button
                styles={{backgroundColor: Colors.WHITE}}
                textColor={Colors.RED}
                onPress={() => {
                  setEnableCreatePin(false);
                  resetForm();
                }}
                text="Cancel"
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={changeCreatePin}
        onRequestClose={() => {
          setChangePin(false);
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
              text="Change Transaction PIN"
            />

            <View style={{marginBottom: 10}}>
              <TitleText
                text="Old PIN"
                styles={{
                  fontSize: 14,
                  fontWeight: 'normal',
                  color: Colors.RED,
                  marginBottom: 10,
                }}
              />
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{width: 60, marginRight: 10}}>
                  <TextField
                    value={pinb1}
                    onChange={text => {
                      setPinb1(text);
                      if (text.trim() !== '') {
                        pinRefb2.current?.focus();
                      }
                    }}
                    inputRef={pinRefb1}
                    keyboardType={'phone-pad'}
                  />
                </View>
                <View style={{width: 60, marginRight: 10}}>
                  <TextField
                    value={pinb2}
                    onChange={text => {
                      setPinb2(text);
                      if (text.trim() !== '') {
                        pinRefb3.current?.focus();
                      }
                    }}
                    keyboardType={'phone-pad'}
                    inputRef={pinRefb2}
                  />
                </View>
                <View style={{width: 60, marginRight: 10}}>
                  <TextField
                    value={pinb3}
                    onChange={text => {
                      setPinb3(text);
                      if (text.trim() !== '') {
                        pinRefb4.current?.focus();
                      }
                    }}
                    keyboardType={'phone-pad'}
                    inputRef={pinRefb3}
                  />
                </View>
                <View style={{width: 60, marginRight: 10}}>
                  <TextField
                    value={pinb4}
                    onChange={text => {
                      setPinb4(text);
                    }}
                    keyboardType={'phone-pad'}
                    inputRef={pinRefb4}
                  />
                </View>
              </View>
            </View>
            <View style={{marginBottom: 10}}>
              <TitleText
                text="New PIN"
                styles={{
                  fontSize: 14,
                  fontWeight: 'normal',
                  color: Colors.BLUE,
                  marginBottom: 10,
                }}
              />
              <View
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{width: 60, marginRight: 10}}>
                  <TextField
                    value={cpinb1}
                    onChange={text => {
                      setCPinb1(text);
                      if (text.trim() !== '') {
                        cpinRefb2.current?.focus();
                      }
                    }}
                    inputRef={cpinRefb1}
                    keyboardType={'phone-pad'}
                  />
                </View>
                <View style={{width: 60, marginRight: 10}}>
                  <TextField
                    value={cpinb2}
                    onChange={text => {
                      setCPinb2(text);
                      if (text.trim() !== '') {
                        cpinRefb3.current?.focus();
                      }
                    }}
                    keyboardType={'phone-pad'}
                    inputRef={cpinRefb2}
                  />
                </View>
                <View style={{width: 60, marginRight: 10}}>
                  <TextField
                    value={cpinb3}
                    onChange={text => {
                      setCPinb3(text);
                      if (text.trim() !== '') {
                        cpinRefb4.current?.focus();
                      }
                    }}
                    keyboardType={'phone-pad'}
                    inputRef={cpinRefb3}
                  />
                </View>
                <View style={{width: 60, marginRight: 10}}>
                  <TextField
                    value={cpinb4}
                    onChange={text => {
                      setCPinb4(text);
                    }}
                    keyboardType={'phone-pad'}
                    inputRef={cpinRefb4}
                  />
                </View>
              </View>
            </View>

            <View style={{height: 50, marginBottom: 20}}>
              <Button
                isLoading={isUpdatePIN}
                onPress={hanldeUpdatePIN}
                text="Save"
              />
            </View>
            <View style={{height: 50}}>
              <Button
                styles={{backgroundColor: Colors.WHITE}}
                textColor={Colors.RED}
                onPress={() => {
                  setChangePin(false);
                  resetForm();
                }}
                text="Cancel"
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
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

export default Security;
