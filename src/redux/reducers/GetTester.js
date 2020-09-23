const initialState = {
    tester:null,
    isRegisted:false
}

export default function getTester(state = initialState, action) {

    switch (action.type) {
        case 'CHECK_START':
            return Object.assign({}, state, {
                isLoading: true,
            })

        case 'CHECK_SUCCESS':
            return Object.assign({}, state, {
                tester:action.data,
                isRegisted:action.registered
            });
            case 'CHECK_ERROR':
                return Object.assign({}, state, {
                    isRegisted:action.registered
                });

        default:
            return state

    }
}
