import axios from 'axios'
import { ROOT_URL } from  '../../utils'

const httpClient = axios.create();
httpClient.defaults.timeout = 15000; 
httpClient.defaults.baseURL = ROOT_URL


export const getTester = (msisdn)=>{
    return (dispatch) =>{
        dispatch({ type: 'CHECK_START'})
        httpClient.get(`${ROOT_URL}/demo/demo_tester/${msisdn}`).
        then(function(response){
            if(response.data.status ==="success"){
                dispatch({ type: 'CHECK_SUCCESS',data:response.data.data,registered:true})
            }
            else{
                dispatch({ type: 'CHECK_ERROR',error:response.data.message,registered:false})
                alert(response.data.message)
            }
        }).catch((error)=>{
            console.log(error)
            dispatch({ type: 'CHECK_ERROR',error:error,registered:false})
            alert(error)
        })

    }
}
