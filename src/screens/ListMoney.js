import React, { useEffect, useState } from 'react'
import { View, Animated, StyleSheet, useWindowDimensions, FlatList, SafeAreaView, Text , Image } from 'react-native';
import { TabView, SceneMap, TabBar, TextView } from 'react-native-tab-view';
import Images from '../assets';
import { getDepositsList, getLoansList } from '../store/HomeSlice'
import { useSelector, useDispatch } from "react-redux";
// import moment from 'moment';


const ScreenGui = () =>{ 
  const dataDeposits = useSelector(store => store.product.dataListDeposits)
  // const TIENGUI = dataDeposits.map((e,i)=>({id: i, TG: moment(e?.time).format('HH:mm DD-MM-YYYY'), laixuat: `${e?.interestRate}`.slice(0,3) ,tk: `${e?.accountNumber}`, kyhan: `${e?.period}`, sotiengui: `${e?.surplus}` }))
  const TIENGUI = dataDeposits.map((e,i)=>({id: i, laixuat: `${e?.interestRate}`.slice(0,3) ,tk: `${e?.accountNumber}`, kyhan: `${e?.period}`, sotiengui: `${e?.surplus}` }))

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDepositsList())
  }, [])

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
            {/* <Text style={styles.TG}>{item.TG}</Text> */}
        </View>
        <View style={styles.separator} />
          <Text style={styles.text}>
            S??? h???p ?????ng ti???n g???i: {item.tk}
          </Text>
          <Text style={styles.text}>
            L??i su???t: {item.laixuat}%
          </Text>
          <Text style={styles.text}>
            S??? ti???n g???i: <Text style={styles.textGUi}>+{item.sotiengui}</Text>
          </Text>
          <Text style={{ color: '#000',  fontSize: 17, paddingTop: 8, paddingLeft: 10, paddingBottom: 10}}>K??? h???n: {item.kyhan} th??ng</Text>
      </Animated.View>
    );
  }
  const scrollY = React.useRef(new Animated.Value(0)).current;
  

  return(
  <SafeAreaView style={[styles.container, { backgroundColor: '#fff' }]} >
      {TIENGUI.length > 0 ? (
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
      ) : (
        <View style={{alignItems: 'center', justifyContent: 'center', flex: 1,}}>
          <Text style={{fontSize: 17,  color: '#000' }}>
              Kh??ng c?? d??? li???u
          </Text>
        </View>
    )}
  </SafeAreaView>
);
}

const ScreenVay = () => {

  const dataLoans = useSelector(store => store.product.dataListLoans)

  const TIENVAY = dataLoans.map((e,i)=>({id: i,  makh: e?.code, tk: e?.contract_number, kyhan: e?.loan_date, laisuat: e?.interest_rate.slice(0,3) ,sodu: e?.surplus }))
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getLoansList())
  }, [])


  const renderItemVay = ({ item, index, }) => {

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
            {/* <Text style={styles.TG}>{item.TG}</Text> */}
        </View>
        <View style={styles.separator} />
          <Text style={styles.text}>
            S??? h???p ?????ng ti???n vay: {item.tk}
          </Text>
          <Text style={styles.text}>
            M?? kh??ch h??ng: {item.makh}
          </Text>
          <Text style={styles.text}>
            L??i su???t: {item.laisuat}%
          </Text>
          <Text style={styles.text}>
            S??? ti???n vay: <Text style={styles.textVay}>{item.sodu}</Text>
          </Text>
          <Text style={{ color: '#000',  fontSize: 17, paddingTop: 8, paddingLeft: 10, paddingBottom: 10}}>K??? h???n: {item.kyhan}</Text>
        
      </Animated.View>
    );
  }

  const scrollY = React.useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#fff' }]} >
      {TIENVAY.length > 0 ? (
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
        ) : (
          <View style={{alignItems: 'center', justifyContent: 'center', flex: 1,}}>
            <Text style={{fontSize: 17,  color: '#000' }}>
                Kh??ng c?? d??? li???u
            </Text>
          </View>
          
      )}
    </SafeAreaView>
  );
  
}

const renderScene = SceneMap({
  first: ScreenGui,
  second: ScreenVay,
});


export default function ListMoney({ route, navigation }) {

  

  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Danh s??ch ti???n g???i'},
    { key: 'second', title: 'Danh s??ch ti???n vay' },
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
