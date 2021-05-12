import React from 'react';
import {View, ImageBackground, StyleSheet, Image} from 'react-native';

const backgroundImage = require('../../assets/images/pink_bg.jpg');
const splishPay = require('../../assets/images/splishpay.png');

const HomeScreen: React.FC<any> = () => {
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
});

export default HomeScreen;
