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
  services: any;
  startLoading: Function;
  stopLoading: Function;
}

const Items: React.FC<IProps> = ({
  navigation,
  products,
  setProducts,
  services,
  startLoading,
  stopLoading,
}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.WHITE}}>
      <StatusBar backgroundColor={Colors.WHITE} barStyle={'dark-content'} />
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        style={{paddingHorizontal: 16, paddingVertical: 16}}>
        <NoItems
          products={products}
          navigation={navigation}
          services={services}
          setProducts={setProducts}
          onCreateItem={() => navigation.navigate('addItem')}
          onNavigateToItemPage={() => navigation.navigate('item-list')}
          startLoading={startLoading}
          stopLoading={stopLoading}
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
  services: any;
  startLoading: Function;
  stopLoading: Function;
  navigation: any;
}

const NoItems: React.FC<INoItemProps> = ({
  onCreateItem,
  products,
  onNavigateToItemPage,
  setProducts,
  services,
  startLoading,
  navigation,
  stopLoading,
}): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [disAbled, setDisabled] = useState(false);
  const getProducts = async () => {
    try {
      startLoading();
      // setIsLoading(true);
      console.log('called');
      const products: any = await http_service.getUserProduct();
      // await helpers.removeItem('xxx-token');
      // await helpers.removeItem('xxx-user');

      // console.log('o =.>', products);
      stopLoading();
      setIsLoading(false);
      if (products.length > 0) {
        setProducts(products);
        return onNavigateToItemPage ? onNavigateToItemPage() : null;
      }
    } catch (error) {
      helpers.catchHttpError(error);
      setIsLoading(false);
      stopLoading();
    }
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      try {
        console.log('call in effect', products.length);
        if (products.length === 0) {
          getProducts();
        } else {
          onNavigateToItemPage ? onNavigateToItemPage() : null;
        }

        //
      } catch (error) {
        console.log(error);
      }
    });

    try {
      console.log('call in effect', products.length);
      if (products.length === 0) {
        getProducts();
      } else {
        onNavigateToItemPage ? onNavigateToItemPage() : null;
      }

      //
    } catch (error) {
      console.log(error);
    }

    return unsubscribe;
  }, [products.length, services.length]);
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
    product: {products, services},
  } = state;

  return {products, services};
};

export default connect(mapStateToProps, actions)(Items);
