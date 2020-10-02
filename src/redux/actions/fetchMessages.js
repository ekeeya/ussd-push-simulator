import axios from 'axios'
import { ROOT_URL } from  '../../utils'

const httpClient = axios.create();
httpClient.defaults.timeout = 5000; 
httpClient.defaults.baseURL = ROOT_URL


export const fetchMessages = (msisdn)=>{
    return (dispatch) =>{
        dispatch({ type: 'FETCH_START'})
        httpClient.get(`${ROOT_URL}/demo/demo_msgs/${msisdn}`).
        then(function(response){
            dispatch({ type: 'FETCH_SUCCESS',data:response.data.data})
        }).catch((error)=>{
            console.log(error)
            dispatch({ type: 'FETCH_ERROR',error:error})
        })

    }
}


