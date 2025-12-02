import { X, Mic, Settings, Minimize2, Book } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface TalkToTeacherModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const TalkToTeacherModal = ({ open, onOpenChange }: TalkToTeacherModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 border-none">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 text-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
              <span className="text-lg">💬</span>
            </div>
            <h2 className="font-semibold text-lg">Talk to Teacher</h2>
          </div>
          <button 
            onClick={() => onOpenChange(false)}
            className="p-1 hover:bg-white/20 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main Content - Two Panels */}
        <div className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-500 p-6 space-y-4">
          {/* Student Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex flex-col items-center space-y-4">
              {/* Student Icon */}
              <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-3xl">
                👨‍🎓
              </div>
              
              {/* Student Label */}
              <div className="text-center">
                <h3 className="text-white font-semibold text-lg">Student</h3>
                <p className="text-white/80 text-sm italic">Tap to speak</p>
              </div>

              {/* Language */}
              <div className="text-white/90 font-medium">
                Dari
              </div>

              {/* Microphone Button */}
              <button className="w-20 h-20 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 backdrop-blur-sm border-2 border-white/30">
                <Mic className="w-8 h-8 text-white" />
              </button>
            </div>
          </div>

          {/* Teacher Section */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="flex flex-col items-center space-y-4">
              {/* Teacher Icon */}
              <div className="w-16 h-16 bg-orange-400 rounded-full flex items-center justify-center text-3xl">
                👨‍🏫
              </div>
              
              {/* Teacher Label */}
              <div className="text-center">
                <h3 className="text-white font-semibold text-lg">Teacher</h3>
                <p className="text-white/80 text-sm italic">Tap to speak</p>
              </div>

              {/* Language */}
              <div className="text-white/90 font-medium">
                English
              </div>

              {/* Microphone Button */}
              <button className="w-20 h-20 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-all hover:scale-105 active:scale-95 backdrop-blur-sm border-2 border-white/30">
                <Mic className="w-8 h-8 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Footer Controls */}
        <div className="bg-gradient-to-br from-orange-600 to-orange-500 px-4 py-3 flex items-center justify-center gap-3">
          <button className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all backdrop-blur-sm" title="Dictionary">
            <Book className="w-5 h-5 text-white" />
          </button>
          <button className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all backdrop-blur-sm" title="Settings">
            <Settings className="w-5 h-5 text-white" />
          </button>
          <button className="p-3 bg-white/20 hover:bg-white/30 rounded-xl transition-all backdrop-blur-sm" title="Minimize">
            <Minimize2 className="w-5 h-5 text-white" />
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
