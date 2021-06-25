// import { NavigationContainer } from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import Button from '../../components/Button';
import helpers from '../../helpers';
import http_service from '../../http_service';
import * as actions from '../../actions';
// import { Image } from 'react-native-svg';
import {Colors} from '../../util/Colors';

const noItems = require('../../../assets/images/noItem.png');

interface IProps {
  navigation: any;
  products: any;
  setProducts: Function;
}

const Items: React.FC<IProps> = ({navigation, products, setProducts}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.WHITE}}>
      <StatusBar backgroundColor={Colors.WHITE} barStyle={'dark-content'} />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={{paddingHorizontal: 16, paddingVertical: 16}}>
        <NoItems
          products={products}
          setProducts={setProducts}
          onCreateItem={() => navigation.navigate('addItem')}
          onNavigateToItemPage={() => navigation.navigate('item-list')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

interface INoItemProps {
  onCreateItem?: () => void;
  products: any;
  onNavigateToItemPage?: () => void;
  setProducts: Function;
}

const NoItems: React.FC<INoItemProps> = ({
  onCreateItem,
  products,
  onNavigateToItemPage,
  setProducts,
}): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [disAbled, setDisabled] = useState(true);
  const getProducts = async () => {
    try {
      setIsLoading(true);
      console.log('called');
      const products: any = await http_service.getUserProduct();
      console.log('o =.>', products);
      setIsLoading(false);
      if (products.length > 0) {
        setProducts(products);
        return onNavigateToItemPage ? onNavigateToItemPage() : null;
      }

      setDisabled(false);
    } catch (error) {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    try {
      if (products.length === 0) {
        getProducts();
      }

      // onNavigateToItemPage ? onNavigateToItemPage() : null;
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Image
        source={noItems}
        style={{width: 180}}
        resizeMethod="auto"
        resizeMode="contain"
      />
      <Text
        style={[
          styles.text,
          {color: Colors.BLACK, fontWeight: 'normal', fontSize: 18},
        ]}>
        No Items yet
      </Text>
      <View style={{height: 40, width: '100%', marginTop: 10}}>
        <Button
          onPress={() =>
            disAbled ? null : onCreateItem ? onCreateItem() : null
          }
          backgroundColor={Colors.BLUE}
          text="Create New Item"
          textColor={Colors.WHITE}
          styles={{borderColor: Colors.BLUE}}
        />
      </View>
      <View style={{marginTop: 20, justifyContent: 'center'}}>
        {isLoading && <ActivityIndicator color={Colors.BLUE} size="large" />}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'SFUIText-Regular',
  },
});

const mapStateToProps = (state: any) => {
  const {
    product: {products},
  } = state;

  return {products};
};

export default connect(mapStateToProps, actions)(Items);
