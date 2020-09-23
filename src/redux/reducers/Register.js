const initialState = {
    tester:null,
    submitting:false,
    testerAddError:null,
    isRegisted:false
}

export default function registerTester(state = initialState, action) {

    switch (action.type) {
        case 'REG_START':
            return Object.assign({}, state, {
                isLoading: true,
            })

        case 'REG_SUCCESS':
            return Object.assign({}, state, {
                tester:action.data,
                submitting:false,
                testerAddError:null,
                isRegisted:true
            });
            case 'REG_ERROR':
                return Object.assign({}, state, {
                    submitting:false,
                    testerAddError:action.error
                });
        default:
            return state

    }
}
