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
      url: '',
      errored: false,
    }
  }

  componentDidMount() {
    axios.get(`/company?name=${this.props.item}`)
      .then((response) => {
        this.setState({
          company: response.data[0],
          url: `https://logo.clearbit.com/${response.data[0].website}?size=100`
        })
      })
  }

  addDefaultSrc (e) {
    e.target.src = 'https://cdn.iconscout.com/icon/premium/png-256-thumb/page-not-found-1-503918.png'
  }

  render() {
    const { company, url } = this.state;
    const { item } = this.props;

    return (
      <div className='popup'>
        <div className='popup_inner'>
          <div style={{ display: "flex" }}>
            <div className="company_info">
              <div className="company_name"><img className="logo" padding-right="10px" src={url} width="20%"onError={this.addDefaultSrc}/> {company.name}</div><br />
              <div className="company_location"><strong>Location</strong> <br />{company.location}</div>
              <div className="company_size"><strong>Size</strong> <br />{company.size}</div>
              <div className="company_founded"><strong>Founded</strong> <br />{company.founded}</div>
              <div className="company_website"><strong>Website</strong><br /><a href={company.website}>{company.website}</a> </div>
              <div className="company_tags"><strong>Category</strong> <br />{company.tags}</div>
            </div>
            <div className="maps" style={{ padding_top: '10px', height: '30vh', width: "30vw" }}>
              {<WrappedMap
                item={company}
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: "100%" }} />}
                containerElement={<div style={{ height: "100%" }} />}
                mapElement={<div style={{ height: "100%" }} />}
              />}
            </div>
          </div>
          <div className="description_div">
            <div className="description"><strong>Description</strong></div>
            <div className="company_description">{company.description}</div>
          </div>
          <br />
          <br />
        </div>
        <JobTabLayout companyName={item} />


      </div>
    )
  }
}
export default CompanyInfo;
