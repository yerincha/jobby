import React from 'react';
import CompanyInfo from './CompanyInfo.jsx'

class CompanyListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    // const { isExpand } = this.state;
    // this.setState({
    //   isExpand: true,
    // })
    console.log('hihi')
  }
  render(){
    const {item} = this.props;
    return (
      <div className='companyList' key={item}>
    <div className='name' onClick={this.handleClick}>{item}</div>
    {/* <div className='location'>{item.location}</div> */}
    {/* {isExpand ? <CompanyInfo item={item}/> : null} */}
  </div>
    )
  }
}
export default CompanyListItem;