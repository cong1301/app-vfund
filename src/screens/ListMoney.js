import React, { useEffect, useState } from 'react'
import { View, Animated, StyleSheet, useWindowDimensions, FlatList, SafeAreaView, Text , Image } from 'react-native';
import { TabView, SceneMap, TabBar, TextView } from 'react-native-tab-view';
import Images from '../assets';

const TIENGUI = [
    {id: 1, TG: '16:53 19/05/2022', tk: 'A170265', kyhan: '3', sotiengui: '20,500,000 VND' },
    {id: 2, TG: '18:53 20/05/2022',  tk: 'A020619', kyhan: '4', sotiengui: '15,000,000 VND'},
    {id: 113, TG: '16:53 21/05/2022',  tk: 'A386245', kyhan: '5', sotiengui: '18,000,000 VND' },
]

const TIENVAY = [
  {id: 1, TG: '16:53 19/05/2022', tk: 'B023561', thoihan: '3', sotienvay: '15,000,000 VND' },
]

const FirstRoute = () =>{ 
  const renderItemGui = ({ item, index }) => { 

    const inputRange = [
      -1, 
      0,
      100 * index,
      100 + 200 * 3 * (index + 4)
    ]
  
    const opacityInputRange = [
      -1, 
      0,
      100 * index,
      100 + 300 * 1 * (index + 0.1)
    ]
  
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0]
    })
  
    const opacity = scrollY.interpolate({
      inputRange: opacityInputRange,
      outputRange: [1, 1, 1, 0]
    })
  
    return(
      <Animated.View style={{
        backgroundColor: '#fff',
        borderWidth: 1,
        margin: 10,
        borderRadius: 10,
        shadowColor: '#024b04',
        shadowOffset: 
        {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        opacity,
        transform: [{scale}],
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <Image source={Images.logo} style={{ width: 30, height: 30, borderRadius: 5, margin: 10 }} />
            <Text style={styles.TG}>{item.TG}</Text>
        </View>
        <View style={styles.separator} />
          <Text style={styles.text}>
            Số sổ: {item.tk}
          </Text>
          <Text style={styles.text}>
            Số tiền gửi: <Text style={styles.textGUi}>+{item.sotiengui}</Text>
          </Text>
          <Text style={{ color: '#000',  fontSize: 17, paddingTop: 8, paddingLeft: 10, paddingBottom: 10}}>Kỳ hạn: {item.kyhan} tháng</Text>
      </Animated.View>
    );
  }
  const scrollY = React.useRef(new Animated.Value(0)).current;


  return(
  <SafeAreaView style={[styles.container, { backgroundColor: '#fff' }]} >
      <Animated.FlatList
        data={TIENGUI}
        onScroll={Animated.event(
          [{ nativeEvent: {contentOffset: {y: scrollY}}}],
          { useNativeDriver: true }
        )}
        showsVerticalScrollIndicator={false}
        renderItem={renderItemGui}
        keyExtractor={item => item.id}
      />
  </SafeAreaView>
);
}

const SecondRoute = () => {

  

  const renderItemVay = ({ item, index, TG, tk, sotienvay }) => {

    const inputRange = [
      -1, 
      0,
      100 * index,
      100 + 200 * 3 * (index + 4)
    ]
  
    const opacityInputRange = [
      -1, 
      0,
      130 * index,
      130 + 300 * 1 * (index + 0.1)
    ]
  
    const scale = scrollY.interpolate({
      inputRange,
      outputRange: [1, 1, 1, 0]
    })
  
    const opacity = scrollY.interpolate({
      inputRange: opacityInputRange,
      outputRange: [1, 1, 1, 0]
    })

    return(
      <Animated.View style={{
        backgroundColor: '#fff',
        borderWidth: 1,
        margin: 10,
        borderRadius: 10,
        shadowColor: '#024b04',
        shadowOffset: 
        {
          width: 0,
          height: 10,
        },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        opacity,
        transform: [{scale}],
      }}>
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
        }}>
            <Image source={Images.logo} style={{ width: 30, height: 30, borderRadius: 5, margin: 10 }} />
            <Text style={styles.TG}>{item.TG}</Text>
        </View>
        <View style={styles.separator} />
          <Text style={styles.text}>
            Số sổ: {item.tk}
          </Text>
          <Text style={styles.text}>
            Số tiền vay: <Text style={styles.textVay}>+{item.sotienvay}</Text>
          </Text>
          <Text style={styles.text}>Thời hạn: {item.thoihan} tháng</Text>
          <Text style={{ color: '#000',  fontSize: 17, paddingTop: 8, paddingLeft: 10, paddingBottom: 10}}>Ngày trả lãi: 25</Text>
        
      </Animated.View>
    );
  }

  const scrollY = React.useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#fff' }]} >
      <Animated.FlatList
          data={TIENVAY}
          onScroll={Animated.event(
            [{ nativeEvent: {contentOffset: {y: scrollY}}}],
            { useNativeDriver: true }
          )}
          showsVerticalScrollIndicator={false}
          renderItem={renderItemVay}
          keyExtractor={item => item.id}
        />
    </SafeAreaView>
  );
  
}

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
});


export default function ListMoney({ route, navigation }) {

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Danh sách tiền gửi'},
    { key: 'second', title: 'Danh sách tiền vay' },
  ]);

  return (
    <SafeAreaView style={styles.container}>
      <TabView
        // renderTabBar={renderTabBar}
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        showPageIndicator={true}
        renderTabBar={props => <TabBar {...props} style={styles.tabBar} indicatorStyle={styles.indicatorStyle}/>}
      />
  </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabBar: {
    backgroundColor: '#024b04',
    borderBottomWidth: 1,
    borderColor: '#000',
    padding: 5,
  },
  indicatorStyle: {
    backgroundColor: "#fff",
    padding: 1.5,
    marginBottom: -2,
  },
  content: {
    backgroundColor: '#fff',
    borderWidth: 1,
    margin: 10,

    borderRadius: 8,
  },
  text: {
    color: '#000',  
    fontSize: 17, 
    paddingTop: 8, 
    paddingLeft: 10,
  },
  textGUi: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#47a405',
  },
  textVay: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ed250e',
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
});
