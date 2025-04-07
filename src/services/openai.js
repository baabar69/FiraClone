import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

const SYSTEM_PROMPT = `You are a financial research assistant specialized in analyzing UK public companies. 
You provide detailed, accurate information about company financials, market trends, and business operations. 
Your responses should be structured, data-driven, and focused on helping analysts understand company performance and potential.
When discussing financial metrics, always specify the time period and provide context for the numbers.
If you're not certain about specific numbers or facts, acknowledge the uncertainty and suggest where to find accurate information.`;

export const generateChatResponse = async (messages, onStreamChunk) => {
  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
      temperature: 0.7,
      max_tokens: 1000,
      stream: true,
    });

    let fullResponse = "";

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content || "";
      fullResponse += content;
      onStreamChunk(content);
    }

    return fullResponse;
  } catch (error) {
    console.error("Error calling OpenAI:", error);
    throw new Error("Failed to generate response. Please try again.");
  }
};

export const analyzeSentiment = async (companyName, text) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content:
            "You are a financial sentiment analyzer. Analyze the given text about a company and provide a brief summary of the sentiment (positive, negative, or neutral) and key points.",
        },
        {
          role: "user",
          content: `Analyze the sentiment and key points from this text about ${companyName}: ${text}`,
        },
      ],
      temperature: 0.3,
      max_tokens: 250,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    throw new Error("Failed to analyze sentiment. Please try again.");
  }
};

export const analyzePdfContent = async (pdfText, onStreamChunk = null) => {
  try {
    console.log("Starting OpenAI PDF analysis. Text length:", pdfText.length);
    const systemPrompt = `You are a financial document analyst specialized in extracting key information from financial reports, earnings releases, and other financial documents. 
    Extract and organize the following information from the document:
    1. Company name and document type
    2. Key financial metrics (revenue, profit, margins, etc.)
    3. Business segments breakdown
    4. Year-over-year comparisons
    5. Risk factors mentioned
    6. Future outlook or guidance
    
    Format the information in a clear, structured way. If certain information is not available, indicate that it's not found in the document.`;

    console.log(
      "Using OpenAI for document analysis with system prompt length:",
      systemPrompt.length
    );

    if (onStreamChunk) {
      // Streaming response
      console.log("Using streaming response for PDF analysis");
      const stream = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Analyze this financial document: ${pdfText}`,
          },
        ],
        temperature: 0.3,
        max_tokens: 1500,
        stream: true,
      });

      console.log("Stream connection established, starting to receive chunks");
      let fullResponse = "";
      let chunkCount = 0;

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        fullResponse += content;
        onStreamChunk(content);
        chunkCount++;

        if (chunkCount % 10 === 0) {
          console.log(
            `Received ${chunkCount} chunks so far, current response length: ${fullResponse.length}`
          );
        }
      }

      console.log(
        `PDF analysis streaming complete. Received ${chunkCount} chunks total.`
      );
      return fullResponse;
    } else {
      // Non-streaming response
      console.log("Using non-streaming response for PDF analysis");
      const response = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages: [
          { role: "system", content: systemPrompt },
          {
            role: "user",
            content: `Analyze this financial document: ${pdfText}`,
          },
        ],
        temperature: 0.3,
        max_tokens: 1500,
      });

      console.log(
        "PDF analysis complete. Response length:",
        response.choices[0].message.content.length
      );
      return response.choices[0].message.content;
    }
  } catch (error) {
    console.error("Error analyzing PDF with OpenAI:", error);
    throw new Error("Failed to analyze document. Please try again.");
  }
};

export const askQuestionAboutPdf = async (
  pdfText,
  question,
  chatHistory = [],
  onStreamChunk = null
) => {
  try {
    const systemPrompt = `You are a financial document analyst. Answer questions about the document based only on the information provided. 
    If the answer cannot be found in the document, clearly state that the information is not available in the provided document.
    Always provide page or section references when possible.`;

    const messages = [
      { role: "system", content: systemPrompt },
      { role: "user", content: `Document content: ${pdfText}` },
      ...chatHistory,
      { role: "user", content: question },
    ];

    if (onStreamChunk) {
      // Streaming response
      const stream = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages,
        temperature: 0.3,
        max_tokens: 1000,
        stream: true,
      });

      let fullResponse = "";

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        fullResponse += content;
        onStreamChunk(content);
      }

      return fullResponse;
    } else {
      // Non-streaming response
      const response = await openai.chat.completions.create({
        model: "gpt-4-turbo-preview",
        messages,
        temperature: 0.3,
        max_tokens: 1000,
      });

      return response.choices[0].message.content;
    }
  } catch (error) {
    console.error("Error asking question about PDF:", error);
    throw new Error("Failed to answer question. Please try again.");
  }
};
