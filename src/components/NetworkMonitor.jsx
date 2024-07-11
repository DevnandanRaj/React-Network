import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField, Button } from "@mui/material";
import NetworkTable from "./NetworkTable";
import FilterToolbar from "./FilterToolbar";
import DetailsPanel from "./DetailsPanel";
import {
  fetchRequestDetails,
  setSelectedRequest,
  clearSelectedRequest,
} from "../redux/actions";
import setupInterceptors from "../services/networkInterceptor";
import axios from "axios";

const requestTypeArr = [
  { heading: "All", value: "all" },
  { heading: "Fetch/XHR", value: "fetch" },
  { heading: "Doc", value: "document" },
  { heading: "CSS", value: "style" },
  { heading: "JS", value: "script" },
  { heading: "Font", value: "font" },
  { heading: "Img", value: "image" },
  { heading: "Media", value: "media" },
  { heading: "Manifest", value: "manifest" },
  { heading: "WS", value: "websocket" },
  { heading: "Wasm", value: "wasm" },
  { heading: "Other", value: "other" },
];

const NetworkMonitor = () => {
  const dispatch = useDispatch();
  const { requestDetails, selectedRequest } = useSelector(
    (state) => state.network
  );
  const [searchUrl, setSearchUrl] = useState("");
  const [filteredRequests, setFilteredRequests] = useState([]);

  useEffect(() => {
    setupInterceptors((requests) => {
      dispatch(fetchRequestDetails(requests));
      setFilteredRequests(requests);
    });
  }, [dispatch]);

  const handleFetchAndShowDetails = async () => {
    try {
      const corsProxy = "https://api.allorigins.win/get?url=";
      const response = await axios.get(
        `${corsProxy}${encodeURIComponent(searchUrl)}`
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching URL:", error);
    }
  };

  const handleChangeSearchUrl = (event) => {
    setSearchUrl(event.target.value);
  };

  const handleFilterChange = (filterValue) => {
    if (filterValue === "all") {
      setFilteredRequests(requestDetails);
    } else {
      const filtered = requestDetails.filter((request) =>
        request.response?.headers["content-type"]?.includes(filterValue)
      );
      setFilteredRequests(filtered);
    }
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      {/* Top Bar with Search */}
      <Box p={2} sx={{ borderBottom: "1px solid lightgrey" }}>
        <TextField
          label="Search URL"
          variant="outlined"
          value={searchUrl}
          onChange={handleChangeSearchUrl}
          sx={{ marginRight: 2, width: "300px" }}
        />
        <Button variant="contained" onClick={handleFetchAndShowDetails}>
          Fetch and Show Details
        </Button>
      </Box>

      <Box display="flex" flex="1">
        {/*FilterToolbar and NetworkTable*/}
        <Box flex="1" p={2}>
          <FilterToolbar
            requestTypeArr={requestTypeArr}
            onFilterChange={handleFilterChange}
          />
          <NetworkTable
            requestDetails={filteredRequests}
            onRequestSelect={(request) => dispatch(setSelectedRequest(request))}
          />
        </Box>

        {/* DetailsPanel */}
        {selectedRequest && (
          <DetailsPanel
            request={selectedRequest}
            onClose={() => dispatch(clearSelectedRequest())}
          />
        )}
      </Box>
    </Box>
  );
};

export default NetworkMonitor;
