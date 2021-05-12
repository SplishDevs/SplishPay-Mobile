import React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Platform,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import TitleText from '../../components/TitleText';
import Button from '../../components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Ionicons';
import {NavigationContainer} from '@react-navigation/native';
interface Props {
  navigation: any;
}
const BVNRegistration: React.FC<Props> = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar
        backgroundColor="#390280"
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
      />
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <TitleText text="Business Details" color="#fff" />
          <TouchableOpacity
            onPress={() => navigation.navigate('setupComplete')}>
            <View style={styles.skipContainer}>
              <Text style={styles.skipText}>Skip</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={[styles.mt10]}>
          <Text style={[styles.textWhite]}>We use your BVN to ensure your</Text>
          <Text style={[styles.textWhite, styles.mt4]}>
            account belongs to you
          </Text>
        </View>
        <View style={[styles.mt10]}>
          <Text style={[styles.textWhite, styles.bvnLabelStyle]}>
            Bank Verification Number [11-digits]
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
              selectionColor="#fff"
            />
            <Text style={[styles.mt4, styles.textWhite, styles.smallCaption]}>
              A verification code will be sent to number associated
            </Text>
            <Text style={[styles.textWhite, styles.smallCaption]}>
              with this BVN
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
                Why we need your BVN
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
              Your BVN does not give us access to your
            </Text>
            <Text style={[styles.textWhite, {textAlign: 'center'}]}>
              bank account information
            </Text>
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <View style={styles.buttonContainer}>
            <Button
              backgroundColor="#fff"
              textColor="#390280"
              text="Finish"
              onPress={() => navigation.navigate('setupComplete')}
            />
          </View>
        </View>
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
    backgroundColor: '#390280',
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

export default BVNRegistration;
