import { View, StyleSheet, Image, ImageBackground, Text, TouchableOpacity, Dimensions, Alert, Pressable, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Images from '../assets';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import { useSelector, useDispatch } from "react-redux";
import { getInfoUserList } from '../store/HomeSlice'
import { clearState, insFCMYtokenAPI } from '../store/AuthSlice';
import messaging from '@react-native-firebase/messaging';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Toast from 'react-native-toast-message';
import { toastConfig } from '../screens/Toast';
import ListMoney from './ListMoney'

import Modal from "react-native-modal";
import ModalScreen from "./ModalScreen";
// import NumberFormat from 'react-number-format';
const width = Dimensions.get('window').width;

const StackSetting = createNativeStackNavigator();
const Home = ({ route, navigation }) => {
  const data = useSelector(store => store.product.dataInfoUser)
  const dispatch = useDispatch()
  const [mess, setMess] = useState({ tk: '', sd: '' });
  // const [modalVisible, setModalVisible] = useState(false);


  const getToken = async () => {
    const fcmToken = await messaging().getToken();
    console.log("fcmToken", fcmToken)
    const param = {
      fcm_token: fcmToken,
    }
    dispatch(insFCMYtokenAPI(param))
  }

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getToken();
      console.log('Authorization status:', authStatus);
    }
  }

  const diemthuong = () => {
    navigation.navigate('GiftScreens');
  }

  const lichsu = () => {
    navigation.navigate('HistoryScreens');
  }

  const onListMoney = () => {
    navigation.navigate('ListMoney');
  }

  // const [dataMess, setDataMess] = useState({})

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('Thông báo!', JSON.stringify(remoteMessage?.data));
      setMess({ tk: remoteMessage?.notification?.body, sd: remoteMessage?.notification?.title })
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    dispatch(getInfoUserList())
  }, [mess])

  useEffect(() => {
    requestUserPermission();
  }, [])

  const onLogout = async () => {
    dispatch(clearState())
  }

  const [updateModalVisible, setupdateModalVisible] = useState(false);

  const changeModalVisible = (e) => {
    setupdateModalVisible(e)
  }

  return (
    <StackSetting.Navigator>
      <StackSetting.Screen name="HomeMain" component={HomeMain} options={{ headerShown: false }} />
      <StackSetting.Screen name="ListMoney" component={ListMoney} options={{
        title: 'Danh Sách',
        headerStyle: {
          backgroundColor: '#024b04',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }} />
      {/* <StackSetting.Screen name="HomeMain" component={HomeMain} options={{ headerShown: false }} /> */}

    </StackSetting.Navigator>
  )

  function HomeMain() {

    return (

      <ScrollView style={styles.container}>
          <Modal
              isVisible={updateModalVisible}
              nRequestClose={() => changeModalVisible(false)}
          >
            <ModalScreen 
              changeModalVisible={changeModalVisible}
            />
          </Modal>
        <View style={styles.box}>
          <View style={styles.box1}>
            <ImageBackground source={Images.backgroundhome} resizeMode="cover">
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 250,
                marginTop: -30,
                // backgroundColor: '#024b04',
                borderBottomLeftRadius: 5,
                borderBottomRightRadius: 5,
              }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'white',
                    fontSize: 15,
                  }}>
                  {`${data?.creditFundName}`}
                </Text>
                <Image
                  style={styles.tinyLogo}
                  source={require('../assets/icondangnhap/ducminh.jpg')}
                />
              </View>
            </ImageBackground>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                margin: 15,

              }}>
              <View style={{
                width: '100%',
                borderWidth: 1,
                padding: 20,
                borderRadius: 15,
                borderColor: '#024b04',
                zIndex: 5, marginTop: -80,
                backgroundColor: '#fff',
                elevation: 20,
                shadowColor: '#024b04',
                shadowOffset: {
                  width: 6,
                  height: 10
                },
                shadowRadius: 5,
                shadowOpacity: 1.0
              }}>
                <Text
                  style={{ color: '#024b04', fontWeight: 'bold', fontSize: 16 }}
                  numberOfLines={1}>
                  {`Tên khách hàng: ${data?.name}`}
                </Text>
                <Text style={{ color: '#024b04', fontWeight: 'bold', fontSize: 14 }}>
                  {`Tài khoản: ${data?.accountNumber}`}
                </Text>
                <Text style={{ color: '#024b04', fontSize: 18, paddingTop: 5, fontWeight: 'bold' }}>
                  {`Số dư: ${data?.surplus} VND`}
                </Text>
                {/* <NumberFormat value={2456981} displayType={'text'} thousandSeparator={true} prefix={'$'} /> */}
              </View>
            </View>
          </View>

          <View style={styles.box2}>
            <View style={styles.content}>
              <TouchableOpacity onPress={() => changeModalVisible(true)} style={{ alignItems: 'center', width: '27%' }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#0753bd',
                    borderRadius: 200 / 2,
                    width: 60,
                    height: 60,
                  }}>
                  <Image
                    style={styles.midlLogo}
                    source={Images.ic_account}
                    resizeMode={'contain'}
                  />
                </View>
                <Text style={{ marginTop: 5, fontSize: 13 }}>Tài Khoản</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => changeModalVisible(true)} style={{ alignItems: 'center', width: '27%' }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#39a3c6',
                    borderRadius: 200 / 2,
                    width: 60,
                    height: 60,
                  }}>
                  <Image style={styles.midlLogo} source={Images.ic_payment} />
                </View>
                <Text style={{ marginTop: 5, fontSize: 13 }}>Thanh toán</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => changeModalVisible(true)} style={{ alignItems: 'center', width: '27%' }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#c4122f',
                    borderRadius: 200 / 2,
                    width: 60,
                    height: 60,
                  }}>
                  <Image style={styles.midlLogo} source={Images.ic_tranfer} />
                </View>
                <Text style={{ marginTop: 5, fontSize: 13 }}>Chuyển khoản</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.content}>
              <TouchableOpacity onPress={onListMoney} style={{ alignItems: 'center', width: '27%' }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#f03816',
                    borderRadius: 200 / 2,
                    width: 60,
                    height: 60,
                  }}>
                  <Image style={styles.midlLogo} source={Images.ic_saveMoney} />
                </View>
                <Text style={{ marginTop: 5, fontSize: 13 }}>Tiết kiệm</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => changeModalVisible(true)} style={{ alignItems: 'center', width: '27%' }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#53b3e2',
                    borderRadius: 200 / 2,
                    width: 60,
                    height: 60,
                  }}>
                  <Image style={styles.midlLogo} source={Images.ic_invest} />
                </View>
                <Text style={{ marginTop: 5, fontSize: 13 }}>Đầu tư</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => changeModalVisible(true)} style={{ alignItems: 'center', width: '27%' }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#0066b2',
                    borderRadius: 200 / 2,
                    width: 60,
                    height: 60,
                  }}>
                  <Image style={styles.midlLogo} source={Images.ic_card} />
                </View>
                <Text style={{ marginTop: 5, fontSize: 13 }}>Thẻ</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={styles.containerr}>
          <SwiperFlatList autoplay autoplayDelay={2} autoplayLoop index={2} showPagination>
            <View style={[styles.child,]}>
              <Image style={{ width: '100%', height: null, aspectRatio: 1192 / 434 }} source={require('../assets/anhbanner/13-11-20-BannerEventWeb.jpg')} />
            </View>
            <View style={[styles.child,]}>
              <Image style={{ width: '100%', height: null, aspectRatio: 1192 / 434 }} source={require('../assets/anhbanner/qua-tang-tet-600x337.png')} />

            </View>
            <View style={[styles.child,]}>
              <Image style={{ width: '100%', height: null, aspectRatio: 1192 / 434 }} source={require('../assets/anhbanner/qua-tang-suc-khoe-dip-tet-nguyen-dan-tan-suu-2021.jpg')} />

            </View>
            <View style={[styles.child,]}>
              <Image style={{ width: '100%', height: null, aspectRatio: 1192 / 434 }} source={require('../assets/anhbanner/qua-tang-tet-600x337.png')} />

            </View>
          </SwiperFlatList>
        </View>

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  containerr: { height: 150, marginTop: 20, },
  child: { width, justifyContent: 'center' },
  text: { fontSize: width * 0.5, textAlign: 'center' },
  bottomItem: {
    width: width / 4.5,
    height: '100%',
  },
  titleBottom: {
    fontSize: 9,
    color: '#05610a',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  headerLogo: {
    width: 30,
    margin: 7,
    height: 30,
  },

  box: {
    flex: 1,
  },
  box1: {
    flex: 0.5,
    height: '25%',
    borderBottomLeftRadius: 20,
    borderBottomEndRadius: 20,
    justifyContent: 'space-evenly',
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
  box2: {
    flex: 1,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: '10%',
    marginRight: '10%',
    marginTop: '7%',
  },
  midlLogo: {
    width: 40,
    margin: 10,
    height: 40,
  },
  footer: {
    justifyContent: 'flex-end',
    borderTopWidth: 1,
    borderTopColor: '#c9c7c1',
    backgroundColor: '#FBFBF9',
  },
  end: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  footerLogo: {
    width: 30,
    margin: 10,
    height: 30,
  },
//   centeredView: {
//     flex: 1,
//     justifyContent: 'flex-start',
//     alignItems: "center",
//     marginTop: 22
//   },
//   modalView: {
//     width: '90%',
//     margin: 20,
//     backgroundColor: "white",
//     borderRadius: 20,
//     padding: 35,
//     alignItems: "flex-start",
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5
//   },
//   button: {
//     borderRadius: 20,
//     padding: 10,
//     elevation: 2
//   },
//   buttonOpen: {
//     backgroundColor: "#F194FF",
//   },
//   buttonClose: {
//     backgroundColor: "#05610a",
//     paddingHorizontal: 20
//   },
//   textStyle: {
//     color: "white",
//     fontWeight: "bold",
//     textAlign: "center"
//   },
//   modalText: {
//     marginBottom: 10,
//     textAlign: "center"
//   }
 });

export default Home