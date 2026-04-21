'use client';

interface ChatPlaceholderProps {
  isLive?: boolean;
}

export function ChatPlaceholder({ isLive = false }: ChatPlaceholderProps) {
  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gray-700 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="text-white font-medium text-sm">Live Chat</span>
        </div>
        {isLive && (
          <span className="text-xs text-teal-400 font-medium">
            {Math.floor(Math.random() * 200 + 50)} watching
          </span>
        )}
      </div>

      {/* Chat Messages Area */}
      <div className="h-64 overflow-y-auto p-4 space-y-3">
        {isLive ? (
          <>
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                JD
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400">John D.</p>
                <p className="text-sm text-white">Praise God! 🙌 Amazing worship today!</p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                SM
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400">Sarah M.</p>
                <p className="text-sm text-white">Greeting from Kumasi! 🔥</p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                EK
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400">Emmanuel K.</p>
                <p className="text-sm text-white">The word is powerful today! 💯</p>
              </div>
            </div>
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-pink-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                AM
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400">Ama M.</p>
                <p className="text-sm text-white">Blessings from Takoradi! 🙏</p>
              </div>
            </div>
          </>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <p className="text-gray-400 text-sm">Chat will be available during live service</p>
            <p className="text-gray-500 text-xs mt-2">Join us on Sundays at 9:00 AM</p>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-3 border-t border-gray-700">
        {isLive ? (
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Say something..."
              className="flex-1 bg-gray-700 text-white text-sm px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 placeholder-gray-500"
            />
            <button className="bg-teal-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-teal-500 transition-colors">
              Send
            </button>
          </div>
        ) : (
          <button
            disabled
            className="w-full bg-gray-700 text-gray-500 text-sm px-3 py-2 rounded-lg cursor-not-allowed"
          >
            Chat closed - Join during live service
          </button>
        )}
      </div>
    </div>
  );
}
