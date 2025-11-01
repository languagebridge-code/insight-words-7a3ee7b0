import React, { useState } from 'react';
import { Play, Pause, Square, Languages, Volume2, Settings, HelpCircle, X } from 'lucide-react';

export const InteractiveDemo = () => {
  const [selectedText, setSelectedText] = useState('');
  const [showToolbar, setShowToolbar] = useState(true);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const [activeWorkflow, setActiveWorkflow] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);

  const storyText = `Dennis and Mack sat in the car and looked at the deserted parking lot. "Dennis!" Mack shouted from the passenger seat. Dennis! Mack looked crazy. Dennis ran from the parking lot toward the gas pump. "I'm coming, Mack!" he yelled to his friend and went into the store. Mack was behind the counter. When Dennis came in, Mack pointed to the back of the store.`;

  const handleTextSelect = () => {
    const selection = window.getSelection()?.toString();
    if (selection && selection.length > 0) {
      setSelectedText(selection);
      setShowToolbar(true);
    }
  };

  const handlePlayClick = () => {
    setActiveWorkflow('play');
    setIsPlaying(true);
    setShowTranslation(true);
    // Simulate translation appearing
    setTimeout(() => {
      setIsPlaying(false);
    }, 3000);
  };

  const buttonTooltips = {
    play: {
      title: "Play Translation",
      description: "Translates selected text to Dari and reads it aloud with natural voice",
      nextStep: "Click to see translation popup appear"
    },
    pause: {
      title: "Pause Reading",
      description: "Pauses audio playback mid-sentence, can resume from same spot",
      nextStep: "Click to pause the current reading"
    },
    stop: {
      title: "Stop & Clear",
      description: "Stops playback and clears the current translation",
      nextStep: "Click to stop and reset"
    },
    language: {
      title: "Language Selector",
      description: "Choose from 8 languages: Dari, Pashto, Arabic, Urdu, Uzbek, Ukrainian, Spanish, English",
      nextStep: "Click to see language menu"
    },
    speed: {
      title: "Reading Speed",
      description: "Adjust playback speed from 0.5x to 2.0x",
      nextStep: "Click to adjust speed slider"
    },
    settings: {
      title: "Settings",
      description: "Configure verbosity levels, keyboard shortcuts, and features",
      nextStep: "Click to open settings panel"
    },
    help: {
      title: "Tutorial",
      description: "6-step interactive guide showing all features",
      nextStep: "Click to restart tutorial"
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

        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-2xl overflow-hidden fade-in-up delay-100">
          {/* Google Classroom Header Mock */}
          <div className="bg-blue-600 text-white p-4">
            <div className="text-sm opacity-90">classroom.google.com/c/assignment-123</div>
            <h2 className="text-2xl font-bold mt-2">English Literature</h2>
            <div className="text-sm opacity-90">Mrs. Johnson • Period 3</div>
          </div>

          {/* Assignment Content */}
          <div className="p-8 bg-gray-50">
            <div className="bg-white rounded-lg p-6 shadow">
              <h3 className="text-xl font-bold mb-4">Assignment: Read Chapter 1 - The Survivors</h3>
              
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6">
                <div className="flex items-start">
                  <span className="text-2xl mr-3">💡</span>
                  <p className="text-sm text-blue-900">
                    <strong>Tip:</strong> Try selecting any text below, then use the LanguageBridge toolbar to translate!
                  </p>
                </div>
              </div>

              <div 
                className="text-lg leading-relaxed select-text cursor-text"
                onMouseUp={handleTextSelect}
              >
                {storyText}
              </div>
            </div>
          </div>

          {/* LanguageBridge Toolbar */}
          {showToolbar && (
            <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-r from-purple-600 via-purple-500 to-orange-500 text-white shadow-2xl z-50">
              <div className="max-w-6xl mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                  {/* Logo */}
                  <div className="flex items-center space-x-3">
                    <div className="text-2xl">🌉</div>
                    <span className="font-bold text-lg">LanguageBridge</span>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center space-x-2">
                    {/* Play Button */}
                    <div className="relative">
                      <button
                        onMouseEnter={() => setHoveredButton('play')}
                        onMouseLeave={() => setHoveredButton(null)}
                        onClick={handlePlayClick}
                        className="p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all transform hover:scale-105"
                      >
                        <Play className="w-6 h-6" />
                      </button>
                      {hoveredButton === 'play' && (
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-64 bg-gray-900 text-white p-4 rounded-lg shadow-xl z-50">
                          <div className="font-bold text-sm mb-1">{buttonTooltips.play.title}</div>
                          <div className="text-xs opacity-90 mb-2">{buttonTooltips.play.description}</div>
                          <div className="text-xs text-purple-300 italic">{buttonTooltips.play.nextStep}</div>
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-gray-900"></div>
                        </div>
                      )}
                    </div>

                    {/* Pause Button */}
                    <div className="relative">
                      <button
                        onMouseEnter={() => setHoveredButton('pause')}
                        onMouseLeave={() => setHoveredButton(null)}
                        onClick={() => setIsPlaying(false)}
                        className="p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all transform hover:scale-105"
                      >
                        <Pause className="w-6 h-6" />
                      </button>
                      {hoveredButton === 'pause' && (
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-64 bg-gray-900 text-white p-4 rounded-lg shadow-xl z-50">
                          <div className="font-bold text-sm mb-1">{buttonTooltips.pause.title}</div>
                          <div className="text-xs opacity-90 mb-2">{buttonTooltips.pause.description}</div>
                          <div className="text-xs text-purple-300 italic">{buttonTooltips.pause.nextStep}</div>
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-gray-900"></div>
                        </div>
                      )}
                    </div>

                    {/* Stop Button */}
                    <div className="relative">
                      <button
                        onMouseEnter={() => setHoveredButton('stop')}
                        onMouseLeave={() => setHoveredButton(null)}
                        onClick={() => {
                          setShowTranslation(false);
                          setIsPlaying(false);
                        }}
                        className="p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all transform hover:scale-105"
                      >
                        <Square className="w-6 h-6" />
                      </button>
                      {hoveredButton === 'stop' && (
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-64 bg-gray-900 text-white p-4 rounded-lg shadow-xl z-50">
                          <div className="font-bold text-sm mb-1">{buttonTooltips.stop.title}</div>
                          <div className="text-xs opacity-90 mb-2">{buttonTooltips.stop.description}</div>
                          <div className="text-xs text-purple-300 italic">{buttonTooltips.stop.nextStep}</div>
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-gray-900"></div>
                        </div>
                      )}
                    </div>

                    <div className="w-px h-8 bg-white bg-opacity-30 mx-2"></div>

                    {/* Language Selector */}
                    <div className="relative">
                      <button
                        onMouseEnter={() => setHoveredButton('language')}
                        onMouseLeave={() => setHoveredButton(null)}
                        className="p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all transform hover:scale-105 flex items-center space-x-2"
                      >
                        <Languages className="w-5 h-5" />
                        <span className="text-sm font-medium">Dari</span>
                      </button>
                      {hoveredButton === 'language' && (
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-64 bg-gray-900 text-white p-4 rounded-lg shadow-xl z-50">
                          <div className="font-bold text-sm mb-1">{buttonTooltips.language.title}</div>
                          <div className="text-xs opacity-90 mb-2">{buttonTooltips.language.description}</div>
                          <div className="text-xs text-purple-300 italic">{buttonTooltips.language.nextStep}</div>
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-gray-900"></div>
                        </div>
                      )}
                    </div>

                    {/* Speed Control */}
                    <div className="relative">
                      <button
                        onMouseEnter={() => setHoveredButton('speed')}
                        onMouseLeave={() => setHoveredButton(null)}
                        className="p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all transform hover:scale-105 flex items-center space-x-2"
                      >
                        <Volume2 className="w-5 h-5" />
                        <span className="text-sm font-medium">1.0x</span>
                      </button>
                      {hoveredButton === 'speed' && (
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-64 bg-gray-900 text-white p-4 rounded-lg shadow-xl z-50">
                          <div className="font-bold text-sm mb-1">{buttonTooltips.speed.title}</div>
                          <div className="text-xs opacity-90 mb-2">{buttonTooltips.speed.description}</div>
                          <div className="text-xs text-purple-300 italic">{buttonTooltips.speed.nextStep}</div>
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-gray-900"></div>
                        </div>
                      )}
                    </div>

                    <div className="w-px h-8 bg-white bg-opacity-30 mx-2"></div>

                    {/* Settings */}
                    <div className="relative">
                      <button
                        onMouseEnter={() => setHoveredButton('settings')}
                        onMouseLeave={() => setHoveredButton(null)}
                        className="p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all transform hover:scale-105"
                      >
                        <Settings className="w-5 h-5" />
                      </button>
                      {hoveredButton === 'settings' && (
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-64 bg-gray-900 text-white p-4 rounded-lg shadow-xl z-50">
                          <div className="font-bold text-sm mb-1">{buttonTooltips.settings.title}</div>
                          <div className="text-xs opacity-90 mb-2">{buttonTooltips.settings.description}</div>
                          <div className="text-xs text-purple-300 italic">{buttonTooltips.settings.nextStep}</div>
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-gray-900"></div>
                        </div>
                      )}
                    </div>

                    {/* Help */}
                    <div className="relative">
                      <button
                        onMouseEnter={() => setHoveredButton('help')}
                        onMouseLeave={() => setHoveredButton(null)}
                        className="p-3 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-all transform hover:scale-105"
                      >
                        <HelpCircle className="w-5 h-5" />
                      </button>
                      {hoveredButton === 'help' && (
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 w-64 bg-gray-900 text-white p-4 rounded-lg shadow-xl z-50">
                          <div className="font-bold text-sm mb-1">{buttonTooltips.help.title}</div>
                          <div className="text-xs opacity-90 mb-2">{buttonTooltips.help.description}</div>
                          <div className="text-xs text-purple-300 italic">{buttonTooltips.help.nextStep}</div>
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-gray-900"></div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Progress Bar (when playing) */}
                {isPlaying && (
                  <div className="mt-3">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span>Playing sentence 1 of 2</span>
                      <span>0:03 remaining</span>
                    </div>
                    <div className="h-1 bg-white bg-opacity-30 rounded-full overflow-hidden">
                      <div className="h-full bg-white rounded-full animate-pulse" style={{width: '45%'}}></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Translation Popup */}
          {showTranslation && (
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-2xl p-6 max-w-md w-full z-40 border-4 border-purple-500">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <Languages className="w-5 h-5 text-purple-600" />
                  <span className="font-bold text-gray-800">Translation (Dari)</span>
                </div>
                <button 
                  onClick={() => setShowTranslation(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Original (English)</div>
                  <div className="text-sm text-gray-700">
                    Dennis and Mack sat in the car and looked at the deserted parking lot.
                  </div>
                </div>

                <div className="h-px bg-gray-200"></div>

                <div>
                  <div className="text-xs text-gray-500 mb-1">Translation (دری)</div>
                  <div className="text-base text-gray-900 font-medium" dir="rtl">
                    دنیس و مک در ماشین نشستند و به پارکینگ متروکه نگاه کردند.
                  </div>
                </div>

                <div className="bg-purple-50 border-l-4 border-purple-500 p-3 text-xs">
                  <div className="flex items-center space-x-2">
                    <Volume2 className="w-4 h-4 text-purple-600" />
                    <span className="text-purple-900">
                      🎤 Now playing with Azure Neural Voice: <strong>fa-IR-DilaraNeural</strong>
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-xs text-gray-500 text-center">
                This popup is draggable • Click anywhere to move it
              </div>
            </div>
          )}

          {/* Instruction Banner */}
          <div className="bg-gradient-to-r from-purple-100 to-orange-100 p-4 text-center">
            <p className="text-sm text-gray-700">
              <strong>Interactive Demo:</strong> Hover over toolbar buttons to learn what they do • Click Play to see translation in action
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
