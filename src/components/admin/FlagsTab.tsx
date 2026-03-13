import { Card, CardContent } from "@/components/ui/card";
import { Flag } from "lucide-react";

interface FlagsTabProps {
  onAuthError: () => void;
}

const FlagsTab = ({ onAuthError }: FlagsTabProps) => {
  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-12 text-center">
        <Flag className="h-10 w-10 mx-auto mb-3 text-gray-300" />
        <p className="font-medium text-gray-500">Flags feature coming soon</p>
        <p className="text-sm text-gray-400 mt-1">Translation flags will be tracked once the extension is deployed to students.</p>
      </CardContent>
    </Card>
  );
};

export default FlagsTab;
