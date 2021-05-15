import 'react-native-gesture-handler';

import React, {useEffect, useRef} from 'react';
import {StyleSheet, useColorScheme, View} from 'react-native';

import SplashScreen from 'react-native-splash-screen';
import Onboarding from './src/screen/onboarding';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from './src/screen/HomeScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Register from './src/screen/auth/Register';
import Login from './src/screen/auth/Login';
import BusinessDetailsRegister from './src/screen/auth/BusinessDetailRegister';
import BVNRegistration from './src/screen/auth/BVNRegistration';
import SetupComplete from './src/screen/auth/SetupComplete';
import CustomIcon from './CustomIcon';
import Record from './src/screen/Record';
import Charge from './src/screen/charge';
import CashSuccess from './src/screen/charge/CashSuccess';
import BankChargeSuccess from './src/screen/charge/BankChargeSuccess';
import WalletScreen from './src/screen/wallet';
import FundWallet from './src/screen/wallet/FundWallet';
import SendMoney from './src/screen/wallet/SendMoney';
import Notification from './src/screen/notification';
import Transaction from './src/screen/transaction';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Loading from './src/Loading';
import FlashMessage from 'react-native-flash-message';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import reducers from './src/reducers';

const Stack = createStackNavigator();

const TabNavigator = createBottomTabNavigator();

const store = createStore(reducers, applyMiddleware(thunk));

const HomeStack = function () {
  return (
    <Stack.Navigator initialRouteName="app_home">
      <Stack.Screen
        options={{headerShown: false}}
        component={Record}
        name="app_home"
      />
    </Stack.Navigator>
  );
};

const AppHome = function () {
  return (
    <TabNavigator.Navigator initialRouteName="home3">
      <TabNavigator.Screen
        options={{
          tabBarLabel: 'Wallet',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="wallet-outline" color={color} size={size} />
          ),
        }}
        name="home"
        component={WalletScreen}
      />
      <TabNavigator.Screen
        options={{
          tabBarLabel: 'Transactions',
          tabBarIcon: ({color, size}) => (
            <FontAwesome name="exchange-alt" color={color} size={size} />
          ),
        }}
        name="home2"
        component={Transaction}
      />
      <TabNavigator.Screen
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            // <Ionicons name="menu" color={color} size={size} />
            <CustomIcon name="Home" size={size} color={color} />
          ),
        }}
        name="home3"
        component={HomeStack}
      />
      <TabNavigator.Screen
        options={{
          tabBarLabel: 'Items',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="list-outline" color={color} size={size} />
          ),
        }}
        name="home4"
        component={HomeScreen}
      />
      <TabNavigator.Screen
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color, size}) => (
            <Ionicons name="person-circle-outline" color={color} size={size} />
          ),
        }}
        name="home5"
        component={HomeScreen}
      />
    </TabNavigator.Navigator>
  );
};

const ChargeScreen = function () {
  return (
    <Stack.Navigator initialRouteName="charge">
      <Stack.Screen
        options={{headerShown: false}}
        name="charge"
        component={Charge}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const myLocalFlashMessage = useRef();
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="onBoarding">
          <Stack.Screen
            options={{headerShown: false}}
            name="onBoarding"
            component={Onboarding}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="register"
            component={Register}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="login"
            component={Login}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="businessDetailRegister"
            component={BusinessDetailsRegister}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="BVNRegister"
            component={BVNRegistration}
          />
          <Stack.Screen
            name="cashSuccess"
            options={{headerShown: false}}
            component={CashSuccess}
          />
          <Stack.Screen
            name="bankSuccess"
            options={{headerShown: false}}
            component={BankChargeSuccess}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="setupComplete"
            component={SetupComplete}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="appHome"
            component={AppHome}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="chargeScreen"
            component={ChargeScreen}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="fundWallet"
            component={FundWallet}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="sendMoney"
            component={SendMoney}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="notification"
            component={Notification}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <Loading />
      <FlashMessage
        hideOnPress
        duration={4000}
        position="top"
        ref={myLocalFlashMessage.current}
      />
    </Provider>
  );
};

//contentInsetAdjustmentBehavior="automatic"

const styles = StyleSheet.create({
  containerStyle: {
    flex: 1,
  },
  buttonContainer: {
    height: 50,
    marginHorizontal: 24,
  },
  optionalContainer: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionalText: {
    fontFamily: 'SFUIText-Regular',
    fontSize: 18,
  },
  highlightText: {
    marginLeft: 8,
    color: '#007AFF',
  },

  onBoardingTextContatiner: {
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  onBoardingText: {
    color: '#808080',
    fontSize: 18,
    fontFamily: 'SFUIText-Light',
  },
});

export default App;
