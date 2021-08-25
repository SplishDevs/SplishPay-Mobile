import React, {useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import TitleText from '../../components/TitleText';
import Button from '../../components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import helpers from '../../helpers';
import http_service from '../../http_service';

interface Props {
  navigation: any;
  fullname: string;
  email: string;
  phoneNumber: string;
  password: string;
  companyName: string;
  cacRegistrationNumber: string;
  companyEmail: string;
  companyContact: string;
  companyAddress: string;
  interestedInHardware: boolean;
  state: string;
  startLoading?: Function;
  stopLoading?: Function;
}
const BVNRegistration: React.FC<Props> = ({
  navigation,
  fullname,
  email,
  phoneNumber,
  password,
  companyName,
  cacRegistrationNumber,
  companyEmail,
  companyContact,
  companyAddress,
  interestedInHardware,
  state,
  startLoading,
  stopLoading,
}) => {
  const [nin, setNIN] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleOnFinish = async () => {
    try {
      if (isNaN(Number(nin))) {
        return helpers.dispayMessage({
          message: 'NIN Validation failed',
          description:
            'Invalid NIN, alphanumberic characters not allowed. Only Numbers are allowed',
          icon: 'info',
          type: 'info',
        });
      }
      setIsLoading(true);
      const response: any = await http_service.registerAccount({
        fullname,
        email,
        phoneNumber,
        password,
        companyName,
        cacRegistrationNumber,
        companyEmail,
        companyContact,
        companyAddress,
        interestedInHardware,
        state,
        nin,
      });

      await helpers.setItem('xxx-token', response.token);
      await helpers.setItem('xxx-user', JSON.stringify(response.user));
      setIsLoading(false);
      return navigation.navigate('setupComplete');
    } catch (error) {
      setIsLoading(false);
      console.log(error);
      helpers.catchHttpError(error);
    }
  };
  const handleSkipPress = async () => {
    try {
      if (startLoading) {
        startLoading();
      } else {
        setIsLoading(true);
      }

      const response: any = await http_service.registerAccount({
        fullname,
        email,
        phoneNumber,
        password,
        companyName,
        cacRegistrationNumber,
        companyEmail,
        companyContact,
        companyAddress,
        interestedInHardware,
        state,
      });

      await helpers.setItem('xxx-token', response.token);
      await helpers.setItem('xxx-user', JSON.stringify(response.user));
      if (stopLoading) {
        stopLoading();
      } else {
        setIsLoading(false);
      }
      navigation.navigate('setupComplete');
    } catch (error) {
      helpers.catchHttpError(error);
    }
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#390280'}}>
      <StatusBar
        backgroundColor="#390280"
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
      />
      <ScrollView style={[styles.container, {flex: 1}]}>
        <View style={styles.titleWrapper}>
          <TitleText text="Business Details" color="#fff" />
          <TouchableOpacity onPress={handleSkipPress}>
            <View style={styles.skipContainer}>
              <Text style={styles.skipText}>Skip</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.mt10]}>
          <Text style={[styles.textWhite]}>We use your NIN to ensure your</Text>
          <Text style={[styles.textWhite, styles.mt4]}>
            account belongs to you
          </Text>
        </View>
        <View style={[styles.mt10]}>
          <Text style={[styles.textWhite, styles.bvnLabelStyle]}>
            NIN Verification Number [11-digits]
          </Text>
          <View style={[styles.mt10]}>
            <TextInput
              style={{
                borderBottomColor: '#fff',
                borderBottomWidth: 1,
                fontFamily: 'SFUIText-Regular',
                fontSize: 18,
                color: '#fff',
              }}
              value={nin}
              onChangeText={text => setNIN(text)}
              selectionColor="#fff"
            />
            <Text style={[styles.mt4, styles.textWhite, styles.smallCaption]}>
              A verification code will be sent to number associated
            </Text>
            <Text style={[styles.textWhite, styles.smallCaption]}>
              with this NIN
            </Text>
          </View>
        </View>
        <View style={[styles.p16, styles.mt10, styles.backDropInfo]}>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.smallCirle}>
              <Ionicons name="lock-closed-outline" color="#390280" />
            </View>
            <View style={[styles.ml4]}>
              <Text style={[styles.textWhite, {fontSize: 17}]}>
                Why we need your NIN
              </Text>
              <Text style={[styles.textWhite, styles.smallCaption]}>
                We only need access to your:
              </Text>
              <View style={[styles.mt10, {flexDirection: 'row'}]}>
                <View>
                  <Ionicons name="checkmark-outline" color="#fff" />
                </View>
                <Text style={[styles.ml4, styles.textWhite]}>Full Name</Text>
              </View>
              <View style={[styles.mt10, {flexDirection: 'row'}]}>
                <View>
                  <Ionicons name="checkmark-outline" color="#fff" />
                </View>
                <Text style={[styles.ml4, styles.textWhite]}>Phone Number</Text>
              </View>
              <View style={[styles.mt10, {flexDirection: 'row'}]}>
                <View>
                  <Ionicons name="checkmark-outline" color="#fff" />
                </View>
                <Text style={[styles.ml4, styles.textWhite]}>
                  Date of Birth
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={[
            styles.p16,
            styles.backDropInfo,
            {
              borderTopColor: '#fff',
              borderTopWidth: 1,
              borderTopRightRadius: 0,
              borderTopLeftRadius: 0,
            },
          ]}>
          <View>
            <Text style={[styles.textWhite, {textAlign: 'center'}]}>
              Your NIN does not give us access to your
            </Text>
            <Text style={[styles.textWhite, {textAlign: 'center'}]}>
              bank account information
            </Text>
          </View>
        </View>

        {/* <View style={styles.buttonWrapper}>
          <View style={[styles.buttonContainer, {height: 50}]}>
            <Button
              isLoading={isLoading}
              backgroundColor="#fff"
              textColor="#390280"
              text="Finish"
              onPress={handleOnFinish}
            />
          </View>
        </View> */}
      </ScrollView>
      <View
        style={{
          marginTop: 20,
          height: 50,
          marginBottom: 20,
          paddingHorizontal: 16,
        }}>
        <Button
          isLoading={isLoading}
          spinnerColor="#390280"
          backgroundColor="#fff"
          textColor="#390280"
          text="Finish"
          onPress={handleOnFinish}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  ml4: {
    marginLeft: 4,
  },
  smallCirle: {
    backgroundColor: '#fff',
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backDropInfo: {
    backgroundColor: '#613599',
    borderRadius: 8,
    width: '100%',
  },
  p16: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  smallCaption: {
    fontSize: 12,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 30,
    left: 16,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bvnLabelStyle: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  mt4: {
    marginTop: 4,
  },
  buttonContainer: {
    height: 40,
    width: '90%',
    maxWidth: 300,
  },
  mt10: {
    marginTop: 10,
  },
  textWhite: {
    color: '#fff',
    fontFamily: 'SFUIText-Regular',
  },
  skipContainer: {
    backgroundColor: '#613599',
    width: 80,
    height: 28,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  skipText: {
    color: '#fff',
    fontFamily: 'SFUIText-Heavy',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  titleWrapper: {
    marginTop: 16,
    marginBottom: 28,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

const mapStateToProps = (appState: any) => {
  const {
    authReducer: {
      fullname,
      email,
      phoneNumber,
      password,
      companyName,
      cacRegistrationNumber,
      companyEmail,
      companyContact,
      companyAddress,
      interestedInHardware,
      state,
    },
  } = appState;
  console.log(appState.authReducer);
  return {
    fullname,
    email,
    phoneNumber,
    password,
    companyName,
    cacRegistrationNumber,
    companyEmail,
    companyContact,
    companyAddress,
    interestedInHardware,
    state,
  };
};

export default connect(mapStateToProps, actions)(BVNRegistration);
