import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { SocketProvider } from 'socket.io-react'
import io from 'socket.io-client'
import GoogleMapsLoader from 'google-maps'

import { BASE_URL } from './utilities/constants'

import Home from './components/Home.jsx'

const socket = io.connect(BASE_URL)
GoogleMapsLoader.KEY = 'AIzaSyDzU42Qi6au_pg_ip8QHMuqxk9qa1iWPJQ'
GoogleMapsLoader.LIBRARIES = ['visualization']

render(
    <SocketProvider socket={socket}>
        <Router history={browserHistory}>
            <Route path="/" component={Home} />
        </Router>
    </SocketProvider>,

    document.getElementById('app')
)