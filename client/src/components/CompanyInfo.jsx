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
    }
  }
  componentDidMount() {
    axios.get(`/company?name=${this.props.item}`)
      .then((response) => {
        // handle success
        this.setState({
          company: response.data[0],
        })
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
          <img src={`https://logo.clearbit.com/${company.website}`} />
        <div>{company.name}</div>
        <div>{company.location}</div>
        <div>{company.founded}</div>
        <div>{company.tags}</div>
        <div>{company.description}</div>
        <div>{company.size}</div>
        <a href={company.website}>{company.website}</a>        
        <div className='info' style={{ height: '30vw', width: "50vh" }}>
          {<WrappedMap
            item={company}
            googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
            loadingElement={<div style={{ height: "80%" }} />}
            containerElement={<div style={{ height: "80%" }} />}
            mapElement={<div style={{ height: "80%" }} />}
          />}
        </div>
          <JobTabLayout companyName={item} />

      </div>
      </div>
    )
  }
}
export default CompanyInfo;

//{this.props.match.params.name}