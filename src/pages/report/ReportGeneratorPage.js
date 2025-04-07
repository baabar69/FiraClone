import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Stepper,
  Step,
  StepLabel,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  useTheme,
  Card,
  CardContent,
  CardActions,
  Alert,
  Chip,
} from "@mui/material";

// Charts
import { Line, Bar, Doughnut, Pie } from "react-chartjs-2";

// Icons
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArticleIcon from "@mui/icons-material/Article";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";
import BusinessIcon from "@mui/icons-material/Business";
import DescriptionIcon from "@mui/icons-material/Description";
import EditIcon from "@mui/icons-material/Edit";
import DownloadIcon from "@mui/icons-material/Download";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

// Mock data
import reportTemplates, {
  getMockPrefilledReport,
} from "../../mockData/reports/reportTemplates";

// Sample chart data
const sampleRevenueData = {
  labels: ["2019", "2020", "2021", "2022", "2023"],
  datasets: [
    {
      label: "Revenue (£ million)",
      data: [457, 371, 312, 290, 245],
      borderColor: "#10A37F",
      backgroundColor: "rgba(16, 163, 127, 0.2)",
      fill: true,
    },
  ],
};

const sampleSegmentData = {
  labels: [
    "Cloud Infrastructure",
    "Data & AI Services",
    "Enterprise Applications",
    "Consulting",
  ],
  datasets: [
    {
      label: "Revenue Breakdown by Segment",
      data: [183.2, 142.7, 95.3, 35.8],
      backgroundColor: [
        "rgba(16, 163, 127, 0.8)", // Green - primary accent
        "rgba(53, 162, 235, 0.8)", // Blue
        "rgba(250, 204, 21, 0.8)", // Yellow
        "rgba(248, 113, 113, 0.8)", // Red
      ],
      borderColor: [
        "rgba(16, 163, 127, 1)",
        "rgba(53, 162, 235, 1)",
        "rgba(250, 204, 21, 1)",
        "rgba(248, 113, 113, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

// Template selector component
const TemplateSelector = ({ templates, onSelect }) => {
  return (
    <Grid container spacing={3}>
      {Object.entries(templates).map(([id, template]) => (
        <Grid item xs={12} md={6} key={id}>
          <Card
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              bgcolor: "#40414F",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography
                variant="h5"
                component="div"
                gutterBottom
                color="#ECECF1"
              >
                {template.name}
              </Typography>
              <Typography variant="body2" color="#565869" paragraph>
                {template.description}
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" gutterBottom color="#ECECF1">
                  Includes:
                </Typography>
                <Grid container spacing={1}>
                  {template.sections.slice(0, 6).map((section) => (
                    <Grid item xs={6} key={section.id}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <CheckCircleIcon
                          sx={{ fontSize: 16, mr: 1, color: "#10A37F" }}
                        />
                        <Typography variant="body2" color="#ECECF1">
                          {section.title}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                  {template.sections.length > 6 && (
                    <Grid item xs={12}>
                      <Typography variant="body2" color="#565869">
                        +{template.sections.length - 6} more sections
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Box>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                fullWidth
                onClick={() => onSelect(id)}
              >
                Use this template
              </Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

// Section editor component
const SectionEditor = ({ section, content, onContentChange }) => {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="h6" gutterBottom color="#ECECF1">
        {section.title}
      </Typography>
      {section.description && (
        <Typography variant="body2" color="#565869" paragraph>
          {section.description}
        </Typography>
      )}
      <TextField
        fullWidth
        multiline
        rows={5}
        variant="outlined"
        value={content || section.defaultContent || ""}
        onChange={(e) => onContentChange(section.id, e.target.value)}
        placeholder={`Write content for ${section.title} section...`}
        InputProps={{
          sx: {
            color: "#ECECF1",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255, 255, 255, 0.1)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255, 255, 255, 0.3)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#10A37F",
            },
          },
        }}
        InputLabelProps={{
          style: { color: "#565869" },
        }}
      />
      {section.aiPrompt && (
        <Button
          startIcon={<AutoGraphIcon />}
          sx={{ mt: 1, color: "#10A37F" }}
          onClick={() => {
            // In a real app, this would trigger an AI request
            alert(
              `AI would generate content based on prompt: ${section.aiPrompt}`
            );
          }}
        >
          Generate with AI
        </Button>
      )}
    </Box>
  );
};

// Subsection editor component
const SubsectionEditor = ({
  parentId,
  subsection,
  content,
  onContentChange,
}) => {
  return (
    <Box sx={{ ml: 4, mb: 3 }}>
      <Typography variant="subtitle1" gutterBottom color="#ECECF1">
        {subsection.title}
      </Typography>
      <TextField
        fullWidth
        multiline
        rows={4}
        variant="outlined"
        value={content || subsection.defaultContent || ""}
        onChange={(e) =>
          onContentChange(`${parentId}.${subsection.id}`, e.target.value)
        }
        placeholder={`Write content for ${subsection.title} subsection...`}
        InputProps={{
          sx: {
            color: "#ECECF1",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255, 255, 255, 0.1)",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "rgba(255, 255, 255, 0.3)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#10A37F",
            },
          },
        }}
      />
    </Box>
  );
};

// Preview component that renders content with embedded charts
const ContentPreview = ({ content, title }) => {
  const theme = useTheme();

  // Function to check if content includes chart markers and render charts
  const renderContentWithCharts = (text) => {
    if (!text) return null;

    // Split text by chart markers
    const parts = text.split(/\[CHART:(\w+)\]/);

    return parts.map((part, index) => {
      // Every even index is text, odd index is chart type
      if (index % 2 === 0) {
        return (
          <Typography key={index} variant="body1" paragraph color="#ECECF1">
            {part}
          </Typography>
        );
      } else {
        // Render appropriate chart
        switch (part) {
          case "revenue":
            return (
              <Box key={index} sx={{ height: 300, my: 3 }}>
                <Typography variant="subtitle2" color="#565869" gutterBottom>
                  Revenue Trend (2019-2023)
                </Typography>
                <Line
                  data={sampleRevenueData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        labels: {
                          color: "#ECECF1",
                        },
                      },
                    },
                    scales: {
                      x: {
                        grid: {
                          color: "rgba(255, 255, 255, 0.1)",
                        },
                        ticks: {
                          color: "#ECECF1",
                        },
                      },
                      y: {
                        grid: {
                          color: "rgba(255, 255, 255, 0.1)",
                        },
                        ticks: {
                          color: "#ECECF1",
                        },
                      },
                    },
                  }}
                />
              </Box>
            );
          case "segments":
            return (
              <Box key={index} sx={{ height: 300, my: 3 }}>
                <Typography variant="subtitle2" color="#565869" gutterBottom>
                  Revenue Breakdown by Business Segment (2023)
                </Typography>
                <Pie
                  data={sampleSegmentData}
                  options={{
                    responsive: true,
                    plugins: {
                      legend: {
                        labels: {
                          color: "#ECECF1",
                        },
                      },
                    },
                  }}
                />
              </Box>
            );
          default:
            return null;
        }
      }
    });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        borderRadius: 2,
        border: "1px solid rgba(255, 255, 255, 0.1)",
        bgcolor: "#40414F",
        mb: 3,
      }}
    >
      <Typography variant="h6" gutterBottom color="#ECECF1">
        {title}
      </Typography>
      <Divider sx={{ mb: 2, bgcolor: "rgba(255, 255, 255, 0.1)" }} />
      {renderContentWithCharts(content)}
    </Paper>
  );
};

function ReportGeneratorPage() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [companyDetails, setCompanyDetails] = useState({
    name: "",
    ticker: "",
    sector: "",
    industry: "",
    description: "",
  });
  const [reportContent, setReportContent] = useState({});
  const [showPreview, setShowPreview] = useState(false);

  // Load mock prefilled report for demo
  useEffect(() => {
    // This would be fetched from an API in a real app
    const mockReport = getMockPrefilledReport();
    if (mockReport) {
      setCompanyDetails(mockReport.companyDetails || {});
      setReportContent(mockReport.content || {});
    }
  }, []);

  const handleSelectTemplate = (templateId) => {
    console.log("Template selected:", templateId);
    setSelectedTemplate(templateId);
    // After selecting a template, move to the next step
    setActiveStep(1);
  };

  const handleNext = () => {
    console.log("Current step:", activeStep);
    console.log("Selected template:", selectedTemplate);

    // Validate based on current step
    if (activeStep === 0) {
      if (!selectedTemplate) {
        alert("Please select a template first");
        return;
      }
    } else if (activeStep === 1) {
      if (!companyDetails.name.trim()) {
        alert("Please enter a company name");
        return;
      }

      // Check if template is valid
      if (
        !reportTemplates[selectedTemplate] ||
        !reportTemplates[selectedTemplate].sections
      ) {
        console.error("Invalid template or missing sections", {
          selectedTemplate,
          template: reportTemplates[selectedTemplate],
        });
        alert(
          "There was an issue with the selected template. Please go back and select another template."
        );
        return;
      }
    }

    // Proceed to the next step
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Handle content change
  const handleContentChange = (sectionId, content) => {
    setReportContent((prevContent) => ({
      ...prevContent,
      [sectionId]: {
        ...(prevContent[sectionId] || {}),
        content,
      },
    }));
  };

  // Handle subsection content change
  const handleSubsectionContentChange = (path, content) => {
    const [parentId, subsectionId] = path.split(".");

    setReportContent((prevContent) => ({
      ...prevContent,
      [parentId]: {
        ...(prevContent[parentId] || {}),
        [subsectionId]: {
          ...(prevContent[parentId]?.[subsectionId] || {}),
          content,
        },
      },
    }));
  };

  // Toggle preview mode
  const togglePreview = () => {
    setShowPreview(!showPreview);
  };

  // Render step content
  const getStepContent = (step) => {
    console.log(
      "Rendering step:",
      step,
      "Selected template:",
      selectedTemplate
    );

    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h6" gutterBottom color="#ECECF1">
              Select a report template to get started
            </Typography>
            <Typography variant="body2" color="#565869" paragraph>
              Choose a template that best suits your analysis needs. You can
              customize it in the next steps.
            </Typography>
            <TemplateSelector
              templates={reportTemplates}
              onSelect={handleSelectTemplate}
            />
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h6" gutterBottom color="#ECECF1">
              Company Information
            </Typography>
            <Typography variant="body2" color="#565869" paragraph>
              Enter basic information about the company for your report.
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Company Name"
                  value={companyDetails.name}
                  onChange={(e) =>
                    setCompanyDetails({
                      ...companyDetails,
                      name: e.target.value,
                    })
                  }
                  fullWidth
                  InputProps={{
                    sx: {
                      color: "#ECECF1",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255, 255, 255, 0.1)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255, 255, 255, 0.3)",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#10A37F",
                      },
                    },
                  }}
                  InputLabelProps={{
                    style: { color: "#565869" },
                  }}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  label="Ticker Symbol"
                  value={companyDetails.ticker}
                  onChange={(e) =>
                    setCompanyDetails({
                      ...companyDetails,
                      ticker: e.target.value,
                    })
                  }
                  fullWidth
                  InputProps={{
                    sx: {
                      color: "#ECECF1",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255, 255, 255, 0.1)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255, 255, 255, 0.3)",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#10A37F",
                      },
                    },
                  }}
                  InputLabelProps={{
                    style: { color: "#565869" },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Sector"
                  value={companyDetails.sector}
                  onChange={(e) =>
                    setCompanyDetails({
                      ...companyDetails,
                      sector: e.target.value,
                    })
                  }
                  fullWidth
                  InputProps={{
                    sx: {
                      color: "#ECECF1",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255, 255, 255, 0.1)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255, 255, 255, 0.3)",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#10A37F",
                      },
                    },
                  }}
                  InputLabelProps={{
                    style: { color: "#565869" },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Industry"
                  value={companyDetails.industry}
                  onChange={(e) =>
                    setCompanyDetails({
                      ...companyDetails,
                      industry: e.target.value,
                    })
                  }
                  fullWidth
                  InputProps={{
                    sx: {
                      color: "#ECECF1",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255, 255, 255, 0.1)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255, 255, 255, 0.3)",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#10A37F",
                      },
                    },
                  }}
                  InputLabelProps={{
                    style: { color: "#565869" },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  label="Company Description"
                  value={companyDetails.description}
                  onChange={(e) =>
                    setCompanyDetails({
                      ...companyDetails,
                      description: e.target.value,
                    })
                  }
                  multiline
                  rows={4}
                  fullWidth
                  InputProps={{
                    sx: {
                      color: "#ECECF1",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255, 255, 255, 0.1)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255, 255, 255, 0.3)",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#10A37F",
                      },
                    },
                  }}
                  InputLabelProps={{
                    style: { color: "#565869" },
                  }}
                  variant="outlined"
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel sx={{ color: "#565869" }}>Report Type</InputLabel>
                  <Select
                    value="financial-analysis"
                    label="Report Type"
                    disabled
                    sx={{
                      color: "#ECECF1",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(255, 255, 255, 0.1)",
                      },
                      "& .MuiSvgIcon-root": {
                        color: "#565869",
                      },
                    }}
                  >
                    <MenuItem value="financial-analysis">
                      Financial Analysis
                    </MenuItem>
                    <MenuItem value="investment-report">
                      Investment Report
                    </MenuItem>
                    <MenuItem value="company-overview">
                      Company Overview
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <Alert
                  severity="info"
                  sx={{
                    bgcolor: "rgba(30, 136, 229, 0.1)",
                    color: "#ECECF1",
                    borderColor: "#1e88e5",
                  }}
                >
                  For demo purposes, we've prefilled this with sample data for
                  TechInnovate PLC. In a real application, you could select from
                  companies you've analyzed or upload custom data.
                </Alert>
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        if (!selectedTemplate || !reportTemplates[selectedTemplate]) {
          console.error("Missing template in step 2", { selectedTemplate });
          return (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                bgcolor: "rgba(255, 77, 79, 0.1)",
                color: "#ECECF1",
                borderColor: "#ff4d4f",
              }}
            >
              Template data is missing. Please go back to step 1 and select a
              template.
              <Button
                variant="outlined"
                sx={{ mt: 1 }}
                onClick={() => setActiveStep(0)}
              >
                Return to template selection
              </Button>
            </Alert>
          );
        }

        const template = reportTemplates[selectedTemplate];
        console.log("Template data:", template);

        return (
          <Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 3,
              }}
            >
              <Typography variant="h6" color="#ECECF1">
                Edit report content
              </Typography>
              <Button variant="outlined" onClick={togglePreview}>
                {showPreview ? "Edit Mode" : "Preview Mode"}
              </Button>
            </Box>

            {showPreview ? (
              <Box>
                <Typography variant="h5" gutterBottom color="#ECECF1">
                  {companyDetails.name} - Financial Analysis
                </Typography>
                <Typography variant="body2" color="#565869" paragraph>
                  Generated with LearnSignal Research Assistant
                </Typography>

                {template.sections.map((section) => {
                  const sectionContent = reportContent[section.id]?.content;

                  // Skip empty sections in preview
                  if (!sectionContent && !section.subsections) return null;

                  return (
                    <Box key={section.id}>
                      {sectionContent && (
                        <ContentPreview
                          title={section.title}
                          content={sectionContent}
                        />
                      )}

                      {section.subsections &&
                        section.subsections.map((subsection) => {
                          const subsectionContent =
                            reportContent[section.id]?.[subsection.id]?.content;
                          if (!subsectionContent) return null;

                          return (
                            <ContentPreview
                              key={`${section.id}.${subsection.id}`}
                              title={`${section.title} - ${subsection.title}`}
                              content={subsectionContent}
                            />
                          );
                        })}
                    </Box>
                  );
                })}
              </Box>
            ) : (
              <Box>
                <Typography variant="body2" color="#565869" paragraph>
                  Edit each section of your report. You can also use AI
                  suggestions to help you write content.
                </Typography>

                {template.sections.map((section) => (
                  <Box key={section.id} sx={{ mb: 4 }}>
                    <Accordion
                      defaultExpanded={section.required}
                      sx={{
                        bgcolor: "#40414F",
                        "& .MuiAccordionSummary-root": {
                          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                        },
                      }}
                    >
                      <AccordionSummary
                        expandIcon={
                          <ExpandMoreIcon sx={{ color: "#ECECF1" }} />
                        }
                      >
                        <Typography variant="h6" color="#ECECF1">
                          {section.title}
                          {section.required && (
                            <Typography
                              component="span"
                              color="#ff4d4f"
                              sx={{ ml: 1 }}
                            >
                              *
                            </Typography>
                          )}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {!section.subsections ? (
                          <SectionEditor
                            section={section}
                            content={reportContent[section.id]?.content}
                            onContentChange={handleContentChange}
                          />
                        ) : (
                          <>
                            <Typography
                              variant="body2"
                              color="#565869"
                              paragraph
                            >
                              This section contains multiple subsections. Edit
                              each one individually.
                            </Typography>

                            {section.subsections.map((subsection) => (
                              <SubsectionEditor
                                key={subsection.id}
                                parentId={section.id}
                                subsection={subsection}
                                content={
                                  reportContent[section.id]?.[subsection.id]
                                    ?.content
                                }
                                onContentChange={handleSubsectionContentChange}
                              />
                            ))}
                          </>
                        )}
                      </AccordionDetails>
                    </Accordion>
                  </Box>
                ))}
              </Box>
            )}
          </Box>
        );
      case 3:
        if (!selectedTemplate || !reportTemplates[selectedTemplate]) {
          console.error("Missing template in step 3", { selectedTemplate });
          return (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                bgcolor: "rgba(255, 77, 79, 0.1)",
                color: "#ECECF1",
                borderColor: "#ff4d4f",
              }}
            >
              Template data is missing. Please go back to step 1 and select a
              template.
              <Button
                variant="outlined"
                sx={{ mt: 1 }}
                onClick={() => setActiveStep(0)}
              >
                Return to template selection
              </Button>
            </Alert>
          );
        }

        const templateForStep3 = reportTemplates[selectedTemplate];

        return (
          <Box>
            <Alert
              severity="success"
              sx={{
                mb: 3,
                bgcolor: "rgba(16, 163, 127, 0.1)",
                color: "#ECECF1",
                borderColor: "#10A37F",
              }}
            >
              Your report is ready! Review it before generating the final
              document.
            </Alert>

            <Paper sx={{ p: 3, mb: 3, borderRadius: 2, bgcolor: "#40414F" }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <ArticleIcon
                  sx={{
                    fontSize: 40,
                    mr: 2,
                    color: "#10A37F",
                  }}
                />
                <Box>
                  <Typography variant="h5" color="#ECECF1">
                    {companyDetails.name} - Financial Analysis
                  </Typography>
                  <Typography variant="body2" color="#565869">
                    Created on {new Date().toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2, bgcolor: "rgba(255, 255, 255, 0.1)" }} />

              <Typography variant="subtitle1" gutterBottom color="#ECECF1">
                Report Sections:
              </Typography>

              <List dense>
                {templateForStep3.sections.map((section) => {
                  const isCompleted =
                    reportContent[section.id]?.content ||
                    (section.subsections &&
                      section.subsections.some(
                        (sub) => reportContent[section.id]?.[sub.id]?.content
                      ));

                  return (
                    <ListItem key={section.id}>
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        {isCompleted ? (
                          <CheckCircleIcon sx={{ color: "#10A37F" }} />
                        ) : (
                          <DescriptionIcon sx={{ color: "#565869" }} />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={section.title}
                        primaryTypographyProps={{
                          color: isCompleted ? "#ECECF1" : "#565869",
                          fontWeight: isCompleted ? "medium" : "regular",
                        }}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </Paper>

            <Paper sx={{ p: 3, borderRadius: 2, bgcolor: "#40414F" }}>
              <Typography variant="h6" gutterBottom color="#ECECF1">
                Export Options
              </Typography>

              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={4}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<DownloadIcon />}
                    onClick={() =>
                      alert("PDF download would start here. This is a demo.")
                    }
                  >
                    Download PDF
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<ContentCopyIcon />}
                    onClick={() =>
                      alert(
                        "Report would be copied to clipboard. This is a demo."
                      )
                    }
                  >
                    Copy as Text
                  </Button>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Button
                    variant="outlined"
                    fullWidth
                    startIcon={<EditIcon />}
                    onClick={() => setActiveStep(2)}
                  >
                    Edit Report
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Box>
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom color="#ECECF1">
          Report Generator
        </Typography>
        <Typography variant="body1" color="#565869">
          Create comprehensive financial reports with customizable templates and
          AI-powered content generation.
        </Typography>
      </Box>

      <Stepper
        activeStep={activeStep}
        sx={{
          mb: 4,
          "& .MuiStepLabel-label": {
            color: "#565869",
            "&.Mui-active": {
              color: "#10A37F",
            },
            "&.Mui-completed": {
              color: "#ECECF1",
            },
          },
          "& .MuiStepIcon-root": {
            color: "#40414F",
            "&.Mui-active": {
              color: "#10A37F",
            },
            "&.Mui-completed": {
              color: "#10A37F",
            },
          },
          "& .MuiStepConnector-line": {
            borderColor: "rgba(255, 255, 255, 0.1)",
          },
        }}
      >
        {[
          "Select Template",
          "Company Details",
          "Edit Content",
          "Review & Generate",
        ].map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box>
        {getStepContent(activeStep)}

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 4 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          <Button
            variant="contained"
            onClick={
              activeStep === 3
                ? () =>
                    alert(
                      "Report generation complete! In a real app, this would generate and download your report."
                    )
                : handleNext
            }
            disabled={
              activeStep === 0 || (activeStep === 1 && !companyDetails.name)
            }
          >
            {activeStep === 3 ? "Generate Report" : "Next"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ReportGeneratorPage;
