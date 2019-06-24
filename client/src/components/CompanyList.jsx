import React, { Component } from 'react';
import axios from 'axios';
import MUIDataTable from "mui-datatables";
import Modal from 'react-bootstrap/Modal'

import CompanyInfo from './CompanyInfo.jsx';



class CompanyList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      clickedCompanyName: '',
      items: [],
      show: false,
    }

    this.handleHide = () => {
      this.setState({ show: false });
    };

    this.updateList = this.updateList.bind(this);
    this.fetchCompanyData = this.fetchCompanyData.bind(this);
  }

componentDidMount() {
  this.fetchCompanyData()
}

fetchCompanyData() {
  axios.get('/items')
    .then((response) => {
      this.updateList(response.data)
    })
    .catch((error) => {
      console.log(error);
    })
}

updateList(response) {
  this.setState({
    items: response,
  })
}

  render() {
    const { items } = this.state;

    const columns = [
      {
        name: "website",
        label: "Logo",
        options: {
          filter: false,
          sort: false,
          customBodyRender: (website) => {
            return (<img src={`https://logo.clearbit.com/${website}`} width="40%" />)
          }
        }
      },
      {
        name: "name",
        label: "Name",
        options: {
          filter: false,
          sort: true,
        }
      }, {
        name: "tags",
        label: "Category",
        options: {
          filter: true,
          sort: true,
        }
      }, {
        name: "location",
        label: "Location",
        options: {
          filter: true,
          sort: true,
        },
      }, {
        name: "address",
        label: "Address",
      },
    ];
    const options = {
      filter: true,
      filterType: 'dropdown',
      selectableRows: 'none',
      onRowClick: (rowData) => {
        this.setState({
          clickedCompanyName: rowData[1],
          show: true
        })
      },
      rowsPerPageOptions: [10, 20, 50, 100, items.length]
    }
    return (
      <div className="listing">
        <div className="looking">
          <h4> Companies that you are looking for </h4>
          There are {items.length} companies.
      </div>
        <div className="list">

          <MUIDataTable
            styles={{"z-index": -1}}
            title={"Company List"}
            data={items}
            columns={columns}
            options={options}
          />
        </div>
        {/* <div>
        {this.state.isClicked ?  : null}
        </div> */}
        <Modal
          size="lg"
          show={this.state.show}
          onHide={this.handleHide}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              {this.state.clickedCompanyName}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CompanyInfo item={this.state.clickedCompanyName} />
          </Modal.Body>
        </Modal>
      </div>
    )
  }

}

export default CompanyList;