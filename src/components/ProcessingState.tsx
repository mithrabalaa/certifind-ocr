import { Loader2, Scan } from "lucide-react";
import { Card } from "./ui/card";

export const ProcessingState = () => {
  return (
    <Card className="shadow-card">
      <div className="flex flex-col items-center justify-center py-12 px-6">
        <div className="relative">
          <div className="absolute inset-0 animate-ping">
            <Scan className="w-16 h-16 text-primary opacity-20" />
          </div>
          <Scan className="w-16 h-16 text-primary relative z-10" />
        </div>
        <div className="flex items-center gap-2 mt-6">
          <Loader2 className="w-5 h-5 animate-spin text-primary" />
          <p className="text-lg font-medium text-foreground">
            Processing your certificate...
          </p>
        </div>
        <p className="text-sm text-muted-foreground mt-2">
          This may take a few moments
        </p>
      </div>
    </Card>
  );
};
