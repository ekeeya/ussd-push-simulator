import React from 'react';
import { StyleSheet,View, TextInput } from 'react-native';
import {Right} from 'native-base'
import Dialog from "react-native-dialog";



const InteractionDialog = (props)=>{
    const { 
        text, 
        isReply, 
        isVisible,
        onCancel,
        onSend,
        onOk,
        handleStateChange
    } = props;
    return(
        <View>
        <Dialog.Container visible={isVisible}>

          <Dialog.Description>
            {text}
          </Dialog.Description>
          {isReply ? 
          <>
          <Dialog.Input
            onChangeText={handleStateChange('replyText')}
            wrapperStyle={styles.textInputStyle}
          />
          <View style={{flexDirection:'row',justifyContent:'center'}}>
            <View style={styles.buttonViewStyle}>
                <Dialog.Button label="Cancel" onPress={()=>{onCancel()}} />
            </View>
            <View style={styles.buttonViewStyle}>
                <Dialog.Button label="Send" onPress = {()=>{onSend()}} />
            </View>
          </View>
          </>
          :
          <Dialog.Button label="OK" onPress={()=>{onOk()}} />
          }
          
        </Dialog.Container>
      </View>
    )
}

export default InteractionDialog

const styles = StyleSheet.create({
   textInputStyle :{height: 40, borderBottomColor: 'gray',borderBottomWidth:1},
   buttonViewStyle:{
       width:120
   }
});