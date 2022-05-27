
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
              <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#ccc', borderRadius: 20, paddingLeft: 10, paddingRight: 10 }}>
                <TextInput
                  style={styles.input}
                  placeholder="Tài khoản đăng nhập"
                />

              </View>
              <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#ccc', borderRadius: 20, paddingLeft: 10, paddingRight: 10 }}>
                <TextInput
                  secureTextEntry={checkEye1}
                  style={styles.input}
                  placeholder="Mật khẩu"
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
              <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#ccc', borderRadius: 20, paddingLeft: 10, paddingRight: 10 }}>
                <TextInput

                  style={styles.input}
                  placeholder="Tài khoản đăng nhập mới"
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
    paddingVertical: 20
  },
  scrollView: {
    marginHorizontal: 20,
    width: '100%'
  },
  input: {
    flex: 1,
    marginVertical: 10
  },
  buttons: {
    alignItems: 'center',
    // marginHorizontal: 20,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 20,
    padding: 20,
    backgroundColor: '#024b04',
    borderRadius: 50,
  },
})