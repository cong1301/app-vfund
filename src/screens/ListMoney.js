import React, { useEffect, useState } from 'react'
import { View, StyleSheet, useWindowDimensions, FlatList, Text , Image } from 'react-native';
import { TabView, SceneMap, TabBar, TextView } from 'react-native-tab-view';
import Images from '../assets';

const TIENGUI = [
    {id: 1, TG: '16:53 19/05/2022', tk: 'NGUYỄN ĐỨC MINH - 2653[01125689]', sotiengui: '20,500,000 VND' },
    {id: 2, TG: '18:53 20/05/2022',  tk: 'NGUYỄN ĐỨC MINH - 2653[01125689]', sotiengui: '15,000,000 VND'},
    {id: 113, TG: '16:53 21/05/2022',  tk: 'NGUYỄN ĐỨC MINH - 2653[01125689]', sotiengui: '20,500,000 VND' },
    {id: 214, TG: '16:53 22/05/2022',  tk: 'NGUYỄN ĐỨC MINH - 2653[01125689]', sotiengui: '15,000,000 VND'},
    {id: 115, TG: '16:53 22/05/2022',  tk: 'NGUYỄN ĐỨC MINH - 2653[01125689]', sotiengui: '20,500,000 VND' },
    {id: 216, TG: '16:53 22/05/2022',  tk: 'NGUYỄN ĐỨC MINH - 2653[01125689]', sotiengui: '15,000,000 VND'},
    {id: 117, TG: '16:53 22/05/2022',  tk: 'NGUYỄN ĐỨC MINH - 2653[01125689]', sotiengui: '20,500,000 VND' },
    {id: 218, TG: '16:53 22/05/2022',  tk: 'NGUYỄN ĐỨC MINH - 2653[01125689]', sotiengui: '15,000,000 VND'},
]

const TIENVAY = [
  {id: 1, TG: '16:53 19/05/2022', tk: 'NGUYỄN ĐỨC MINH - 2653[01125689]', sotienvay: '20,500,000 VND' },
  {id: 2, TG: '18:53 20/05/2022',  tk: 'NGUYỄN ĐỨC MINH - 2653[01125689]', sotienvay: '15,000,000 VND'},
  {id: 113, TG: '16:53 21/05/2022',  tk: 'NGUYỄN ĐỨC MINH - 2653[01125689]', sotienvay: '20,500,000 VND' },
  {id: 214, TG: '16:53 22/05/2022',  tk: 'NGUYỄN ĐỨC MINH - 2653[01125689]', sotienvay: '15,000,000 VND'},
  {id: 115, TG: '16:53 22/05/2022',  tk: 'NGUYỄN ĐỨC MINH - 2653[01125689]', sotienvay: '20,500,000 VND' },
  {id: 216, TG: '16:53 22/05/2022',  tk: 'NGUYỄN ĐỨC MINH - 2653[01125689]', sotienvay: '15,000,000 VND'},
  {id: 117, TG: '16:53 22/05/2022',  tk: 'NGUYỄN ĐỨC MINH - 2653[01125689]', sotienvay: '20,500,000 VND' },
  {id: 218, TG: '16:53 22/05/2022',  tk: 'NGUYỄN ĐỨC MINH - 2653[01125689]', sotienvay: '15,000,000 VND'},
]

const ItemGui = ({ TG, tk, sotiengui }) => (
  <View
    style={styles.content}
  >
    <View style={{
        flexDirection: 'row',
        alignItems: 'center',
    }}>
        <Image source={Images.logo} style={{ width: 30, height: 30, borderRadius: 5, margin: 10 }} />
        <Text style={styles.TG}>{TG}</Text>
    </View>
    <View style={styles.separator} />
    <Text style={styles.text}>
      Tài khoản: {tk}
    </Text>
    <Text style={styles.text}>
      Số tiền gửi: <Text style={styles.textGUi}>+{sotiengui}</Text>
    </Text>
    
  </View>
);
const renderItemGui = ({ item }) => (
  <ItemGui
    TG={item.TG}
    tk={item.tk}
    sotiengui={item.sotiengui}
  />
);


const ItemVay = ({ TG, tk, sotienvay }) => (
  <View
    style={styles.content}
  >
    <View style={{
        flexDirection: 'row',
        alignItems: 'center',
    }}>
        <Image source={Images.logo} style={{ width: 30, height: 30, borderRadius: 5, margin: 10 }} />
        <Text style={styles.TG}>{TG}</Text>
    </View>
    <View style={styles.separator} />
    <Text style={styles.text}>
      Tài khoản: {tk}
    </Text>
    <Text style={styles.text}>
      Số tiền vay: <Text style={styles.textVay}>{sotienvay}</Text>
    </Text>
    
  </View>
);
const renderItemVay = ({ item }) => (
  <ItemVay
    TG={item.TG}
    tk={item.tk}
    sotienvay={item.sotienvay}
  />
);


const FirstRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#fff' }]} >
      <FlatList
        data={TIENGUI}
        showsVerticalScrollIndicator={false}
        renderItem={renderItemGui}
        keyExtractor={item => item.id}
      />
  </View>
);

const SecondRoute = () => (
  <View style={[styles.scene, { backgroundColor: '#fff' }]} >
    <FlatList
        data={TIENVAY}
        showsVerticalScrollIndicator={false}
        renderItem={renderItemVay}
        keyExtractor={item => item.id}
      />
  </View>
);


const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});


export default function ListMoney({ route, navigation }) {

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Danh sách tiền gửi',  },
    { key: 'second', title: 'Danh sách tiền vay' },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.divider} />
      <TabView
        // renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        showPageIndicator={true}
        renderTabBar={props => <TabBar {...props} style={styles.tabBar} indicatorStyle={styles.indicatorStyle}/>}
      />
  </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%', height: '100%', },
  scene: {flex: 1,},
  tabBar: {
    backgroundColor: '#024b04',
    borderBottomWidth: 1,
    borderColor: '#000',
  },
  indicatorStyle: {
    backgroundColor: "#fff",
    padding: 1.5,
    marginBottom: -2,
  },
  content: {
    backgroundColor: '#fff',
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  text: {
    fontSize: 16,
    color: '#000',
    padding: 8,
    // marginTop: 10,
    // paddingLeft: 8,
    // paddingRight: 8,
    // paddingBottom: 10,
  },
  textGUi: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#47a405',
    paddingBottom: 10,
  },
  textVay: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#d63422',
    paddingBottom: 10,
  },
  TG: {
    color: '#000',
    fontSize: 12,
  },
  separator: {
    borderWidth: 0.2,
    borderColor: '#c8c8c8',
    marginLeft: 15,
    marginRight: 15,
  },
  // divider: {
  //   zIndex: 100,
  //   position: 'absolute',
  //   width: 1,
  //   height: 48,
  //   backgroundColor: 'black',
  //   alignSelf: 'center',
  // },
});
