import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

export default function MapViewport({ position }) {
  const map = useMap()

  useEffect(() => {
    if (position && position.length === 2) map.setView(position, 13)
  }, [map, position])

  return null
}