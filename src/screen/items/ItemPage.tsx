import React, {useEffect} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import TitleText from '../../components/TitleText';
import {Colors} from '../../util/Colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TextField from '../../components/TextField';
import {Tab, TabHeading, Tabs} from 'native-base';
import {connect} from 'react-redux';
import * as actions from '../../actions';
import http_service from '../../http_service';
import {Col, Grid} from 'react-native-easy-grid';
import GridList from 'react-native-grid-list';
import {Image} from 'react-native-elements/dist/image/Image';
import helpers from '../../helpers';
// import Image from 'react-native-scalable-image';

interface IProps {
  navigation: any;
  products: any;
  setProducts: Function;
  services: any;
  setService: Function;
}

const ItemPage: React.FC<IProps> = ({
  navigation,
  products,
  setProducts,
  services,
  setService,
}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.WHITE}}>
      <StatusBar backgroundColor={Colors.WHITE} barStyle={'dark-content'} />
      <View style={{flex: 1}}>
        <TitleBar navigation={navigation} />
        <Tabs
          style={{backgroundColor: Colors.WHITE, elevation: 0, flex: 1}}
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
                  Items
                </Text>
              </TabHeading>
            }>
            <Product
              navigation={navigation}
              products={products}
              setProducts={setProducts}
            />
          </Tab>
          <Tab
            heading={
              <TabHeading style={{backgroundColor: Colors.WHITE}}>
                <Text
                  style={{
                    fontFamily: 'SFUIText-Regular',
                    color: Colors.BLACK,
                  }}>
                  Service
                </Text>
              </TabHeading>
            }>
            <Service
              navigation={navigation}
              services={services}
              setService={setService}
            />
          </Tab>
          <Tab
            heading={
              <TabHeading style={{backgroundColor: Colors.WHITE}}>
                <Text
                  style={{
                    fontFamily: 'SFUIText-Regular',
                    color: Colors.BLACK,
                  }}>
                  Categories
                </Text>
              </TabHeading>
            }></Tab>
        </Tabs>
      </View>
    </SafeAreaView>
  );
};

interface IProductProps {
  products: any;
  setProducts: Function;
  navigation: any;
}

