import React from 'react';
import {
  View,
  Platform,
  SafeAreaView,
  StatusBar,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import TextField from '../../components/TextField';
import TitleText from '../../components/TitleText';
import Button from '../../components/Button';

const backgroundImage = require('../../../assets/images/bg2.jpg');
const splishPay = require('../../../assets/images/splishpay.png');

const Banner: React.FC<any> = () => {
  return (
    <View style={{flex: 1}}>
      <ImageBackground source={backgroundImage} style={styles.image}>
        <Image
          source={splishPay}
          resizeMode="contain"
          style={styles.splishPayIcon}
        />
      </ImageBackground>
    </View>
  );
};

interface Props {
  navigation: any;
}

const Login: React.FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar
        backgroundColor="#A17DF6"
        barStyle={Platform.OS === 'ios' ? 'light-content' : 'light-content'}
      />
      <View style={{flex: 1}}>
        <View style={{flex: 2}}>
          <Banner />
        </View>
        <View style={{marginHorizontal: 24, marginTop: 20}}>
          <TitleText text="Log In" />
        </View>
        <View style={{flex: 3, marginHorizontal: 24, marginTop: 20}}>
          <View>
            <TextField
              color="#808080"
              iconName="mail-outline"
              labelName="Email"
            />
            <TextField
              color="#808080"
              iconName="lock-closed-outline"
              labelName="Password"
            />
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <View style={styles.buttonContainer}>
            <Button
              text="Log In"
              onPress={() => navigation.navigate('appHome')}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  splishPayIcon: {
    width: 180,
    resizeMode: 'contain',
    height: 180,
  },
  buttonContainer: {
    height: 40,
    width: '90%',
    maxWidth: 300,
  },
  buttonWrapper: {
    position: 'absolute',
    bottom: 30,
    left: 16,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
