import React, { Component } from 'react'
import { Link } from 'react-router'
import { Table, Col, Row } from 'react-bootstrap'
import { socketConnect } from 'socket.io-react'
import GoogleMapsLoader from 'google-maps'

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: { username: 'empty', nfc_id: 'empty' },
            lora_gps: 'empty',
            lora_location: 'empty',
            marker: null,
            map: null
        }
    }

    componentDidMount() {
        const { socket } = this.props
        socket.on('lora_gps', value => {
            this.setState({ lora_gps: value.split(',') })
            const location = { lat: parseFloat(this.state.lora_gps[0]), lng: parseFloat(this.state.lora_gps[1]) }
            if (this.state.marker) {
                this.state.marker.setPosition(location)
                this.state.map.setCenter(location)
            }
        })

        socket.on('lora_location', value => {
            this.setState({ lora_location: value })
        })

        socket.on('rfid', value => {
            this.setState({ user: value })
        })

        GoogleMapsLoader.load(google => {
            let location = { lat: 10.776651, lng: 106.683750 }
            let map = new google.maps.Map(document.getElementById('map-nearby'), {
                zoom: 15,
                center: location,
                mapTypeId: 'terrain'
            })
            this.setState({ map: map })
            let marker = new google.maps.Marker({
                position: location,
                map: map
            })
            this.setState({ marker: marker })
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
                                <th>Balance</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="value">{this.state.user.username}</td>
                                <td className="value">{this.state.user.nfc_id}</td>
                            </tr>
                        </tbody>
                    </Table>
                    <br />
                    <Row>
                        <Col md={6}>
                            <h3>LORA Location</h3>
                            <Table striped bordered condensed hover>
                                <thead>
                                    <tr>
                                        <th>Value</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="value">{this.state.lora_location}</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                        <Col md={6}>
                            <h3>LORA GPS: {this.state.lora_gps}</h3>
                            <div id="map-nearby"></div>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
}

export default socketConnect(Home)