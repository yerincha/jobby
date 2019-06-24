import React from 'react';
import MainNav from './components/MainNav.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      currPage: 1,
    }
  }



  updateList(response) {
    this.setState({
      items: response,
    })
  }

  render() {
    return (<MainNav />)
  }
}

export default App;