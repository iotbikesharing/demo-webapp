import { actions } from 'react-redux-form'

import baseService from './baseService'
import * as constants from '../utilities/constants'
import saveToLocalStorage from '../utilities/saveToLocalStorage'

export function postAuthentication(data, changeSpin, redirectToMain) {
    return (dispatch) => {
        return baseService(constants.POST_METHOD, '/auth', data)
            .then((res) => {
                if ('message' in res.data) {
                    changeSpin(true)
                    setModelDirty(dispatch, 'deep.login', res.data.message)
                } else {
                    setSuccessForm(dispatch, 'deep.login', res.data, redirectToMain)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export function postRegister(data, changeSpin, redirectToMain) {
    return (dispatch) => {
        return baseService(constants.POST_METHOD, '/users', data)
            .then((res) => {
                if ('message' in res.data) {
                    changeSpin(true)
                    setModelDirty(dispatch, 'deep.newAccount', res.data.message)
                } else {
                    setSuccessForm(dispatch, 'deep.newAccount', res.data, redirectToMain)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

function setModelDirty(dispatch, model, data) {
    dispatch(actions.setErrors(model, data))
}

function setSuccessForm(dispatch, model, data, redirectToMain) {
    dispatch(actions.setSubmitted(model))
    dispatch(actions.reset(model))
    saveToLocalStorage(data)
    redirectToMain()
}