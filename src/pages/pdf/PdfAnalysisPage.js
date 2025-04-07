import React, { useState, useCallback, useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  Tabs,
  Tab,
  Alert,
  CircularProgress,
  Chip,
  Backdrop,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import DescriptionIcon from "@mui/icons-material/Description";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import ErrorIcon from "@mui/icons-material/Error";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import PieChartIcon from "@mui/icons-material/PieChart";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import { analyzePdfContent } from "../../services/openai";
import PdfChatInterface from "../../components/pdf/PdfChatInterface";
import { processFile } from "../../services/pdfParser";

// Component to display a metric
const MetricCard = ({ title, value, change, positive }) => (
  <Card elevation={1} sx={{ height: "100%", bgcolor: "#40414F" }}>
    <CardContent>
      <Typography color="#565869" gutterBottom>
        {title}
      </Typography>
      <Typography
        variant="h5"
        component="div"
        sx={{ mb: 1, fontWeight: 500, color: "#ECECF1" }}
      >
        {value}
      </Typography>
      {change && (
        <Chip
          size="small"
          label={change}
          color={positive ? "success" : "error"}
          sx={{
            fontWeight: 500,
            bgcolor: positive
              ? "rgba(16, 163, 127, 0.2)"
              : "rgba(255, 77, 79, 0.2)",
            color: positive ? "#10A37F" : "#ff4d4f",
          }}
        />
      )}
    </CardContent>
  </Card>
);

// Component to display a business segment
const SegmentCard = ({ name, revenue, percentage }) => (
  <Card elevation={1} sx={{ mb: 2, bgcolor: "#40414F" }}>
    <CardContent>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="subtitle1" fontWeight={500} color="#ECECF1">
          {name}
        </Typography>
        <Typography variant="subtitle1" color="#10A37F" fontWeight={500}>
          {percentage}
        </Typography>
      </Box>
      <Typography variant="body2" color="#565869">
        Revenue: {revenue}
      </Typography>
    </CardContent>
  </Card>
);

// Component to display a risk factor
const RiskFactor = ({ text }) => (
  <Paper
    variant="outlined"
    sx={{
      p: 2,
      mb: 1,
      borderColor: "#ff4d4f",
      bgcolor: "rgba(255, 77, 79, 0.1)",
    }}
  >
    <Box sx={{ display: "flex", alignItems: "flex-start" }}>
      <ErrorIcon color="error" sx={{ mr: 1, mt: 0.3 }} fontSize="small" />
      <Typography variant="body2" color="#ECECF1">
        {text}
      </Typography>
    </Box>
  </Paper>
);

// Helper function to format text with bold highlights for important information
const formatAnalysisText = (text) => {
  if (!text) return "";

  // Pattern to match various important financial terms and metrics
  const patterns = [
    // Monetary values with currency symbols
    /(\$|£|€)(\d+(?:[.,]\d+)*(?:\s*(?:million|billion|m|b|M|B))?)/g,

    // Percentages
    /((?:-|\+)?\d+(?:\.\d+)?%)/g,

    // Financial terms with numbers
    /(Revenue|Profit|EBITDA|Net Income|EPS|Margin|Growth|ROI|ROE|ROIC|Debt|Equity)(\s*of\s*|\s*:\s*|\s*was\s*)(\$|£|€)?(\d+(?:[.,]\d+)*(?:\s*(?:million|billion|m|b|M|B))?)/gi,

    // Year references
    /(FY\d{4}|FY\d{2}|20\d{2}|Q[1-4]\s*20\d{2}|Q[1-4]\s*FY\d{2})/g,

    // Section titles (whole line ending with a colon)
    /^([A-Z][^:]+:)$/gm,

    // Important headings (typically all caps)
    /^([A-Z][A-Z\s]{3,}[A-Z])$/gm,

    // Business segments
    /(Segment|Division)(\s*:\s*|\s*-\s*)([A-Za-z\s]+)/g,
  ];

  // Apply bold formatting for each pattern
  let formattedText = text;

  patterns.forEach((pattern) => {
    formattedText = formattedText.replace(pattern, "<strong>$&</strong>");
  });

  // Convert plain text to HTML with preserving line breaks
  formattedText = formattedText
    .replace(/\n/g, "<br/>")
    .replace(/<strong><br\/><\/strong>/g, "<br/>");

  return formattedText;
};

function PdfAnalysisPage() {
  const [file, setFile] = useState(null);
  const [fileContent, setFileContent] = useState("");
  const [fileName, setFileName] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [parsing, setParsing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const [analysisResult, setAnalysisResult] = useState("");
  const [streamingResult, setStreamingResult] = useState("");
  const [activeTab, setActiveTab] = useState(0);
  const [error, setError] = useState(null);
  const [parsingProgress, setParsingProgress] = useState(0);
  const [manualTextDialogOpen, setManualTextDialogOpen] = useState(false);
  const [manualText, setManualText] = useState("");

  // Automatically analyze the document when file content is available
  useEffect(() => {
    if (fileContent && !analyzing && !analysisComplete) {
      console.log(
        "File content received, starting analysis. Content length:",
        fileContent.length
      );
      analyzeDocument();
    }
  }, [fileContent]);

  const onDrop = useCallback(async (acceptedFiles) => {
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      console.log(
        "File dropped:",
        selectedFile.name,
        "Size:",
        selectedFile.size,
        "bytes"
      );

      // Reset all states
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setAnalysisComplete(false);
      setAnalysisResult("");
      setStreamingResult("");
      setError(null);
      setParsingProgress(0);

      try {
        setParsing(true);
        console.log("Starting to parse file:", selectedFile.name);

        // Show the file in the UI immediately
        setFile(selectedFile);
        setFileName(selectedFile.name);

        // Use the processFile service to parse the file
        const content = await processFile(selectedFile);

        if (!content || content.trim() === "") {
          throw new Error(
            "No content could be extracted from the file. Please try another file."
          );
        }

        console.log(
          "File successfully parsed. Setting content in state. Content length:",
          content.length
        );
        setFileContent(content);
      } catch (err) {
        console.error("Error during file parsing:", err);
        setError(`Error parsing file: ${err.message}`);
        setFile(null);
        setFileName("");
      } finally {
        setParsing(false);
      }
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
    },
    multiple: false,
  });

  const analyzeDocument = async () => {
    if (!fileContent) return;

    console.log("Beginning document analysis with OpenAI");
    setAnalyzing(true);
    setAnalysisComplete(false);
    setError(null);
    setStreamingResult("");

    try {
      let accumulatedResponse = "";

      // Call OpenAI to analyze the PDF
      console.log(
        "Sending content to OpenAI for analysis. Content length:",
        fileContent.length
      );
      await analyzePdfContent(fileContent, (chunk) => {
        accumulatedResponse += chunk;
        setStreamingResult(accumulatedResponse);
      });

      console.log(
        "Analysis complete. Response length:",
        accumulatedResponse.length
      );
      setAnalysisResult(accumulatedResponse);
      setAnalysisComplete(true);

      // Log successful completion
      console.log("Analysis completed successfully");
    } catch (err) {
      console.error("Error during OpenAI analysis:", err);
      setError(err.message);
      setAnalysisComplete(false);

      // Log error state
      console.log("Analysis failed with error");
    } finally {
      setAnalyzing(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const resetFile = () => {
    setFile(null);
    setFileName("");
    setFileContent("");
    setAnalysisComplete(false);
    setAnalysisResult("");
    setStreamingResult("");
    setError(null);
  };

  const handleManualTextOpen = () => {
    setManualTextDialogOpen(true);
  };

  const handleManualTextClose = () => {
    setManualTextDialogOpen(false);
  };

  const handleManualTextSubmit = () => {
    if (manualText.trim()) {
      console.log("Manual text submitted. Length:", manualText.length);
      setFileName("Manual Text Input");
      setFileContent(manualText);
      setFile({ name: "Manual Text Input" }); // Dummy file object
      setManualTextDialogOpen(false);
    }
  };

  const renderAnalysisResults = () => {
    if (!analysisComplete && !streamingResult && !analyzing) return null;

    const content = analysisComplete ? analysisResult : streamingResult;
    const formattedContent = formatAnalysisText(content);

    return (
      <Paper
        elevation={1}
        sx={{
          p: 3,
          mb: 2,
          bgcolor: "#40414F",
          color: "#ECECF1",
        }}
      >
        <Typography
          dangerouslySetInnerHTML={{ __html: formattedContent }}
          sx={{
            "& strong": {
              color: "#10A37F",
              fontWeight: 600,
            },
          }}
        />
      </Paper>
    );
  };

  return (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom color="#ECECF1">
          PDF Analysis
        </Typography>
        <Typography variant="body1" color="#565869">
          Upload financial documents and reports for AI-powered analysis and
          insights.
        </Typography>
      </Box>

      <Box
        sx={{ borderBottom: 1, borderColor: "rgba(255, 255, 255, 0.1)", mb: 3 }}
      >
        <Tabs
          value={activeTab}
          onChange={handleTabChange}
          aria-label="pdf analysis tabs"
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
          <Tab icon={<AnalyticsIcon />} label="Analysis" />
          <Tab
            icon={<QuestionAnswerIcon />}
            label="Chat"
            disabled={!fileContent}
          />
        </Tabs>
      </Box>

      {/* File Upload Section */}
      {!file && activeTab === 0 && (
        <Paper
          {...getRootProps()}
          sx={{
            p: 5,
            textAlign: "center",
            cursor: "pointer",
            borderStyle: "dashed",
            borderWidth: 2,
            borderColor: isDragActive ? "#10A37F" : "rgba(255, 255, 255, 0.1)",
            bgcolor: "#40414F",
            mb: 3,
            transition: "all 0.2s ease",
            "&:hover": {
              borderColor: "#10A37F",
              bgcolor: "rgba(16, 163, 127, 0.1)",
            },
          }}
        >
          <input {...getInputProps()} />
          <UploadFileIcon
            sx={{
              fontSize: 64,
              color: isDragActive ? "#10A37F" : "#565869",
              mb: 2,
            }}
          />
          <Typography variant="h6" gutterBottom color="#ECECF1">
            {isDragActive
              ? "Drop the PDF file here..."
              : "Drag & drop a PDF file here, or click to select file"}
          </Typography>
          <Typography variant="body2" color="#565869">
            Upload a financial report or annual statement for AI analysis
          </Typography>
          <Button
            variant="outlined"
            color="primary"
            sx={{ mt: 2 }}
            onClick={(e) => e.stopPropagation()}
          >
            Select File
          </Button>
        </Paper>
      )}

      {/* Manual Text Input Option */}
      {!file && activeTab === 0 && (
        <Box sx={{ textAlign: "center", mt: 2, mb: 4 }}>
          <Typography variant="body2" color="#565869">
            Or input text directly:
          </Typography>
          <Button
            variant="text"
            color="primary"
            onClick={handleManualTextOpen}
            sx={{ mt: 1 }}
          >
            Enter text manually
          </Button>
        </Box>
      )}

      {/* Analysis Results Section */}
      {activeTab === 0 && (
        <Box sx={{ flexGrow: 1, overflow: "auto" }}>
          {file && (
            <Box
              sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <DescriptionIcon sx={{ mr: 1, color: "#10A37F" }} />
                <Typography color="#ECECF1">{fileName}</Typography>
              </Box>
              <Button size="small" onClick={resetFile} color="primary">
                Remove
              </Button>
            </Box>
          )}

          {error && (
            <Alert
              severity="error"
              sx={{
                mb: 3,
                bgcolor: "rgba(255, 77, 79, 0.1)",
                color: "#ECECF1",
                borderColor: "#ff4d4f",
              }}
            >
              {error}
            </Alert>
          )}

          {(parsing || (analyzing && !streamingResult)) && (
            <Box sx={{ textAlign: "center", py: 10 }}>
              <CircularProgress color="primary" />
              <Typography sx={{ mt: 2, color: "#ECECF1" }}>
                {parsing ? "Parsing document..." : "Analyzing document..."}
              </Typography>
            </Box>
          )}

          {renderAnalysisResults()}
        </Box>
      )}

      {/* Chat Interface Tab */}
      {activeTab === 1 && (
        <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
          {fileContent ? (
            <PdfChatInterface
              fileName={fileName}
              documentContent={fileContent}
            />
          ) : (
            <Box sx={{ textAlign: "center", py: 10 }}>
              <Typography variant="h6" color="#ECECF1" gutterBottom>
                Upload a PDF to start chatting
              </Typography>
              <Typography variant="body2" color="#565869">
                You need to upload and analyze a document first before you can
                chat about it.
              </Typography>
              <Button
                variant="outlined"
                color="primary"
                sx={{ mt: 3 }}
                onClick={() => setActiveTab(0)}
              >
                Go to Analysis Tab
              </Button>
            </Box>
          )}
        </Box>
      )}

      {/* Manual Text Input Dialog */}
      <Dialog
        open={manualTextDialogOpen}
        onClose={handleManualTextClose}
        PaperProps={{
          sx: {
            bgcolor: "#40414F",
            color: "#ECECF1",
            minWidth: "600px",
          },
        }}
      >
        <DialogTitle color="#ECECF1">Enter Text for Analysis</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            multiline
            rows={12}
            fullWidth
            variant="outlined"
            placeholder="Paste text from financial report here..."
            value={manualText}
            onChange={(e) => setManualText(e.target.value)}
            margin="normal"
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
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={handleManualTextClose}>Cancel</Button>
          <Button
            onClick={handleManualTextSubmit}
            variant="contained"
            color="primary"
            disabled={!manualText.trim()}
          >
            Analyze
          </Button>
        </DialogActions>
      </Dialog>

      {/* Backdrop for full-screen loading */}
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={parsing || (analyzing && !streamingResult)}
      >
        <Box sx={{ textAlign: "center" }}>
          <CircularProgress color="primary" />
          <Typography sx={{ mt: 2, color: "#ECECF1" }}>
            {parsing ? "Parsing document..." : "Analyzing document..."}
          </Typography>
        </Box>
      </Backdrop>
    </Box>
  );
}

export default PdfAnalysisPage;
