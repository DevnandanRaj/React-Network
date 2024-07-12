import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

const NetworkTable = ({ requestDetails, onRequestSelect }) => {
  const [selectedRow, setSelectedRow] = useState(null);

  const handleRowClick = (ele, index) => {
    setSelectedRow(index);
    onRequestSelect(ele);
  };

  console.log("this is request->", requestDetails);

  return (
    <TableContainer component={Paper} sx={{ height: 'calc(100vh - 120px)', overflow: 'auto' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow sx={{ backgroundColor: 'lightgrey' }}>
            <TableCell sx={{ borderTop: '1px solid PaleTurquoise', borderBottom: '1px solid PaleTurquoise' }}>Name</TableCell>
            <TableCell sx={{ borderTop: '1px solid PaleTurquoise', borderBottom: '1px solid PaleTurquoise' }}>Status</TableCell>
            <TableCell sx={{ borderTop: '1px solid PaleTurquoise', borderBottom: '1px solid PaleTurquoise' }}>Type</TableCell>
            <TableCell sx={{ borderTop: '1px solid PaleTurquoise', borderBottom: '1px solid PaleTurquoise' }}>Initiator</TableCell>
            <TableCell sx={{ borderTop: '1px solid PaleTurquoise', borderBottom: '1px solid PaleTurquoise' }}>Size</TableCell>
            <TableCell sx={{ borderTop: '1px solid PaleTurquoise', borderBottom: '1px solid PaleTurquoise' }}>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requestDetails.map((ele, index) => (
            <TableRow
              key={index}
              hover
              onClick={() => handleRowClick(ele, index)}
              sx={{
                backgroundColor: selectedRow === index ? 'LightCyan' : index % 2 === 0 ? 'Gainsboro' : 'white',
                color: selectedRow === index ? 'white' : 'inherit',
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
            >
              <TableCell sx={{ borderLeft: '1px solid PaleTurquoise', borderRight: '1px solid PaleTurquoise' }}>{ele.url}</TableCell>
              <TableCell sx={{ borderLeft: '1px solid PaleTurquoise', borderRight: '1px solid PaleTurquoise' }}>{ele.status}</TableCell>
              <TableCell sx={{ borderLeft: '1px solid PaleTurquoise', borderRight: '1px solid PaleTurquoise' }}>{ele.type}</TableCell>
              <TableCell sx={{ borderLeft: '1px solid PaleTurquoise', borderRight: '1px solid PaleTurquoise' }}>{ele.initiator}</TableCell>
              <TableCell sx={{ borderLeft: '1px solid PaleTurquoise', borderRight: '1px solid PaleTurquoise' }}>{isNaN(ele.size) ? 'N/A' : `${Math.round(ele.size / 1024)} Kb`}</TableCell>
              <TableCell sx={{ borderLeft: '1px solid PaleTurquoise', borderRight: '1px solid PaleTurquoise' }}>{isNaN(ele.time) ? 'N/A' : `${ele.time} ms`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NetworkTable;
