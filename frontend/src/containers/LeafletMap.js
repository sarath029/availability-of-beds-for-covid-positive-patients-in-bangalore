import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import "./LeafletMap.css"
import axios from 'axios'
import { useEffect, useState } from 'react'

const LeafletMap = () => {

    const [showMap, setShowMap] = useState("loading");
    const [data, setData] = useState([])

    useEffect(() => {
        const endpoint = "/api/availability"
        axios.get(endpoint)
            .then((response) => {
                console.log(response['data']);
                setShowMap("show");
                setData(response['data'])
            })
            .catch(() => {
                setShowMap("error");
            })

    }, [])

    if (showMap == "show") {

        return (
            <div className="Map">
                <MapContainer center={[12.9716, 77.5946]} zoom={12}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {data.map((marker) => (
                        <div>

                            <Circle
                                center={[marker.coordinate.split(',')[0], marker.coordinate.split(',')[1]]}
                                fillColor="blue"
                                radius={marker.available_total * 2.5 + 200}
                            >
                                <Popup>
                                    <b>Facility:</b> {marker.name_of_the_facility} <br></br>
                                    <b>Total available beds:</b> {marker.available_total} <br></br>
                                    <b>Available Gen:</b> {marker.available_gen} <br></br>
                                    <b>Available ICU:</b> {marker.available_icu} <br></br>
                                    <b>Available ICU Ventl:</b> {marker.available_icu_ventl} <br></br>
                                </Popup>

                            </Circle>
                        </div>


                    ))}
                </MapContainer>

            </div>
        )
    }
    else if (showMap == "loading") {
        return (
            <div>Loading Map.....</div>
        )
    }
    else {
        return (
            <div>Error Loading the data!!</div>
        )
    }

}

export default LeafletMap;