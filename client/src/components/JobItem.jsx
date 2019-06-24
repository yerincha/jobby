import React from 'react';
import moment from 'moment';

class JobItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    
    console.log(this.props.jobItem.absolute_url);
    window.open(this.props.jobItem.absolute_url, '_blank');
  }

  convertDateTime(time) {
    if (typeof time === 'number') {
        var date = moment(time, "x");
        return date.fromNow();;
    } else if (typeof time === 'string') {
        var date = moment(time);
        return date.fromNow();;
    }
  }

  render() {
    const { jobItem } = this.props;
    return (
      <div className="job_item_card job_item_card-1" onClick={(e) => this.handleClick(e)}>
          <div className="job_item_title">{jobItem.title}</div>
          <div className="job_item_location">{jobItem.location}</div>
          <div className="job_item_post_time">{this.convertDateTime(jobItem.updated_at)}</div>
      </div>
    )
  }
}
export default JobItem;