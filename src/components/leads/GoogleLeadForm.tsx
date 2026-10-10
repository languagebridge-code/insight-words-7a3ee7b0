import { GOOGLE_LEAD_FORM_EMBED_URL, GOOGLE_LEAD_FORM_URL } from "@/lib/leadForm";

interface GoogleLeadFormProps {
  height?: number;
}

export const GoogleLeadForm = ({ height = 900 }: GoogleLeadFormProps) => (
  <div>
    <iframe
      src={GOOGLE_LEAD_FORM_EMBED_URL}
      width="100%"
      height={height}
      frameBorder="0"
      marginHeight={0}
      marginWidth={0}
      title="LanguageBridge demo and information request form"
      className="rounded-xl bg-white"
    >
      Loading the request form…
    </iframe>
    <p className="text-xs text-muted-foreground mt-3 text-center">
      Trouble with the form?{" "}
      <a
        href={GOOGLE_LEAD_FORM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="underline hover:text-foreground"
      >
        Open it in a new tab
      </a>
      .
    </p>
  </div>
);
