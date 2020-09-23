const initialState = {
    messages: [],
    fetching:false,
    fetchError:null

}

export default function fetchMessages(state = initialState, action) {

    switch (action.type) {
        case 'FETCH_START':
            return Object.assign({}, state, {
                isLoading: true,
            })

        case 'FETCH_SUCCESS':
            return Object.assign({}, state, {
                messages: action.data,
                loading: false,
            });
            case 'FETCH_ERROR':
                return Object.assign({}, state, {
                    fetchError: action.error,
                });
        default:
            return state

    }
}
