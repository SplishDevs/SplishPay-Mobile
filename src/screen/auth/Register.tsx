import React from 'react';
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

interface Props {
  navigation: any;
}

const Register: React.FC<Props> = ({navigation}) => {
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
              <TextField labelName="Full Name" iconName="person-outline" />
            </View>
            <View style={styles.inputWrapper}>
              <TextField
                keyboardType="email-address"
                labelName="Email"
                iconName="mail-outline"
              />
            </View>
            <View style={styles.inputWrapper}>
              <TextField
                keyboardType="phone-pad"
                labelName="Phone Number"
                iconName="call-outline"
              />
            </View>
            <View style={styles.inputWrapper}>
              <TextField
                obscureText={true}
                labelName="Password"
                iconName="lock-closed-outline"
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.loginWrapper}>
        <TouchableOpacity>
          <Text style={styles.loginText}>Log In</Text>
        </TouchableOpacity>
      </View>
      <FAB
        iconName="chevron-forward-outline"
        onPress={() => navigation.navigate('businessDetailRegister')}
      />
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

export default Register;
