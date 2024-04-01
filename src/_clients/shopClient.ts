import axios from 'axios';

const defaultOptions = {
  baseURL: process.env.NEXT_PUBLIC_SHOP_BASE_URL,
};

const shopClient = axios.create(defaultOptions);

const onReject = (error: any) => {
  if (error.response) {
    // Request made and server responded
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
    return Promise.reject(error.response.data);
  }
  if (error.request) {
    // The request was made but no response was received
    console.log(error.request);
    return Promise.reject(error.request);
  }
  // Something happened in setting up the request that triggered an Error
  console.log('Error', error.message);
  return Promise.reject(error.message);
};

// Add a response interceptor
shopClient.interceptors.response.use(
  (response) => response, onReject);

export default shopClient;