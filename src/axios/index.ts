import axios from 'axios';
import {BASE_URL} from '../config/constant';

export const Axios = axios.create({
  baseURL: BASE_URL,
});
