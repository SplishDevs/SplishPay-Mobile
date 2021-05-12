import {Text} from 'native-base';
import React from 'react';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Button from '../../components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
  navigation: any;
}

const Record: React.FC<Props> = function ({navigation}) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar
        backgroundColor="#fff"
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
      />
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View>
          <Text style={styles.titleHeader}>Record Transaction</Text>
        </View>
        <View style={{flex: 2}}></View>
        <View style={styles.noteContainer}>
          <View
            style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Text style={{textAlign: 'right', paddingRight: 8}}>Note</Text>
            <Ionicons name="pencil-outline" size={24} />
          </View>
          <View style={{flex: 3}}></View>
        </View>
        <View style={{flex: 3}}>
          <View style={{flexDirection: 'row', flex: 1}}>
            <TouchableOpacity style={styles.keyPadStyle}>
              <View>
                <Text style={styles.keyPadText}>1</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.keyPadStyle}>
              <View>
                <Text style={styles.keyPadText}>2</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.keyPadStyle}>
              <View>
                <Text style={styles.keyPadText}>3</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{flexDirection: 'row', flex: 1}}>
            <TouchableOpacity style={styles.keyPadStyle}>
              <View>
                <Text style={styles.keyPadText}>4</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.keyPadStyle}>
              <View>
                <Text style={styles.keyPadText}>5</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.keyPadStyle}>
              <View>
                <Text style={styles.keyPadText}>6</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', flex: 1}}>
            <TouchableOpacity style={styles.keyPadStyle}>
              <View>
                <Text style={styles.keyPadText}>7</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.keyPadStyle}>
              <View>
                <Text style={styles.keyPadText}>8</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.keyPadStyle}>
              <View>
                <Text style={styles.keyPadText}>9</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection: 'row', flex: 1}}>
            <TouchableOpacity style={styles.keyPadStyle}>
              <View>
                <Text style={styles.keyPadText}>00</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.keyPadStyle}>
              <View>
                <Text style={styles.keyPadText}>0</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.keyPadStyle}>
              <View>
                <Text style={styles.keyPadText}> {'<'} </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button
            text="Charge"
            onPress={() =>
              navigation.navigate('chargeScreen', {screen: 'charge'})
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: '100%',
    marginVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyPadStyle: {
    flex: 1,
    alignItems: 'center',
  },
  keyPadText: {
    justifyContent: 'center',
    fontFamily: 'SFUIText-Regular',
    fontSize: 24,
    fontWeight: '400',
  },
  buttonWrapper: {
    maxWidth: 300,
    width: '100%',
    height: 40,
  },
  titleHeader: {
    textAlign: 'center',
    fontFamily: 'SFUIText-Regular',
    marginVertical: 20,
    fontSize: 24,
  },
  noteContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    flexDirection: 'row',
    width: '100%',
    borderBottomColor: '#F2F2F2',
    borderTopColor: '#F2F2F2',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    marginBottom: 16,
  },
});

export default Record;
