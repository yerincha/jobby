import React from 'react';
import JobItem from './JobItem';

class JobList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const { jobList } = this.props;
    return (
      <div>
        {
            jobList.map((jobItem) => (
                <JobItem key={jobItem.id} jobItem={jobItem} />
            ))
        }
      </div>
    )
  }
}
export default JobList;