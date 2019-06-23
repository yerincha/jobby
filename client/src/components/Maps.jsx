import React, { useState } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';


// 37.772221, -122.423950 Hayes Valley



const Map = ({ items }) => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  return (
    <GoogleMap
      defaultZoom={12}
      defaultCenter={{ lat: 37.772221, lng: -122.423950 }}
    >
      { items.map(item => (
        <Marker 
        key={item.id}
          options={{ icon: { url: `https://logo.clearbit.com/${item.website}`, scaledSize: new google.maps.Size(20, 20)} }}
          position={{ lat: Number(item.latitude), lng: Number(item.longitute) }} 
          onClick={()=> {
            setSelectedCompany(item);
          }}
        />
      ))}

      {selectedCompany && (
        <InfoWindow
          position={{ lat: Number(selectedCompany.latitude), lng: Number(selectedCompany.longitute) }}
          onCloseClick={() => {
            setSelectedCompany(null);
          }} 
        >
        <div>
            <h3>{selectedCompany.name}</h3>
            <p>{selectedCompany.address}</p>
            <a target="_blank" jstcache="6" href={`https://maps.google.com/maps?ll=${Number(selectedCompany.latitude)},${Number(selectedCompany.longitute)}&amp;z=14&amp;t=m&amp;hl=en-US&amp;gl=US&amp;mapclient=apiv3&amp;cid=6926389544917822571`}> <span> View on Google Maps </span> </a>
        </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
};

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default WrappedMap;