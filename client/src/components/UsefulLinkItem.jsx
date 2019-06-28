import React from 'react';

// name
// description
// url
// iconurl

class UsefulLinkItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();
    
    window.open(this.props.linkInfo.url, '_blank');
  }

    render() {
        const { linkInfo } = this.props;
        return (
            <div className="job-board-card" onClick={(e) => this.handleClick(e)}>
                <div className="job_board_logo_div">
                    <img className="job_board_logo" src={linkInfo.iconurl} align="middle" />
                </div>
                <div className="job_board_info">
                    <div className="job_board_name">{linkInfo.name}</div>
                    <div className="job_board_description">{linkInfo.description}</div>
                </div>

            </div>
        )
    }
}
export default UsefulLinkItem;