
import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Content, Left, Body, Right, List, ListItem, Button, Icon, Title } from 'native-base';


const renderMsg = (msg) => {
    let color = 'blue'
    const { msg_body, msg_type, status } = msg
    color = status.toLocaleLowerCase() == 'received' ? '#304FFE' : status.toLocaleLowerCase() == 'failed' ? 'red' : '#008b00'
    let icon = status.toLocaleLowerCase() == 'failed' ? 'sms-failed' : 'sms'

    return (
        <ListItem key={msg.id} thumbnail>
            <Left>
                <View style={{ width: 30 }}>
                    <Icon type="MaterialIcons" name={icon} style={{ color: color }} />
                </View>
            </Left>
            <Body>
                <Text style={{ color: '#424242', fontWeight: 'bold' }}>{msg_type}</Text>
                <Text note numberOfLines={5}>{msg_body}</Text>
            </Body>
            <Right>
                <Button transparent>
                    <Text style={{ color: color, fontWeight: 'bold' }}>{status}</Text>
                </Button>
            </Right>
        </ListItem>
    )
}

const MessageList = ({ messages }) => {
    return (
        <Content>
            <ScrollView>
                <List>
                    {
                        messages.map((msg) => {
                            return renderMsg(msg)
                        })
                    }
                </List>
            </ScrollView>
        </Content>
    )
}




const styles = StyleSheet.create({
    iconStyle: {
        fontSize: 30
    },
    headerTextStyle: {
        fontSize: 15
    }
});

export default MessageList;