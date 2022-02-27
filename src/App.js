import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import * as Leaf from 'leaflet';
import { setSelectionRange } from '@testing-library/user-event/dist/utils';

function App() {
  const LeafIcon = Leaf.Icon.extend({
    options: {}
  });

  const BlueIcon = new LeafIcon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
    iconSize: [10, 16],
    iconAnchor: [12, 41],
    popupAnchor: [-6, -42],
    shadowSize: [41, 41]
  });

  const GreenIcon = new LeafIcon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
    iconSize: [10, 16],
    iconAnchor: [12, 41],
    popupAnchor: [-6, -42],
    shadowSize: [41, 41]
   });


  const OrangeIcon = new LeafIcon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png",
    iconSize: [10, 16],
    iconAnchor: [12, 16],
    popupAnchor: [-6, -42],
    shadowSize: [41, 41]
  });
  

  const onClickMarker = marker => setMarkers(markers.push(marker.latlng));
  const position = [46.2305, -119 ];  // lat, lng 
  const [icon, setIcon] = React.useState(BlueIcon);
  const [latitude, setLatitude] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0);
  const [ministerType, setMinisterType] = React.useState(0);
  const [markers, setMarkers] = React.useState([
    { 
      coordinates: [46.2305, -121.1], 
      description: "Deliverance Minister", 
      color: GreenIcon
    }, 
    { 
      coordinates: [46.5034, -119], 
      description: "eLeader",
      color: BlueIcon
    },
    { 
      coordinates: [49.5034, -119], 
      description: "eMember",
      color: OrangeIcon
    }
  ]);

  const submitButton = () => {
    console.log(latitude, longitude)
    setMarkers(
      markers.push({
        coordinates: [latitude, longitude],
        description: ministerType,
        color: () => {
          if (ministerType === "Deliverance Minister") {
            return GreenIcon
          }
          if (ministerType === "eLeader") {
            return BlueIcon
          }
          if (ministerType === "eMember") {
            return OrangeIcon
          }
        }
      })
    )
  }

  return (
    <div>
      <MapContainer center={position} zoom={5} minZoom={5} style={{height: '100vh'}} onClick={e => onClickMarker(e)}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          opacity={0.5}
          zIndex={10}
        />
        {
          markers.map(marker => {
            return(
              <Marker icon={marker.color} position={marker.coordinates} key={123 + marker.coordinates[0]}>
                <Popup style={{backgroundColor: marker.color}}>
                  {marker.description}
                </Popup>
              </Marker>
            )
          })
        }
      </MapContainer>
    </div>
  );
}

export default App;