const Product: React.FC<IProductProps> = ({
  products,
  setProducts,
  navigation,
}) => {
  const getProducts = async () => {
    try {
      // setIsLoading(true);

      const products: any = await http_service.getUserProduct();

      setProducts(products);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getProducts();
  }, []);
  const handleItemOnPress = (item: any) => {
    navigation.navigate('productDetail', {product: item});
    return null;
  };
  const renderItem = ({item}: {item: any}) => {
    return <ProductCard item={item} onPress={handleItemOnPress} />;
  };
  return (
    <View style={{paddingHorizontal: 16, paddingVertical: 20, flex: 1}}>
      <View style={{flex: 1}}>
        <FlatList
          keyExtractor={item => item.id}
          data={products}
          numColumns={2}
          style={{paddingBottom: 20}}
          // style={{flexDirection: 'row', flexWrap: 'wrap', flex: 1}}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

interface IServiceProps {
  services: any;
  setService: Function;
  navigation: any;
}

const Service: React.FC<IServiceProps> = ({
  services,
  setService,
  navigation,
}) => {
  const getServices = async () => {
    try {
      // setIsLoading(true);
      const data: any = await http_service.getUserService();
      console.log(data);
      setService(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getServices();
  }, []);
  const handleItemOnPress = (item: any) => {
    navigation.navigate('productDetail', {product: item});
    return null;
  };
  const renderItem = ({item}: {item: any}) => {
    return <ProductCard item={item} onPress={handleItemOnPress} />;
  };
  return (
    <View style={{paddingHorizontal: 16, paddingVertical: 20, flex: 1}}>
      <View style={{flex: 1}}>
        <FlatList
          keyExtractor={item => item.id}
          data={services}
          numColumns={2}
          style={{paddingBottom: 20}}
          // style={{flexDirection: 'row', flexWrap: 'wrap', flex: 1}}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
};

interface IPropsTitle {
  navigation: any;
  title?: string;
}

export const TitleBar: React.FC<IPropsTitle> = ({navigation, title}) => {
  return (
    <View style={{paddingHorizontal: 16, paddingVertical: 8}}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          marginBottom: 10,
        }}>
        <View style={{flex: 1}}>
          <TitleText
            styles={{
              fontSize: 24,
              color: '#0F0F0F',
              fontWeight: '500',
              textAlign: 'center',
            }}
            text={title ? title : 'Items'}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('addItem')}>
          <Ionicons name="add-outline" color={Colors.BLACK} size={32} />
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row', alignItems: 'stretch'}}>
        <View style={{flex: 1, marginRight: 8}}>
          <TextField containerStyle={{marginBottom: 0}} placeholder="search" />
        </View>
        <View
          style={{
            backgroundColor: '#E7E7E7',
            paddingHorizontal: 16,
            paddingVertical: 0,
            borderRadius: 8,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              padding: 0,
              margin: 0,
              fontWeight: 'normal',
              color: '#878787',
            }}>
            A - Z
          </Text>
        </View>
      </View>
    </View>
  );
};

// export const HeaderTitle: React.FC<IPropsTitle> = ({navigation, title}) => {
//   return (
//     <View style={{paddingHorizontal: 16, paddingVertical: 8}}>
//       <View
//         style={{
//           flexDirection: 'row',
//           width: '100%',
//           marginBottom: 10,
//         }}>
//         <View style={{flex: 1}}>
//           <TitleText
//             styles={{
//               fontSize: 24,
//               color: '#0F0F0F',
//               fontWeight: '500',
//               textAlign: 'center',
//             }}
//             text={title ? title : 'Items'}
//           />
//         </View>
//         <TouchableOpacity onPress={on}>
//           <Ionicons name="add-outline" color={Colors.BLACK} size={32} />
//         </TouchableOpacity>
//       </View>

//     </View>
//   );
// };

const styles = StyleSheet.create({
  description: {
    fontFamily: 'SFUIText-Regular',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

const mapStateToProps = (state: any) => {
  const {
    product: {products, services},
  } = state;
  // console.log('products called to get: ', products);
  return {products, services};
};

interface IProductCardProp {
  item: any;
  onPress?: (item: any) => null;
}

export const ProductCard: React.FC<IProductCardProp> = ({item, onPress}) => {
  return (
    <View
      style={{
        width: '50%',
        marginBottom: 10,
        // backgroundColor: Colors.BLACK,
        paddingHorizontal: 8,
      }}>
      <TouchableOpacity onPress={() => (onPress ? onPress(item) : null)}>
        <Image
          style={{
            width: 200,
            height: 200,
          }}
          containerStyle={{borderRadius: 8}}
          // width={
          //   Dimensions.get('window').width > 200
          //     ? 200
          //     : 0.5 * Dimensions.get('window').width
          // }
          source={{uri: `${item.mainImageUrl}`}}
          resizeMode="cover"
          resizeMethod="scale"
          PlaceholderContent={
            <ActivityIndicator color={Colors.WHITE} size="large" />
          }
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => (onPress ? onPress(item) : null)}>
        <View>
          <TitleText
            styles={{fontSize: 16, fontWeight: 'bold'}}
            text={item.name}
          />
        </View>

        {item?.extraInfo && item?.extraInfo?.length > 0 ? (
          <Text style={styles.description}>
            ({item.extraInfo[0].name} {item.extraInfo[0].quantity}
            {item.extraInfo[1]?.name} {item.extraInfo[1]?.quantity}
            {item?.extraInfo?.length > 1 ? ' ,... ' : null})
          </Text>
        ) : null}
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View>
            <Text
              style={[styles.description, {color: '#878787', fontSize: 14}]}>
              N {helpers.formatAsMoney(item.price)}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{
                width: 16,
                height: 16,
                borderRadius: 8,
                borderWidth: 3,
                borderColor: item.categoryColor,
                marginRight: 4,
              }}></View>
            <Ionicons name="cart-outline" color={Colors.BLACK} size={18} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default connect(mapStateToProps, actions)(ItemPage);
