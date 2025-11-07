// OCR service using OCR.space API (free tier available)
// You can replace this with any OCR service you prefer

export interface OCRResult {
  success: boolean;
  text?: string;
  error?: string;
}

export const extractTextFromImage = async (file: File): Promise<OCRResult> => {
  try {
    // Using OCR.space free API - users can get their own API key at https://ocr.space/ocrapi
    const apiKey = "K87899142388957"; // Free tier API key for demo
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("apikey", apiKey);
    formData.append("language", "eng");
    formData.append("isOverlayRequired", "false");
    formData.append("detectOrientation", "true");
    formData.append("scale", "true");
    formData.append("OCREngine", "2");

    const response = await fetch("https://api.ocr.space/parse/image", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("OCR API request failed");
    }

    const data = await response.json();

    if (data.OCRExitCode === 1 && data.ParsedResults && data.ParsedResults.length > 0) {
      const extractedText = data.ParsedResults[0].ParsedText;
      return {
        success: true,
        text: extractedText,
      };
    } else {
      return {
        success: false,
        error: data.ErrorMessage || "Failed to extract text from image",
      };
    }
  } catch (error) {
    console.error("OCR Error:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An error occurred during text extraction",
    };
  }
};
