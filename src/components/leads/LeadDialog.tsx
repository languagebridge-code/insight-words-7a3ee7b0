import { createContext, useCallback, useContext, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LeadForm } from "./LeadForm";

interface LeadDialogContextValue {
  openLeadDialog: (source?: string) => void;
}

const LeadDialogContext = createContext<LeadDialogContextValue>({
  openLeadDialog: () => {},
});

export const useLeadDialog = () => useContext(LeadDialogContext);

export const LeadDialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("modal");

  const openLeadDialog = useCallback((nextSource = "modal") => {
    setSource(nextSource);
    setOpen(true);
  }, []);

  const value = useMemo(() => ({ openLeadDialog }), [openLeadDialog]);

  return (
    <LeadDialogContext.Provider value={value}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md bg-background">
          <DialogHeader>
            <DialogTitle className="text-2xl">Get LanguageBridge in your classroom</DialogTitle>
            <DialogDescription>
              Tell us where to send setup details, pricing for your district, and compliance
              documentation. Takes about 20 seconds.
            </DialogDescription>
          </DialogHeader>
          <LeadForm source={source} showMessage={false} onSuccess={() => undefined} />
        </DialogContent>
      </Dialog>
    </LeadDialogContext.Provider>
  );
};
