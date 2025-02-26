// import React, { useState } from 'react';
// import { GraduationCap, MessageSquare, Mic2 } from 'lucide-react';
// import ChatInterface from './components/ChatInterface.tsx';

// type Mode = 'text' | 'voice';

// function App() {
//   const [mode, setMode] = useState<Mode>('text');

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex">
//       {/* Sidebar */}
//       <div className="w-64 bg-white/90 backdrop-blur-sm shadow-lg p-6 flex flex-col gap-4">
//         <div className="flex items-center gap-3 mb-8">
//           <GraduationCap className="w-8 h-8 text-indigo-600" />
//           <h1 className="text-2xl font-bold text-indigo-600">AI Coach</h1>
//         </div>
        
//         <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Mode</h2>
//         <button
//           onClick={() => setMode('text')}
//           className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
//             mode === 'text'
//               ? 'bg-indigo-100 text-indigo-700'
//               : 'hover:bg-gray-100 text-gray-600'
//           }`}
//         >
//           <MessageSquare className="w-5 h-5" />
//           <span className="font-medium">Text Only</span>
//         </button>
//         <button
//           onClick={() => setMode('voice')}
//           className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
//             mode === 'voice'
//               ? 'bg-indigo-100 text-indigo-700'
//               : 'hover:bg-gray-100 text-gray-600'
//           }`}
//         >
//           <Mic2 className="w-5 h-5" />
//           <span className="font-medium">Voice Enabled</span>
//         </button>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-6">
//         <ChatInterface mode={mode} />
//       </div>
//     </div>
//   );
// }

// export default App;



// import React, { useState } from 'react';
// import { GraduationCap, MessageSquare, Mic2 } from 'lucide-react';
// import ChatInterface from './components/ChatInterface.tsx';

// type Mode = 'text' | 'voice';

// function App() {
//   const [mode, setMode] = useState<Mode>('text');

//   return (
//     <div className="min-h-screen flex bg-gradient-to-br from-purple-50 to-pink-100">
//       {/* Sidebar */}
//       <div className="w-80 bg-gradient-to-br from-purple-600 to-indigo-700 backdrop-blur-md shadow-2xl p-8 flex flex-col rounded-r-3xl">
//         {/* Logo Section */}
//         <div className="flex items-center gap-4 mb-12">
//           <GraduationCap className="w-12 h-12 text-white animate-bounce" />
//           <h1 className="text-4xl font-extrabold text-white tracking-wide">
//             AI Coach
//           </h1>
//         </div>

//         {/* Mode Selector */}
//         <div className="mb-8">
//           <h2 className="text-xs font-semibold text-white/80 uppercase tracking-widest mb-4">
//             Select Mode
//           </h2>
//           <div className="flex gap-3 bg-white/20 p-2 rounded-full">
//             <button
//               onClick={() => setMode('text')}
//               className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-full transition-all duration-300 ${
//                 mode === 'text'
//                   ? 'bg-white text-purple-700 shadow-lg scale-105'
//                   : 'text-white hover:bg-white/20'
//               }`}
//             >
//               <MessageSquare className="w-6 h-6" />
//               <span className="font-medium">Text</span>
//             </button>
//             <button
//               onClick={() => setMode('voice')}
//               className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-full transition-all duration-300 ${
//                 mode === 'voice'
//                   ? 'bg-white text-purple-700 shadow-lg scale-105'
//                   : 'text-white hover:bg-white/20'
//               }`}
//             >
//               <Mic2 className="w-6 h-6" />
//               <span className="font-medium">Voice</span>
//             </button>
//           </div>
//         </div>

//         {/* Sidebar Footer */}
//         <div className="mt-auto text-center text-sm text-white/80">
//           <p>
//             Powered by{' '}
//             <span className="text-white font-semibold">AI Technology</span>
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-10 bg-white shadow-2xl rounded-l-3xl">
//         <ChatInterface mode={mode} />
//       </div>
//     </div>
//   );
// }

// export default App;



// import React, { useState } from 'react';
// import { GraduationCap, MessageSquare, Mic2, Loader2, Sparkles } from 'lucide-react';
// import ChatInterface from './components/ChatInterface.tsx';

// type Mode = 'text' | 'voice';

// function App() {
//   const [mode, setMode] = useState<Mode>('text');
//   const [isGenerating, setIsGenerating] = useState(false); // Simulate loading state

//   // Simulate AI output generation
//   const simulateGeneration = () => {
//     setIsGenerating(true);
//     setTimeout(() => {
//       setIsGenerating(false);
//     }, 3000); // Simulate a 3-second delay
//   };

//   return (
//     <div className="min-h-screen flex bg-gradient-to-br from-purple-50 to-pink-100">
//       {/* Sidebar */}
//       <div className="w-80 bg-gradient-to-br from-purple-600 to-indigo-700 backdrop-blur-md shadow-2xl p-8 flex flex-col rounded-r-3xl">
//         {/* Logo Section */}
//         <div className="flex items-center gap-4 mb-12">
//           <GraduationCap className="w-12 h-12 text-white animate-bounce" />
//           <h1 className="text-4xl font-extrabold text-white tracking-wide">
//             AI Coach
//           </h1>
//         </div>

