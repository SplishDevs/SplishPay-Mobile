import React, {useEffect, useState} from 'react';
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Image} from 'react-native-elements/dist/image/Image';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import {Colors} from '../../util/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TitleText from '../../components/TitleText';
import helpers from '../../helpers';
import items from '.';
import Button from '../../components/Button';
// import Ionicons from 'react-native-vector-icons/Ionicons';

interface IProps {
  navigation: any;
  route: any;
  addToCart: Function;
}

const ProductDetail: React.FC<IProps> = ({navigation, route, addToCart}) => {
  const {product} = route.params;
  const onBackPress = () => {
    navigation.goBack();
  };
  const addItemToCart = async (item: any) => {
    try {
      await addToCart(item);
      helpers.dispayMessage({
        message: 'Add to cart successful',
        description: 'Product successfully added to cart',
        icon: 'success',
        type: 'success',
      });
    } catch (error) {
      console.log(error);
    }
  };
  const renderExtras = () => {
    return product?.extraInfo?.map((item: any) => (
      <View
        style={{
          backgroundColor: '#E7E7E7',
          paddingHorizontal: 16,
          paddingVertical: 2,
          borderRadius: 8,
          flexDirection: 'row',
        }}>
        <Text style={{color: '#878787'}}>{item.name}:</Text>
        <Text style={{color: '#878787'}}>{item.quantity}</Text>
      </View>
    ));
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={Colors.WHITE} barStyle={'dark-content'} />
      <View style={{flex: 1, backgroundColor: Colors.WHITE}}>
        <HeaderProduct product={product} onBackPress={onBackPress} />
        <View style={{flex: 1, paddingHorizontal: 16, paddingBottom: 16}}>
          <View style={{flex: 1}}>
            <View>
              <TitleText styles={{fontSize: 20}} text={product.name} />
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View>
                <TitleText
                  styles={{fontSize: 20}}
                  text={`N ${helpers.formatAsMoney(product.price)}`}
                />
              </View>
              <View
                style={{
                  marginLeft: 30,
                  width: 18,
                  height: 18,
                  borderRadius: 9,
                  backgroundColor: product.categoryColor,
                  borderColor: product.categoryColor,
                  borderWidth: 1,
                }}></View>
            </View>
            <View
              style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 8}}>
              {renderExtras()}
            </View>
          </View>
          <View>
            <TouchableOpacity
              style={{
                backgroundColor: Colors.BLACK,
                borderColor: Colors.BLACK,
                width: 60,
                height: 60,
                borderRadius: 8,
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => addItemToCart(product)}>
              <Ionicons name="cart-outline" size={32} color={Colors.WHITE} />
            </TouchableOpacity>
            <View style={{height: 50, marginTop: 10}}>
              <Button
                onPress={() => {
                  addItemToCart(product);
                  navigation.navigate('purchasePage');
                }}
                text="Sell Now"
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

interface IHeaderProps {
  product: any;
  onBackPress?: () => void;
}

const HeaderProduct: React.FC<IHeaderProps> = ({product, onBackPress}) => {
  const [mainImage, setMainImage] = useState(product.mainImageUrl);

  const handleImageChange = (url: string) => {
    setMainImage(url);
  };
  return (
    <View style={{width: '100%'}}>
      <View style={{width: '100%', height: 320}}>
        <Image
          source={{uri: mainImage}}
          resizeMethod="scale"
          resizeMode="cover"
          style={{width: '100%', height: '100%'}}
        />
        <Pressable
          style={{position: 'absolute', top: 10, left: 10}}
          onPress={onBackPress}>
          <View>
            <Ionicons
              name="chevron-back-outline"
              color={Colors.BLACK}
              size={32}
            />
          </View>
        </Pressable>
      </View>
      <ScrollView
        style={{paddingVertical: 10, paddingHorizontal: 10}}
        horizontal={true}>
        {product.mainImageUrl.trim() !== '' && (
          <Image
            onPress={() => handleImageChange(product.mainImageUrl)}
            source={{uri: product.mainImageUrl}}
            resizeMethod="auto"
            resizeMode="cover"
            containerStyle={{borderRadius: 8}}
            style={{width: 80, height: 56, marginRight: 8}}
          />
        )}
        {product.otherImageUrl1.trim() !== '' && (
          <Image
            onPress={() => handleImageChange(product.otherImageUrl1)}
            source={{uri: product.otherImageUrl1}}
            resizeMethod="auto"
            resizeMode="cover"
            containerStyle={{borderRadius: 8}}
            style={{width: 80, height: 56, marginRight: 8}}
          />
        )}
        {product.otherImageUrl2.trim() !== '' && (
          <Image
            onPress={() => handleImageChange(product.otherImageUrl2)}
            source={{uri: product.otherImageUrl1}}
            resizeMethod="auto"
            resizeMode="cover"
            containerStyle={{borderRadius: 8}}
            style={{width: 80, height: 56, marginRight: 8}}
          />
        )}
        {product.otherImageUrl3.trim() !== '' && (
          <Image
            onPress={() => handleImageChange(product.otherImageUrl3)}
            source={{uri: product.otherImageUrl1}}
            resizeMethod="auto"
            containerStyle={{borderRadius: 8}}
            resizeMode="cover"
            style={{width: 80, height: 56, marginRight: 8}}
          />
        )}
        {product.otherImageUrl4.trim() !== '' && (
          <Image
            onPress={() => handleImageChange(product.otherImageUrl4)}
            source={{uri: product.otherImageUrl1}}
            resizeMethod="auto"
            containerStyle={{borderRadius: 8}}
            resizeMode="cover"
            style={{width: 80, height: 56, marginRight: 8}}
          />
        )}
        {product.otherImageUrl5.trim() !== '' && (
          <Image
            onPress={() => handleImageChange(product.otherImageUrl5)}
            source={{uri: product.otherImageUrl1}}
            resizeMethod="auto"
            resizeMode="cover"
            style={{width: 80, height: 56, marginRight: 8}}
          />
        )}
        {product.otherImageUrl6.trim() !== '' && (
          <Image
            onPress={() => handleImageChange(product.otherImageUrl6)}
            source={{uri: product.otherImageUrl1}}
            resizeMethod="auto"
            resizeMode="cover"
            containerStyle={{borderRadius: 8}}
            style={{width: 80, height: 56, marginRight: 8}}
          />
        )}
        {product.otherImageUrl7.trim() !== '' && (
          <Image
            onPress={() => handleImageChange(product.otherImageUrl7)}
            source={{uri: product.otherImageUrl1}}
            resizeMethod="auto"
            resizeMode="cover"
            containerStyle={{borderRadius: 8}}
            style={{width: 80, height: 56, marginRight: 8}}
          />
        )}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state: any) => {
  return {};
};

export default connect(mapStateToProps, actions)(ProductDetail);
