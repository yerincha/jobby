import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps';


// 37.772221, -122.423950 Hayes Valley


const Map = ({ items }) => {
  // const coords = [item.latitude, item.longitute];
  return (
    <GoogleMap
      defaultZoom={10}
      defaultCenter={{ lat: 37.772221, lng: -122.423950 }}
    >
      { items.map(item => (
        <Marker 
        key={item.id}
        options={{ icon: `https://logo.clearbit.com/${item.website}`, scaledSize: { width: 10, height: 10 } }}
          position={{ lat: Number(item.latitude), lng: Number(item.longitute) }} />
      ))}
    </GoogleMap>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;