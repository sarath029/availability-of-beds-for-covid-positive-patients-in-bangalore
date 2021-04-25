import { MapContainer, TileLayer, useMapEvents, Popup, Circle } from 'react-leaflet'
import "./LeafletMap.css"
import axios from 'axios'
import { useEffect, useState } from 'react'


const LeafletMap = () => {

    const [showMap, setShowMap] = useState("loading");
    const [data, setData] = useState([])
    const [position, setPosition] = useState(null)

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

        const ZoomToLocale = () =>{
            const map = useMapEvents({
                click() {
                    console.log('map-clicked')
                    map.locate()
                },
                locationfound(e) {
                    setPosition(e.latlng)
                    map.flyTo(e.latlng, 14)
                },
            })
            return null
        }
        

        return (
            <div className="Map">
                <MapContainer center={[12.9716, 77.5946]} zoom={12}>
                    <ZoomToLocale></ZoomToLocale>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />

                    {data.map((marker) => (
                        <div>

                            <Circle
                                center={[marker.coordinate.split(',')[0], marker.coordinate.split(',')[1]]}
                                fillColor="blue"
                                radius={marker.available_total * 4 + 200}
                            >
                                <Popup>
                                    <p style={{fontSize:"1.5vh"}}>Facility: {marker.name_of_the_facility} <br></br>
                                    Total available beds: {marker.available_total} <br></br>
                                    Available Gen: {marker.available_gen} <br></br>
                                    Available ICU: {marker.available_icu} <br></br>
                                    Available ICU Ventl: {marker.available_icu_ventl} </p>
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