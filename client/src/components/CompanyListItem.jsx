import React from 'react';
import CompanyInfo from './CompanyInfo.jsx'

class CompanyListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpand: true,
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    // const { isExpand } = this.state;
    this.setState({
      isExpand: true,
    })
  }
  render(){
    const { item, id } = this.props;
    const { isExpand } = this.state;
    return (
      <div className='companyList' key={id}>
    <img src={`https://logo.clearbit.com/${this.props.item.website}`}></img> <br />
    <div className='name' onClick={this.handleClick}>{item.name}</div>
    <div className='location'>{item.location}</div>
    {isExpand ? <CompanyInfo item={item}/> : null}
  </div>
    )
  }
}
export default CompanyListItem;