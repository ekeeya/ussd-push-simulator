import { combineReducers } from 'redux';
import fetchMessages from './Message'
import registerTester from './Register'
import getTester from './GetTester'

export default combineReducers({
	fetchMessages,
	registerTester,
	getTester
})
