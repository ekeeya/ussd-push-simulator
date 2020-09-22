const initialState = {
    messages: [],
    loading:false
}

export default function fetchMessages(state = initialState, action) {

    switch (action.type) {
        case 'FETCH_START':
            return Object.assign({}, state, {
                isLoading: true,
            })

        case 'FETCH_SUCCESS':
            return Object.assign({}, state, {
                messages: action.data.messages,
                loading: false,
            });
        default:
            return state

    }
}
