
import React, { useEffect, useState } from 'react'

import {
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Text,
  View,
  Image,
} from 'react-native'
import Images from '../assets';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import Modal from "react-native-modal";
import ModalScreen from "./ModalScreen"



export default function UserNameChange() {
  const [checkEye1, setCheckEye1] = useState(true);
  const [passWordNew, setPassWordNew] = useState('');
  const [rePassWordNew, setRePassWordNew] = useState('');



  const handleSave = () => {
    changeModalVisible(true)
  }

  const [updateModalVisible, setupdateModalVisible] = useState(false);
  const changeModalVisible = (e) => {
      setupdateModalVisible(e)
  }

  return (

    <View style={styles.container}>
        <Modal
            isVisible={updateModalVisible}
            nRequestClose={() => changeModalVisible(false)}
        >
        <ModalScreen 
            changeModalVisible={changeModalVisible}
        />
        </Modal>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.info}>
            <Image source={Images.logo} style={{ height: 130, width: 130, borderRadius: 20 }} />
            <View
              // showsVerticalScrollIndicator={false}
              // showsHorizontalScrollIndicator={false}
              style={styles.scrollView} >
              <View style={styles.inputchange}>
                <TextInput
                  style={styles.input}
                  placeholder="Nhập tài khoản đăng nhập"
                  placeholderTextColor={'#948d8d'}
                />

              </View>
              <View style={styles.inputchange}>
                <TextInput
                  secureTextEntry={checkEye1}
                  style={styles.input}
                  placeholder="Nhập mật khẩu"
                  placeholderTextColor={'#948d8d'}
                  onChangeText={(e) => setPassWordNew(e)}
                  value={passWordNew}
                />
                <TouchableOpacity
                  onPress={() => setCheckEye1(!checkEye1)}
                >
                  {
                    checkEye1 ?
                      <Icon name="eye-off" color="#024b04" size={30} />
                      :
                      <Icon name="eye" color="#024b04" size={30} />

                  }
                </TouchableOpacity>
              </View>
              <View style={styles.inputchange}>
                <TextInput

                  style={styles.input}
                    placeholderTextColor={'#948d8d'}
                    placeholder="Nhập tài khoản đăng nhập mới"
                    onChangeText={(e) => setRePassWordNew(e)}
                    value={rePassWordNew}
                />

              </View>

            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableOpacity style={styles.buttons}
          onPress={handleSave}
        >
          <Text style={{ fontSize: 20, color: '#fff' }} >Lưu lại</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',

  },
  avatars: {
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  info: {
    alignItems: 'center',
    // borderWidth: 1,
    // borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#fff',
    paddingTop: 20
  },
  scrollView: {
    width: '100%'
  },
  inputchange: {
    flexDirection: 'row', 
    marginTop: 20, 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    // backgroundColor: '#ccc', 
    borderWidth: 1,
    borderColor: '#024b04',
    borderRadius: 20, 
    paddingLeft: 10, 
    paddingRight: 10
  },
  input: {
    flex: 1,
    padding: 15,
    // marginVertical: 10,
  },
  buttons: {
    alignItems: 'center',
    // marginHorizontal: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 30,
    padding: 20,
    backgroundColor: '#024b04',
    borderRadius: 50,
  },
})