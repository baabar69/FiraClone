import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Paper,
  CircularProgress,
  Alert,
  Divider,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { askQuestionAboutPdf } from "../../services/openai";

const MessageType = {
  USER: "user",
  ASSISTANT: "assistant",
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
        bgcolor: type === MessageType.USER ? "#10A37F" : "#40414F",
        color: "#ECECF1",
        borderRadius:
          type === MessageType.USER
            ? "20px 20px 5px 20px"
            : "20px 20px 20px 5px",
      }}
    >
      {isLoading ? (
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <CircularProgress size={20} sx={{ color: "#ECECF1" }} />
          <Typography sx={{ ml: 1, color: "#ECECF1" }}>Thinking...</Typography>
        </Box>
      ) : (
        <Typography sx={{ whiteSpace: "pre-wrap", color: "#ECECF1" }}>
          {content}
        </Typography>
      )}
    </Paper>
  </Box>
);

function PdfChatInterface({ documentContent, fileName }) {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [streamingMessage, setStreamingMessage] = useState("");
  const messagesEndRef = useRef(null);
  const [chatHistory, setChatHistory] = useState([]);

  // Scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamingMessage]);

  // Initialize with a welcome message
  useEffect(() => {
    if (documentContent) {
      console.log("Setting initial welcome message for document:", fileName);
      setMessages([
        {
          type: MessageType.ASSISTANT,
          content: `I've analyzed the document "${
            fileName || "uploaded"
          }". Ask me any questions about its content.`,
        },
      ]);
    }
  }, [documentContent, fileName]);

  const handleSend = async () => {
    if (!input.trim() || isLoading || !documentContent) return;

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
      let accumulatedResponse = "";

      // Ask question about the PDF
      await askQuestionAboutPdf(
        documentContent,
        userMessage,
        chatHistory,
        (chunk) => {
          accumulatedResponse += chunk;
          setStreamingMessage(accumulatedResponse);
        }
      );

      // Update chat history for context
      setChatHistory((prev) => [
        ...prev,
        { role: "user", content: userMessage },
        { role: "assistant", content: accumulatedResponse },
      ]);

      // Add the complete response to messages
      setMessages((prev) => [
        ...prev,
        { type: MessageType.ASSISTANT, content: accumulatedResponse },
      ]);
    } catch (err) {
      console.error("Error during PDF chat:", err);
      setError(err.message || "Failed to get a response. Please try again.");
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

  if (!documentContent) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Typography color="#565869">
          Upload a PDF document to start the analysis
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
      <Typography variant="h6" gutterBottom color="#ECECF1">
        Ask Questions About Your Document
      </Typography>
      <Divider sx={{ mb: 2, bgcolor: "rgba(255, 255, 255, 0.1)" }} />

      {/* Messages Container */}
      <Box
        sx={{
          flexGrow: 1,
          overflow: "auto",
          p: 2,
          backgroundColor: "#343541",
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
          <Alert
            severity="error"
            sx={{
              mt: 2,
              bgcolor: "rgba(255, 77, 79, 0.1)",
              color: "#ECECF1",
              borderColor: "#ff4d4f",
            }}
          >
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
          bgcolor: "#40414F",
        }}
      >
        <TextField
          fullWidth
          placeholder="Ask questions about the document..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
          multiline
          maxRows={4}
          variant="standard"
          InputProps={{
            disableUnderline: true,
            sx: { p: 1, color: "#ECECF1" },
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

export default PdfChatInterface;
