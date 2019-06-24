import React from 'react';
import axios from 'axios';
import CompanyList from './CompanyList.jsx';


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currPage: 1,
    }
    this.updateList = this.updateList.bind(this);
    this.fetchCompanyData = this.fetchCompanyData.bind(this);
  }

  componentDidMount() {
    this.fetchCompanyData()
  }

  fetchCompanyData() {
    axios.get('/items')
      .then((response) => {
        // handle success
        this.updateList(response.data)
        console.log(response.data)
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
  }

  updateList(response) {
    this.setState({
      items: response,
    })
  }

  render() {
    return (<div >
      <div className="header">
      <div className='title'> Jobby </div>
      <div className='dream'> Job searching? Could be your Hobby</div>
      <div className='made'>Made by. Yerin Cha</div>
      </div>
      <CompanyList items={this.state.items} />
    </div>)
  }
}

export default Home;