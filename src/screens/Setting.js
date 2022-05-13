import { View, Text, ImageBackground, TouchableOpacity, Pressable, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Images from '../assets';
import { useSelector, useDispatch } from "react-redux";
import { clearState, insFCMYtokenAPI } from '../store/AuthSlice';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from './Profile'
import PassWordChange from './PassWordChange';
import UserNameChange from './UserNameChange';
import { List, Switch } from 'antd-mobile'
import {
  UnorderedListOutline,
  PayCircleOutline,
  SetOutline,
} from 'antd-mobile-icons'

import Modal from "react-native-modal";

const StackSetting = createNativeStackNavigator();
export default function Setting({ route, navigation }) {
  const dispatch = useDispatch()
  const data = useSelector(store => store.product.dataInfoUser)
  const onLogout = async () => {
    dispatch(clearState())
  }

  const onProfile = () => {
    navigation.navigate('Profile');
  }

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <StackSetting.Navigator>
      <StackSetting.Screen name="SettingMain" component={SettingMain} options={{ headerShown: false }} />
      <StackSetting.Screen name="Profile" component={Profile} options={{
        title: 'Thông tin cá nhân',
        headerStyle: {
          backgroundColor: '#024b04',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }} />
      <StackSetting.Screen name="PassWordChange" component={PassWordChange} options={{
        title: 'Đổi mật khẩu',
        headerStyle: {
          backgroundColor: '#024b04',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }} />
      <StackSetting.Screen name="UserNameChange" component={UserNameChange} options={{
        title: 'Đổi tài khoản đăng nhập',
        headerStyle: {
          backgroundColor: '#024b04',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }} />
    </StackSetting.Navigator>
  )

  function SettingMain() {
    return (
      <View>

        <Modal
          isVisible={isModalVisible}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', }}>
                <Image style={{ width: 50, height: 50, marginRight: 15 }} source={Images.logo} />
                <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16, }}>Thông Báo!</Text>
              </View>
              <View style={{ alignItems: 'center', }}>
                <View style={{ flexDirection: 'row', padding: 15, alignItems: 'center' }}>
                  {/* <Icon name="wrench" color="red" size={30}  />
                  <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20, marginLeft: 15,}}>Hệ thống đang cập nhật</Text> */}
                  <Image style={{ width: '100%', height: 150, marginRight: 15 }} source={Images.imgbaotri} />
                </View>
              </View>


              <View style={{ width: '100%', alignItems: 'flex-end', }}>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={toggleModal}
                >
                  <Text style={styles.textStyle}>OK</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
        <ImageBackground source={Images.backgroundhome} resizeMode="cover">
          <View style={styles.containerr}>
            <View style={styles.header}>
              <Text style={{ fontSize: 20, color: '#fff', fontWeight: 'bold' }}>VFUND</Text>
            </View>


            <View style={styles.infoUser}>
              {/* <View style={styles.itemIcon}> */}
              <Image
                style={styles.tinyLogo}
                source={require('../assets/icondangnhap/ducminh.jpg')}
              />
              {/* </View> */}
              <View style={{ display: 'flex', justifyContent: 'flex-start', flex: 1 }}>
                {/* <Text style={{ color: '#fff', fontSize: 18, fontWeight: '600' }}>{user.name}</Text> */}
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 10 }}>
                  <Text style={{ color: 'white', fontWeight: 'bold' }}>
                    {data?.name}
                  </Text>
                </View>
              </View>
            </View>

          </View>
        </ImageBackground>
        <View style={{ display: 'flex', alignItems: 'center' }}>
          <TouchableOpacity
            style={{ flexDirection: 'row', padding: 10 }}
            onPress={onLogout} >
            <Icon name="sign-out" size={24} color="red" />
            <Text style={{ marginLeft: 5, fontWeight: 'bold', color: 'red', fontSize: 15 }}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>

        <View style={{ marginHorizontal: 20 }}>
          <View style={{ paddingVertical: 10 }}>
            <Text style={{ color: '#858f99', fontWeight: 'bold' }}>
              TÀI KHOẢN
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('PassWordChange')}
            style={{
              marginVertical: 5,
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 20,
              paddingVertical: 15,
              backgroundColor: '#fff',
              borderRadius: 10
            }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="laptop" size={24} color="#000" />
              <Text style={{ marginLeft: 10, fontWeight: '500', fontSize: 16, color: '#05610a' }}>
                Đổi mật khẩu
              </Text>
            </View>
            <Icon name="angle-right" size={24} color="#05610a" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('UserNameChange')} style={{
            marginVertical: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingVertical: 15,
            backgroundColor: '#fff',
            borderRadius: 10
          }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="edit" size={24} color="#000" />
              <Text style={{ marginLeft: 10, fontWeight: '500', fontSize: 16, color: '#05610a' }}>
                Đổi tài khoản đăng nhập
              </Text>
            </View>
            <Icon name="angle-right" size={24} color="#05610a" />
          </TouchableOpacity>
        </View>

        <View style={{ marginHorizontal: 20 }}>
          <View style={{ paddingVertical: 10 }}>
            <Text style={{ color: '#858f99', fontWeight: 'bold' }}>
              HỖ TRỢ
            </Text>
          </View>
          <TouchableOpacity onPress={onProfile} style={{
            marginVertical: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingVertical: 15,
            backgroundColor: '#fff',
            borderRadius: 10
          }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="user" size={24} color="#000" />
              <Text style={{ marginLeft: 10, fontWeight: '500', fontSize: 16, color: '#05610a' }}>
                Thông tin cá nhân
              </Text>
            </View>
            <Icon name="angle-right" size={24} color="#05610a" />
          </TouchableOpacity>

          <TouchableOpacity onPress={toggleModal} style={{
            marginVertical: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingVertical: 15,
            backgroundColor: '#fff',
            borderRadius: 10
          }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="phone" size={24} color="#000" />
              <Text style={{ marginLeft: 10, fontWeight: '500', fontSize: 16, color: '#05610a' }}>
                Liên hệ hotline hỗ trợ
              </Text>
            </View>
            <Icon name="angle-right" size={24} color="#05610a" />
          </TouchableOpacity>


          <TouchableOpacity onPress={toggleModal} style={{
            marginVertical: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingVertical: 15,
            backgroundColor: '#fff',
            borderRadius: 10
          }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="language" size={24} color="#000" />
              <Text style={{ marginLeft: 10, fontWeight: '500', fontSize: 16, color: '#05610a' }}>
                Ngôn ngữ
              </Text>
            </View>
            <Icon name="angle-right" size={24} color="#05610a" />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleModal} style={{
            marginVertical: 5,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingVertical: 15,
            backgroundColor: '#fff',
            borderRadius: 10
          }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon name="users" size={24} color="#000" />
              <Text style={{ marginLeft: 10, fontWeight: '500', fontSize: 16, color: '#05610a' }}>
                Giới thiệu bạn bè
              </Text>
            </View>
            <Icon name="angle-right" size={24} color="#05610a" />
          </TouchableOpacity>



        </View>

      </View>
    )

  }

}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width: '92%',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "flex-start",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#05610a",
    paddingHorizontal: 20
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 10,
    textAlign: "center"
  },
  containerr: {
    height: 160,
  },
  header: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    marginHorizontal: 10
  },
  infoUser: {
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  itemFeature: {
    flex: 1,
    marginHorizontal: 5,
  },
  iconFeature: {
    backgroundColor: '#fff',
    alignItems: 'center',
    borderRadius: 10,
    paddingVertical: 2
  },
  textItemFeature: {
    fontWeight: '600',
    textAlign: 'center',
    color: '#115d8e'
  },
  pageSlider: {
    width: '100%',
  },
  page: {
    alignItems: 'center',
    height: 128,
    justifyContent: 'center',
    padding: 16,
  },
  tinyLogo: {
    width: 70,
    margin: 10,
    height: 70,
    borderWidth: 1,
    borderColor: '#d6d6c9',
    backgroundColor: '#d6d6c9',
    borderRadius: 20 / 2,
  },
})