export const fetchMessages = ()=>{
    const response = {
    messages :[
        {id:1, type:'Incoming', message:'In this crazy world, we rich for the best we can',status:'Sent'},
        {id:2, type:'Outgoing', message:'Walking through the dark night, calling out your name',status:'Received'},
        {id:3, type:'Outgoing', message:"Wrote you a letter, didn't wanna see your face, was gonna hold onto my feelings nomatter  who is wrong or right",status:'Failed'}
      ] }
    return (dispatch) =>{
        dispatch({ type: 'FETCH_START'})
        dispatch({ type: 'FETCH_SUCCESS',data:response})
    }
}