//         {/* Mode Selector */}
//         <div className="mb-8">
//           <h2 className="text-xs font-semibold text-white/80 uppercase tracking-widest mb-4">
//             Select Mode
//           </h2>
//           <div className="flex gap-3 bg-white/20 p-2 rounded-full">
//             <button
//               onClick={() => setMode('text')}
//               className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-full transition-all duration-300 ${
//                 mode === 'text'
//                   ? 'bg-white text-purple-700 shadow-lg scale-105'
//                   : 'text-white hover:bg-white/20'
//               }`}
//             >
//               <MessageSquare className="w-6 h-6" />
//               <span className="font-medium">Text</span>
//             </button>
//             <button
//               onClick={() => setMode('voice')}
//               className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-full transition-all duration-300 ${
//                 mode === 'voice'
//                   ? 'bg-white text-purple-700 shadow-lg scale-105'
//                   : 'text-white hover:bg-white/20'
//               }`}
//             >
//               <Mic2 className="w-6 h-6" />
//               <span className="font-medium">Voice</span>
//             </button>
//           </div>
//         </div>

//         {/* Sidebar Footer */}
//         <div className="mt-auto text-center text-sm text-white/80">
//           <p>
//             Powered by{' '}
//             <span className="text-white font-semibold">AI Technology</span>
//           </p>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-10 bg-white shadow-2xl rounded-l-3xl relative">
//         {/* Loading Animation */}
//         {isGenerating && (
//           <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center rounded-l-3xl">
//             <div className="flex flex-col items-center gap-4">
//               <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
//               <p className="text-lg font-semibold text-purple-600">
//                 Generating your response...
//               </p>
//               <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
//             </div>
//           </div>
//         )}

//         {/* Chat Interface */}
//         <ChatInterface mode={mode} onGenerate={simulateGeneration} />
//       </div>
//     </div>
//   );
// }

// export default App;


import React, { useState } from 'react';
import { GraduationCap, MessageSquare, Mic2, Loader2, Sparkles } from 'lucide-react';
import ChatInterface from './components/ChatInterface.tsx';

type Mode = 'text' | 'voice';

function App() {
  const [mode, setMode] = useState<Mode>('text');
  const [isGenerating, setIsGenerating] = useState(false);

  const simulateGeneration = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-purple-50 to-pink-100 font-sans"> {/* Added font-sans */}
      {/* Sidebar */}
      <aside className="w-80 bg-gradient-to-br from-purple-600 to-indigo-700 backdrop-blur-md shadow-2xl p-8 flex flex-col rounded-r-3xl">
        {/* Logo Section */}
        <div className="flex items-center gap-4 mb-12">
          <GraduationCap className="w-12 h-12 text-white animate-bounce" />
          <h1 className="text-4xl font-extrabold text-white tracking-wide">
            AI Coach
          </h1>
        </div>

        {/* Mode Selector */}
        <div className="mb-8">
          <h2 className="text-xs font-semibold text-white/80 uppercase tracking-widest mb-4">
            Select Mode
          </h2>
          <div className="flex gap-3 bg-white/20 p-2 rounded-full">
            <button
              onClick={() => setMode('text')}
              className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-full transition-all duration-300 ${
                mode === 'text'
                  ? 'bg-white text-purple-700 shadow-lg scale-105 font-medium' // Added font-medium
                  : 'text-white hover:bg-white/20 font-medium' // Added font-medium
              }`}
            >
              <MessageSquare className="w-6 h-6" />
              <span>Text</span> {/* Removed unnecessary span with font-medium */}
            </button>
            <button
              onClick={() => setMode('voice')}
              className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-full transition-all duration-300 ${
                mode === 'voice'
                  ? 'bg-white text-purple-700 shadow-lg scale-105 font-medium' // Added font-medium
                  : 'text-white hover:bg-white/20 font-medium' // Added font-medium
              }`}
            >
              <Mic2 className="w-6 h-6" />
              <span>Voice</span> {/* Removed unnecessary span with font-medium */}
            </button>
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="mt-auto text-center text-sm text-white/80">
          <p>
            Powered by{' '}
            <span className="text-white font-semibold">AI Technology</span>
          </p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-white shadow-2xl rounded-l-3xl relative overflow-hidden"> {/* Added overflow-hidden */}
        {/* Loading Animation */}
        {isGenerating && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex items-center justify-center rounded-l-3xl z-10"> {/* Added z-10 */}
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
              <p className="text-lg font-semibold text-purple-600">
                Generating your response...
              </p>
              <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
            </div>
          </div>
        )}

        {/* Chat Interface */}
        <ChatInterface mode={mode} onGenerate={simulateGeneration} />
      </main>
    </div>
  );
}

export default App;