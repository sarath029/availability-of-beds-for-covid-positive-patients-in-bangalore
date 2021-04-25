import {
    Alert,
    Card
} from 'react-bootstrap'
import React, { Suspense } from 'react'
const LeafletMap = React.lazy(() => import('./LeafletMap'));

const MapContainer = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div>
                <Alert variant="secondary">
                    <Alert.Heading style={{ fontSize: "2.5vh" }}>Availability of beds in Bangalore for C+ patients</Alert.Heading>
                    <hr />
                    <p className="mb-0" style={{ fontSize: "2vh" }}>
                        Resource: <a href="https://bbmpgov.com/">BBMP</a><br></br>
                        <a href="/api/availability">Availability of beds API</a><br></br>
                        <a href="https://github.com/sarath029/availability-of-beds-for-covid-positive-patients-in-bangalore">Github</a>
                    </p>
                </Alert>
                <Card className="m-5" style={{ "height": "90%" }}>
                    <Card.Body>
                        <p>click on circle marker to view more info.</p>
                        <LeafletMap></LeafletMap>
                    </Card.Body>
                </Card>
            </div>

        </Suspense>

    )
}

export default MapContainer;
