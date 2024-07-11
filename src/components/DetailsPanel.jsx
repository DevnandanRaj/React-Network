import React, { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  Tabs,
  Tab,
  Button,
  Collapse,
} from "@mui/material";
import { Close, ExpandMore, ExpandLess } from "@mui/icons-material";

const DetailsPanel = ({ request, onClose }) => {
  const [selectedTab, setSelectedTab] = useState("Headers");
  const [showGeneral, setShowGeneral] = useState(true);
  const [showRequestHeaders, setShowRequestHeaders] = useState(true);
  const [showResponseHeaders, setShowResponseHeaders] = useState(true);

  const handleTabChange = (event, newTab) => {
    setSelectedTab(newTab);
  };

  return (
    <Box
      width="400px"
      bgcolor="#f5f5f5"
      p={2}
      borderLeft="1px solid #ccc"
      display="flex"
      flexDirection="column"
    >
      {/* Tabs and Close Button */}
      <Box
        display="flex"
        alignItems="center"
        mb={2}
        borderBottom="1px solid #ddd"
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="close"
          onClick={onClose}
          sx={{ mr: 1 }}
        >
          <Close />
        </IconButton>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="request details tabs"
          sx={{ flexGrow: 1 }}
        >
          <Tab label="Headers" value="Headers" />
          <Tab label="Preview" value="Preview" />
          <Tab label="Response" value="Response" />
          <Tab label="Initiator" value="Initiator" />
          <Tab label="Timing" value="Timing" />
        </Tabs>
      </Box>

      {/* Content */}
      <Box flex="1" overflow="auto">
        {selectedTab === "Headers" && (
          <Box>
            {/* General Section */}
            <Box mb={2}>
              <Button
                onClick={() => setShowGeneral((prev) => !prev)}
                startIcon={showGeneral ? <ExpandLess /> : <ExpandMore />}
                sx={{
                  justifyContent: "flex-start",
                  fontSize: "0.875rem",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                General
              </Button>
              <Collapse in={showGeneral}>
                <Box mt={1}>
                  <Typography variant="body2">
                    <strong>Request URL:</strong> {request.name}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Request Method:</strong>{" "}
                    {request.response.config.method}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Status Code:</strong> {request.status}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Remote Address :</strong> Not Available
                  </Typography>
                  <Typography variant="body2">
                    <strong>Referrer Policy:</strong> Not Available
                  </Typography>
                </Box>
              </Collapse>
            </Box>

            {/* Request Headers */}
            <Box mb={2}>
              <Button
                onClick={() => setShowRequestHeaders((prev) => !prev)}
                startIcon={showRequestHeaders ? <ExpandLess /> : <ExpandMore />}
                sx={{
                  justifyContent: "flex-start",
                  fontSize: "0.875rem",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                Request Headers
              </Button>
              <Collapse in={showRequestHeaders}>
                <Box mt={1}>
                  <Typography variant="body2">
                    <strong>Request Headers:</strong>
                  </Typography>
                  <pre style={{ fontSize: "0.75rem" }}>
                    {JSON.stringify(request.requestHeaders, null, 2)}
                  </pre>
                </Box>
              </Collapse>
            </Box>

            {/* Response Headers */}
            <Box mb={2}>
              <Button
                onClick={() => setShowResponseHeaders((prev) => !prev)}
                startIcon={
                  showResponseHeaders ? <ExpandLess /> : <ExpandMore />
                }
                sx={{
                  justifyContent: "flex-start",
                  fontSize: "0.875rem",
                  width: "100%",
                  textAlign: "left",
                }}
              >
                Response Headers
              </Button>
              <Collapse in={showResponseHeaders}>
                <Box mt={1}>
                  <Typography variant="body2">
                    <strong>Response Headers:</strong>
                  </Typography>
                  <pre style={{ fontSize: "0.75rem" }}>
                    {JSON.stringify(request.responseHeaders, null, 2)}
                  </pre>
                </Box>
              </Collapse>
            </Box>
          </Box>
        )}

        {selectedTab === "Preview" && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Preview
            </Typography>
            <pre style={{ fontSize: "0.75rem" }}>
              {JSON.stringify(request.payload, null, 2)}
            </pre>
          </Box>
        )}

        {selectedTab === "Response" && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Response
            </Typography>
            <pre style={{ fontSize: "0.75rem" }}>
              {JSON.stringify(request.response, null, 2)}
            </pre>
          </Box>
        )}

        {selectedTab === "Initiator" && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Initiator
            </Typography>
            <Typography>This request has no initiator data.</Typography>
          </Box>
        )}

        {selectedTab === "Timing" && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Timing
            </Typography>
            <Typography>Request took {request.time} ms to complete.</Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DetailsPanel;
