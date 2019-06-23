import React from 'react';
import WrappedMap from './Maps.jsx'
import API_KEY from '../../maps-config';

class CompanyInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }
  // handleClick() {
  //   // const { isExpand } = this.state;
  //   this.setState({
  //     isExpand: true,
  //   })
  // }
  render() {
    const { item } = this.props;
    return (
      <div className='info' style={{ height: '50vw', width: "50vh" }}>
        {/* <WrappedMap
          item={item}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
          loadingElement={<div style={{ height: "80%" }} />}
          containerElement={<div style={{ height: "80%" }} />}
          mapElement={<div style={{ height: "80%" }} />}
        /> */}
      </div>
    )
  }
}
export default CompanyInfo;