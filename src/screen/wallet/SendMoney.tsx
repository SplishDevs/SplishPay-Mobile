import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../util/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TitleText from '../../components/TitleText';
import {Container, Header, Tab, TabHeading, Tabs} from 'native-base';
import TextField from '../../components/TextField';
import Button from '../../components/Button';

interface Props {
  navigation: any;
}

const SendMoney: React.FC<Props> = ({navigation}) => {
  const moneyFraction = '20';
  const moneyWholeNumber = '1,000';
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        backgroundColor={Colors.DARK_BLUE}
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
      />
      <KeyboardAvoidingView style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={{backgroundColor: Colors.WHITE}}>
          <View style={styles.greenContainer}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                  name="chevron-back-outline"
                  size={40}
                  color={Colors.WHITE}
                />
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TitleText
                  text="Send Money"
                  styles={{fontWeight: 'normal', color: Colors.WHITE}}
                />
              </View>
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 20,
              }}>
              <TitleText
                text="Your Balance is"
                styles={{
                  fontWeight: 'normal',
                  fontSize: 16,
                  color: Colors.WHITE,
                }}
              />
            </View>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 20,
              }}>
              <Text
                style={[
                  styles.smallText,
                  {
                    color: Colors.WHITE,
                    fontSize: 24,
                    fontWeight: 'bold',
                  },
                ]}>
                {moneyWholeNumber}.
                {/* <View style={{position: 'absolute', right: -0, top: 10}}> */}
                <View
                  style={{
                    position: 'absolute',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    right: -1000,
                    top: 0,
                    width: 60,
                    // height: 20,
                    // backgroundColor: Colors.GREEN,
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      right: 30,
                      top: -10,
                    }}>
                    <Text
                      style={[
                        styles.smallText,
                        {
                          color: Colors.WHITE,
                          fontSize: 24,
                          fontWeight: 'bold',
                        },
                      ]}>
                      {moneyFraction}
                    </Text>
                  </View>
                </View>
                {/* </View> */}
              </Text>
            </View>
          </View>
          <View style={{paddingHorizontal: 16, paddingVertical: 16, flex: 1}}>
            <TitleText
              text="Send Money to"
              styles={{color: Colors.GRAY_1, fontSize: 18}}
            />

            <Tabs
              style={{backgroundColor: Colors.BLACK, elevation: 0}}
              tabBarBackgroundColor={Colors.BLACK}
              //   tabBarBackgroundColor={Colors.GRAY_1}
              tabBarUnderlineStyle={{
                backgroundColor: Colors.BLUE,
                height: 2,
              }}
              tabContainerStyle={{
                backgroundColor: Colors.BLUE,
                elevation: 0,
                borderWidth: 0,
                borderBottomWidth: 0.5,
                borderBottomColor: Colors.GRAY_1,
              }}
              tabBarActiveTextColor={Colors.GRAY_1}
              tabBarTextStyle={{
                fontFamily: 'SFUIText-Regular',
                backgroundColor: Colors.RED,
              }}>
              <Tab
                tabStyle={{flex: 1, borderBottomWidth: 0}}
                heading={
                  <TabHeading
                    style={{
                      backgroundColor: Colors.WHITE,
                      borderBottomWidth: 0,
                      borderWidth: 0,
                    }}>
                    <Text
                      style={{
                        fontFamily: 'SFUIText-Regular',
                        color: Colors.BLACK,
                      }}>
                      SplishPay Username
                    </Text>
                  </TabHeading>
                }>
                <SplishPayUsernameTab />
              </Tab>
              <Tab
                heading={
                  <TabHeading style={{backgroundColor: Colors.WHITE}}>
                    <Text
                      style={{
                        fontFamily: 'SFUIText-Regular',
                        color: Colors.BLACK,
                      }}>
                      Local Bank Account
                    </Text>
                  </TabHeading>
                }>
                <SplishLocalAccount />
              </Tab>
            </Tabs>

            <View>
              <View style={{height: 50, marginTop: 16}}>
                <Button
                  onPress={() => {}}
                  text="Send money"
                  textColor={Colors.WHITE}
                  styles={{backgroundColor: Colors.BLACK}}
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// const renderTabBar = (props) => {
//   props.tabStyle = Object.create(props.tabStyle);
//   return <Default {...props} />;
// };

const SplishPayUsernameTab: React.FC = () => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.WHITE}}>
      <View style={{marginVertical: 16}}>
        <TextField
          labelName="Username"
          iconName="person"
          placeholder="Username"
        />
      </View>

      <View style={{flexDirection: 'row', width: '100%'}}>
        <View style={{flex: 1}}>
          <TextField labelName="Amount" />
        </View>
        <View style={{marginLeft: 8, flex: 1}}>
          <TextField labelName="Note" iconName="pencil" />
        </View>
      </View>
    </View>
  );
};

const SplishLocalAccount: React.FC = () => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.WHITE}}>
      <View style={{marginVertical: 16}}>
        <TextField
          labelName="Bank Account Number"
          placeholder="Account Number"
        />
      </View>
      <View style={{marginBottom: 16}}>
        <TextField labelName="Bank" placeholder="" />
      </View>

      <View style={{flexDirection: 'row', width: '100%'}}>
        <View style={{flex: 1}}>
          <TextField labelName="Amount" />
        </View>
        <View style={{marginLeft: 8, flex: 1}}>
          <TextField labelName="Note" iconName="pencil" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  greenContainer: {
    backgroundColor: Colors.DARK_BLUE,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  smallText: {
    fontFamily: 'SFUIText-Regular',
    fontSize: 10,
    color: Colors.GRAY_2,
    marginLeft: 8,
  },
});

export default SendMoney;
