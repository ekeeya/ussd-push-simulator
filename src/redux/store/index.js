import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import reducers from "../reducers";

import loggerMiddleware from 'redux-logger'


const middleWares = [thunk, loggerMiddleware]

const store = createStore(reducers, applyMiddleware(...middleWares))

export default store  
