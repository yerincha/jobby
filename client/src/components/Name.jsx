import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Name extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <div>
        <Link to={`/info/${this.props.name}`}>{this.props.name}</Link>
      </div>
    );
  }
}

export default Name;