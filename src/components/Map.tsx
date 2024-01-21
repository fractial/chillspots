'use client'

import { useEffect, useState } from 'react'
import L from 'leaflet'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import MapViewport from '@/components/mapViewport'
import Search from '@/components/search'

const markerIcon = new L.Icon({
  iconUrl: 'vercel.svg',
  shadowUrl: '',
  iconSize: [32, 32],
  // iconAnchor: [16, 32],
  // popupAnchor: [0, 32]
})

export default function Map() {
  const [position, setPosition] = useState(null)
  const [marker, setMarker] = useState([])

  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        setPosition([latitude, longitude])
      }, (error) => {
        console.error(error)
      })
    }
  }, [])

  return (
    <div className='relative w-full h-full'>
      <MapContainer className='w-full h-full bg-white z-0' center={[50.110924, 8.682127]} zoom={13} zoomControl={false}>
        <TileLayer
          url='https://tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {
          position && 
          <Marker position={position} icon={markerIcon}>
            <Popup>Your Location</Popup>
          </Marker>
        }
        <MapViewport position={position} />
        <Search />
      </MapContainer>
    </div>
  )
}