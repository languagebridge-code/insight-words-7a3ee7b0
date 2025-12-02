import React, { useState } from 'react';
import { Play, Mic, MessageSquare, Settings, Minimize2, HelpCircle, Volume2 } from 'lucide-react';
import languageBridgeIcon from '@/assets/languagebridge-icon.png';
import { TalkToTeacherPanel } from './TalkToTeacherModal';

export const InteractiveDemo = () => {
  const [showTalkToTeacher, setShowTalkToTeacher] = useState(false);
  
  const storyText = `Dennis and Mack sat in the car and looked at the deserted parking lot. "Dennis!" Mack shouted from the passenger seat. Dennis! Mack looked crazy. Dennis ran from the parking lot toward the gas pump. "I'm coming, Mack!" he yelled to his friend and went into the store. Mack was behind the counter. When Dennis came in, Mack pointed to the back of the store.`;

  return (
    <section id="demo" className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            See It <span className="gradient-text">In Action</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Simple, instant translation that works everywhere students learn
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden fade-in-up delay-100 relative">
          {/* Talk to Teacher Panel */}
          {showTalkToTeacher && (
            <TalkToTeacherPanel onClose={() => setShowTalkToTeacher(false)} />
          )}
          
          {/* Google Classroom Header Mock */}
          <div className="bg-blue-600 text-white p-4">
            <div className="text-sm opacity-90">classroom.google.com/c/assignment-123</div>
            <h2 className="text-xl font-bold mt-2">English Literature</h2>
            <div className="text-sm opacity-90">Mrs. Johnson • Period 3</div>
          </div>

          {/* Assignment Content */}
          <div className="p-6 bg-gray-50">
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="text-lg font-bold mb-4">Assignment: Read Chapter 1</h3>
              
              <div className="text-base leading-relaxed mb-4 text-gray-700">
                <span className="bg-yellow-200">{storyText}</span>
              </div>

              {/* Translation Popup */}
              <div className="bg-gradient-to-r from-purple-50 to-orange-50 border-2 border-purple-300 rounded-lg p-4 shadow-lg">
                <div className="flex items-start gap-3">
                  <Volume2 className="w-5 h-5 text-purple-600 mt-1" />
                  <div>
                    <div className="font-semibold text-purple-900 mb-2">Translation (Dari):</div>
                    <div className="text-gray-800 text-sm leading-relaxed">
                      دنیس و مک در ماشین نشسته بودند و به پارکینگ خالی نگاه می‌کردند. مک از صندلی مسافر فریاد زد: "دنیس!" دنیس! مک دیوانه به نظر می‌رسید...
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* LanguageBridge Toolbar - Matches Real Product */}
          <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white px-4 py-3">
            <div className="flex items-center gap-3">
              {/* Logo */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <img src={languageBridgeIcon} alt="LanguageBridge" className="w-8 h-8" />
                <span className="font-semibold text-sm hidden sm:inline">LanguageBridge</span>
              </div>

              {/* Text Input */}
              <div className="flex-1 bg-white/10 rounded-lg px-4 py-2 text-sm text-white/90 backdrop-blur-sm border border-white/20 min-w-0">
                Tap to speak text to translate
              </div>

              {/* Control Buttons */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button 
                  className="p-2 hover:bg-white/20 rounded-lg transition-all"
                  title="Play audio"
                >
                  <Play className="w-5 h-5 fill-white" />
                </button>
                <button 
                  className="p-2 hover:bg-white/20 rounded-lg transition-all"
                  title="Voice input"
                >
                  <Mic className="w-5 h-5" />
                </button>
              </div>

              {/* Talk with Teacher Button */}
              <button 
                onClick={() => setShowTalkToTeacher(true)}
                className="bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 flex-shrink-0"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Talk with Teacher</span>
              </button>

              {/* Language Selector */}
              <div className="bg-white/20 px-3 py-2 rounded-lg text-sm font-medium backdrop-blur-sm border border-white/30 flex-shrink-0">
                <span className="hidden sm:inline">دری </span>Dari
              </div>

              {/* Status */}
              <div className="text-xs text-white/90 flex items-center gap-2 flex-shrink-0 hidden lg:flex">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                <span>Active</span>
              </div>

              {/* Utility Buttons */}
              <div className="flex items-center gap-1 flex-shrink-0 hidden md:flex">
                <button className="p-2 hover:bg-white/20 rounded-lg transition-all" title="Settings">
                  <Settings className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-white/20 rounded-lg transition-all" title="Help">
                  <HelpCircle className="w-4 h-4" />
                </button>
                <button className="p-2 hover:bg-white/20 rounded-lg transition-all" title="Minimize">
                  <Minimize2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-muted-foreground text-base">
            Works with Google Classroom, Canvas, and any website
          </p>
        </div>
      </div>
    </section>
  );
};