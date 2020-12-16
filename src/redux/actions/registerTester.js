import axios from 'axios'
import { ROOT_URL, CHANNEL_UUID } from  '../../utils'
import AsyncStorage from '@react-native-community/async-storage';

const httpClient = axios.create();
httpClient.defaults.timeout = 5000; 
httpClient.defaults.baseURL = ROOT_URL

export const  standardURN =(urn)=>{
  if(urn[0] === "0"){
    return urn.replace("0","256")
  }
  else if(urn[0] == "+"){
    return urn.substring(1)
  }
  else{
    return urn
  }
}

const persistMsisdn = async (msisdn) => {
    try {
      await AsyncStorage.setItem('msisdn',standardURN(msisdn) )
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

const params = new URLSearchParams();
  
export const registerTester =  (state)=>{
    const { msisdn, deviceUniqueID} = state
    params.append('from', msisdn);
    params.append('text', " ");
    persistMsisdn(msisdn)
    return (dispatch) =>{
        
        dispatch({ type: 'REG_START'})
        httpClient.post(`${ROOT_URL}/demo/demo_register/`,
        {
          msisdn: standardURN(msisdn),
          deviceUniqueID: deviceUniqueID
        }).
        then(function(response){
          httpClient.post(`http://server.dsmagic.com/c/${CHANNEL_UUID}/receive`,params).
            then(function(response){
            }).catch((error)=>{
                console.log(error)
            })
            dispatch({ type: 'REG_SUCCESS',data:response.data.data})
        }).catch((error)=>{
            console.log(error)
            dispatch({ type: 'REG_SUCCESS',error:error})
        })

    }
    
}



export const registerInRapidPro =  (state)=>{
  const { msisdn} = state
  console.log(msisdn, )
  

  return (dispatch) =>{
      //dispatch({ type: 'REG_START'})
      httpClient.post(`http://server.dsmagic.com/c/ex/${CHANNEL_UUID}/receive`,params).
      then(function(response){
          console.log(response)
      }).catch((error)=>{
          console.log(error)
      })

  }
  
}
