import React from 'react';
import Nav from 'react-bootstrap/Nav'
import CompanyList from './CompanyList.jsx'

class MainNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        activeKey: ''
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
                <Nav.Item>
                    <Nav.Link eventKey="disabled" disabled>
                        Disabled
            </Nav.Link>
                </Nav.Item>
            </Nav>

            {this.state.activeKey === 'company' ? <CompanyList /> : null}
        </div>
        
    )
  }
}
export default MainNav;