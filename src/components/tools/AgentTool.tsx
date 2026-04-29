import { useState } from 'react';
import { Bot, Send } from 'lucide-react';

interface Message {
  role: 'user' | 'agent';
  content: string;
}

const initialMessages: Message[] = [
  { role: 'agent', content: 'Hello! I\'m your AI coding assistant. How can I help you today?' },
];

export function AgentTool() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', content: input };
    const agentMsg: Message = {
      role: 'agent',
      content: `I understand you want to: "${input}". Let me analyze your codebase and work on that.`,
    };
    setMessages((prev) => [...prev, userMsg, agentMsg]);
    setInput('');
  };

  return (
    <div className="agent-panel">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <Bot size={18} color="var(--accent)" />
        <h3 style={{ margin: 0, fontSize: 14 }}>AI Agent</h3>
      </div>

      <div className="agent-messages">
        {messages.map((msg, i) => (
          <div key={i} className={`agent-message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>

      <div className="agent-input">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask the AI agent..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSend();
          }}
        />
        <button className="btn btn-primary btn-sm" onClick={handleSend}>
          <Send size={14} />
        </button>
      </div>
    </div>
  );
}
