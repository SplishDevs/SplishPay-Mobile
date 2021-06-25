import {Tab, TabHeading, Tabs} from 'native-base';
import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Image,
  Text,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
  Modal,
} from 'react-native';
import Button from '../../components/Button';
import TitleText from '../../components/TitleText';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  launchCamera,
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
// import { Image } from 'react-native-svg';
import {Colors} from '../../util/Colors';
import TextField from '../../components/TextField';
import BottomSheet from 'react-native-gesture-bottom-sheet';
import {State} from 'react-native-gesture-handler';
import helpers from '../../helpers';
import http_service from '../../http_service';
import {connect} from 'react-redux';
import * as actions from '../../actions';
// import { NavigationContainer } from '@react-navigation/native';

const gallery = require('../../../assets/images/gallery.png');

interface IProps {
  navigation: any;
  setService: Function;
  setProducts: Function;
}
const AddItem: React.FC<IProps> = ({navigation, setService, setProducts}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: Colors.WHITE}}>
      <StatusBar backgroundColor={Colors.WHITE} barStyle={'dark-content'} />
      <KeyboardAvoidingView
        style={{flex: 1, paddingHorizontal: 16, paddingVertical: 16}}
        behavior="padding">
        <View
          // contentContainerStyle={{flexGrow: 1}}
          style={{
            flex: 1,
          }}>
          <View style={{alignItems: 'center', flexDirection: 'row'}}>
            <Pressable onPress={() => navigation.goBack()}>
              <Ionicons name="chevron-back-outline" size={32} />
            </Pressable>
            <View style={{flex: 1}}>
              <TitleText
                text="Add Item"
                styles={{fontWeight: '300', textAlign: 'center'}}
              />
            </View>
          </View>
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
                    Item
                  </Text>
                </TabHeading>
              }>
              <ItemTab setProducts={setProducts} />
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
              <ServiceTab setService={setService} />
            </Tab>
          </Tabs>

          {/* <NoItems /> */}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

interface IItemProps {
  setProducts: Function;
}

