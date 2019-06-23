import React from 'react';
import CompanyListItem from './CompanyListItem.jsx';
import WrappedMap from './Maps.jsx'
import API_KEY from '../../maps-config';

const CompanyList = (props) => (
  <div>
  <div>
    <h4> Companies that you are looking for </h4>
    There are {props.items.length} companies.
  </div>
  <div>
    {props.items.map(item => <CompanyListItem key={item.name} item={item} />)}
  </div>
  <div>
      <div className='info' style={{ height: '50vw', width: "50vh" }}>
        <WrappedMap
          items={props.items}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: "80%" }} />}
          containerElement={<div style={{ height: "80%" }} />}
          mapElement={<div style={{ height: "80%" }} />}
        />
      </div>
  </div>
  </div>
)

export default CompanyList;