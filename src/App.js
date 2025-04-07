import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import "./App.css";

// Layout components
import MainLayout from "./components/layout/MainLayout";

// Pages
import HomePage from "./pages/home/HomePage";
import CompanyAnalysisPage from "./pages/company/CompanyAnalysisPage";
import PdfAnalysisPage from "./pages/pdf/PdfAnalysisPage";
import ReportGeneratorPage from "./pages/report/ReportGeneratorPage";

// Create a custom theme
const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#10A37F", // Accent green for buttons and highlights
      light: "#13c096",
      dark: "#0b7c60",
    },
    secondary: {
      main: "#565869", // Secondary text and muted elements
      light: "#6e7085",
      dark: "#40414F",
    },
    background: {
      default: "#343541", // Main dark background
      paper: "#40414F", // Sidebar or section backgrounds
    },
    text: {
      primary: "#ECECF1", // Primary text on dark backgrounds
      secondary: "#565869", // Secondary text and muted elements
    },
    divider: "rgba(255, 255, 255, 0.12)",
    success: {
      main: "#10A37F",
    },
    error: {
      main: "#ef4444",
    },
  },
  typography: {
    fontFamily: [
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
    ].join(","),
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
      color: "#ECECF1",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#ECECF1",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
      color: "#ECECF1",
    },
    h4: {
      fontSize: "1.25rem",
      fontWeight: 500,
      color: "#ECECF1",
    },
    h5: {
      fontSize: "1.1rem",
      fontWeight: 500,
      color: "#ECECF1",
    },
    h6: {
      fontSize: "1rem",
      fontWeight: 500,
      color: "#ECECF1",
    },
    body1: {
      fontSize: "1rem",
      color: "#ECECF1",
    },
    body2: {
      fontSize: "0.875rem",
      color: "#ECECF1",
    },
    subtitle1: {
      color: "#ECECF1",
    },
    subtitle2: {
      color: "#ECECF1",
    },
    caption: {
      color: "#565869",
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 500,
          color: "#ECECF1",
        },
        contained: {
          backgroundColor: "#10A37F",
          color: "#ECECF1",
          "&:hover": {
            backgroundColor: "#0b7c60",
          },
        },
        outlined: {
          borderColor: "#40414F",
          color: "#ECECF1",
          "&:hover": {
            borderColor: "#10A37F",
          },
        },
        text: {
          color: "#10A37F",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          color: "#ECECF1",
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: "#ECECF1",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#565869",
          "&.Mui-focused": {
            color: "#10A37F",
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          color: "#ECECF1",
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: "#ECECF1",
        },
        secondary: {
          color: "#565869",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
          borderRadius: 12,
          backgroundColor: "#40414F",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "#40414F",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#40414F",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#343541",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "rgba(255, 255, 255, 0.15)",
            },
            "&:hover fieldset": {
              borderColor: "rgba(255, 255, 255, 0.25)",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#10A37F",
            },
          },
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 255, 255, 0.12)",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "#ECECF1",
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "#565869",
          "&.Mui-focused": {
            color: "#10A37F",
          },
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: "#565869",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: "#40414F",
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          color: "#ECECF1",
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          color: "#ECECF1",
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          color: "#ECECF1",
        },
        standardSuccess: {
          backgroundColor: "rgba(16, 163, 127, 0.1)",
          color: "#ECECF1",
          borderColor: "#10A37F",
        },
        standardError: {
          backgroundColor: "rgba(255, 77, 79, 0.1)",
          color: "#ECECF1",
          borderColor: "#ff4d4f",
        },
        standardInfo: {
          backgroundColor: "rgba(30, 136, 229, 0.1)",
          color: "#ECECF1",
          borderColor: "#1e88e5",
        },
        standardWarning: {
          backgroundColor: "rgba(255, 167, 38, 0.1)",
          color: "#ECECF1",
          borderColor: "#ffa726",
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="company-analysis" element={<CompanyAnalysisPage />} />
            <Route path="pdf-analysis" element={<PdfAnalysisPage />} />
            <Route path="report-generator" element={<ReportGeneratorPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