const ItemTab: React.FC<IItemProps> = ({setProducts}) => {
  const [image, setImage] = useState<string | 'undefined' | null>();
  const [count, setCount] = useState(0);
  const [imageIndex, setImageIndex] = useState(-1);
  const [additionImages, setAdditionImages] = useState<any>({});
  const bottomSheet = useRef<any>(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [extraName, setExtraName] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [size, setSize] = useState('');
  const [extraQuantity, setExtraQuantity] = useState('');
  const [extras, setExtras] = useState<{name: string; quantity: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [customCategoryName, setCustomCategoryName] = useState('');
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
    return setCount(0);
  }, []);
  const [categoryColor] = useState<{color: string}[]>([
    {color: '#FF3E38'},
    {color: '#D90068'},
    {color: '#F3DB00'},
    {color: '#007AFF'},
    {color: '#9AF8AE'},
    {color: '#E0B002'},
    {color: '#390280'},
  ]);
  const [containerImages, setContainerImage] = useState<{id: number}[]>([]);
  const renderAdditionImages = () => {
    return containerImages.map((item, i) => (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
        }}
        key={i}>
        <Pressable
          style={{flex: 1, borderRadius: 40}}
          onPress={() => selectPickerOptionWithIndex(item.id)}>
          {additionImages[item.id] ? (
            <ImageBackground
              style={{height: 140, borderRadius: 40, flex: 1}}
              source={{uri: additionImages[item.id]}}
            />
          ) : (
            <View
              style={{
                backgroundColor: Colors.GREY_4,
                height: 140,
                borderRadius: 16,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={gallery}
                style={{width: 100}}
                resizeMethod="auto"
                resizeMode="contain"
              />
            </View>
          )}
        </Pressable>
        <View style={{marginLeft: 8}}>
          <Pressable
            onPress={() => removeItem(item.id)}
            style={{
              backgroundColor: Colors.LIGHT_BLUE,
              paddingVertical: 10,
              paddingHorizontal: 10,
              borderRadius: 8,
              borderColor: Colors.LIGHT_BLUE,
              borderWidth: 1,
            }}>
            <Ionicons name="remove-outline" size={32} color={Colors.RED} />
          </Pressable>
        </View>
      </View>
    ));
  };

  const selectPickerOption = () => {
    return bottomSheet.current ? bottomSheet.current.show() : null;
  };
  const selectPickerOptionWithIndex = (index: number) => {
    setImageIndex(index);
    return bottomSheet.current ? bottomSheet.current.show() : null;
  };
  const loadCamera = (id?: string) => {
    launchCamera(
      {saveToPhotos: true, mediaType: 'photo', maxWidth: 2000},
      (res: ImagePickerResponse) => {
        // console.log(res.uri);

        if (imageIndex !== -1) {
          setAdditionImages((state: any) => ({
            ...state,
            [imageIndex]: res.uri,
          }));
          setImageIndex(-1);
          // bottomSheet.current.hide();
        } else {
          setImage(res.uri);
        }
      },
    );
  };
  const removeItem = (id: number) => {
    const imag = [...containerImages];
    const itemIndex = imag.findIndex(item => item.id === id);

    imag.splice(itemIndex, 1);
    setContainerImage([...imag]);
    setAdditionImages((state: any) => ({...state, [id]: null}));
  };
  const loadGallery = (id?: string) => {
    launchImageLibrary(
      {mediaType: 'photo', maxWidth: 2000},
      (res: ImagePickerResponse) => {
        if (imageIndex !== -1) {
          console.log('called here o index: ', imageIndex);
          setAdditionImages((state: any) => ({
            ...state,
            [imageIndex]: res.uri,
          }));
          setImageIndex(-1);
          // bottomSheet.current.hide();
        } else {
          setImage(res.uri);
        }
      },
    );
  };
  const addMoreImages = () => {
    setCount(count => ++count);

    setContainerImage(images => [...images, {id: count}]);
    // setCount(count => count++);
  };
  const handleAddOption = () => {
    if (extraName.trim() !== '' && extraQuantity.trim() !== '') {
      setExtras(extra => [
        ...extra,
        {name: extraName, quantity: extraQuantity},
      ]);
      setExtraName('');
      setExtraQuantity('');
    }
    setModalVisible(false);
  };
  const renderExtra = () => {
    return extras.map((item, i) => {
      return (
        <TextField
          key={i}
          labelName={item.name}
          value={item.quantity}
          onChange={text => handleExtraUpdate(text, i)}
        />
      );
    });
  };
  const handleExtraUpdate = (newValue: string, index: number) => {
    const oldExtra = extras;
    oldExtra[index].quantity = newValue;
    setExtras([...oldExtra]);
  };
  const handleAddItem = async () => {
    try {
      if (!image) {
        return helpers.dispayMessage({
          message: 'Validation failed',
          description: 'You must upload atleast one image',
          icon: 'info',
          type: 'info',
        });
      }
      const imagesUri: string[] = [];
      if (image) {
        imagesUri.push(image);
        console.log(additionImages);
        Object.values(additionImages).forEach(value =>
          value ? imagesUri.push(`${value}`) : null,
        );
        const imageBlobs = [];

        for (let i = 0; i < imagesUri.length; i++) {
          const blob = await helpers.uriToBlob(imagesUri[i]);
          imageBlobs.push(blob);
        }

        if (
          name.trim() === '' ||
          price.trim() === '' ||
          size.trim() === '' ||
          selectedColor.trim() === ''
        ) {
          return helpers.dispayMessage({
            message: 'Validation failed',
            description:
              'Service Name, Price, Time Duration and Category color is required',
            icon: 'info',
            type: 'info',
          });
        }

        setIsLoading(true);
        const response = await http_service.createProduct({
          extras,
          customCategoryName,
          name,
          size,
          price,
          categoryColor: selectedColor,
          imageBlobs,
        });

        await getProducts();
        console.log('success::: ', response);
        helpers.dispayMessage({
          message: 'Product created',
          description: 'Operation successful, product successfully created',
          icon: 'success',
          type: 'success',
        });
        setIsLoading(false);
        resetForm();
      }
    } catch (error) {
      helpers.catchHttpError(error);
      setIsLoading(false);
    }
  };
  const resetForm = () => {
    setName('');
    setPrice('');
    setSize('');
    setExtras([]);
    setImage(null);
    setSelectedColor('');
    setAdditionImages([]);
  };
  return (
    <ScrollView style={{flex: 1, paddingVertical: 16}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Pressable
          style={{flex: 1, borderRadius: 40}}
          onPress={selectPickerOption}>
          {image ? (
            <ImageBackground
              style={{height: 140, borderRadius: 40, flex: 1}}
              source={{uri: image}}
            />
          ) : (
            <View
              style={{
                backgroundColor: Colors.GREY_4,
                height: 140,
                borderRadius: 16,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={gallery}
                style={{width: 100}}
                resizeMethod="auto"
                resizeMode="contain"
              />
            </View>
          )}
        </Pressable>
        <View style={{marginLeft: 8}}>
          <Pressable
            onPress={addMoreImages}
            style={{
              backgroundColor: Colors.LIGHT_BLUE,
              paddingVertical: 10,
              paddingHorizontal: 10,
              borderRadius: 8,
              borderColor: Colors.LIGHT_BLUE,
              borderWidth: 1,
            }}>
            <Ionicons name="add-outline" size={32} color={Colors.BLUE} />
          </Pressable>
        </View>
      </View>

      {renderAdditionImages()}
      <View style={{marginBottom: 10, marginTop: 20}}>
        <TextField
          value={name}
          onChange={text => setName(text)}
          labelName="Product Name"
        />
      </View>
      {/* <View style={{marginBottom: 10}}>
        <TextField labelName="Price" />
      </View> */}
      <View style={{marginBottom: 10, flexDirection: 'row'}}>
        <View style={{flex: 1, marginRight: 8}}>
          <TextField
            value={price}
            onChange={text => setPrice(text)}
            labelName="Price"
          />
        </View>
        <View style={{flex: 1}}>
          <TextField
            value={size}
            onChange={text => setSize(text)}
            labelName="Size"
          />
        </View>
      </View>
      <View style={{marginBottom: 10}}>{renderExtra()}</View>
      <View
        style={{marginBottom: 10, alignItems: 'center', flexDirection: 'row'}}>
        <View style={{flex: 1, marginRight: 8}}>
          <TextField labelName="Color" />
        </View>
        <View style={{flex: 1}}>
          <View style={{height: 50}}>
            <Button
              textColor={Colors.WHITE}
              styles={{
                backgroundColor: '#878787',
                borderColor: '#878787',
              }}
              text="Add new Option"
              onPress={() => setModalVisible(true)}
            />
          </View>
        </View>
      </View>
      <View>
        <TitleText text="Category" styles={{fontSize: 15}} />
        <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
          {categoryColor.map((item, i) => (
            <TouchableOpacity
              onPress={() => setSelectedColor(item.color)}
              key={i}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: item.color,
                borderColor:
                  selectedColor === item.color ? Colors.BLACK : item.color,
                borderWidth: 2,
                marginLeft: 8,
                marginBottom: 10,
              }}></TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={{marginVertical: 10}}>
        <TextField
          value={customCategoryName}
          onChange={text => setCustomCategoryName(text)}
          labelName="Category Name"
        />
      </View>
      <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
        <TitleText
          styles={{fontSize: 16, color: '#101010', fontWeight: 'normal'}}
          text="Select from saved categories"
        />
        <View style={{marginLeft: 4, alignItems: 'center'}}>
          <Ionicons name="chevron-forward-outline" color="#101010" />
        </View>
      </TouchableOpacity>
      <View style={{height: 50, marginBottom: 20, marginTop: 20}}>
        <Button
          isLoading={isLoading}
          text="Save Item"
          onPress={handleAddItem}
        />
      </View>
      <BottomSheet
        draggable={false}
        height={160}
        hasDraggableIcon
        ref={bottomSheet}>
        <View style={{flex: 1, paddingHorizontal: 16, paddingVertical: 16}}>
          <TitleText
            text="Choose From"
            styles={{marginBottom: 10, fontSize: 16, fontWeight: '300'}}
          />
          <TouchableOpacity onPress={() => loadGallery()}>
            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <Ionicons name="images-outline" size={24} color={Colors.BLUE} />
              <TitleText
                text="Gallery"
                styles={{fontSize: 16, fontWeight: '300', marginLeft: 8}}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => loadCamera()}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name="camera-outline" size={24} color={Colors.BLUE} />
              <TitleText
                text="Camera"
                styles={{fontSize: 16, fontWeight: '300', marginLeft: 8}}
              />
            </View>
          </TouchableOpacity>
        </View>
      </BottomSheet>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          setModalVisible(!isModalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TitleText
              styles={{
                textAlign: 'center',
                color: '#0F0F0F',
                fontSize: 16,
                fontWeight: 'normal',
              }}
              text="Create custom options for this product"
            />
            <View>
              <TextField
                labelName="Name"
                value={extraName}
                onChange={text => setExtraName(text)}
              />
              <TextField
                labelName="Description/Quantity"
                value={extraQuantity}
                onChange={text => setExtraQuantity(text)}
              />
            </View>
            <View style={{flexDirection: 'row', width: '100%', marginTop: 10}}>
              <View style={{height: 40, flex: 1, marginRight: 10}}>
                <Button
                  textColor="#878787"
                  styles={{backgroundColor: '#E7E7E7', borderColor: '#E7E7E7'}}
                  text="Close"
                  textStyles={{fontSize: 16}}
                  onPress={() => setModalVisible(false)}
                />
              </View>
              <View style={{height: 40, flex: 1}}>
                <Button text="Finish" onPress={handleAddOption} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

interface IServiceProps {
  setService: Function;
}

const ServiceTab: React.FC<IServiceProps> = ({setService}) => {
  const [image, setImage] = useState<string | 'undefined' | null>();
  const [count, setCount] = useState(0);
  const [imageIndex, setImageIndex] = useState(-1);
  const [additionImages, setAdditionImages] = useState<any>({});
  const bottomSheet = useRef<any>(null);
  const [selectedColor, setSelectedColor] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [extraName, setExtraName] = useState('');
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [timeDuration, setTimeDuration] = useState('');
  const [extraQuantity, setExtraQuantity] = useState('');
  const [extras, setExtras] = useState<{name: string; quantity: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [customCategoryName, setCustomCategoryName] = useState('');
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
    return setCount(0);
  }, []);
  const [categoryColor] = useState<{color: string}[]>([
    {color: '#FF3E38'},
    {color: '#D90068'},
    {color: '#F3DB00'},
    {color: '#007AFF'},
    {color: '#9AF8AE'},
    {color: '#E0B002'},
    {color: '#390280'},
  ]);
  const [containerImages, setContainerImage] = useState<{id: number}[]>([]);
  const renderAdditionImages = () => {
    return containerImages.map((item, i) => (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
        }}
        key={i}>
        <Pressable
          style={{flex: 1, borderRadius: 40}}
          onPress={() => selectPickerOptionWithIndex(item.id)}>
          {additionImages[item.id] ? (
            <ImageBackground
              style={{height: 140, borderRadius: 40, flex: 1}}
              source={{uri: additionImages[item.id]}}
            />
          ) : (
            <View
              style={{
                backgroundColor: Colors.GREY_4,
                height: 140,
                borderRadius: 16,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={gallery}
                style={{width: 100}}
                resizeMethod="auto"
                resizeMode="contain"
              />
            </View>
          )}
        </Pressable>
        <View style={{marginLeft: 8}}>
          <Pressable
            onPress={() => removeItem(item.id)}
            style={{
              backgroundColor: Colors.LIGHT_BLUE,
              paddingVertical: 10,
              paddingHorizontal: 10,
              borderRadius: 8,
              borderColor: Colors.LIGHT_BLUE,
              borderWidth: 1,
            }}>
            <Ionicons name="remove-outline" size={32} color={Colors.RED} />
          </Pressable>
        </View>
      </View>
    ));
  };

  const selectPickerOption = () => {
    return bottomSheet.current ? bottomSheet.current.show() : null;
  };
  const selectPickerOptionWithIndex = (index: number) => {
    setImageIndex(index);
    return bottomSheet.current ? bottomSheet.current.show() : null;
  };
  const loadCamera = (id?: string) => {
    launchCamera(
      {saveToPhotos: true, mediaType: 'photo', maxWidth: 2000},
      (res: ImagePickerResponse) => {
        // console.log(res.uri);

        if (imageIndex !== -1) {
          setAdditionImages((state: any) => ({
            ...state,
            [imageIndex]: res.uri,
          }));
          setImageIndex(-1);
          // bottomSheet.current.hide();
        } else {
          setImage(res.uri);
        }
      },
    );
  };
  const removeItem = (id: number) => {
    const imag = [...containerImages];
    const itemIndex = imag.findIndex(item => item.id === id);

    imag.splice(itemIndex, 1);
    setContainerImage([...imag]);
    setAdditionImages((state: any) => ({...state, [id]: null}));
  };
  const loadGallery = (id?: string) => {
    launchImageLibrary(
      {mediaType: 'photo', maxWidth: 2000},
      (res: ImagePickerResponse) => {
        if (imageIndex !== -1) {
          console.log('called here o index: ', imageIndex);
          setAdditionImages((state: any) => ({
            ...state,
            [imageIndex]: res.uri,
          }));
          setImageIndex(-1);
          // bottomSheet.current.hide();
        } else {
          setImage(res.uri);
        }
      },
    );
  };
  const addMoreImages = () => {
    setCount(count => ++count);

    setContainerImage(images => [...images, {id: count}]);
    // setCount(count => count++);
  };

  const renderExtra = () => {
    return extras.map((item, i) => {
      return (
        <TextField
          key={i}
          labelName={item.name}
          value={item.quantity}
          onChange={text => handleExtraUpdate(text, i)}
        />
      );
    });
  };
  const handleExtraUpdate = (newValue: string, index: number) => {
    const oldExtra = extras;
    oldExtra[index].quantity = newValue;
    setExtras([...oldExtra]);
  };
  const handleCreateService = async () => {
    try {
      const imagesUri: string[] = [];
      if (!image) {
        return helpers.dispayMessage({
          message: 'Validation failed',
          description: 'You must upload atleast one image',
          icon: 'info',
          type: 'info',
        });
      }
      if (image) {
        imagesUri.push(image);
        console.log(additionImages);
        Object.values(additionImages).forEach(value =>
          value ? imagesUri.push(`${value}`) : null,
        );
        const imageBlobs = [];

        for (let i = 0; i < imagesUri.length; i++) {
          const blob = await helpers.uriToBlob(imagesUri[i]);
          imageBlobs.push(blob);
        }

        if (
          name.trim() === '' ||
          price.trim() === '' ||
          timeDuration.trim() === ''
        ) {
          return helpers.dispayMessage({
            message: 'Validation failed',
            description:
              'Service Name, Price, Time Duration and Description is required',
            icon: 'info',
            type: 'info',
          });
        }

        setIsLoading(true);
        const response = await http_service.createService({
          customCategoryName,
          name,
          timeDuration,
          price,
          categoryColor: selectedColor,
          imageBlobs,
        });
        await getServices();
        helpers.dispayMessage({
          message: 'Service created',
          description: 'Operation successful, service successfully created',
          icon: 'success',
          type: 'success',
        });
        setIsLoading(false);
        resetForm();
      }
    } catch (error) {
      helpers.catchHttpError(error);
      setIsLoading(false);
    }
  };
  const resetForm = () => {
    setName('');
    setPrice('');
    setTimeDuration('');
    setExtras([]);
    setSelectedColor('');
    setImage(null);
    setAdditionImages([]);
  };
  return (
    <ScrollView style={{flex: 1, paddingVertical: 16}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 10,
        }}>
        <Pressable
          style={{flex: 1, borderRadius: 40}}
          onPress={selectPickerOption}>
          {image ? (
            <ImageBackground
              style={{height: 140, borderRadius: 40, flex: 1}}
              source={{uri: image}}
            />
          ) : (
            <View
              style={{
                backgroundColor: Colors.GREY_4,
                height: 140,
                borderRadius: 16,
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={gallery}
                style={{width: 100}}
                resizeMethod="auto"
                resizeMode="contain"
              />
            </View>
          )}
        </Pressable>
        <View style={{marginLeft: 8}}>
          <Pressable
            onPress={addMoreImages}
            style={{
              backgroundColor: Colors.LIGHT_BLUE,
              paddingVertical: 10,
              paddingHorizontal: 10,
              borderRadius: 8,
              borderColor: Colors.LIGHT_BLUE,
              borderWidth: 1,
            }}>
            <Ionicons name="add-outline" size={32} color={Colors.BLUE} />
          </Pressable>
        </View>
      </View>

      {renderAdditionImages()}
      <View style={{marginBottom: 10, marginTop: 20}}>
        <TextField
          value={name}
          onChange={text => setName(text)}
          labelName="Service Name"
        />
      </View>
      {/* <View style={{marginBottom: 10}}>
        <TextField labelName="Price" />
      </View> */}
      <View style={{marginBottom: 10, flexDirection: 'row'}}>
        <View style={{flex: 1, marginRight: 8}}>
          <TextField
            value={price}
            onChange={text => setPrice(text)}
            labelName="Price"
          />
        </View>
        <View style={{flex: 1}}>
          <TextField
            value={timeDuration}
            onChange={text => setTimeDuration(text)}
            labelName="Time Duration"
          />
        </View>
      </View>
      <View style={{marginBottom: 10}}>{renderExtra()}</View>
      <View
        style={{marginBottom: 10, alignItems: 'center', flexDirection: 'row'}}>
        <View style={{flex: 1, marginRight: 8}}>
          <TextField labelName="Service Description" />
        </View>
      </View>
      <View>
        <TitleText text="Category" styles={{fontSize: 15}} />
        <View style={{flexDirection: 'row', flexWrap: 'wrap', marginTop: 10}}>
          {categoryColor.map((item, i) => (
            <TouchableOpacity
              onPress={() => setSelectedColor(item.color)}
              key={i}
              style={{
                width: 32,
                height: 32,
                borderRadius: 16,
                backgroundColor: item.color,
                borderColor:
                  selectedColor === item.color ? Colors.BLACK : item.color,
                borderWidth: 2,
                marginLeft: 8,
                marginBottom: 10,
              }}></TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={{marginVertical: 10}}>
        <TextField
          value={customCategoryName}
          onChange={text => setCustomCategoryName(text)}
          labelName="Category Name"
        />
      </View>

      <View style={{height: 50, marginBottom: 30, marginTop: 20}}>
        <Button
          isLoading={isLoading}
          text="Save Service"
          onPress={handleCreateService}
        />
      </View>
      <BottomSheet
        draggable={false}
        height={160}
        hasDraggableIcon
        ref={bottomSheet}>
        <View style={{flex: 1, paddingHorizontal: 16, paddingVertical: 16}}>
          <TitleText
            text="Choose From"
            styles={{marginBottom: 10, fontSize: 16, fontWeight: '300'}}
          />
          <TouchableOpacity onPress={() => loadGallery()}>
            <View style={{flexDirection: 'row', marginBottom: 10}}>
              <Ionicons name="images-outline" size={24} color={Colors.BLUE} />
              <TitleText
                text="Gallery"
                styles={{fontSize: 16, fontWeight: '300', marginLeft: 8}}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => loadCamera()}>
            <View style={{flexDirection: 'row'}}>
              <Ionicons name="camera-outline" size={24} color={Colors.BLUE} />
              <TitleText
                text="Camera"
                styles={{fontSize: 16, fontWeight: '300', marginLeft: 8}}
              />
            </View>
          </TouchableOpacity>
        </View>
      </BottomSheet>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'SFUIText-Regular',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});

export default connect(null, actions)(AddItem);
