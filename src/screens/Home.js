
import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Alert,
  StatusBar,
} from 'react-native';
import { Container,Content, Left, Body,Right,  List, ListItem, Button, Icon, Title } from 'native-base';
import HeaderComponent  from '../components/Header'
import MessageList from  '../components/MessageList'
import  DeviceInfo  from 'react-native-device-info';
import RNExitApp from 'react-native-exit-app';

import InteractionDialog from '../components/InteractionDialog';

import { connect } from 'react-redux'
import { fetchMessages } from '../redux/actions/fetchMessages'

import {request, PERMISSIONS} from 'react-native-permissions';

const messages =[
    {id:1, type:'Incoming', message:'In this crazy world, we rich for the best we can',status:'Sent'},
    {id:2, type:'Outgoing', message:'Walking through the dark night, calling out your name',status:'Received'},
    {id:3, type:'Outgoing', message:"Wrote you a letter, didn't wanna see your face, was gonna hold onto my feelings nomatter  who is wrong or right",status:'Failed'}
  ] 
const text = messages[2].message
class HomeScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            isVisible:false,
            replyText:'',
            messages:[]
        }
    }

    componentDidMount(){
        this.props.fetchMsgs()
        let deviceId = DeviceInfo.getDeviceId();
        console.log(deviceId)
        request(PERMISSIONS.ANDROID.READ_PHONE_STATE).then((result) => {
            console.log(result)
            
          });

        
        
    }
    static getDerivedStateFromProps(props, state){
        if(props.messages !== state.messages){
            return{
                messages:[...props.messages],
            }
        }
    }
    exitApp = ()=>{
        RNExitApp.exitApp();
    }
    handleClick = ()=> {
        Alert.alert(
            'Exit',
            'Are sure you want to exit the app?',
            [
                { text: 'No', onPress: () => console.log("stay") },
                { text: 'Yes', onPress: () => this.exitApp() }
            ],
            { cancelable: false }
        );
      }
    onDialogSend = ()=>{
        console.log("sending")
    }
    onDialogCancel = ()=>{
        this.setState({isVisible:false})
    }
    onDialogOK = ()=>{
        this.setState({isVisible:false})
    }
    handleStateChange = name => {
        return (text) => {
          this.setState({ [name]: text })
          }
      }
    render(){
        return (
            <>
            <StatusBar barStyle="dark-content" />
            <Container>
            <HeaderComponent exit={this.handleClick}/>
            <InteractionDialog 
                text={text} 
                isVisible = {this.state.isVisible}
                isReply={true} 
                onCancel={this.onDialogCancel} 
                onSend={this.onDialogSend} 
                onOk={this.onDialogOK}
                handleStateChange={this.handleStateChange}
                 />
            <MessageList messages={this.state.messages}/>
            </Container>
        </>
        );
    }
}

function mapStateToProps(state) {
    return {
        messages: state.fetchMessages.messages,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        fetchMsgs: () => { dispatch(fetchMessages()) },
    }
}


export default connect(mapStateToProps, mapDispatchToProps) (HomeScreen);
