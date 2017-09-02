import * as types from '../actions/actionTypes'

export default function authReducer(state = {
    loaded: true
}, action) {
    switch (action.type) {
        case types.UPDATE_SPIN_STATE:
            return Object.assign({}, state, { loaded: action.loaded })

        default:
            return state
    }
}