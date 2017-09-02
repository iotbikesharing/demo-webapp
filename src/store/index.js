import { compose, createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import reduxReset from 'redux-reset'

import mainReducer from '../reducers'

const middleware = []

middleware.push(thunkMiddleware)
if (process.env.NODE_ENV === 'development') {
	const logger = createLogger()
	middleware.push(logger)
}

const createAppStore = compose(
	applyMiddleware(...middleware),
	reduxReset()
)(createStore)

export default function configureStore() {
	return createAppStore(mainReducer)
}