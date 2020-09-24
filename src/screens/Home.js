
import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    View,
    Text,
    Alert,
    StatusBar
} from 'react-native';
import { Container, Separator, Content } from 'native-base';
import DeviceInfo from 'react-native-device-info';
import RNExitApp from 'react-native-exit-app';

import HeaderComponent from '../components/Header'
import MessageList from '../components/MessageList'
import InteractionDialog from '../components/InteractionDialog';
import RegisterModal from '../components/RegisterModal'
import TitleComponent from '../components/TitleCard'

import { connect } from 'react-redux'
import { fetchMessages } from '../redux/actions/fetchMessages'
import { registerTester, getMSISDN } from '../redux/actions/registerTester'
import { getTester } from '../redux/actions/getTester'

import { w3cwebsocket as W3CWebSocket } from 'websocket';


class HomeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            tester: null,
            isVisible: false,
            replyText: '',
            incomingText:'',
            isReplyPush:false,
            deviceUniqueID: '',
            msisdn: '',
            messages: [],
            isRegistered: false
        }
        //this.socket = SocketIOClient("ws://192.168.1.104:8000/ws/demo");
        this.client = new W3CWebSocket(`ws://192.168.1.104:8000/ws/demo`)
    }

   
    componentDidMount() {
        
        // connect to websocket
        this.client.onopen = () => {
            console.log('Websocket connection established')
          }

          getMSISDN().then((tel) => {
            if (tel) {
                this.setState({ msisdn: tel })
                this.props.fetchMsgs(tel)
                this.props.getTesterData(tel)
            }
        })

          this.client.onmessage = (message)=>{
            const dataFromServer = JSON.parse(message.data);
            if(dataFromServer){
                const { to,action,text } = dataFromServer.command
                console.log([dataFromServer.command])
                const isTrue = (action.toLowerCase()) ==='request' ? true : false;
                if (to === this.state.msisdn){
                    this.setState({
                        isVisible:true,
                        incomingText:text,
                        isReplyPush:isTrue,
                        messages:[dataFromServer.command]
                    })
                }
            }
          }

        
        const uniqeID = DeviceInfo.getUniqueId();
        this.setState({
            deviceUniqueID: uniqeID,
            isRegistered: this.props.isRegisted
        });
        
    }

    componentWillUnmount(){
        this.client.onclose=()=>{
            console.log("connection closed")
        }
    }
    static getDerivedStateFromProps(props, state) {

        return {
            messages: [...props.messages],
            tester: props.tester,
            isRegistered: props.isRegisted
        }

    }
    exitApp = () => {
        RNExitApp.exitApp();
    }
    handleClick = () => {
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
    onDialogSend = () => {
        console.log("sending")
    }
    onDialogCancel = () => {
        this.setState({ isVisible: false })
    }
    onDialogOK = () => {
        this.setState({ isVisible: false })
    }
    handleStateChange = name => {
        return (text) => {
            this.setState({ [name]: text })
        }
    }

    testerRegistration = () => {
        if (this.state.msisdn !== '') {
            this.setState({
                isRegistered: true
            })
            this.props.register(this.state)
            setTimeout(() => {
                this.props.getTesterData(this.state.msisdn)
                this.props.fetchMsgs(this.state.msisdn)
            }, 100)
        } else {
            alert("Phone number is required")
        }
    }
    render() {
        return (
            <>
                <StatusBar barStyle="dark-content" />
                <Container>
                    <HeaderComponent exit={this.handleClick} />
                    <TitleComponent
                        deviceId={this.state.deviceUniqueID}
                        msisdn={this.props.tester ? this.props.tester.msisdn : ''} />

                    <InteractionDialog
                        text={this.state.incomingText}
                        isVisible={this.state.isVisible}
                        isReply={this.state.isReplyPush}
                        onCancel={this.onDialogCancel}
                        onSend={this.onDialogSend}
                        onOk={this.onDialogOK}
                        handleStateChange={this.handleStateChange}
                    />
                    <View >
                        <Separator style={{ alignItems: 'center' }} bordered>
                            <Text>Messages</Text>
                        </Separator>
                    </View>
                    {console.log(this.state.messages)}
                    <MessageList messages={this.state.messages} />
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
        isRegisted: state.registerTester.isRegisted,
        tester: state.getTester.tester,
        isRegisted: state.getTester.isRegisted,
        submitting: state.registerTester.submitting,
        testerAddError: state.registerTester.testerAddError,
    }
}
function mapDispatchToProps(dispatch) {
    return {
        fetchMsgs: (msisdn) => { dispatch(fetchMessages(msisdn)) },
        register: (state) => { dispatch(registerTester(state)) },
        getTesterData: (msisdn) => { dispatch(getTester(msisdn)) }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
