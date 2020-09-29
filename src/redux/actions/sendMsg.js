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
        httpClient.post(`http://129.205.2.58/c/ex/98377d36-aea7-482a-8ecb-72575bf8bee2/receive`,params).
        then(function(response){
            console.log(response)
        }).catch((error)=>{
            console.log(error)
        })

    }
    
}
