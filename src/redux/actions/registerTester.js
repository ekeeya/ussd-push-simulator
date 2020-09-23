import axios from 'axios'
import { ROOT_URL } from  '../../utils'
import AsyncStorage from '@react-native-community/async-storage';

const httpClient = axios.create();
httpClient.defaults.timeout = 5000; 
httpClient.defaults.baseURL = ROOT_URL

const persistMsisdn = async (msisdn) => {
    try {
      await AsyncStorage.setItem('msisdn',msisdn )
      console.log("I have stored the value")
    } catch (e) {
      console.log(e)
      error(e)
    }
  }
  
  export const getMSISDN = async () => {
    try {
      const value = await AsyncStorage.getItem('msisdn')
      if (value !== null) {
        return value
      } else {
        return value
      }
    } catch (e) {
        return null
      // error reading value
    }
  }

  
export const registerTester =  (state)=>{
    const { msisdn, deviceUniqueID} = state
    persistMsisdn(msisdn)
    return (dispatch) =>{
        
        dispatch({ type: 'REG_START'})
        httpClient.post(`${ROOT_URL}/demo/demo_register/`,
        {
          msisdn: msisdn,
          deviceUniqueID: deviceUniqueID
        }).
        then(function(response){
            dispatch({ type: 'REG_SUCCESS',data:response.data.data})
        }).catch((error)=>{
            console.log(error)
            dispatch({ type: 'REG_SUCCESS',error:error})
        })

    }
    
}
