import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  CardMedia,
  useTheme,
  Paper,
} from "@mui/material";

// Icons
import BusinessIcon from "@mui/icons-material/Business";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";
import AssessmentIcon from "@mui/icons-material/Assessment";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import InsightsIcon from "@mui/icons-material/Insights";
import AutoGraphIcon from "@mui/icons-material/AutoGraph";

const FeatureCard = ({ icon, title, description, buttonText, path }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        width: "45rem",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ p: 2, display: "flex", justifyContent: "center" }}>{icon}</Box>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="div" align="center">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: "center", pb: 2 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate(path)}
        >
          {buttonText}
        </Button>
      </CardActions>
    </Card>
  );
};

const InformationCard = ({ title, content, icon }) => {
  const theme = useTheme();

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        height: "100%",
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: 2,
        bgcolor: "background.paper",
        width: "45rem",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Box sx={{ mr: 1, color: theme.palette.primary.main }}>{icon}</Box>
        <Typography variant="h6" component="div">
          {title}
        </Typography>
      </Box>
      <Typography variant="body2" color="text.secondary">
        {content}
      </Typography>
    </Paper>
  );
};

function HomePage() {
  const theme = useTheme();

  const features = [
    {
      icon: (
        <BusinessIcon
          sx={{ fontSize: 60, color: theme.palette.primary.main }}
        />
      ),
      title: "Company Analysis",
      description:
        "Ask questions about UK public companies and get AI-powered insights on financial performance, trends, and benchmarks.",
      buttonText: "Analyze Companies",
      path: "/company-analysis",
    },
    {
      icon: (
        <PictureAsPdfIcon
          sx={{ fontSize: 60, color: theme.palette.secondary.main }}
        />
      ),
      title: "PDF Analysis",
      description:
        "Upload financial documents such as annual reports and extract key metrics, insights, and trends automatically.",
      buttonText: "Upload PDF",
      path: "/pdf-analysis",
    },
    {
      icon: (
        <AssessmentIcon
          sx={{ fontSize: 60, color: theme.palette.primary.dark }}
        />
      ),
      title: "Report Generator",
      description:
        "Generate comprehensive financial reports with visualizations based on your analysis or document uploads.",
      buttonText: "Generate Report",
      path: "/report-generator",
    },
  ];

  const infoCards = [
    {
      title: "Streamlined Research",
      content:
        "Save hours of manual work by letting our AI assistant sift through thousands of pages of financial filings and extract the most relevant information.",
      icon: <TrendingUpIcon />,
    },
    {
      title: "Comprehensive Insights",
      content:
        "Get deeper insights into company financials, operational KPIs, market positioning, and risk factors with our structured analysis framework.",
      icon: <InsightsIcon />,
    },
    {
      title: "Data Visualization",
      content:
        "Transform complex financial data into clear, actionable visualizations that help identify trends, patterns, and outliers at a glance.",
      icon: <AutoGraphIcon />,
    },
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          py: 6,
          px: 3,
          mb: 4,
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: theme.shadows[1],
          textAlign: "center",
        }}
      >
        <Typography
          variant="h2"
          component="h1"
          gutterBottom
          sx={{
            fontWeight: 700,
            color: theme.palette.primary.main,
            mb: 2,
          }}
        >
          LearnSignal Research Assistant
        </Typography>
        <Typography
          variant="h5"
          component="p"
          sx={{ mb: 3, maxWidth: 800, mx: "auto", color: "text.secondary" }}
        >
          AI-powered financial research platform that helps analysts streamline
          their workflow and generate comprehensive insights
        </Typography>
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ maxWidth: 700, mx: "auto", mb: 4 }}
        >
          Ask questions about UK public companies, analyze financial documents,
          and generate detailed reports with our intelligent assistant.
        </Typography>
      </Box>

      {/* Feature Cards */}
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
        Explore Features
      </Typography>
      <Grid
        container
        spacing={4}
        sx={{ mb: 6, display: "flex", justifyContent: "center" }}
      >
        {features.map((feature, index) => (
          <Grid item xs={12} md={4} key={index}>
            <FeatureCard {...feature} />
          </Grid>
        ))}
      </Grid>

      {/* Information Cards */}
      <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
        Benefits
      </Typography>
      <Grid
        container
        spacing={3}
        sx={{ mb: 6, display: "flex", flexDirection: "row" }}
      >
        {infoCards.map((info, index) => (
          <Grid item xs={12} md={4} key={index}>
            <InformationCard {...info} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default HomePage;
