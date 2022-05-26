import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from "react-redux";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ListMoney from './ListMoney'


const DATA = [
  {
    id: '1',
    tenkh: 'NGUYỄN ĐỨC MINH',
    taikhoan: 'AB1903507',
    sodu: '25,680,000'
  },
  {
    id: '2',
    tenkh: 'NGUYỄN PHƯƠNG LINH',
    taikhoan: 'AB2875872',
    sodu: '30,000,000'
  },
  {
    id: '3',
    tenkh: 'NGUYỄN VĂN CƯỜNG',
    taikhoan: 'AB6584357',
    sodu: '13,000,000'
  },
  // {
  //   id: '4',
  //   tenkh: 'NGUYỄN VĂN CƯỜNG',
  //   taikhoan: 'AB6584357',
  //   sodu: '13,000,000'
  // },
  // {
  //   id: '5',
  //   tenkh: 'NGUYỄN VĂN CƯỜNG',
  //   taikhoan: 'AB6584357',
  //   sodu: '13,000,000'
  // },
  // {
  //   id: '6',
  //   tenkh: 'NGUYỄN VĂN CƯỜNG',
  //   taikhoan: 'AB6584357',
  //   sodu: '13,000,000'
  // },
];


// const StackListAccount = createNativeStackNavigator();
const ListAccount = ({ route, navigation }) => {

  const data = useSelector(store => store.product.dataInfoUser)

  const Item = ({ tenkh, taikhoan, sodu }) => (
    <TouchableOpacity onPress={onListMoney}>
      <View style={styles.item}>
        <View >
          <Text style={styles.tenkh}>Tên khách hàng: {tenkh}</Text>
          <Text style={styles.taikhoan}>Tài khoản: {taikhoan}</Text>
          <Text style={styles.sodu}>Số dư: {sodu} VND</Text>
        </View>
        <Icon name={'chevron-right'} color="#fff" size={16} />
      </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Item tenkh={item.tenkh} taikhoan={item.taikhoan} sodu={item.sodu} />
  );

  const onListMoney = () => {
    navigation.navigate('ListMoney');
  }

  return (
      <SafeAreaView style={styles.container}>
        <View style={{
              margin: '5%',
              borderWidth: 1,
              padding: 20,
              borderRadius: 15,
              borderColor: '#024b04',
              backgroundColor: '#fff',
              elevation: 20,
              shadowColor: '#024b04',
              shadowOffset: {
                width: 3,
                height: 5
              },
              shadowRadius: 5,
              shadowOpacity: 0.6}}>
        <Text
          style={{ color: '#024b04', fontWeight: 'bold', fontSize: 16,}}
          numberOfLines={1}>
          {`Tên khách hàng: ${data?.name}`}
        </Text>
        <Text style={{ color: '#024b04', fontWeight: 'bold', fontSize: 18 }}>
          {`Tài khoản: ${data?.accountNumber}`}
        </Text>
        <Text style={{ color: '#024b04', fontSize: 18, paddingTop: 5, fontWeight: 'bold' }}>
          {`Số dư: ${data?.surplus} VND`}
        </Text>
      </View>

      <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 18, marginLeft: 20, marginTop: 20,}} >Sổ Phụ (3)</Text>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  item: {
    backgroundColor: '#024b04',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#024b04',
    borderRadius: 7,
    // marginTop: '5%',
  },
  tenkh: {
    fontSize: 17,
    color: '#fff'
  },
  taikhoan: {
    fontSize: 17,
    color: '#fff'
  },
  sodu: {
    color: '#fff',
    fontSize: 17,
  }
});

export default ListAccount;