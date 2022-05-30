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
import ListAccount from './ListAccount'
import ListMoney from './ListMoney'


import Modal from "react-native-modal";
import ModalScreen from "./ModalScreen";
// import NumberFormat from 'react-number-format';
const width = Dimensions.get('window').width;

const StackHome = createNativeStackNavigator();
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

  const onListAccount = () => {
    navigation.navigate('ListAccount');
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
    <StackHome.Navigator>
      <StackHome.Screen name="HomeMain" component={HomeMain} options={{ headerShown: false }} />
      <StackHome.Screen name="ListAccount" component={ListAccount} options={{
        title: 'Sổ nguồn',
        headerStyle: {
          backgroundColor: '#024b04',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }} />
      <StackHome.Screen name="ListMoney" component={ListMoney} options={{
        title: 'Danh sách',
        headerStyle: {
          backgroundColor: '#024b04',
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }} />

    </StackHome.Navigator>
  )

  function HomeMain() {

    return (

      <ScrollView 
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.container}>
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
              <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                height: 250,
                marginTop: -20,
                backgroundColor: '#024b04',
              }}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    color: 'white',
                    fontSize: 16,
                  }}>
                  {`${data?.creditFundName}`}
                </Text>
                <Image
                  style={styles.tinyLogo}
                  source={require('../assets/icondangnhap/ducminh.jpg')}
                />
              </View>
           
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
                zIndex: 5, marginTop: -60,
                backgroundColor: '#fff',
                elevation: 20,
                shadowColor: '#024b04',
                shadowOffset: {
                  width: 3,
                  height: 5
                },
                shadowRadius: 5,
                shadowOpacity: 0.6
              }}>
                <View style={{ alignItems: 'center',  }}>
                  <Text style={styles.text16}>
                    Tên khách hàng:
                  </Text>
                  <Text
                    style={styles.text18}
                    keyboardType = 'numeric'
                    numberOfLines={1}>
                    {`${data?.name}`}
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: '3%',}}>
                    <View style={{ flexDirection: 'column', alignItems: 'center'}}>
                      <Text style={styles.text16}>Tài khoản:</Text>
                      <Text style={styles.text18}>
                        {`${data?.accountNumber}`}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                      <Text style={styles.text16}>Số dư:</Text>
                      <Text style={styles.text18}>
                        {`${data?.surplus} VND`}
                      </Text>
                    </View>
                </View>
                
                {/* <NumberFormat value={2456981} displayType={'text'} thousandSeparator={true} prefix={'$'} /> */}
              </View>
            </View>
            
          </View>

          <View style={styles.box2}>
              <View style={styles.support}>
                 <Image style={{ width: 50, height: 50, borderRadius: 50}} source={require('../assets/icondangnhap/ducminh.jpg')} />
                 <View style={{ marginLeft: 10,}}>
                   <Text style={styles.text18}>Nguyễn Thị Sơn</Text>
                   <Text style={{ color: '#000', fontSize: 14, }}>Tài chính cá nhân</Text>
                 </View>
              </View>

              <TouchableOpacity onPress={onListAccount} style={styles.listac}>
                  <View>
                    <Text style={{ color: '#000', fontSize: 14, fontWeight: '500' }}>Sổ nguồn</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center'}}>
                      <Text style={{ color: '#024b04', fontSize: 19, fontWeight: 'bold' }}>{`${data?.surplus}`}</Text>
                      <Text style={{paddingLeft: 2, fontSize: 13, color: '#737373'}}>VND</Text>
                    </View>
                  </View>
                  <Icon name="chevron-right" size={25} color="#024b04" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => changeModalVisible(true)}style={styles.listac}>
                  <View>
                    <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>
                      Điểm thưởng
                    </Text>
                    
                  </View>
                  <Icon name="chevron-right" size={25} color="#024b04" />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => changeModalVisible(true)}style={styles.listac}>
                  <View>
                    <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold' }}>
                      Chuyển khoản
                    </Text>
                    
                  </View>
                  <Icon name="chevron-right" size={25} color="#024b04" />
              </TouchableOpacity>
              
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
    // backgroundColor: '#cbe3c1'
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
    justifyContent: 'space-evenly',
  },
  text18: {
    color: '#024b04', 
    fontWeight: 'bold', 
    fontSize: 18,
  },
  text16: {
    color: '#024b04', 
    fontWeight: 'bold', 
    fontSize: 16,
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
    margin: 20,
  },
  support: {
    borderWidth: 1, 
    borderRadius: 8,
    borderColor: '#fff', 
    padding: 10, 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: '#fff',
  },
  listac: {
    borderWidth: 1, 
    borderRadius: 8, 
    borderColor: '#fff',
    marginTop: 20, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    padding: 10,
    backgroundColor: '#fff',
  },

  // content: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginLeft: '10%',
  //   marginRight: '10%',
  //   marginTop: '7%',
  // },
  // midlLogo: {
  //   width: 40,
  //   margin: 10,
  //   height: 40,
  // },
  // footer: {
  //   justifyContent: 'flex-end',
  //   borderTopWidth: 1,
  //   borderTopColor: '#c9c7c1',
  //   backgroundColor: '#FBFBF9',
  // },
  // end: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   marginTop: 10,
  //   marginBottom: 10,
  //   paddingHorizontal: 5,
  // },
  // footerLogo: {
  //   width: 30,
  //   margin: 10,
  //   height: 30,
  // },

 });

export default Home