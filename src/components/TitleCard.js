import React from 'react'
import { View, } from 'react-native'
import { Container, Header, Content, Card, CardItem, Text, Button, Icon, Left, Body, Right } from 'native-base'




const TitleComponent =({msisdn, deviceId})=>{
    let contact = msisdn ? msisdn :''
    let deviceID = deviceId? deviceId:''
    return(
        <Card>
        <CardItem>
          <Left>
            <Icon type="MaterialCommunityIcons" name="dialpad"/>
            <Body>
            <Text style={{fontSize:20,fontWeight:'bold'}}>{contact}</Text>
            <Text note>DeviceID : {deviceID}</Text>
            </Body>
          </Left>
        </CardItem>
      </Card>
    )
}

export default TitleComponent