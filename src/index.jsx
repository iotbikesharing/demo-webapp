import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { SocketProvider } from 'socket.io-react'
import io from 'socket.io-client'

import { BASE_URL } from './utilities/constants'

import Home from './components/Home.jsx'

const socket = io.connect(BASE_URL)

render(
    <SocketProvider socket={socket}>
        <Router history={browserHistory}>
            <Route path="/" component={Home} />
        </Router>
    </SocketProvider>,

    document.getElementById('app')
)