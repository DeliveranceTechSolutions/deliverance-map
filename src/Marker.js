import React from 'react';
import { Marker, Popup } from 'react-leaflet';



function CreateMarker({marker}) {
  return (
        <Marker position={marker} key={123 + marker[0]}>
            <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
        </Marker>
  );
}

export default CreateMarker;