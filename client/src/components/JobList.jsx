import React from 'react';
import JobItem from './JobItem';

class JobList extends React.Component {
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