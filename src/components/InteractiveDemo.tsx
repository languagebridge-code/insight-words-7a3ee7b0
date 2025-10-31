import { useState, useRef, useEffect } from "react";
import { Volume2, BookOpen, MessageSquare, Flag, Minus, Play, Pause, Mic, Square } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const InteractiveDemo = () => {
  const [toolbarExpanded, setToolbarExpanded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [statusMessage, setStatusMessage] = useState('Active');
  const [selectedText, setSelectedText] = useState('');
  const [translationTooltip, setTranslationTooltip] = useState<{ text: string; visible: boolean } | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const { toast } = useToast();

  const demoContent = `Dennis and Mack sat in the car and looked at the deserted parking lot. "Dennis!" Mack shouted from the passenger seat. Dennis! Mack looked crazy. Dennis ran from the parking lot toward the gas pump. "I'm coming, Mack!" he yelled to his friend and went into the store. Mack was behind the counter. When Dennis came in, Mack pointed to the back of the store.`;

  const dariTranslation = `دنیس و مک در ماشین نشستند و به پارکینگ خالی نگاه کردند. «دنیس!» مک از صندلی مسافر فریاد زد. دنیس! مک دیوانه به نظر می رسید. دنیس از پارکینگ به سمت پمپ بنزین دوید. «من می آیم، مک!» او به دوستش فریاد زد و وارد مغازه شد. مک پشت پیشخوان بود. وقتی دنیس وارد شد، مک به پشت فروشگاه اشاره کرد.`;

  const handleMouseUp = () => {
    const selection = window.getSelection();
    const text = selection?.toString().trim();
    
    if (text && contentRef.current?.contains(selection?.anchorNode || null)) {
      setSelectedText(text);
      setToolbarExpanded(true);
      setStatusMessage('Text selected - Click ▶ for audio or 📖 to read');
      setShowTranslation(false);
      setTranslationTooltip(null);
      setIsPlaying(false);
      setIsPaused(false);
    }
  };

  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.altKey && e.shiftKey && e.key === 'L') {
        e.preventDefault();
        setToolbarExpanded(!toolbarExpanded);
      }
    };
    window.addEventListener('keydown', handleKeyboard);
    return () => window.removeEventListener('keydown', handleKeyboard);
  }, [toolbarExpanded]);

  const handlePlayPause = () => {
    if (!selectedText) {
      setStatusMessage('Please select some text first');
      setTimeout(() => setStatusMessage('Active'), 2000);
      return;
    }

    if (isPlaying) {
      setIsPlaying(false);
      setIsPaused(true);
      setStatusMessage('Paused - Click play to resume');
    } else if (isPaused) {
      setIsPlaying(true);
      setIsPaused(false);
      setStatusMessage('Resuming...');
      
      setTimeout(() => {
        setIsPlaying(false);
        setStatusMessage('Completed');
      }, 3000);
    } else {
      setIsPlaying(true);
      setStatusMessage('Playing audio translation...');
      
      setTranslationTooltip({
        text: dariTranslation.substring(0, 200) + '...',
        visible: true
      });

      setTimeout(() => {
        setIsPlaying(false);
        setStatusMessage('Completed');
      }, 5000);
    }
  };

  const handleShowTranslation = () => {
    if (!selectedText) {
      setStatusMessage('Please select some text first');
      setTimeout(() => setStatusMessage('Active'), 2000);
      return;
    }

    setShowTranslation(true);
    setTranslationTooltip({
      text: dariTranslation,
      visible: true
    });
    setStatusMessage('Translation shown');
  };

  const handleCollapse = () => {
    setToolbarExpanded(false);
    if (isPlaying) {
      setIsPlaying(false);
      setIsPaused(true);
    }
  };

  const handleTalkWithTeacher = async () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      setStatusMessage('Processing...');
      
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
    } else {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm' });
        
        audioChunksRef.current = [];
        
        mediaRecorder.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };
        
        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
          
          // Convert to base64
          const reader = new FileReader();
          reader.onloadend = async () => {
            const base64Audio = (reader.result as string).split(',')[1];
            
            try {
              setIsTalking(true);
              const { data, error } = await supabase.functions.invoke('azure-voice-translate', {
                body: { audio: base64Audio, targetLanguage: 'fa' }
              });

              if (error) throw error;

              // Display transcript and translation
              setTranslationTooltip({
                text: `English: ${data.transcript}\n\nدری: ${data.translation}`,
                visible: true
              });

              // Play the audio response
              const audio = new Audio(`data:audio/mp3;base64,${data.audioContent}`);
              audio.onended = () => {
                setIsTalking(false);
                setStatusMessage('Active');
              };
              audio.play();
              
              setStatusMessage('Teacher responding...');
              
              toast({
                title: "Translation complete",
                description: "Teacher's response is playing",
              });
            } catch (err) {
              console.error('Error:', err);
              setIsTalking(false);
              setStatusMessage('Error - Please try again');
              toast({
                title: "Error",
                description: "Failed to process audio. Please try again.",
                variant: "destructive",
              });
            }
          };
          reader.readAsDataURL(audioBlob);
          
          // Stop all tracks
          stream.getTracks().forEach(track => track.stop());
        };
        
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
        setIsRecording(true);
        setStatusMessage('Recording... Click again to stop');
        
        toast({
          title: "Recording started",
          description: "Speak your question in English",
        });
      } catch (err) {
        console.error('Error accessing microphone:', err);
        toast({
          title: "Microphone access denied",
          description: "Please allow microphone access to use this feature.",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <section id="demo" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            See It <span className="gradient-text">In Action</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Try our interactive demo - Select any text to see instant translation
          </p>
        </div>

        <div className="max-w-5xl mx-auto fade-in-up delay-100">
          {/* Browser Window */}
          <div className="bg-muted/50 rounded-t-2xl border border-border shadow-2xl">
            {/* Browser Chrome */}
            <div className="flex items-center gap-2 px-4 py-3 bg-muted rounded-t-2xl border-b border-border">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-destructive" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 mx-4 bg-background rounded px-4 py-1.5 text-sm text-muted-foreground">
                classroom.google.com/c/assignment-123
              </div>
            </div>

            {/* Page Content */}
            <div className="bg-card min-h-[500px] p-8 relative rounded-b-2xl">
              {/* Google Classroom Header */}
              <div className="mb-6 pb-4 border-b border-border">
                <h3 className="text-2xl font-bold mb-2">English Literature</h3>
                <p className="text-sm text-muted-foreground">Mrs. Johnson • Period 3</p>
              </div>

              {/* Assignment Content */}
              <div 
                ref={contentRef}
                onMouseUp={handleMouseUp}
                className="prose prose-lg max-w-none select-text"
              >
                <h4 className="text-xl font-semibold mb-4">Assignment: Read Chapter 1 - The Survivors</h4>
                <div className="bg-primary/10 border-l-4 border-primary p-4 mb-4 rounded">
                  <p className="text-sm">
                    💡 <strong>Tip:</strong> Try selecting any text below, then use the LanguageBridge toolbar to translate!
                  </p>
                </div>
                <p className="leading-relaxed whitespace-pre-wrap">
                  {demoContent}
                </p>
              </div>

              {/* Translation Tooltip */}
              {translationTooltip?.visible && (
                <div className="absolute top-40 left-1/2 transform -translate-x-1/2 bg-card rounded-lg shadow-elegant border-2 border-primary p-6 max-w-md z-50 animate-fade-in">
                  <div className="flex items-center justify-between mb-3 pb-2 border-b border-border">
                    <span className="text-sm font-semibold text-primary">دری Dari</span>
                    <button 
                      onClick={() => setTranslationTooltip(null)}
                      className="text-muted-foreground hover:text-foreground text-xl leading-none"
                    >
                      ×
                    </button>
                  </div>
                  <div className="text-right leading-relaxed" dir="rtl">
                    {translationTooltip.text}
                  </div>
                </div>
              )}

              {/* LanguageBridge Toolbar */}
              <div 
                className={`fixed bottom-0 left-0 right-0 bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-elegant transition-all duration-300 ease-in-out z-40 ${
                  toolbarExpanded ? 'h-16' : 'h-10'
                }`}
              >
                {/* Collapsed View */}
                {!toolbarExpanded && (
                  <div 
                    className="flex items-center h-10 px-4 cursor-pointer hover:bg-primary/90 transition-colors"
                    onClick={() => setToolbarExpanded(true)}
                  >
                    <Volume2 className="w-5 h-5 mr-2" />
                    <span className="font-semibold">LanguageBridge</span>
                    <span className="ml-2 w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  </div>
                )}

                {/* Expanded View */}
                {toolbarExpanded && (
                  <div className="flex items-center justify-between h-16 px-6">
                    <div className="flex items-center gap-3">
                      <Volume2 className="w-6 h-6" />
                      <span className="font-bold text-lg">LanguageBridge</span>
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={handlePlayPause}
                        className="bg-primary-foreground/20 hover:bg-primary-foreground/30 p-2 rounded-lg transition-all"
                        title="Play audio translation"
                      >
                        {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                      </button>

                      <button
                        onClick={handleShowTranslation}
                        className="bg-primary-foreground/20 hover:bg-primary-foreground/30 p-2 rounded-lg transition-all"
                        title="Show written translation"
                      >
                        <BookOpen className="w-5 h-5" />
                      </button>

                      <button
                        onClick={handleTalkWithTeacher}
                        className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                          isRecording 
                            ? 'bg-red-500/80 hover:bg-red-500 animate-pulse' 
                            : isTalking
                            ? 'bg-green-500/80 cursor-wait'
                            : 'bg-primary-foreground/20 hover:bg-primary-foreground/30'
                        }`}
                        title={isRecording ? "Stop recording" : "Talk with Teacher"}
                        disabled={isTalking}
                      >
                        {isRecording ? (
                          <>
                            <Square className="w-5 h-5" />
                            <span className="text-sm font-medium">Stop Recording</span>
                          </>
                        ) : isTalking ? (
                          <>
                            <Volume2 className="w-5 h-5 animate-pulse" />
                            <span className="text-sm font-medium">Teacher Speaking...</span>
                          </>
                        ) : (
                          <>
                            <Mic className="w-5 h-5" />
                            <span className="text-sm font-medium">Talk with Teacher</span>
                          </>
                        )}
                      </button>

                      <div className="text-sm font-medium px-3 py-1.5 bg-primary-foreground/10 rounded">
                        دری Dari
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-400 animate-pulse' : isPaused ? 'bg-yellow-400' : 'bg-green-400'}`}></span>
                        <span className="text-sm">{statusMessage}</span>
                      </div>

                      <button
                        className="bg-primary-foreground/20 hover:bg-primary-foreground/30 p-2 rounded-lg transition-all text-red-300"
                        title="Report a problem"
                      >
                        <Flag className="w-5 h-5" />
                      </button>

                      <button
                        onClick={handleCollapse}
                        className="bg-primary-foreground/20 hover:bg-primary-foreground/30 p-2 rounded-lg transition-all"
                        title="Collapse toolbar"
                      >
                        <Minus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 p-6 bg-primary/10 rounded-lg border border-primary/20">
            <h4 className="font-semibold mb-3">Try the Demo:</h4>
            <ul className="text-sm space-y-2">
              <li>1. <strong>Select any text</strong> in the assignment above</li>
              <li>2. <strong>Click the Play button (▶)</strong> to hear the Dari translation</li>
              <li>3. <strong>Click the Book icon (📖)</strong> to see written translation</li>
              <li>4. <strong>Press Alt+Shift+L</strong> to toggle the toolbar</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
