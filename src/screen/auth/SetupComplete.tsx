import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Platform,
  Image,
  Text,
} from 'react-native';
import TitleText from '../../components/TitleText';
import Button from '../../components/Button';

interface Props {
  navigation: any;
}
const SetupComplete: React.FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar
        backgroundColor="#fff"
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
      />
      <View style={styles.containerStyles}>
        <View style={[styles.my20]}>
          <TitleText text="Setup Complete" />
        </View>
        <Image
          source={require('../../../assets/images/Winner.jpg')}
          style={{width: '100%', height: 280}}
          resizeMethod="auto"
          resizeMode="contain"
        />
        <View style={[styles.mt10]}>
          <Text style={styles.infoStyle}>You've successfully set up your</Text>
          <Text style={styles.infoStyle}>
            Splishpay account. Sign In to start
          </Text>
          <Text style={styles.infoStyle}>accepting payments</Text>
        </View>
        <View style={styles.buttonWrapper}>
          <View style={styles.buttonContainer}>
            <Button
              text="Sign In"
              onPress={() => navigation.navigate('login')}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  my20: {
    marginVertical: 20,
  },
  containerStyles: {
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: '#fff',
  },
  mt10: {
    marginTop: 10,
  },
  infoStyle: {
    marginBottom: 4,
    color: '#808080',
    fontFamily: 'SFUIText-Regular',
    fontSize: 16,
    textAlign: 'center',
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

export default SetupComplete;
