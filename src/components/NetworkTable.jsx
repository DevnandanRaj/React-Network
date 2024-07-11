import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const NetworkTable = ({ requestDetails, onRequestSelect }) => {
  console.log(requestDetails, onRequestSelect);
  return (
    <TableContainer
      component={Paper}
      sx={{ height: "calc(100vh - 120px)", overflow: "auto" }}
    >
      <Table stickyHeader>
        <TableHead>
          <TableRow sx={{ backgroundColor: "lightgrey" }}>
            <TableCell sx={{ border: "1px solid blue" }}>Name</TableCell>
            <TableCell sx={{ border: "1px solid blue" }}>Status</TableCell>
            <TableCell sx={{ border: "1px solid blue" }}>Type</TableCell>
            <TableCell sx={{ border: "1px solid blue" }}>Initiator</TableCell>
            <TableCell sx={{ border: "1px solid blue" }}>Size</TableCell>
            <TableCell sx={{ border: "1px solid blue" }}>Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {requestDetails.map((ele, index) => (
            <TableRow key={index} hover onClick={() => onRequestSelect(ele)}>
              <TableCell sx={{ border: "1px solid blue" }}>
                {ele.name}
              </TableCell>
              <TableCell sx={{ border: "1px solid blue" }}>
                {ele.status}
              </TableCell>
              <TableCell sx={{ border: "1px solid blue" }}>
                {ele.type}
              </TableCell>
              <TableCell sx={{ border: "1px solid blue" }}>
                {ele.initiator}
              </TableCell>
              <TableCell sx={{ border: "1px solid blue" }}>
                {Math.round(ele.size / 1024)} Kb
              </TableCell>
              <TableCell sx={{ border: "1px solid blue" }}>
                {ele.time} ms
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default NetworkTable;
