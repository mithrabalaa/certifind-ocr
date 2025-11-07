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
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Smart Certificate OCR</h1>
              <p className="text-xs text-muted-foreground">Extract text from certificates instantly</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Sparkles className="w-4 h-4" />
            Powered by Advanced OCR
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Extract Text from Certificates
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Upload your certificate image and get accurate text extraction in seconds. 
            Perfect for digitizing documents, certificates, and official papers.
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
            <div className="flex justify-center">
              <Button
                onClick={handleExtract}
                size="lg"
                className="gap-2 shadow-elegant hover:shadow-xl transition-all duration-300"
              >
                <Sparkles className="w-5 h-5" />
                Extract Text
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

        {/* Features */}
        {!selectedFile && (
          <div className="mt-16 grid md:grid-cols-3 gap-6">
            <div className="bg-card rounded-lg p-6 shadow-card border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Fast Processing</h3>
              <p className="text-sm text-muted-foreground">
                Get your text extracted in seconds with our optimized OCR engine
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-card border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">High Accuracy</h3>
              <p className="text-sm text-muted-foreground">
                Advanced OCR technology ensures accurate text recognition
              </p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow-card border border-border">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">Easy Export</h3>
              <p className="text-sm text-muted-foreground">
                Copy extracted text with one click for easy use
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
