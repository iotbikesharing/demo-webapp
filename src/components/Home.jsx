import React, { Component } from 'react'
import { Link } from 'react-router'
import { Table } from 'react-bootstrap'
import { socketConnect } from 'socket.io-react'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {username: 'empty', nfc_id: 'empty'},
            lora_gps: 'empty',
            lora_location: 'empty'
        }
    }

    componentDidMount() {
        const { socket } = this.props
        socket.on('lora_gps', value => {
            this.setState({ lora_gps: value })
        })

        socket.on('lora_location', value => {
            this.setState({ lora_location: value })
        })

        socket.on('rfid', value => {
            this.setState({ user: value })
        })
    }

    render() {
        return (
            <div>
                <nav className="navbar navbar-inverse navbar-static-top">
                    <div className="container">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span className="sr-only">Toggle navigation</span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                                <span className="icon-bar"></span>
                            </button>
                            <Link className="navbar-brand" to={'/'}>
                                IoT Bike Sharing
                            </Link>
                        </div>
                    </div>
                </nav>
                <div className="container">
                    <h3>RFID (Current user)</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Username</th>
                                <th>ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.state.user.username}</td>
                                <td>{this.state.user.nfc_id}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <h3>LORA</h3>
                    <Table striped bordered condensed hover>
                        <thead>
                            <tr>
                                <th>LORA 1 (Location)</th>
                                <th>LORA 2 (GPS)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{this.state.lora_location}</td>
                                <td>{this.state.lora_gps}</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

export default socketConnect(Home)