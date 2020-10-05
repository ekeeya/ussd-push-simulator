import axios from 'axios'
import { ROOT_URL } from  '../../utils'

const httpClient = axios.create();
httpClient.defaults.timeout = 15000; 
httpClient.defaults.baseURL = ROOT_URL

const params = new URLSearchParams();
export const sendMessage =  (state)=>{
    const { msisdn, replyText} = state
    console.log(msisdn, replyText)
    params.append('from', msisdn);
    params.append('text', replyText);

    return (dispatch) =>{
        //dispatch({ type: 'REG_START'})
        httpClient.post(`http://129.205.2.58/c/ex/d96cc930-5519-4798-b9da-c1f83e05a388/receive`,params).
        then(function(response){
            console.log(response)
        }).catch((error)=>{
            console.log(error)
        })

    }
    
}

