import {Axios} from '../axios';
import {
  CLOUDINARY_FODER_NAME,
  CLOUDINARY_UPLOAD_PRESET,
  CLOUDINARY_URL,
} from '../config/constant';
import axios from 'axios';
import helpers from '../helpers';

class HttpService {
  logRequest(payload: {text: string}) {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await helpers.getItem('xxx-token');
        const response = await Axios.post(
          '/api/v1/user/send-request',
          payload,
          {
            headers: {
              Authorization: token,
            },
          },
        );
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  }
  cereatePIN(payload: {pin: string}) {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await helpers.getItem('xxx-token');
        const response = await Axios.post('/api/v1/user/set-pin', payload, {
          headers: {
            Authorization: token,
          },
        });
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  }
  updatePIN(payload: {oldPin: string; newPin: string}) {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await helpers.getItem('xxx-token');
        const response = await Axios.patch('/api/v1/user/update-pin', payload, {
          headers: {
            Authorization: token,
          },
        });
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  }
  createCustomer(payload: {email: string; name: string; phoneNumber: string}) {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await helpers.getItem('xxx-token');
        const response = await Axios.post(
          '/api/v1/customer/create-customer',
          payload,
          {
            headers: {
              Authorization: token,
            },
          },
        );
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  }
  getCustomers() {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await helpers.getItem('xxx-token');
        const response = await Axios.get(
          '/api/v1/customer/get-user-customers',
          {
            headers: {
              Authorization: token,
            },
          },
        );
        resolve(response.data);
      } catch (error) {
        reject(error);
      }
    });
  }
  registerAccount(payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post('/api/v1/signup', {
          ...payload,
          name: payload.fullname,
        });
        return resolve(response.data);
      } catch (error) {
        // helpers.dispayMessage(error?.response?.data?.message);
        return reject(error);
      }
    });
  }
  login(payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Axios.post('/api/v1/login', {
          ...payload,
        });
        return resolve(response.data);
      } catch (error) {
        // helpers.dispayMessage(error?.response?.data?.message);
        return reject(error);
      }
    });
  }
  createProduct(payload: {
    extras: {name: string; quantity: string}[];
    customCategoryName: string;
    name: string;
    size: string;
    price: string;
    categoryColor: string;
    imageBlobs: any[];
  }) {
    return new Promise(async (resolve, reject) => {
      try {
        const requests: Promise<any>[] = [];
        const {imageBlobs, ...rest} = payload;
        // convert blobs to base64 string
        const blobToBase64Promise: Promise<any>[] = [];
        imageBlobs.forEach(item =>
          blobToBase64Promise.push(helpers.getBlobData(item)),
        );

        const base64Images = await Promise.all(blobToBase64Promise);

        // console.log('uploading to cloudinary');
        base64Images.forEach(item => {
          const formData = new FormData();
          formData.append('file', item);
          formData.append('folder', CLOUDINARY_FODER_NAME);
          formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
          // console.log('called here to upload');
          requests.push(
            axios.post(CLOUDINARY_URL, formData, {
              headers: {
                'Content-Type': `multipart/form-data;`,
              },
            }),
          );
        });

        const token = await helpers.getItem('xxx-token');

        const images = await Promise.all(requests);
        console.log('images: ', images[0]?.data);
        const response = await Axios.post(
          '/api/v1/product/create-product',
          {
            ...rest,
            mainImageUrl: images[0]?.data?.secure_url,
            otherImageUrl1: images[1]?.data?.secure_url,
            otherImageUrl2: images[2]?.data?.secure_url,
            otherImageUrl3: images[3]?.data?.secure_url,
            otherImageUrl4: images[4]?.data?.secure_url,

            otherImageUrl5: images[5]?.data?.secure_url,
            otherImageUrl6: images[6]?.data?.secure_url,
            otherImageUrl7: images[7]?.data?.secure_url,
          },
          {
            headers: {
              Authorization: token,
            },
          },
        );
        resolve(response.data);
      } catch (error) {
        // helpers.dispayMessage(error?.response?.data?.message);
        reject(error);
      }
    });
  }
  createService(payload: {
    customCategoryName: string;
    name: string;
    timeDuration: string;
    price: string;
    categoryColor: string;
    imageBlobs: any[];
  }) {
    return new Promise(async (resolve, reject) => {
      try {
        const requests: Promise<any>[] = [];
        const {imageBlobs, ...rest} = payload;
        // convert blobs to base64 string
        const blobToBase64Promise: Promise<any>[] = [];
        imageBlobs.forEach(item =>
          blobToBase64Promise.push(helpers.getBlobData(item)),
        );

        const base64Images = await Promise.all(blobToBase64Promise);

        // console.log('uploading to cloudinary');
        base64Images.forEach(item => {
          const formData = new FormData();
          formData.append('file', item);
          formData.append('folder', CLOUDINARY_FODER_NAME);
          formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
          // console.log('called here to upload');
          requests.push(
            axios.post(CLOUDINARY_URL, formData, {
              headers: {
                'Content-Type': `multipart/form-data;`,
              },
            }),
          );
        });

        const token = await helpers.getItem('xxx-token');

        const images = await Promise.all(requests);
        console.log('images: ', images[0]?.data);
        const response = await Axios.post(
          '/api/v1/service/create-service',
          {
            ...rest,
            mainImageUrl: images[0]?.data?.secure_url,
            otherImageUrl1: images[1]?.data?.secure_url,
            otherImageUrl2: images[2]?.data?.secure_url,
            otherImageUrl3: images[3]?.data?.secure_url,
            otherImageUrl4: images[4]?.data?.secure_url,

            otherImageUrl5: images[5]?.data?.secure_url,
            otherImageUrl6: images[6]?.data?.secure_url,
            otherImageUrl7: images[7]?.data?.secure_url,
          },
          {
            headers: {
              Authorization: token,
            },
          },
        );
        resolve(response.data);
      } catch (error) {
        // helpers.dispayMessage(error?.response?.data?.message);
        reject(error);
      }
    });
  }
  getUserProduct() {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await helpers.getItem('xxx-token');
        const response = await Axios.get('/api/v1/product/get-user-product', {
          headers: {
            Authorization: token,
          },
        });

        return resolve(response.data.products);
      } catch (error) {
        // helpers.dispayMessage(error?.response?.data?.message);
        return reject(error);
      }
    });
  }

  getUserService() {
    return new Promise(async (resolve, reject) => {
      try {
        const token = await helpers.getItem('xxx-token');
        const response = await Axios.get('/api/v1/get-service-by-user', {
          headers: {
            Authorization: token,
          },
        });

        return resolve(response.data.services);
      } catch (error) {
        // helpers.dispayMessage(error?.response?.data?.message);
        return reject(error);
      }
    });
  }
}

export default new HttpService();
