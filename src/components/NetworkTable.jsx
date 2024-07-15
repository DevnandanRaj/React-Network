import React, { useState, useContext } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme
} from '@mui/material';
import { ThemeContext } from "../Theme/ThemeContext"; 

const NetworkTable = ({ requestDetails, onRequestSelect }) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const { darkMode } = useContext(ThemeContext);
  const theme = useTheme();

  const handleRowClick = (ele, index) => {
    setSelectedRow(index);
    onRequestSelect(ele);
  };

  console.log("this is request->", requestDetails);

  return (
    <TableContainer component={Paper} sx={{ height: 'calc(100vh - 120px)', overflow: 'auto' }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow sx={{ backgroundColor: darkMode ? 'darkgrey' : 'lightgrey' }}>
            <TableCell sx={{ borderTop: `1px solid ${theme.palette.divider}`, borderBottom: `1px solid ${theme.palette.divider}` }}>Name</TableCell>
            <TableCell sx={{ borderTop: `1px solid ${theme.palette.divider}`, borderBottom: `1px solid ${theme.palette.divider}` }}>Status</TableCell>
            <TableCell sx={{ borderTop: `1px solid ${theme.palette.divider}`, borderBottom: `1px solid ${theme.palette.divider}` }}>Type</TableCell>
            <TableCell sx={{ borderTop: `1px solid ${theme.palette.divider}`, borderBottom: `1px solid ${theme.palette.divider}` }}>Initiator</TableCell>
            <TableCell sx={{ borderTop: `1px solid ${theme.palette.divider}`, borderBottom: `1px solid ${theme.palette.divider}` }}>Size</TableCell>
            <TableCell sx={{ borderTop: `1px solid ${theme.palette.divider}`, borderBottom: `1px solid ${theme.palette.divider}` }}>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requestDetails.map((ele, index) => (
            <TableRow
              key={index}
              hover
              onClick={() => handleRowClick(ele, index)}
              sx={{
                backgroundColor: selectedRow === index 
                  ? (darkMode ? 'LightSlateGray' : 'LightCyan') 
                  : (index % 2 === 0 ? (darkMode ? 'darkgrey' : 'Gainsboro') : (darkMode ? 'black' : 'white')),
                color: selectedRow === index ? 'white' : 'inherit',
                '&:hover': {
                  cursor: 'pointer',
                },
              }}
            >
              <TableCell sx={{ borderLeft: `1px solid ${theme.palette.divider}`, borderRight: `1px solid ${theme.palette.divider}` }}>{ele.url}</TableCell>
              <TableCell sx={{ borderLeft: `1px solid ${theme.palette.divider}`, borderRight: `1px solid ${theme.palette.divider}` }}>{ele.status}</TableCell>
              <TableCell sx={{ borderLeft: `1px solid ${theme.palette.divider}`, borderRight: `1px solid ${theme.palette.divider}` }}>{ele.type}</TableCell>
              <TableCell sx={{ borderLeft: `1px solid ${theme.palette.divider}`, borderRight: `1px solid ${theme.palette.divider}` }}>{ele.initiator}</TableCell>
              <TableCell sx={{ borderLeft: `1px solid ${theme.palette.divider}`, borderRight: `1px solid ${theme.palette.divider}` }}>{isNaN(ele.size) ? 'N/A' : `${Math.round(ele.size / 1024)} Kb`}</TableCell>
              <TableCell sx={{ borderLeft: `1px solid ${theme.palette.divider}`, borderRight: `1px solid ${theme.palette.divider}` }}>{isNaN(ele.time) ? 'N/A' : `${ele.time} ms`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NetworkTable;
