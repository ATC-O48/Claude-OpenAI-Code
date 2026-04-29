import { useState } from 'react';

interface ShellLine {
  type: 'prompt' | 'output';
  content: string;
}

const initialLines: ShellLine[] = [
  { type: 'prompt', content: '~ $ npm install' },
  { type: 'output', content: 'added 153 packages in 22s' },
  { type: 'prompt', content: '~ $ npm run dev' },
  { type: 'output', content: 'VITE v5.0.0  ready in 320 ms' },
  { type: 'output', content: '' },
  { type: 'output', content: '  ➜  Local:   http://localhost:3000/' },
  { type: 'output', content: '  ➜  Network: http://192.168.1.42:3000/' },
];

export function ShellTool() {
  const [lines, setLines] = useState<ShellLine[]>(initialLines);
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    if (!input.trim()) return;
    const newLines: ShellLine[] = [
      ...lines,
      { type: 'prompt', content: `~ $ ${input}` },
      { type: 'output', content: `bash: ${input}: command simulated` },
    ];
    setLines(newLines);
    setInput('');
  };

  return (
    <div className="tool-shell">
      {lines.map((line, i) => (
        <div key={i}>
          {line.type === 'prompt' ? (
            <div>
              <span className="shell-prompt">{'~ $ '}</span>
              <span className="shell-command">{line.content.replace('~ $ ', '')}</span>
            </div>
          ) : (
            <div className="shell-output">{line.content}</div>
          )}
        </div>
      ))}
      <div className="shell-input-line">
        <span className="shell-prompt">{'~ $ '}</span>
        <input
          className="shell-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSubmit();
          }}
          placeholder="Type a command..."
        />
      </div>
    </div>
  );
}
