import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const DATA = [
  {
    id: '1',
    tenkh: 'NGUYỄN THỊ SƠN',
    taikhoan: 'AB2875872',
    sodu: '30,000,000'
  },
  {
    id: '2',
    tenkh: 'NGUYỄN ĐỨC MINH',
    taikhoan: 'AB1903507',
    sodu: '25,680,000'
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

const Item = ({ tenkh, taikhoan, sodu }) => (
  <TouchableOpacity>
    <View style={styles.item}>
      <View>
        <Text style={styles.tenkh}>Tên tài khoản: {tenkh}</Text>
        <Text style={styles.taikhoan}>Số tài khoản: {taikhoan}</Text>
        <Text style={styles.sodu}>Số dư: {sodu} VND</Text>
      </View>
      <Icon name={'chevron-right'} color="#fff" size={16} />
    </View>
  </TouchableOpacity>
);

const ListAccount = ({ route, navigation }) => {
  const renderItem = ({ item }) => (
    <Item tenkh={item.tenkh} taikhoan={item.taikhoan} sodu={item.sodu} />
  );

  return (
    <SafeAreaView style={styles.container}>
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
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#024b04',
    borderRadius: 7,
    marginTop: '5%',
  },
  tenkh: {
    fontSize: 18,
    color: '#fff'
  },
  taikhoan: {
    fontSize: 18,
    color: '#fff'
  },
  sodu: {
    color: '#fff',
    fontSize: 18,
  }
});

export default ListAccount;