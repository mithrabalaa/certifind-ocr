import { useState } from "react";
import { Copy, Check, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { toast } from "sonner";

interface ExtractedTextProps {
  text: string;
}

export const ExtractedText = ({ text }: ExtractedTextProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Text copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy text");
    }
  };

  return (
    <Card className="shadow-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <CardTitle className="text-xl font-semibold flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Extracted Text
        </CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={handleCopy}
          className="gap-2"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </Button>
      </CardHeader>
      <CardContent>
        <div className="bg-secondary rounded-lg p-4 max-h-96 overflow-y-auto">
          <pre className="text-sm text-foreground whitespace-pre-wrap font-mono">
            {text}
          </pre>
        </div>
      </CardContent>
    </Card>
  );
};
