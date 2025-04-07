import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  useTheme,
  Tabs,
  Tab,
  Autocomplete,
  TextField,
  Chip,
  Paper,
  Divider,
} from "@mui/material";

// Components
import ChatInterface from "../../components/chat/ChatInterface";

// Mock data
import ukCompanies from "../../mockData/companies/ukCompanies";

// Company quick view component
const CompanyQuickView = ({ company }) => {
  const theme = useTheme();

  if (!company) return null;

  // Get latest year metrics
  const latestYear = Math.max(
    ...Object.keys(company.financials.revenue).map(Number)
  );
  const previousYear = latestYear - 1;

  const metrics = [
    {
      name: "Revenue",
      value: `£${company.financials.revenue[latestYear]}M`,
      change:
        (company.financials.revenue[latestYear] /
          company.financials.revenue[previousYear] -
          1) *
        100,
    },
    {
      name: "EBITDA",
      value: `£${company.financials.ebitda[latestYear]}M`,
      change:
        (company.financials.ebitda[latestYear] /
          company.financials.ebitda[previousYear] -
          1) *
        100,
    },
    {
      name: "Net Income",
      value: `£${company.financials.netIncome[latestYear]}M`,
      change:
        (company.financials.netIncome[latestYear] /
          company.financials.netIncome[previousYear] -
          1) *
        100,
    },
    {
      name: "EPS",
      value: `£${company.financials.eps[latestYear]}`,
      change:
        (company.financials.eps[latestYear] /
          company.financials.eps[previousYear] -
          1) *
        100,
    },
  ];

  return (
    <Paper elevation={1} sx={{ p: 3, borderRadius: 2, bgcolor: "#40414F" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "start",
          mb: 2,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            component="h2"
            fontWeight="bold"
            color="#ECECF1"
          >
            {company.name}
          </Typography>
          <Typography variant="subtitle1" color="#565869">
            {company.ticker} • {company.sector}
          </Typography>
        </Box>
        <Chip
          label={latestYear.toString()}
          color="primary"
          variant="outlined"
          size="small"
          sx={{ color: "#ECECF1", borderColor: "#10A37F" }}
        />
      </Box>

      <Typography variant="body2" paragraph color="#ECECF1">
        {company.description}
      </Typography>

      <Divider sx={{ my: 2, bgcolor: "rgba(255, 255, 255, 0.1)" }} />

      <Typography variant="h6" gutterBottom color="#ECECF1">
        Key Financials
      </Typography>
      <Grid container spacing={2}>
        {metrics.map((metric, index) => (
          <Grid item xs={6} sm={3} key={index}>
            <Box>
              <Typography variant="subtitle2" color="#565869">
                {metric.name}
              </Typography>
              <Typography variant="h6" fontWeight="bold" color="#ECECF1">
                {metric.value}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: metric.change > 0 ? "#10A37F" : "#ff4d4f",
                  display: "flex",
                  alignItems: "center",
                  mt: 0.5,
                }}
              >
                {metric.change > 0 ? "↑" : "↓"}{" "}
                {Math.abs(metric.change).toFixed(1)}% YoY
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      <Divider sx={{ my: 2, bgcolor: "rgba(255, 255, 255, 0.1)" }} />

      <Box>
        <Typography variant="h6" gutterBottom color="#ECECF1">
          Recent Developments
        </Typography>
        <ul style={{ paddingLeft: "20px", margin: "8px 0" }}>
          {company.recentDevelopments.slice(0, 3).map((development, index) => (
            <li key={index}>
              <Typography variant="body2" color="#ECECF1">
                {development}
              </Typography>
            </li>
          ))}
        </ul>
      </Box>
    </Paper>
  );
};

function CompanyAnalysisPage() {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom color="#ECECF1">
          Company Analysis
        </Typography>
        <Typography variant="body1" color="#565869">
          Ask questions about UK public companies to get AI-powered financial
          insights and analysis.
        </Typography>
      </Box>

      <Box
        sx={{ borderBottom: 1, borderColor: "rgba(255, 255, 255, 0.1)", mb: 3 }}
      >
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="company analysis tabs"
          textColor="primary"
          TabIndicatorProps={{
            style: {
              backgroundColor: "#10A37F",
            },
          }}
          sx={{
            "& .MuiTab-root": {
              color: "#565869",
              "&.Mui-selected": {
                color: "#10A37F",
              },
            },
          }}
        >
          <Tab label="Chat" />
          <Tab label="Metrics Explorer" disabled />
          <Tab label="Company Comparison" disabled />
        </Tabs>
      </Box>

      <Box
        sx={{
          display: tabValue === 0 ? "flex" : "none",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        <Box sx={{ mb: 3 }}>
          <Autocomplete
            options={ukCompanies}
            getOptionLabel={(option) => `${option.name} (${option.ticker})`}
            onChange={(event, newValue) => {
              setSelectedCompany(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select a company to analyze"
                variant="outlined"
                fullWidth
                InputLabelProps={{
                  style: { color: "#565869" },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.1)",
                    },
                    "&:hover fieldset": {
                      borderColor: "rgba(255, 255, 255, 0.3)",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#10A37F",
                    },
                  },
                  "& .MuiInputBase-input": {
                    color: "#ECECF1",
                  },
                }}
              />
            )}
            sx={{
              "& .MuiAutocomplete-paper": {
                backgroundColor: "#40414F",
                color: "#ECECF1",
              },
            }}
          />
        </Box>

        {selectedCompany && (
          <Box sx={{ mb: 3 }}>
            <CompanyQuickView company={selectedCompany} />
          </Box>
        )}

        <Box sx={{ flexGrow: 1 }}>
          <ChatInterface />
        </Box>
      </Box>
    </Box>
  );
}

export default CompanyAnalysisPage;
