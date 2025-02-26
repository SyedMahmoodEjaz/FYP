
import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, Pause, Play } from 'lucide-react';
import Groq from 'groq-sdk';
import './ChatInterface.css'; // Import the CSS file for animations

interface Message {
  role: 'user' | 'assistant';
  content: string;
  id: string;
}

interface ChatInterfaceProps {
  mode: 'text' | 'voice';
}

const groq = new Groq({
  apiKey: import.meta.env.VITE_GROQ_API_KEY,
  dangerouslyAllowBrowser: true
});

function ChatInterface({ mode }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechRate, setSpeechRate] = useState(1); // Default: 1.0x
  const [pausedText, setPausedText] = useState('');
  const [pausedPosition, setPausedPosition] = useState(0);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognition = useRef<SpeechRecognition | null>(null);
  const synthesis = window.speechSynthesis;
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const voicesRef = useRef<SpeechSynthesisVoice[]>([]);
  const [voicesLoaded, setVoicesLoaded] = useState(false);

  // Load available voices properly
  useEffect(() => {
    const loadVoices = () => {
      voicesRef.current = synthesis.getVoices();
      console.log('Voices loaded:', voicesRef.current); // Debug: Log available voices
      setVoicesLoaded(true);
    };

    if (synthesis.onvoiceschanged !== null) {
      synthesis.onvoiceschanged = loadVoices;
    }
    loadVoices(); // Initial load
  }, []);

  // Initialize speech recognition
  useEffect(() => {
    if (mode === 'voice' && ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)) {
      recognition.current = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.current.continuous = true;
      recognition.current.interimResults = true;

      recognition.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        setInput(transcript);
      };

      recognition.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    } else {
      console.error('SpeechRecognition API not supported in this browser.');
    }
  }, [mode]);

  // Scroll to the bottom of the messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Toggle listening state
  const toggleListening = () => {
    if (!recognition.current) return;

    if (isListening) {
      recognition.current.stop();
    } else {
      recognition.current.start();
      setInput('');
    }
    setIsListening(!isListening);
  };

  // Speak function with dynamic speed
  const speakResponse = (text: string, startPosition = 0) => {
    if (mode === 'voice' && synthesis) {
      if (!voicesLoaded || voicesRef.current.length === 0) {
        console.error('No voices available for speech synthesis.');
        return;
      }

      synthesis.cancel(); // Stop any ongoing speech
      const utterance = new SpeechSynthesisUtterance(text.slice(startPosition));
      utterance.rate = speechRate;
      utterance.pitch = 1;

      // Select the first available female voice, fallback to default
      utterance.voice =
        voicesRef.current.find(voice => voice.name.includes('Female') || voice.name.includes('Google UK English Female')) ||
        voicesRef.current[0];

      utteranceRef.current = utterance;

      // Add error handling for speech synthesis
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event.error);
      };

      synthesis.speak(utterance);
      setIsPaused(false);
      setIsSpeaking(true);
    } else {
      console.error('SpeechSynthesis API not supported in this browser.');
    }
  };

  // Toggle speech state (pause/resume)
  const toggleSpeech = () => {
    if (synthesis.speaking && !synthesis.paused) {
      synthesis.pause();
      setPausedText(utteranceRef.current?.text || '');
      setPausedPosition(synthesis.speaking ? synthesis.speaking.length : 0);
      setIsPaused(true);
      setIsSpeaking(false);
    } else if (synthesis.paused) {
      synthesis.resume();
      setIsPaused(false);
      setIsSpeaking(true);
    } else if (!synthesis.speaking && pausedText) {
      speakResponse(pausedText, pausedPosition);
    }
  };

  // Adjust speech speed dynamically
  const adjustSpeed = (rate: number) => {
    setSpeechRate(rate);
    if (utteranceRef.current && synthesis.speaking) {
      const text = utteranceRef.current.text;
      synthesis.cancel(); // Stop current speech
      speakResponse(text); // Restart with new speed
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage, id: Date.now().toString() }]);

    setIsLoading(true);

    const promptTemplate = `
      You are an AI specialist and must only answer questions directly related to artificial intelligence, including topics like machine learning, deep learning, natural language processing, algorithms, neural networks, AI ethics, and AI applications.

      If the user's question is NOT about AI, respond strictly with:
      "I'm here to answer questions related to AI. Please ask something about artificial intelligence."

      Format your responses in a clean and structured way:
      - Use **bold** for key terms.
      - Use bullet points for lists.
      - Use \`code blocks\` for technical terms or code snippets.
      - Use line breaks (\n) to separate paragraphs.
    `;

    try {
      const completion = await groq.chat.completions.create({
        messages: [
          { role: 'system', content: promptTemplate },
          { role: 'user', content: userMessage }
        ],
        model: 'deepseek-r1-distill-llama-70b',
      });

      const response = completion.choices[0]?.message?.content || "I'm here to answer questions related to AI. Please ask something about artificial intelligence.";
      setMessages(prev => [...prev, { role: 'assistant', content: response, id: Date.now().toString() }]);
      speakResponse(response); // Speak the response in voice mode
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, there was an error processing your request.',
        id: Date.now().toString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Chat Area (Scrollable) */}
      <div className="flex-1 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-6 overflow-y-auto">
        <div className="space-y-6">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl p-4 ${message.role === 'user' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
                {message.role === 'assistant' ? (
                  <div className="whitespace-pre-wrap">
                    {message.content.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                ) : (
                  message.content
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-gray-100 rounded-2xl p-4 w-full">
                {/* Running Character Animation */}
                <div className="running-character">
                  <div className="character"></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Query Box and Controls (Fixed at Bottom) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white p-4 shadow-lg">
        <form onSubmit={handleSubmit} className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 rounded-xl border border-gray-200 p-4"
            placeholder="Ask me anything about AI..."
          />

          {mode === 'voice' && (
            <>
              <button
                type="button"
                onClick={toggleListening}
                className={`p-4 rounded-xl ${isListening ? 'bg-red-500' : 'bg-indigo-600'} text-white`}
              >
                {isListening ? <MicOff className="w-6 h-6 animate-pulse" /> : <Mic className="w-6 h-6" />}
              </button>
              <button
                type="button"
                onClick={toggleSpeech}
                disabled={!synthesis.speaking && !synthesis.paused && !pausedText}
                className={`p-4 rounded-xl ${isPaused ? 'bg-green-500' : 'bg-yellow-500'} text-white`}
              >
                {isPaused ? <Play /> : <Pause />}
              </button>

              {/* Speech Speed Dropdown */}
              <select
                value={speechRate}
                onChange={(e) => adjustSpeed(parseFloat(e.target.value))}
                className="bg-gray-500 text-white p-2 rounded-xl"
              >
                <option value="0.5">0.5x</option>
                <option value="1">1.0x</option>
                <option value="1.5">1.5x</option>
                <option value="2">2.0x</option>
              </select>
            </>
          )}
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="bg-indigo-600 text-white p-4 rounded-xl"
          >
            <Send />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatInterface;
