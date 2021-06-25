import AsyncStorage from '@react-native-async-storage/async-storage';
import {showMessage} from 'react-native-flash-message';

class Helper {
  catchHttpError(error: any) {
    if (error.response) {
      console.log(error.response.data);
      this.dispayMessage({
        message: 'Some errors were encountered',
        description: error?.response?.data?.message,
        icon: 'danger',
        type: 'danger',
      });
    } else {
      this.dispayMessage({
        message: 'Our technical team is working to fix this problem.Thanks',
        description: error?.toString(),
        icon: 'danger',
        type: 'danger',
      });
    }
    // console.log(error);
  }
  formatAsMoney(param: string) {
    return param.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  async getUserName() {
    try {
      const user: any = await this.getItem('xxx-user');
      if (!user) {
        return '';
      }
      return JSON.parse(user).name;
    } catch (error) {
      console.log(error);
    }
  }
  dispayMessage({
    message,
    icon,
    type,
    description,
  }: {
    message: string;
    icon:
      | 'danger'
      | 'info'
      | 'default'
      | 'warning'
      | 'none'
      | 'success'
      | 'auto';
    type: 'danger' | 'info' | 'default' | 'warning' | 'none' | 'success';
    description: string;
  }) {
    return showMessage({
      message,
      icon,
      type,
      description,
    });
  }
  setItem(key: string, value: string) {
    return new Promise(async (resolve, reject) => {
      try {
        await AsyncStorage.setItem(key, value);
        resolve(null);
      } catch (error) {
        console.log('error is: ', error);
        reject(error);
      }
    });
  }
  getItem(key: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const item = await AsyncStorage.getItem(key);
        resolve(item);
      } catch (error) {
        reject(error);
      }
    });
  }
  uriToBlob(uri: string): Promise<Blob> {
    return new Promise(async (resolve, reject) => {
      try {
        // console.log('uri: ', uri);
        const response = await fetch(uri);
        const blob = await response.blob();
        resolve(blob);
      } catch (error) {
        reject(error);
      }
    });
  }
  async getBlobData(blob: Blob) {
    return new Promise((resolve, reject) => {
      // Get blob data
      var reader = new FileReader();
      var base64data = null;
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        base64data = reader.result;
        resolve(base64data);
      };
    });
  }
  strongPasswordCheck(password: string) {
    const regex = new RegExp(
      '?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,}',
    );
    return regex.test(password);
  }
  validateEmail(email: string) {
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return re.test(email);
  }
}

export default new Helper();
