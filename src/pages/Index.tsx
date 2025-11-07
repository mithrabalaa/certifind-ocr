import { useState } from "react";
import { FileText, Sparkles } from "lucide-react";
import { FileUpload } from "@/components/FileUpload";
import { ExtractedText } from "@/components/ExtractedText";
import { ProcessingState } from "@/components/ProcessingState";
import { Button } from "@/components/ui/button";
import { extractTextFromImage } from "@/lib/ocr";
import { toast } from "sonner";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setExtractedText(null);
  };

  const handleClear = () => {
    setSelectedFile(null);
    setExtractedText(null);
  };

  const handleExtract = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setExtractedText(null);

    try {
      const result = await extractTextFromImage(selectedFile);

      if (result.success && result.text) {
        setExtractedText(result.text);
        toast.success("Text extracted successfully!");
      } else {
        toast.error(result.error || "Failed to extract text");
      }
    } catch (error) {
      toast.error("An unexpected error occurred");
      console.error("Extraction error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center border-2 border-primary">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">SmartCert</h1>
              <p className="text-sm text-muted-foreground">AI-Powered Certificate Authentication</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16 max-w-5xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Verify Your Certificates
          </h2>
          <p className="text-lg text-muted-foreground">
            Upload any certificate and let our AI-powered system verify its authenticity in seconds
          </p>
        </div>

        {/* Upload Section */}
        <div className="space-y-6">
          <FileUpload
            onFileSelect={handleFileSelect}
            selectedFile={selectedFile}
            onClear={handleClear}
          />

          {selectedFile && !isProcessing && !extractedText && (
            <div className="flex justify-center mt-6">
              <Button
                onClick={handleExtract}
                size="lg"
                className="gap-2 px-8 py-6 text-base"
              >
                <FileText className="w-5 h-5" />
                Verify Certificate
              </Button>
            </div>
          )}
        </div>

        {/* Processing State */}
        {isProcessing && (
          <div className="mt-8 animate-in fade-in duration-300">
            <ProcessingState />
          </div>
        )}

        {/* Results */}
        {extractedText && !isProcessing && (
          <div className="mt-8 animate-in fade-in duration-500">
            <ExtractedText text={extractedText} />
          </div>
        )}

      </main>
    </div>
  );
};

export default Index;
