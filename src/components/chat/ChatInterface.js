import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Paper,
  Divider,
  CircularProgress,
  useTheme,
  Card,
  Avatar,
  Alert,
} from "@mui/material";

// Charts for visualization
import { Line, Bar, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Icons
import SendIcon from "@mui/icons-material/Send";

// Mock AI responses
import { getAIResponse } from "../../mockData/ai/mockResponses";
import { generateChatResponse } from "../../services/openai";

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// Message types
const MessageType = {
  USER: "user",
  ASSISTANT: "assistant",
};

// Source citations component
const SourceCitations = ({ sources }) => {
  if (!sources || sources.length === 0) return null;

  return (
    <Box sx={{ mt: 2, p: 1.5, bgcolor: "#f5f5f5", borderRadius: 1 }}>
      <Typography
        variant="caption"
        fontWeight="bold"
        display="block"
        gutterBottom
      >
        Sources:
      </Typography>
      {sources.map((source, index) => (
        <Typography
          key={index}
          variant="caption"
          display="block"
          sx={{ mt: 0.5 }}
        >
          {source}
        </Typography>
      ))}
    </Box>
  );
};

// Chart component that renders different chart types based on the data
const ChartRenderer = ({ chartData }) => {
  if (!chartData) return null;

  const { labels, datasets } = chartData;

  // Determine chart type based on data structure
  if (datasets.length === 1 && datasets[0].type === "bar") {
    return <Bar data={chartData} options={{ responsive: true }} />;
  } else if (
    datasets[0].backgroundColor &&
    Array.isArray(datasets[0].backgroundColor) &&
    datasets[0].hoverOffset
  ) {
    return <Doughnut data={chartData} options={{ responsive: true }} />;
  } else {
    return <Line data={chartData} options={{ responsive: true }} />;
  }
};

const Message = ({ type, content, isLoading }) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: type === MessageType.USER ? "flex-end" : "flex-start",
      mb: 2,
    }}
  >
    <Paper
      sx={{
        p: 2,
        maxWidth: "70%",
        bgcolor:
          type === MessageType.USER ? "primary.main" : "background.paper",
        color: type === MessageType.USER ? "white" : "text.primary",
        borderRadius:
          type === MessageType.USER
            ? "20px 20px 5px 20px"
            : "20px 20px 20px 5px",
      }}
    >
      {isLoading ? (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CircularProgress size={20} />
          <Typography sx={{ ml: 1 }}>Thinking...</Typography>
        </Box>
      ) : (
        <Typography sx={{ whiteSpace: "pre-wrap" }}>{content}</Typography>
      )}
    </Paper>
  </Box>
);

function ChatInterface() {
  const theme = useTheme();
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [streamingMessage, setStreamingMessage] = useState("");
  const messagesEndRef = useRef(null);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  // Initialize with a welcome message
  useEffect(() => {
    setMessages([
      {
        type: MessageType.ASSISTANT,
        content:
          "Hello! I'm your AI financial research assistant. I can help you with questions about UK public companies. Try asking about revenue trends, profitability metrics, or risk factors for companies like Rolls-Royce, Tesco, AstraZeneca, HSBC, or BP.",
        timestamp: new Date(),
      },
    ]);
  }, []);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    setError(null);
    setStreamingMessage("");

    // Add user message immediately
    setMessages((prev) => [
      ...prev,
      { type: MessageType.USER, content: userMessage },
    ]);
    setIsLoading(true);

    try {
      // Format messages for OpenAI
      const messageHistory = messages.map((msg) => ({
        role: msg.type,
        content: msg.content,
      }));
      messageHistory.push({ role: "user", content: userMessage });

      let accumulatedResponse = "";

      // Handle streaming response
      const fullResponse = await generateChatResponse(
        messageHistory,
        (chunk) => {
          accumulatedResponse += chunk;
          setStreamingMessage(accumulatedResponse);
        }
      );

      // Add the complete response to messages
      setMessages((prev) => [
        ...prev,
        { type: MessageType.ASSISTANT, content: fullResponse },
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
      setStreamingMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* Messages Container */}
      <Box
        sx={{
          flexGrow: 1,
          overflow: "auto",
          p: 2,
          backgroundColor: theme.palette.background.default,
          borderRadius: 2,
          mb: 2,
        }}
      >
        {messages.map((message, index) => (
          <Message key={index} type={message.type} content={message.content} />
        ))}
        {streamingMessage && (
          <Message type={MessageType.ASSISTANT} content={streamingMessage} />
        )}
        {isLoading && !streamingMessage && (
          <Message type={MessageType.ASSISTANT} isLoading={true} />
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}
        <div ref={messagesEndRef} />
      </Box>

      {/* Input Box */}
      <Paper
        elevation={2}
        sx={{
          p: 1.5,
          borderRadius: 3,
          display: "flex",
          alignItems: "center",
        }}
      >
        <TextField
          fullWidth
          placeholder="Ask about financial metrics, trends, risks, or company performance..."
          value={input}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          multiline
          maxRows={4}
          variant="standard"
          InputProps={{
            disableUnderline: true,
            sx: { p: 1 },
          }}
          sx={{ flex: 1 }}
        />
        <IconButton
          onClick={handleSend}
          color="primary"
          sx={{ ml: 1 }}
          disabled={!input.trim() || isLoading}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Box>
  );
}

export default ChatInterface;
