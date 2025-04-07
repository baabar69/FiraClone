import * as pdfjsLib from "pdfjs-dist";

// Set the worker source correctly
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

/**
 * Parse a PDF file and extract its text content
 * @param {File} file - The PDF file to parse
 * @returns {Promise<string>} - The extracted text content
 */
export const parsePdfFile = async (file) => {
  try {
    console.log("Starting PDF parsing for:", file.name);

    // Read the file as ArrayBuffer
    const fileData = await readFileAsArrayBuffer(file);
    console.log("File loaded as ArrayBuffer, size:", fileData.byteLength);

    // Load the PDF document
    const loadingTask = pdfjsLib.getDocument(fileData);
    const pdf = await loadingTask.promise;

    console.log(`PDF loaded successfully. Document has ${pdf.numPages} pages.`);

    let fullText = "";

    // Extract text from each page
    for (let i = 1; i <= pdf.numPages; i++) {
      console.log(`Parsing page ${i} of ${pdf.numPages}`);
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();
      const pageText = textContent.items.map((item) => item.str).join(" ");
      console.log(
        `Page ${i} content sample:`,
        pageText.substring(0, 150) + (pageText.length > 150 ? "..." : "")
      );
      fullText += pageText + "\n\n";
    }

    console.log("PDF parsing complete. Total content length:", fullText.length);
    console.log(
      "Content sample:",
      fullText.substring(0, 300) + (fullText.length > 300 ? "..." : "")
    );

    return fullText;
  } catch (error) {
    console.error("Error parsing PDF:", error);
    throw new Error(
      `Failed to parse PDF file: ${error.message}. Please try again or use a different file.`
    );
  }
};

/**
 * Read a file as ArrayBuffer
 * @param {File} file - The file to read
 * @returns {Promise<ArrayBuffer>} - The file as ArrayBuffer
 */
const readFileAsArrayBuffer = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      resolve(reader.result);
    };

    reader.onerror = (error) => {
      reject(new Error(`Error reading file: ${error}`));
    };

    reader.readAsArrayBuffer(file);
  });
};

/**
 * Read a text file and return its content
 * @param {File} file - The text file to read
 * @returns {Promise<string>} - The file content
 */
export const readTextFile = (file) => {
  return new Promise((resolve, reject) => {
    console.log("Reading text file:", file.name);
    const reader = new FileReader();

    reader.onload = () => {
      const content = reader.result;
      console.log(
        "Text file read successfully. Content length:",
        content.length
      );
      console.log(
        "Content sample:",
        content.substring(0, 300) + (content.length > 300 ? "..." : "")
      );
      resolve(content);
    };

    reader.onerror = (error) => {
      console.error("Error reading text file:", error);
      reject(new Error("Failed to read text file. Please try again."));
    };

    reader.readAsText(file);
  });
};

/**
 * Process any file (PDF or text) and extract its content
 * @param {File} file - The file to process
 * @returns {Promise<string>} - The extracted content
 */
export const processFile = async (file) => {
  if (!file) {
    throw new Error("No file provided");
  }

  const fileType = file.type;
  console.log("Processing file:", file.name, "Type:", fileType);

  if (
    fileType === "application/pdf" ||
    file.name.toLowerCase().endsWith(".pdf")
  ) {
    return parsePdfFile(file);
  } else if (
    fileType === "text/plain" ||
    file.name.toLowerCase().endsWith(".txt")
  ) {
    return readTextFile(file);
  } else {
    console.error("Unsupported file type:", fileType);
    throw new Error("Unsupported file type. Please upload a PDF or text file.");
  }
};
