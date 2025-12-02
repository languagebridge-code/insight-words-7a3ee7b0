import { X, Volume2 } from "lucide-react";
import { useState } from "react";

interface VocabularyPanelProps {
  onClose: () => void;
}

interface VocabularyTerm {
  term: string;
  definition: string;
  example: string;
  language: string;
}

export const VocabularyPanel = ({ onClose }: VocabularyPanelProps) => {
  const [playingTerm, setPlayingTerm] = useState<string | null>(null);

  const vocabularyTerms: VocabularyTerm[] = [
    {
      term: "Analyze",
      definition: "To examine something in detail to understand it better",
      example: "We need to analyze the data to find patterns.",
      language: "تجزیہ کریں"
    },
    {
      term: "Evidence",
      definition: "Facts or information that prove something is true",
      example: "The scientist presented evidence to support her theory.",
      language: "ثبوت"
    },
    {
      term: "Compare",
      definition: "To look at similarities and differences between things",
      example: "Compare the two stories and find what they have in common.",
      language: "موازنہ کریں"
    },
    {
      term: "Summarize",
      definition: "To give the main points in a short form",
      example: "Can you summarize the article in three sentences?",
      language: "خلاصہ کریں"
    },
    {
      term: "Identify",
      definition: "To recognize and name something",
      example: "Identify the main character in the story.",
      language: "شناخت کریں"
    }
  ];

  const handlePlayAudio = (term: string) => {
    setPlayingTerm(term);
    // Simulate audio playback
    setTimeout(() => setPlayingTerm(null), 2000);
  };

  return (
    <div className="absolute top-4 right-4 w-96 max-h-[600px] bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 rounded-xl shadow-2xl overflow-hidden z-10 animate-scale-in">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 text-white border-b border-white/20">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <span className="text-lg">📚</span>
          </div>
          <h3 className="font-semibold text-base">Academic Vocabulary</h3>
        </div>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-white/20 rounded-lg transition-all"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Vocabulary List */}
      <div className="overflow-y-auto max-h-[520px] bg-white/5 backdrop-blur-sm">
        {vocabularyTerms.map((item, index) => (
          <div 
            key={index}
            className="border-b border-white/10 last:border-b-0"
          >
            <div className="p-4 hover:bg-white/5 transition-colors">
              {/* Term and Audio Button */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <h4 className="text-white font-bold text-lg">{item.term}</h4>
                  <button
                    onClick={() => handlePlayAudio(item.term)}
                    className={`p-2 rounded-full transition-all ${
                      playingTerm === item.term 
                        ? 'bg-white/30 animate-pulse' 
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                    title="Play pronunciation"
                  >
                    <Volume2 className="w-4 h-4 text-white" />
                  </button>
                </div>
                <span className="text-white/80 text-sm font-medium">{item.language}</span>
              </div>

              {/* Definition */}
              <p className="text-white/90 text-sm mb-2 leading-relaxed">
                {item.definition}
              </p>

              {/* Example */}
              <div className="bg-white/10 rounded-lg p-2 mt-2">
                <p className="text-white/80 text-xs italic">
                  "{item.example}"
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="bg-gradient-to-br from-orange-600 to-orange-500 px-4 py-3 text-center">
        <p className="text-white text-xs">
          Scroll for more academic vocabulary terms
        </p>
      </div>
    </div>
  );
};
