import {
    Alert,
    Card
} from 'react-bootstrap'

import LeafletMap from './LeafletMap'

const MapContainer = () => {
    return (
        <div>
            <Alert variant="secondary">
                <Alert.Heading>Availability of beds in Bangalore for C+ patients</Alert.Heading>
                <hr />
                <p className="mb-0">
                    Resource: <a href="https://bbmpgov.com/">BBMP</a><br></br>
                    <a href="/api/availability">Availability of beds API</a>
                </p>
            </Alert>
            <Card className="m-5" style={{ "height": "90%" }}>
                <Card.Body>
                    <LeafletMap></LeafletMap>
                </Card.Body>
            </Card>
        </div>

    )
}

export default MapContainer;
