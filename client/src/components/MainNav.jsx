import React from 'react';
import Nav from 'react-bootstrap/Nav'
import Home from './Home.jsx'
import CompanyList from './CompanyList.jsx'
import WrappedAllMap from './AllMaps.jsx'
import API_KEY from '../../maps-config';

class MainNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        activeKey: 'Home'
    }
  }

  handleSelect(selectedKey) {
    this.setState({activeKey: selectedKey});
  }

  render() {
    return (
        <div>
            <Nav
                activeKey="company"
                onSelect={selectedKey => this.handleSelect(selectedKey, this)}
            >
                <Nav.Item>
                    <Nav.Link eventKey="Home">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="company">🏢 Company</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="map">🗺 Map</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link eventKey="useful">👍 Useful</Nav.Link>
                </Nav.Item>
            </Nav>
            {this.state.activeKey === 'Home' ? <Home /> : null}
            {this.state.activeKey === 'company' ? <CompanyList /> : null}
            {this.state.activeKey === 'map' ? <div style={{ height: '45vw', width: "200vh" }}> <WrappedAllMap
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: "100%", width: "100%" }} />}
                containerElement={<div style={{ height: "100%", width: "100%" }} />}
                mapElement={<div style={{ height: "100%", width: "100%" }} />} /> </div> : null}
        </div>
        
    )
  }
}
export default MainNav;