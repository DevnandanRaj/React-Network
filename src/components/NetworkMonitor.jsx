import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField, Button, IconButton, useTheme } from "@mui/material";
import { Brightness4, Brightness7 } from "@mui/icons-material";
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
import { ThemeContext } from "../Theme/ThemeContext"; 

const requestTypeArr = [
  { heading: "All", value: "all" },
  { heading: "Fetch/XHR", value: "xhr" },
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
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const theme = useTheme();

  useEffect(() => {
    const axiosInstance = setupInterceptors((requests) => {
      dispatch(fetchRequestDetails(requests));
      setFilteredRequests(requests);
    });

    return () => {
      axiosInstance.interceptors.request.eject();
      axiosInstance.interceptors.response.eject();
    };
  }, [dispatch]);

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.addEventListener("message", (event) => {
        const requestInfo = event.data;
        dispatch(fetchRequestDetails([requestInfo]));
        setFilteredRequests((prevRequests) => [...prevRequests, requestInfo]);
      });
    }
  }, [dispatch]);

  useEffect(() => {
    setFilteredRequests(requestDetails);
  }, [requestDetails]);

  const handleFetchAndShowDetails = async () => {
    try {
      const corsProxy = "https://api.allorigins.win/get?url=";
      const response = await axios.get(
        `${corsProxy}${encodeURIComponent(searchUrl)}`
      );
      console.log(response);
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
      const filtered = requestDetails.filter(
        (request) => request.type === filterValue
      );
      setFilteredRequests(filtered);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      minHeight="100vh"
      bgcolor={theme.palette.background.default}
    >
      <Box
        p={2}
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
          label="Search URL"
          variant="outlined"
          value={searchUrl}
          onChange={handleChangeSearchUrl}
          InputProps={{
            style: {
              height: "56px",
              borderColor: theme.palette.text.primary,
            },
          }}
          sx={{
            marginRight: 2,
            width: "300px",
            "&:hover fieldset": {
              borderColor: theme.palette.text.primary,
            },
            "&.Mui-focused fieldset": {
              borderColor: theme.palette.text.primary,
            },
          }}
        />
        <Button
          variant="contained"
          onClick={handleFetchAndShowDetails}
          sx={{
            height: "56px",
          }}
        >
          Test
        </Button>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="toggle dark mode"
          onClick={toggleDarkMode}
          sx={{
            marginLeft: "auto",
            color:
              theme.palette.mode === "dark"
                ? theme.palette.primary.main
                : theme.palette.secondary.main, // Adjust icon color based on theme
          }}
        >
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Box>

      <Box display="flex" flex="1">
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
