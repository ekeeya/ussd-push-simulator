
import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  Alert,
  StatusBar
} from 'react-native';
import { Container,Separator,Content} from 'native-base';
import  DeviceInfo  from 'react-native-device-info';
import RNExitApp from 'react-native-exit-app';

import HeaderComponent  from '../components/Header'
import MessageList from  '../components/MessageList'
import InteractionDialog from '../components/InteractionDialog';
import RegisterModal from '../components/RegisterModal'
import TitleComponent from '../components/TitleCard'

import { connect } from 'react-redux'
import { fetchMessages } from '../redux/actions/fetchMessages'
import { registerTester, getMSISDN } from '../redux/actions/registerTester'
import {getTester} from '../redux/actions/getTester'

const text = "In this crazy life, we reach for the best we can but sometimes it slips away"


class HomeScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            tester:null,
            isVisible:false,
            replyText:'',
            deviceUniqueID:'',
            msisdn:'',
            messages:[],
            isRegistered:false
        }
    }

    componentDidMount(){
        getMSISDN().then((tel)=>{
            if (tel){
                this.setState({msisdn:tel})
                this.props.fetchMsgs(tel)
                this.props.getTesterData(tel)
            }
        })
        const uniqeID = DeviceInfo.getUniqueId();
        this.setState({
            deviceUniqueID:uniqeID,
            isRegistered:this.props.isRegisted
        })
    }
    static getDerivedStateFromProps(props, state){
        
            return{
                messages:[...props.messages],
                tester:props.tester,
                isRegistered:props.isRegisted
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
    
      testerRegistration = ()=>{
          if(this.state.msisdn !== ''){
              this.setState({
                  isRegistered:true
              })
            this.props.register(this.state)
            setTimeout(()=>{
                this.props.fetchMsgs(this.state.msisdn)
                this.props.getTesterData(this.state.msisdn)
            },100)
          }else{
              alert("Phone number is required")
          }
      }
    render(){
        return (
            <>
            <StatusBar barStyle="dark-content" />
            <Container>
            <HeaderComponent exit={this.handleClick}/>
            <TitleComponent 
                deviceId={this.state.deviceUniqueID}
                msisdn={this.props.tester ? this.props.tester.msisdn:''}/>
            
            <InteractionDialog 
                text={text} 
                isVisible = {this.state.isVisible}
                isReply={true} 
                onCancel={this.onDialogCancel} 
                onSend={this.onDialogSend} 
                onOk={this.onDialogOK}
                handleStateChange={this.handleStateChange}
                 />
                 <View >
                 <Separator style={{alignItems:'center'}} bordered>
                    <Text>Messages</Text>
                    </Separator>
                 </View>
            
            <MessageList messages={this.state.messages}/>
            <RegisterModal
                isVisible={!this.state.isRegistered}
                onRegister={this.testerRegistration}
                handleStateChange={this.handleStateChange}
            />
            </Container>
        </>
        );
    }
}

function mapStateToProps(state) {
    return {
        messages: state.fetchMessages.messages,
        tester: state.registerTester.tester,
        isRegisted:state.registerTester.isRegisted,
        tester:state.getTester.tester,
        isRegisted:state.getTester.isRegisted,
        submitting:state.registerTester.submitting,
        testerAddError:state.registerTester.testerAddError,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        fetchMsgs: (msisdn) => { dispatch(fetchMessages(msisdn)) },
        register:(state)=>{dispatch(registerTester(state))},
        getTesterData:(msisdn)=>{dispatch(getTester(msisdn))}
    }
}


export default connect(mapStateToProps, mapDispatchToProps) (HomeScreen);
