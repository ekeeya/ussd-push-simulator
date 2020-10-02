import axios from 'axios'
import { ROOT_URL } from  '../../utils'

const httpClient = axios.create();
httpClient.defaults.timeout = 5000; 
httpClient.defaults.baseURL = ROOT_URL

const params = new URLSearchParams();
export const sendMessage =  (state)=>{
    const { msisdn, replyText} = state
    console.log(msisdn, replyText)
    params.append('from', msisdn);
    params.append('text', replyText);

    return (dispatch) =>{
        //dispatch({ type: 'REG_START'})
        httpClient.post(`http://129.205.2.58/c/ex/b5c95ea8-0b98-4bb5-bba8-f11f9abf8f73/receive`,params).
        then(function(response){
            console.log(response)
        }).catch((error)=>{
            console.log(error)
        })

    }
    
}
