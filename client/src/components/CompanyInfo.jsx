import React from 'react';
import axios from 'axios';
import WrappedMap from './Maps.jsx'
import API_KEY from '../../maps-config';
import JobTabLayout from './JobTabLayout.jsx'

class CompanyInfo extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      company: {},
    };
  }
  componentDidMount() {
    axios.get(`/company?name=${this.props.item}`)
      .then((response) => {
        // handle success
        this.setState({
          company: response.data[0],
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }
  render() {
    const { company } = this.state;
    const { item } = this.props;
    return (
      <div className='popup'>
        <div className='popup_inner'>
          <div className='company_logo'><img className="logo" height="150" width="150" src={`https://logo.clearbit.com/${company.website}`} /></div>
          <div className="empty"></div>
          <div className="company_info">
            <div className="company_name">{company.name}</div><br />
            <div className="company_location">{company.location}</div>
            <div className="company_size">Size: {company.size}</div>
            <div className="company_founded">{company.founded}</div>
            <div className="company_website"><a href={company.website}>{company.website}</a> </div>
            <div className="company_tags">Category: {company.tags}</div>
          </div>
          <div className="description">Description</div>
          <div className="company_description">{company.description}</div> 
          <br />
          <br />
        </div>
          <div className="maps" style={{ height: '30vw', width: "100vh" }}>
            {<WrappedMap
              item={company}
              googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
              loadingElement={<div style={{ height: "100%" }} />}
              containerElement={<div style={{ height: "100%" }} />}
              mapElement={<div style={{ height: "100%" }} />}
            />}
          </div>
          <JobTabLayout companyName={item} />

        
      </div>
    )
  }
}
export default CompanyInfo;
