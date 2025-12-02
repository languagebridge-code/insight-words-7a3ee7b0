import { X, Mic, Settings, Minimize2, Book } from "lucide-react";

interface TalkToTeacherPanelProps {
  onClose: () => void;
}

export const TalkToTeacherPanel = ({ onClose }: TalkToTeacherPanelProps) => {
  return (
    <div className="absolute top-4 right-4 w-80 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 rounded-xl shadow-2xl overflow-hidden z-10 animate-scale-in">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-2 text-white">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
            <span className="text-sm">💬</span>
          </div>
          <h3 className="font-semibold text-sm">Talk to Teacher</h3>
        </div>
        <button 
          onClick={onClose}
          className="p-1 hover:bg-white/20 rounded-lg transition-all"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Content - Two Panels */}
      <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 p-3 space-y-3">
        {/* Student Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
          <div className="flex flex-col items-center space-y-2">
            {/* Student Icon */}
            <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-xl">
              👨‍🎓
            </div>
            
            {/* Student Label */}
            <div className="text-center">
              <h4 className="text-white font-semibold text-sm">Student</h4>
              <p className="text-white/80 text-xs italic">Tap to speak</p>
            </div>

            {/* Language */}
            <div className="text-white/90 text-xs font-medium">
              Dari
            </div>

            {/* Microphone Button */}
            <button className="w-14 h-14 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 backdrop-blur-sm border-2 border-white/30">
              <Mic className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        {/* Teacher Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/20">
          <div className="flex flex-col items-center space-y-2">
            {/* Teacher Icon */}
            <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center text-xl">
              👨‍🏫
            </div>
            
            {/* Teacher Label */}
            <div className="text-center">
              <h4 className="text-white font-semibold text-sm">Teacher</h4>
              <p className="text-white/80 text-xs italic">Tap to speak</p>
            </div>

            {/* Language */}
            <div className="text-white/90 text-xs font-medium">
              English
            </div>

            {/* Microphone Button */}
            <button className="w-14 h-14 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 backdrop-blur-sm border-2 border-white/30">
              <Mic className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="bg-gradient-to-br from-orange-600 to-orange-500 px-3 py-2 flex items-center justify-center gap-2">
        <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all backdrop-blur-sm" title="Dictionary">
          <Book className="w-4 h-4 text-white" />
        </button>
        <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all backdrop-blur-sm" title="Settings">
          <Settings className="w-4 h-4 text-white" />
        </button>
        <button className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-all backdrop-blur-sm" title="Minimize">
          <Minimize2 className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
};
