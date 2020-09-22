import React from 'react';
import { StyleSheet, } from 'react-native';
import { Header, Left, Body, Right, Button, Icon, Title } from 'native-base';



  const HeaderComponent = (props)=>{
    const { exit } = props
    return (
        <Header>
          <Left>
            <Button transparent>
              
            </Button>
          </Left>
          <Body>
            <Title style={styles.headerTextStyle}>USSD PUSH SIMULATOR</Title>
          </Body>
          <Right>
            <Button transparent 
            onPress={()=>exit()}
            >
              <Icon type="MaterialCommunityIcons" name='exit-to-app' style={styles.iconStyle} />
            </Button>
          </Right>
        </Header>
    )
  }



  const styles = StyleSheet.create({
    iconStyle:{
      fontSize:30
    },
    headerTextStyle:{
      fontSize:15
    }
  });

  export default HeaderComponent;