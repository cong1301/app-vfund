import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
const DATA = [
    {
        id: '1',
        image: require('../assets/anhdoithuong/tpbank.jpg'),
        title: '[DDAA0010] 5.000.000 VND vào tài khoản thanh toán',
        diem: '500,000 ĐIỂM',
        icon: 'add-circle-outline',
    },
    {
        id: '2',
        image: require('../assets/anhdoithuong/anh2trieu.jpg'),
        title: '[COVID200K] Ủng hộ Quỹ Vacxin Covid 2.000.000 VND',
        diem: '400,000 ĐIỂM',
        icon: 'add-circle-outline',
    },
    {
        id: '3',
        image: require('../assets/anhdoithuong/anh1trieu.jpg'),
        title: '[CHATS1500TV] Voucher mua hàng tại của hàng thời trang CHÂTS',
        diem: '100,000 ĐIỂM',
        icon: 'add-circle-outline',
    },
    {
        id: '4',
        image: require('../assets/anhdoithuong/anh5trieu.jpg'),
        title: '[DDAA0010] 5.000.000 VND vào tài khoản thanh toán',
        diem: '250,000 ĐIỂM',
        icon: 'add-circle-outline',
    },
    {
        id: '5',
        image: require('../assets/anhdoithuong/anhtech.png'),
        title: '[COVID200K] Ủng hộ Quỹ Vacxin Covid 2.000.000 VND',
        diem: '200,000 ĐIỂM',
        icon: 'add-circle-outline',
    },
    {
        id: '6',
        image: require('../assets/anhdoithuong/anh3trieu.jpg'),
        title: '[CHATS1500TV] Voucher mua hàng tại của hàng thời trang CHÂTS',
        diem: '100,000 ĐIỂM',
        icon: 'add-circle-outline',
    },
    {
        id: '7',
        image: require('../assets/anhdoithuong/tpbank.jpg'),
        title: '[DDAA0010] 5.000.000 VND vào tài khoản thanh toán',
        diem: '300,000 ĐIỂM',
        icon: 'add-circle-outline',
    },
    {
        id: '8',
        image: require('../assets/anhdoithuong/anh2trieu.jpg'),
        title: '[COVID200K] Ủng hộ Quỹ Vacxin Covid 2.000.000 VND',
        diem: '500,000 ĐIỂM',
        icon: 'add-circle-outline',
    },
    {
        id: '9',
        image: require('../assets/anhdoithuong/anh5trieu.jpg'),
        title: '[CHATS1500TV] Voucher mua hàng tại của hàng thời trang CHÂTS',
        diem: '100,000 ĐIỂM',
        icon: 'add-circle-outline',
    },
];

const Item = ({ image, title, diem, icon }) => (
    <View
        style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: '5%',
            width: '100%',
        }}>
        <View style={styles.item}>
            <View style={styles.itemLogo}>
                <Image style={styles.userLogo} source={image} />
            </View>
            <View style={styles.text}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.diem}>{diem}</Text>
            </View>
        </View>
        <TouchableOpacity style={styles.bamthem}>
            <Icon style={styles.icon} size={27} name={icon} />
        </TouchableOpacity>
    </View>
);

const image = {
    uri: 'https://image.shutterstock.com/image-photo/poker-table-felt-background-green-260nw-583060111.jpg',
};
const Stack = createNativeStackNavigator();

export default function Gift() {
    const renderItem = ({ item }) => (
        <Item
            title={item.title}
            image={item.image}
            diem={item.diem}
            icon={item.icon}
        />
    );
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>
                <ImageBackground source={image} resizeMode="cover" style={styles.header}>
                    <View style={styles.header2}>
                        <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 17 }}>
                            Quý khách đang có:
                        </Text>
                        <View style={styles.header2trong}>
                            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
                                9999
                            </Text>
                            <Text style={{ color: 'white', fontSize: 13, marginLeft: 5 }}>
                                điểm
                            </Text>
                            <Icon name="chevron-forward-outline" color="white" size={13} />
                        </View>
                        <Text style={{ color: 'white', fontSize: 13 }}>
                            9999 điểm sẽ hết hạn vào 31/12/2022
                        </Text>
                    </View>
                    <View style={styles.header3}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="time-outline" color="white" size={20} />
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    textDecorationLine: 'underline',
                                    color: 'white',
                                    fontSize: 13,
                                }}>
                                Lịch sử điểm thưởng
                            </Text>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Icon name="gift-outline" color="white" size={20} />
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    textDecorationLine: 'underline',
                                    color: 'white',
                                    fontSize: 13,
                                }}>
                                Tặng điểm thưởng
                            </Text>
                        </View>
                    </View>
                </ImageBackground>

                <View style={styles.content}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={DATA}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                    />

                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 0.3,
    },
    header2: {
        alignItems: 'center',
        paddingTop: '5%',
    },
    header2trong: {
        flexDirection: 'row',
        padding: '5%',
        alignItems: 'center',
    },
    header3: {
        justifyContent: 'space-around',
        flexDirection: 'row',
        marginTop: '6%',
    },
    content: {
        flex: 0.7,
    },
    item: {
        marginVertical: 4,
        flexDirection: 'row',
        width: '90%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemLogo: {
        width: '20%',
    },
    userLogo: {
        width: 80,
        height: 80,
        borderRadius: 20 / 2,
    },
    text: {
        flexDirection: 'column',
        width: '70%',
        paddingLeft: '5%',
    },
    title: {
        fontSize: 13.5,
        color: 'black',
    },
    diem: {
        color: '#0dba15',
        paddingTop: 5,
    },
    bamthem: {
        width: '10%',
    },
    icon: {
        color: '#024b04',
    },
});
