import React, { useState } from 'react';
import WrappedMap from './Maps.jsx'
import API_KEY from '../../maps-config';
import MUIDataTable from "mui-datatables";
import FormControlLabel from "mui-datatables/node_modules/@material-ui/core/FormControlLabel";
import Switch from "mui-datatables/node_modules/@material-ui/core/Switch";
import CompanyListIte from './CompanyListItem.jsx'
import CompanyListItem from './CompanyListItem.jsx';



const CompanyList = ({ items }) => {

  const columns = [{
    name: "name",
    label: "Name",
    options: {
      filter: false,
      sort: true,
      customBodyRender: (value) => {
        return(
          <CompanyListItem  item={value}/> 
        )
      }
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
        name: "Interested",
        options: {
          filter: true,
          customBodyRender: (value, tableMeta, updateValue) => {
            return (
              <FormControlLabel
                label={value ? "Yes" : "No"}
                value={value ? "Yes" : "No"}
                control={
                  <Switch
                    color="primary"
                    checked={value}
                    value={value ? "Yes" : "No"}
                  />
                }
                onChange={event => {
                  updateValue(event.target.value === "Yes" ? false : true);
                }}
              />
            );
          }
        }
      }];
  const options = {
    filterType: 'dropdown',
    responsive: "scroll",
  }
  return (
    <div>
      <div className="looking">
        <h4> Companies that you are looking for </h4>
        There are {items.length} companies.
      </div>
      <div>
        {/* <div className='info' style={{ height: '40vw', width: "80" }}>
      <WrappedMap
        items={items}
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
        loadingElement={<div style={{ height: "80%" }} />}
        containerElement={<div style={{ height: "80%" }} />}
        mapElement={<div style={{ height: "80%" }} />}
      />
     */}
      </div>
      <div>
        <MUIDataTable
          title={"Company List"}
          data={items}
          columns={columns}
          options={options}
        />
      </div >
    </div>
  );
}

export default CompanyList;