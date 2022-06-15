import axios from 'axios';
import { store } from '../../App'
import {
  View, Alert, StyleSheet, TouchableWithoutFeedback, Keyboard, TextInput, Image,
  Text, TouchableOpacity, SafeAreaView, FlatList,
} from 'react-native';

const instance = axios.create({
  // baseURL: 'http://10.0.2.2:8886/',
  baseURL: 'https://vfund.one/creditfund/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  timeout: 30000,
});

// Add a request interceptor
instance.interceptors.request.use(function (config) {
  // console.tron.log("config", config)
  // Do something before request is sent
  const state = store.getState();
  const token = state?.auth?.token
  //console.tron.log("token", store.getState()?.auth?.token)
  return { ...config, headers: { ...config.headers, Authorization: `Bearer ${token}` } };
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response.status === 401) {
    console.tron.log('401', error.response)
    // lam gi đó ở đây: vi dụ như clear token để tự động chuyển sang màn login
    // store.dispatch(reset())
  }

  if (error.response.data.message === "Bạn đã đổi user name") {
    Alert.alert('Không thể đổi tài khoản mật khẩu');
    // lam gi đó ở đây: vi dụ như clear token để tự động chuyển sang màn login
    // store.dispatch(reset())
  }

  if (error.response.data.error === 'Bad credentials') {
    Alert.alert('Tài khoản mật khẩu không đúng');
    // lam gi đó ở đây: vi dụ như clear token để tự động chuyển sang màn login
    // store.dispatch(reset())
  }
  return Promise.reject(error);
});

export const getTodo = () => {
  return instance.get('/todos/1')
}

export const createTodo = (params) => {
  return instance.post('/posts', params)
}

export const updateTodo = (id, params) => {
  return instance.put(`/posts/${id}`, params)
}

export const deleteTodo = (id) => {
  return instance.delete(`/posts/${id}`)
}

export const login = (params) => {
  return instance.post('auth/login', params)
}

export const insFCMYtoken = (params) => {
  return instance.post('api/notification/insert', params)
}

export const getInfoUser = () => {
  return instance.get('api/user/getInfoUser')
}

export const getDeposits = () => {
  return instance.get('api/deposits/get/user')
}

export const getLoans = () => {
  return instance.get('api/loan/get/user')
}

export const updateUser = (params) => {
  return instance.post(`api/user/update/user?username=${params?.username}&password=${params?.password}`)
}

export const findInfoUser = (creditFundId, query) => {
  return instance.get(`api/user/get/user?creditFundId=${creditFundId}&query=${query}`)
}