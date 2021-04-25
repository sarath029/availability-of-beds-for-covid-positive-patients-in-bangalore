import React, { Suspense } from 'react'
const MapContainer = React.lazy(() => import('./MapContainer'));

const App = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <MapContainer></MapContainer>
        </Suspense>

    )
}

export default App;