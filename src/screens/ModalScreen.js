import { StyleSheet, Text, Pressable, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import Images from '../assets';
import Icon from 'react-native-vector-icons/FontAwesome';



export default function ModalScreen(props) {

  const closeModal = (e) => {
    props.changeModalVisible(e);
  }

  return (
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', width: '100%', }}>
                  <Image style={{ width: 50, height: 50, marginRight: 15 }} source={Images.logo} />
                  <Text style={{ color: '#000', fontWeight: 'bold', fontSize: 16, }}>Thông Báo!</Text>
              </View>
              <View style={{ alignItems: 'center', }}>
                  <View style={{ flexDirection: 'row', padding: 15, alignItems: 'center' }}>
                      <Icon name="wrench" color="red" size={30}  />
                      <Text style={{ color: 'red', fontWeight: 'bold', fontSize: 20, marginLeft: 15,}}>Hệ thống đang cập nhật</Text>
                      {/* <Image style={{ width: '100%', height: 150, marginRight: 15 }} source={Images.imgbaotri} /> */}
                  </View>
              </View>

              <View style={{ width: '100%', alignItems: 'flex-end', }}>
              <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => closeModal(false)}
              >
                  <Text style={styles.textStyle}>OK</Text>
              </Pressable>
              </View>
          </View>
        </View>
        
  )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: "center",
        marginTop: 22
      },
      modalView: {
        width: '92%',
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20,
        alignItems: "flex-start",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      buttonClose: {
        backgroundColor: "#05610a",
        paddingHorizontal: 20
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        marginBottom: 10,
        textAlign: "center"
      },
})