import { useMap } from 'react-leaflet'
import { GeoSearchControl } from "leaflet-geosearch";
import { OpenStreetMapProvider } from "leaflet-geosearch/lib/index.js";
import { useEffect } from 'react';

export default function Search() {
  const map = useMap()

  useEffect(() => {
    const searchControl = GeoSearchControl({
      provider: new OpenStreetMapProvider(),
      style: 'button',
      showMarker: true,
      showPopup: false,
      autoClose: true,
      retainZoomLevel: false,
      animateZoom: true,
      keepResult: false,
      searchLabel: 'Search'
    })

    map.addControl(searchControl)

    return () => {
      map.removeControl(searchControl)
    }

  }), [map]

    return null
}