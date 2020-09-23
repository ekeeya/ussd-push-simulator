
import React from 'react';
import { StyleSheet,View, TextInput } from 'react-native';
import Dialog from "react-native-dialog";


const RegisterModal = (props) => {
  const { isVisible, handleStateChange, onRegister } = props

  return (
    <View>
        <Dialog.Container visible={isVisible}>
        <Dialog.Title>Register Phone Number</Dialog.Title>
          <>
          <Dialog.Input
            placeholder="078xxxxxxx"
            onChangeText={handleStateChange('msisdn')}
            wrapperStyle={styles.textInputStyle}
          />
          <Dialog.Button label="Register" onPress = {()=>{onRegister()}} />
          </>
          
        </Dialog.Container>
      </View>
  );
};

export default RegisterModal;

const styles = StyleSheet.create({
  textInputStyle :{height: 40, borderBottomColor: 'gray',borderBottomWidth:1},
  buttonViewStyle:{
      width:120
  }
});