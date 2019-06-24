import React from 'react';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

import axios from 'axios';

import JobList from './JobList';
import NoJob from './NoJob';

import moment from 'moment';

class JobTabLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        greenHouseJobList: [],
        leverJobList: [],
        angelListJobList: [],
        stackoverflowList: []
    }

  }

  componentDidMount() {
    this.loadGreenHouse(this.props.companyName);
    this.loadLever(this.props.companyName);
    this.loadAngelList(this.props.companyName);
    this.loadStackoverflow(this.props.companyName);
  }

  loadGreenHouse(companyName) {

    var greenApiLink = `https://boards-api.greenhouse.io/v1/boards/${companyName.toLowerCase().trim().replace(' ','-')}/jobs`;

    axios.get(greenApiLink)
      .then((response) => {
        // handle success

        // console.log(response.data);

        var jobList = [];
        response.data.jobs.map((item) => {
          jobList.push({
            id: item.id,
            title: item.title,
            location: item.location.name,
            absolute_url: item.absolute_url,
            updated_at: item.updated_at,
            timestamp: moment(item.updated_at).valueOf()
          })
        })

        jobList.sort(function compare(a, b) {
          return b.timestamp - a.timestamp;
        })


        this.setState({
            greenHouseJobList: jobList
        })
      })
      .catch((error) => {
        // handle error
        console.log(error);
      })
  }

  loadLever(companyName) {
    var leverApiLink = `https://api.lever.co/v0/postings/${companyName.toLowerCase().trim().replace(' ','-')}`;

    axios.get(leverApiLink)
      .then((response) => {
        var jobList = [];
        response.data.map((item) => {
          jobList.push({
            id: item.id,
            title: item.text,
            location: item.categories.location,
            absolute_url: item.hostedUrl,
            updated_at: item.createdAt
          })
        })

        jobList.sort(function compare(a, b) {
          return b.updated_at - a.updated_at;
        })

        this.setState({
          leverJobList: jobList
        })
      })
      .catch((error) => {
        this.setState({
          leverJobList: []
        })
      })
  }

  loadAngelList(companyName) {
    var self = this;

    axios({
        method: 'get',
        url: `http://localhost:3333/angellist?company_name=${companyName}`,
        responseType: 'json'
      })
      .then(function (res) {
        var newList = res.data;

        var copiedList = [];

        newList.jobList.map((i) => {
          copiedList.push(i);
        })

        self.setState({
          angelListJobList: copiedList
        })
      })
      .catch(function (err) {
      });
  }

  loadStackoverflow(companyName) {
    var self = this;

    axios({
        method: 'get',
        url: `http://localhost:3333/stackoverflow?company_name=${companyName}`,
        responseType: 'json'
      })
      .then(function (res) {
        var newList = res.data;
        var copiedList = [];

        newList.jobList.map((i) => {
          copiedList.push(i);
        })
        self.setState({
          stackoverflowList: copiedList
        })
      })
      .catch(function (err) {
      });
  }


  JobListOrNotFound(props) {
    const list = props.jobList;
    if (list === undefined || list.length === 0) {
      return <NoJob />;
    }
    return <JobList jobList={list}/>;
  }

  render() {
    return (
      <div className='job_tab'>
        <Tabs defaultActiveKey="green_houst" id="uncontrolled-tab-example">
            <Tab eventKey="green_house" title={'GreenHouse '+this.state.greenHouseJobList.length}>
              <this.JobListOrNotFound jobList={this.state.greenHouseJobList} />
            </Tab>
            <Tab eventKey="lever" title={'Lever '+this.state.leverJobList.length}>
              <this.JobListOrNotFound jobList={this.state.leverJobList} />
            </Tab>
            <Tab eventKey="angellist" title={'AngelList '+this.state.angelListJobList.length}>
              <this.JobListOrNotFound jobList={this.state.angelListJobList} />
            </Tab>
            <Tab eventKey="stackoverflow" title={'Stackoverflow '+this.state.stackoverflowList.length}>
              <this.JobListOrNotFound jobList={this.state.stackoverflowList} />
            </Tab>
        </Tabs>
      </div>
    )
  }
}
export default JobTabLayout;