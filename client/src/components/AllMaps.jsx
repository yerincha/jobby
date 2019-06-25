import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from 'react-google-maps';
import axios from 'axios';

class AllMap extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      selectedCompany: null,
    };
    this.fetchCompanyData = this.fetchCompanyData.bind(this);
    this.updateList = this.updateList.bind(this);
  }

  componentDidMount() {
    this.fetchCompanyData();
  }

  fetchCompanyData() {
    axios.get('/items')
      .then((response) => {
        this.updateList(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  }

  updateList(response) {
    this.setState({
      items: response,
    });
  }

  render() {
    const { selectedCompany, items } = this.state;
    return (
      <GoogleMap
        defaultZoom={9}
        defaultCenter={{ lat: 37.630476, lng: -122.118398 }}
      >
        {items.map(item => {
          return (< Marker
            key={item.id}
            options={{ icon: { url: `https://logo.clearbit.com/${item.website}`, scaledSize: new google.maps.Size(20, 20) } }}
            position={{ lat: Number(item.latitude), lng: Number(item.longitute) }}
            onClick={() => {
              this.setState({
                selectedCompany: item,
              });
            }}
          />)
        })}

        {selectedCompany && (
          <InfoWindow
            position={{ lat: Number(selectedCompany.latitude), lng: Number(selectedCompany.longitute) }}
            onCloseClick={() => {
              this.setState({
                selectedCompany: null,
              });
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
    )
  };
};

const WrappedAllMap = withScriptjs(withGoogleMap(AllMap));

export default WrappedAllMap;