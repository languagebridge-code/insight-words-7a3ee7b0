import React from 'react';
import { Play, Languages, Volume2 } from 'lucide-react';
import languageBridgeIcon from '@/assets/languagebridge-icon.png';

export const InteractiveDemo = () => {
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

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden fade-in-up delay-100">
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

          {/* LanguageBridge Toolbar */}
          <div className="bg-gradient-to-r from-purple-600 to-orange-500 text-white p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <img src={languageBridgeIcon} alt="LanguageBridge" className="w-6 h-6" />
                <span className="font-bold">LanguageBridge</span>
              </div>

              <div className="flex items-center space-x-2">
                <button className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded transition-all">
                  <Play className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded transition-all">
                  <Languages className="w-4 h-4" />
                </button>
                <button className="p-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded transition-all">
                  <Volume2 className="w-4 h-4" />
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