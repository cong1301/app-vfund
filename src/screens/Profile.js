import { StyleSheet, Image, TextInput, ScrollView,TouchableWithoutFeedback,Keyboard, TouchableOpacity, Text, View } from 'react-native'
import Images from '../assets';
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector, useDispatch } from "react-redux";


export default function Profile({ route, navigation }) {

    const data = useSelector(store => store.product.dataInfoUser)

  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        style={styles.container}>
    
        <View style={styles.avatars} >
            <Image
                style={{ borderWidth: 1, 
                    borderColor: '#024b04', 
                    padding: 10,
                    borderRadius: 100,
                    backgroundColor: '#fff',
                    width: 90,
                    height: 90,
                    alignItems: 'center',}}
                source={require('../assets/icondangnhap/ducminh.jpg')}
            />
                    {/* <Icon color='#cdface' name="user" size={60} /> */}
            <TouchableOpacity >
                <Text style={{fontSize: 16, color: '#024b04', padding: 10, textDecorationLine: 'underline'}}>Đổi ảnh đại diện</Text>
            </TouchableOpacity>
        </View>
       

        <View style={styles.info}>
            <View 
                style={styles.infoView} >
                <View style={styles.input}>
                    <Text>Họ và tên</Text>
                    <TextInput
                        placeholder="Họ và tên"
                    >
                        <Text>{`${data?.name}`}</Text>
                    </TextInput>
                </View>
                
                
                <View style={styles.input}>
                    <Text>Số điện thoại</Text>
                    <TextInput
                        placeholder="Số điện thoại"
                    >
                        <Text>{`${data?.phone}`}</Text>
                    </TextInput>
                </View>


                
                <View style={styles.input}>
                    <Text>Địa chỉ</Text>
                    <TextInput
                        placeholder="Nhập địa địa chỉ"
                    >

                    </TextInput>
                </View>

                <View style={styles.input}>
                    <Text>Email</Text>
                    <TextInput
                        placeholder="Nhập địa Email"
                    >
                        
                    </TextInput>
                </View>

                
            </View>
        </View>
            <TouchableOpacity style={styles.buttons}>
                <Text style={{fontSize: 18, color: '#fff', }} >Lưu lại</Text>
            </TouchableOpacity>
    
    </ScrollView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    avatars: {
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 20,
    },
    info: {
        flex: 1,
        borderWidth: 1,
        borderRadius: 15,
        marginLeft: 20,
        marginRight: 20,
    },
    infoView: {
        marginHorizontal: 20,
    },
    input: {
        marginTop: 20,
        borderWidth: 1,
        borderColor: '#fff',
        borderBottomColor: '#d4d6da'
    },
    buttons: {
        marginHorizontal: 20,
        marginTop: 30,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#024b04',
        padding: 8,
        alignItems: 'center',
        backgroundColor: '#024b04', 
        borderRadius: 50,
    },
})