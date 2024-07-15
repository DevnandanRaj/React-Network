import React, { useState, useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Checkbox,
  InputBase,
  Button,
  Tooltip,
} from "@mui/material";
import {
  FiberManualRecord,
  Stop,
  Cancel,
  Search,
  SignalWifi4Bar,
  Settings,
} from "@mui/icons-material";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { grey, red } from "@mui/material/colors";
import download from "../assets/download.png";
import upload from "../assets/upload.png";
import { ThemeContext } from "../Theme/ThemeContext"; 

const FilterToolbar = ({ requestTypeArr, onFilterChange }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedType, setSelectedType] = useState("all");
  const { darkMode } = useContext(ThemeContext);


  const handleRecordToggle = () => {
    setIsRecording((prev) => !prev);
  };

  const handleFilterClick = (type) => {
    setSelectedType(type);
    onFilterChange(type);
  };

  return (
    <Box>
      {/* Main App Bar */}
      <AppBar
        position="static"
        sx={{
          backgroundColor: "transparent",
          boxShadow: "none",
          borderBottom: `1px solid ${grey[300]}`,
        }}
      >
        <Toolbar sx={{ minHeight: 56, gap: 2 }}>
          <IconButton
            edge="start"
            aria-label="record"
            onClick={handleRecordToggle}
            sx={{ color: darkMode ? "#fff" : grey[800] }}
          >
            {isRecording ? (
              <Stop />
            ) : (
              <FiberManualRecord sx={{ color: "red" }} />
            )}
          </IconButton>

          <Tooltip title="Clear network log">
            <IconButton
              edge="start"
              aria-label="clear log"
              sx={{ color: darkMode ? "#fff" : grey[800] }}
            >
              <Cancel />
            </IconButton>
          </Tooltip>

          <Box
            sx={{
              width: "2px",
              height: "24px",
              backgroundColor: grey[400],
            }}
          />

          <Tooltip title="Filter">
            <IconButton
              edge="start"
              aria-label="filter"
              sx={{ color: red[700] }}
            >
              <FilterAltIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Search">
            <IconButton
              edge="start"
              aria-label="search"
              sx={{ color: darkMode ? "#fff" : grey[800] }}
            >
              <Search />
            </IconButton>
          </Tooltip>

          <Box
            sx={{
              width: "2px",
              height: "24px",
              backgroundColor: grey[400],
            }}
          />

          <Box display="flex" alignItems="center">
            <Checkbox sx={{ color: darkMode ? "#fff" : grey[800] }} />
            <Typography
              variant="body2"
              sx={{ marginLeft: "4px", color: darkMode ? "#fff" : grey[800] }}
            >
              Preserve Log
            </Typography>
          </Box>

          <Box display="flex" alignItems="center">
            <Checkbox sx={{ color: darkMode ? "#fff" : grey[800] }} />
            <Typography
              variant="body2"
              sx={{ marginLeft: "4px", color: darkMode ? "#fff" : grey[800] }}
            >
              Disable Cache
            </Typography>
          </Box>

          <Button
            variant="outlined"
            sx={{
              textTransform: "none",
              borderColor: grey[400],
              color: darkMode ? "#fff" : grey[800],
            }}
          >
            No Throttling
          </Button>

          <Box display="flex" alignItems="center">
            <Tooltip title="more network conditions...">
              <IconButton
                edge="start"
                aria-label="more network conditions..."
                sx={{ color: darkMode ? "#fff" : grey[800] }}
              >
                <SignalWifi4Bar />
              </IconButton>
            </Tooltip>
          </Box>

          <Box
            sx={{
              width: "2px",
              height: "24px",
              backgroundColor: grey[400],
            }}
          />

          <Tooltip title="Import HAR">
            <IconButton
              edge="start"
              aria-label="import har"
              sx={{ color: darkMode ? "#fff" : grey[800] }}
            >
              <img
                src={upload}
                alt="Upload HAR"
                style={{ width: "24px", height: "24px" }}
              />
            </IconButton>
          </Tooltip>

          <Tooltip title="Export HAR">
            <IconButton
              edge="start"
              aria-label="export har"
              sx={{ color: darkMode ? "#fff" : grey[800] }}
            >
              <img
                src={download}
                alt="Download HAR"
                style={{ width: "24px", height: "24px" }}
              />
            </IconButton>
          </Tooltip>

          <Box
            sx={{
              width: "2px",
              height: "24px",
              backgroundColor: grey[400],
            }}
          />

          <Tooltip title="network settings">
            <IconButton
              edge="start"
              aria-label="network settings"
              sx={{ color: darkMode ? "#fff" : grey[800], ml: "auto" }}
            >
              <Settings />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Filter Toolbar */}
      <Box
        sx={{
          padding: "8px",
          borderBottom: `1px solid ${grey[300]}`,
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 1,
        }}
      >
        {/* Filter Input and Checkboxes */}
        <InputBase
          placeholder="Filter"
          sx={{
            flexGrow: 1,
            border: `1px solid ${grey[400]}`,
            borderRadius: "4px",
            padding: "4px 8px",
            minWidth: "150px",
            color: darkMode ? "#fff" : grey[800],
            "& input::placeholder": {
              color: darkMode ? grey[400] : grey[600],
            },
          }}
        />
        <Box display="flex" alignItems="center">
          <Checkbox sx={{ color: darkMode ? "#fff" : grey[800] }} />
          <Typography
            variant="body2"
            sx={{ marginLeft: "4px", color: darkMode ? "#fff" : grey[800] }}
          >
            Invert
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Checkbox sx={{ color: darkMode ? "#fff" : grey[800] }} />
          <Typography
            variant="body2"
            sx={{ marginLeft: "4px", color: darkMode ? "#fff" : grey[800] }}
          >
            Hide data URLs
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <Checkbox sx={{ color: darkMode ? "#fff" : grey[800] }} />
          <Typography
            variant="body2"
            sx={{ marginLeft: "4px", color: darkMode ? "#fff" : grey[800] }}
          >
            Hide extension URLs
          </Typography>
        </Box>

        {/* Request Type Buttons */}
        <Box display="flex" flexWrap="wrap" gap={1}>
          {requestTypeArr.map((ele) => (
            <Button
              key={ele.value}
              variant={ele.value === selectedType ? "contained" : "outlined"}
              sx={{
                margin: "4px",
                color: darkMode ? "#fff" : grey[800],
                borderColor: grey[400],
                borderRadius: "10px",
                "&.Mui-selected": {
                  backgroundColor: ele.value === selectedType ? "LightCyan" : "inherit",
                },
              }}
              onClick={() => handleFilterClick(ele.value)}
            >
              {ele.heading}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default FilterToolbar;
