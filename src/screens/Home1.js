import { View, StyleSheet, Image, ImageBackground, Text, TouchableOpacity,
  Dimensions, Alert, Pressable, ScrollView, FlatList } from 'react-native'
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

const StackHome = createNativeStackNavigator();
const Home = ({ route, navigation }) => {

 const data = useSelector(store => store.product.dataInfoUser)
 const dispatch = useDispatch()
 const [mess, setMess] = useState({ tk: '', sd: '' });
 // const [modalVisible, setModalVisible] = useState(false);

 const DATA = [
   {
       id: '1',
       namekh: `NGUYỄN THỊ SƠN`,
       stk: `AB2875872`,
       sodu: `30,175,800`,
       image: Images.logo,
   },
   {
       id: '2',
       namekh: `NGUYỄN THỊ SƠN`,
       stk: `AB2875872`,
       sodu: `30,175,800`,
       image: Images.logo,
   },
   {
       id: '3',
       namekh: `NGUYỄN THỊ SƠN`,
       stk: `AB2875872`,
       sodu: `30,175,800`,
       image: Images.logo,
   },
   {
       id: '4',
       namekh: `NGUYỄN THỊ SƠN`,
       stk: `AB2875872`,
       sodu: `30,175,800`,
       image: Images.logo,
   },
   {
       id: '5',
       namekh: `NGUYỄN THỊ SƠN`,
       stk: `AB2875872`,
       sodu: `30,175,800`,
       image: Images.logo,
   },
   {
       id: '6',
       namekh: `NGUYỄN THỊ SƠN`,
       stk: `AB2875872`,
       sodu: `30,175,800`,
       image: Images.logo,
   },
 ];
 
 const Item = ({ image, namekh, stk, sodu }) => (
   <View style={styles.item}>
       <View style={{borderWidth: 1, borderColor: '#024b04', padding: 15, borderRadius: 15}}>
           <Image style={styles.image}  source={image} />
           <Text style={{color: '#024b04', fontSize: 18 , fontWeight: '500'}}>Tên khách hàng: {namekh}</Text>
           <Text style={{color: '#024b04', fontSize: 18 , fontWeight: '500'}}>{stk}</Text>
           <Text style={{color: '#024b04', fontSize: 18 , fontWeight: '500'}}>{sodu}</Text>
       </View>
     
   </View>
 );


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

 const [ismodalvisible, setisModalVisible] = useState(false);

 const changeisModalVisible = (e) => {
   setisModalVisible(e)
 }

 return (
   <StackHome.Navigator>
     <StackHome.Screen name="HomeMain" component={HomeMain} options={{ headerShown: false }} />
     <StackHome.Screen name="ListMoney" component={ListMoney} options={{
       title: 'Danh Sách',
       headerStyle: {
         backgroundColor: '#024b04',
       },
       headerTintColor: '#fff',
       headerTitleAlign: 'center',
     }} />
     {/* <StackHome.Screen name="HomeMain" component={HomeMain} options={{ headerShown: false }} /> */}

   </StackHome.Navigator>
 )

 function HomeMain() {

   const renderItem = ({ item }) => (
     <Item  image={item.image} namekh={item.namekh} stk={item.stk} sodu={item.sodu} />
   );

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
           <View style={{
               backgroundColor: '#fff', 
               borderBottomLeftRadius: 20, 
               borderBottomRightRadius: 20,
               shadowColor: "#000",
               shadowOffset: {
               width: 0,
               height: 5,
               },
               shadowOpacity: 0.36,
               shadowRadius: 6.68,
               elevation: 11,}}>
               <View style={{ marginTop: '8%', marginLeft: '8%', marginRight: '5%', marginBottom: '5%' }}>
                   <View style={styles.header}>
                       <Image style={styles.imagedm} source={require('../assets/icondangnhap/ducminh.jpg')} />
                       <Text style=
                           {{color: '#024b04', 
                             fontSize: 18 , 
                             fontWeight: '500', 
                             paddingLeft: 10, 
                             paddingRight: 10
                           }}>
                             Xin chào NGUYỄN THỊ SƠN
                       </Text>
                       <Icon name="bell" size={30} color="#024b04"  />
                       
                   </View>
               </View> 
             </View>
             <View>
                 <FlatList
                     horizontal={true}
                     showsVerticalScrollIndicator={false}
                     showsHorizontalScrollIndicator={false}
                     data={DATA}
                     renderItem={renderItem}
                     keyExtractor={item => item.id}
                 />
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
               <Text style={{ marginTop: 5, fontSize: 13, textAlign: 'center' }}>Tài Khoản</Text>
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
               <Text style={{ marginTop: 5, fontSize: 13, textAlign: 'center' }}>Thanh toán</Text>
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
               <Text style={{ marginTop: 5, fontSize: 13, textAlign: 'center' }}>Chuyển khoản</Text>
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
               <Text style={{ marginTop: 5, fontSize: 13, textAlign: 'center'}}>Danh sách vay gửi</Text>
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
               <Text style={{ marginTop: 5, fontSize: 13, textAlign: 'center' }}>Đầu tư</Text>
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
               <Text style={{ marginTop: 5, fontSize: 13, textAlign: 'center' }}>Thẻ</Text>
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
 header: {
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
 },
 imagedm: {
   width: 60,
   height: 60,
   borderWidth: 1,
   borderRadius: 40,
 },
 item: {
   padding: 20,
   // marginVertical: 20,
   // marginHorizontal: 16,
   
 },
 image: {
   // width: 310,
   // height: 195,
   width: 60,
   height: 60,
 },
});

export default Home