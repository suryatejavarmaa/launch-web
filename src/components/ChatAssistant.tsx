import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { MessageCircle, Send, X } from 'lucide-react';

export function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      type: 'bot',
      text: "👋 Hi! I'm your Launchpad AI assistant. Ready to help you choose your path?"
    },
    {
      type: 'bot',
      text: "💡 I can help with questions about Entrepreneur and Career paths, program details, and more!"
    }
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    setMessages([...messages, { type: 'user', text: message }]);

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        type: 'bot',
        text: "Thanks for your question! Our team will get back to you with detailed information about Launchpad."
      }]);
    }, 1000);

    setMessage('');
  };

  return (
    <>
      {/* Chat Button - ACCENT color */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 rounded-full p-3 sm:p-4 transition-all hover:scale-110 lp-animate-pulse-blue"
          style={{
            background: 'var(--lp-blue)',
            boxShadow: '0 0 30px rgba(0, 169, 255, 0.5)'
          }}
        >
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-full max-w-[calc(100vw-2rem)] sm:w-96 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          style={{
            background: 'rgba(15, 23, 42, 0.95)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: 'var(--lp-glow-blend)'
          }}
        >
          {/* Header - ACCENT gradient */}
          <div
            className="p-4 flex justify-between items-center"
            style={{ background: 'var(--lp-gradient-primary)' }}
          >
            <div className="flex items-center gap-3">
              <div className="rounded-full p-2 bg-white/20">
                <MessageCircle size={20} className="text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Launchpad AI</h3>
                <p className="text-xs text-white/70">Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 transition-colors text-white/80 hover:text-white"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div
            className="flex-1 p-4 space-y-4 max-h-96 overflow-y-auto"
            style={{ background: 'rgba(15, 23, 42, 0.98)' }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${msg.type === 'user'
                      ? 'rounded-br-sm'
                      : 'rounded-bl-sm'
                    }`}
                  style={{
                    background: msg.type === 'user'
                      ? 'var(--lp-blue)'
                      : 'rgba(255, 255, 255, 0.05)',
                    color: msg.type === 'user' ? 'white' : '#CBD5E1',
                    border: msg.type === 'user' ? 'none' : '1px solid rgba(255, 255, 255, 0.1)'
                  }}
                >
                  <p className="text-sm">{msg.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div
            className="p-4"
            style={{
              background: 'rgba(15, 23, 42, 0.98)',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask me anything..."
                className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-slate-500"
              />
              {/* Send button - ACCENT color */}
              <Button
                onClick={handleSend}
                style={{
                  background: 'var(--lp-blue)',
                  color: 'white'
                }}
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
