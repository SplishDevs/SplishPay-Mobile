import React, {useState} from 'react';
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
import Select from '../../components/Select';
import {CheckBox} from 'native-base';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import helpers from '../../helpers';

interface Props {
  navigation: any;
  registerProfileLoadedPageTwo: Function;
}

const BusinessDetailsRegister: React.FC<Props> = ({
  navigation,
  registerProfileLoadedPageTwo,
}) => {
  const [companyName, setCompanyName] = useState('');
  const [cacRegistrationNumber, setCacRegistrationNumber] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyContact, setCompanyContact] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [interestedInHardware, setInterestedInHardware] = useState(false);
  const [state, setState] = useState('');
  const handleOnNextPress = () => {
    if (
      companyName.trim() === '' ||
      companyEmail.trim() === '' ||
      companyContact.trim() === '' ||
      state.trim() === ''
    ) {
      return helpers.dispayMessage({
        message: 'Validation failed',
        description:
          'Business Name, Business Email, Contact Phone Number, State is required',
        icon: 'info',
        type: 'info',
      });
    }
    registerProfileLoadedPageTwo({
      companyName,
      cacRegistrationNumber,
      companyEmail,
      companyContact,
      companyAddress,
      interestedInHardware,
      state,
    });
    navigation.navigate('BVNRegister');
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
      />
      <View style={styles.containerStyle}>
        <ScrollView style={{flex: 1, marginBottom: 20}}>
          <View style={styles.titleWrapper}>
            <TitleText text="Business Details" />
          </View>
          <View>
            <View style={styles.inputWrapper}>
              <TextField
                labelName="Business Name"
                value={companyName}
                onChange={text => setCompanyName(text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <TextField
                labelName="CAC RC"
                value={cacRegistrationNumber}
                onChange={text => setCacRegistrationNumber(text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <TextField
                labelName="Business Email"
                value={companyEmail}
                onChange={text => setCompanyEmail(text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <TextField
                labelName="Business Phone Number"
                value={companyContact}
                onChange={text => setCompanyContact(text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <TextField
                labelName="Business Address"
                value={companyAddress}
                onChange={text => setCompanyAddress(text)}
              />
            </View>
            {/* <View style={styles.inputWrapper}>
              <TextField labelName="State" />
            </View> */}
            <View style={styles.inputWrapper}>
              <Select
                labelName="State"
                placeholder="Select State"
                data={[{label: 'Lagos State', value: 'Lagos State'}]}
                selectedValue={state}
                onChange={text => setState(text)}
              />
            </View>
            <View style={styles.inputWrapper}>
              <View style={styles.moreInfo}>
                <Text style={styles.questionText}>
                  Would you like your SplishPay Hardware
                </Text>
                <Text style={styles.questionText}>
                  delivered to the above address?
                </Text>
                <View style={{flexDirection: 'row', marginTop: 8}}>
                  <View style={{flexDirection: 'row'}}>
                    <CheckBox
                      onPress={() => setInterestedInHardware(true)}
                      color="#007AFF"
                      checked={interestedInHardware}
                    />
                    <Text style={{paddingLeft: 16}}>Yes</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <CheckBox
                      onPress={() => setInterestedInHardware(false)}
                      color="#007AFF"
                      checked={!interestedInHardware}
                    />
                    <Text style={{paddingLeft: 16}}>No</Text>
                  </View>
                </View>
              </View>
            </View>
            <View>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={styles.loginText}>Back</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>

      <FAB iconName="chevron-forward-outline" onPress={handleOnNextPress} />
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
  moreInfo: {
    backgroundColor: '#f2f2f2',
    paddingHorizontal: 8,
    width: '100%',
    paddingVertical: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontFamily: 'SFUIText-Regular',
    color: '#808080',
    textAlign: 'center',
  },
});

const mapStateToProps = (state: any) => {
  return {};
};

export default connect(mapStateToProps, actions)(BusinessDetailsRegister);
