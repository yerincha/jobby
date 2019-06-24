import React from 'react';

class NoJob extends React.Component {
  render() {
    const { jobList } = this.props;
    return (
      <div className="no_job_container">
          Jobs not found 🤯
      </div>
    )
  }
}
export default NoJob;