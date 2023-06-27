import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './Search.css';

function Search(props) {
  const [jobType, setJobType] = useState('All');
  const [district, setDistrict] = useState('All');

  const handleJobTypeChange = (event) => {
    setJobType(event.target.value);
  };

  const handleDistrictChange = (event) => {
    setDistrict(event.target.value);
  };

    const handleSearch = () => {
      if (jobType === 'All' && district === 'All') {
        props.onSearch({});
      } else {
        const filters = {};
        if (jobType !== 'All') {
          filters.jobType = jobType;
        }
        if (district !== 'All') {
          filters.district = district;
        }
        props.onSearch(filters);
      }
    
  };

  return (
    <Box className="wrapper-search">
      <Select value={jobType} className="select-Bar" onChange={handleJobTypeChange}>
        <MenuItem value="All">All Job Types</MenuItem>
        <MenuItem value="Full Time">Full Time</MenuItem>
        <MenuItem value="Part Time">Part Time</MenuItem>        
      </Select>
      <Select value={district} className="select-Bar" onChange={handleDistrictChange}>
        <MenuItem value="All">All Districts</MenuItem>
        <MenuItem value="Colombo">Colombo</MenuItem>
        <MenuItem value="Gampaha">Gampaha</MenuItem>
        <MenuItem value="Kalutara">Kalutara</MenuItem>
        <MenuItem value="Kandy">Kandy</MenuItem>
        <MenuItem value="Matale">Matale</MenuItem>
        <MenuItem value="Nuwara Eliya">Nuwara Eliya</MenuItem>
        <MenuItem value="Galle">Galle</MenuItem>
        <MenuItem value="Matara">Matara</MenuItem>
        <MenuItem value="Hambantota">Hambantota</MenuItem>
        <MenuItem value="Jaffna">Jaffna</MenuItem>
        <MenuItem value="Kilinochchi">Kilinochchi</MenuItem>
        <MenuItem value="Mannar">Mannar</MenuItem>
        <MenuItem value="Vavuniya">Vavuniya</MenuItem>
        <MenuItem value="Mullaitivu">Mullaitivu</MenuItem>
        <MenuItem value="Batticaloa">Batticaloa</MenuItem>
        <MenuItem value="Ampara">Ampara</MenuItem>
        <MenuItem value="Kurunegala">Kurunegala</MenuItem>
        <MenuItem value="Puttalam">Puttalam</MenuItem>
        <MenuItem value="Anuradhapura">Anuradhapura</MenuItem>
        <MenuItem value="Polonnaruwa">Polonnaruwa</MenuItem>
        <MenuItem value="Badulla">Badulla</MenuItem>
        <MenuItem value="Moneragala">Moneragala</MenuItem>
        <MenuItem value="Ratnapura">Ratnapura</MenuItem>
      </Select>
      <button variant="contained" className="btn-search" onClick={handleSearch}>Search</button>
    </Box>
  );
}

export default Search;
