import { useEffect, useRef, useMemo } from 'react';
import { Search, File, Terminal, Code, X } from 'lucide-react';
import { useWorkspaceStore } from '../../stores/workspaceStore';
import type { FileNode, SearchResult, ToolType } from '../../types/workspace';

function flattenFiles(nodes: FileNode[]): FileNode[] {
  const result: FileNode[] = [];
  for (const node of nodes) {
    result.push(node);
    if (node.children) {
      result.push(...flattenFiles(node.children));
    }
  }
  return result;
}

const toolItems: { type: ToolType; name: string }[] = [
  { type: 'editor', name: 'Editor' },
  { type: 'preview', name: 'Preview' },
  { type: 'console', name: 'Console' },
  { type: 'shell', name: 'Shell' },
  { type: 'secrets', name: 'Secrets' },
  { type: 'file-history', name: 'File History' },
  { type: 'multiplayer', name: 'Multiplayer' },
  { type: 'user-settings', name: 'User Settings' },
  { type: 'agent', name: 'AI Agent' },
];

export function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { searchQuery, setSearchQuery, setSearchOpen, files, openFile } = useWorkspaceStore();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSearchOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [setSearchOpen]);

  const allFiles = useMemo(() => flattenFiles(files), [files]);

  const results = useMemo<SearchResult[]>(() => {
    if (!searchQuery.trim()) {
      return [
        ...allFiles.slice(0, 5).map((f) => ({
          type: 'file' as const,
          title: f.name,
          path: f.path,
          description: f.path,
        })),
        ...toolItems.slice(0, 3).map((t) => ({
          type: 'tool' as const,
          title: t.name,
          toolType: t.type,
        })),
      ];
    }

    const q = searchQuery.toLowerCase();
    const fileResults: SearchResult[] = allFiles
      .filter((f) => f.name.toLowerCase().includes(q) || f.path.toLowerCase().includes(q))
      .slice(0, 8)
      .map((f) => ({
        type: 'file' as const,
        title: f.name,
        path: f.path,
        description: f.path,
      }));

    const textResults: SearchResult[] = allFiles
      .filter((f) => f.type === 'file' && f.content?.toLowerCase().includes(q))
      .slice(0, 5)
      .map((f) => ({
        type: 'text' as const,
        title: f.name,
        path: f.path,
        description: `Contains "${searchQuery}"`,
      }));

    const toolResults: SearchResult[] = toolItems
      .filter((t) => t.name.toLowerCase().includes(q))
      .map((t) => ({
        type: 'tool' as const,
        title: t.name,
        toolType: t.type,
      }));

    return [...fileResults, ...textResults, ...toolResults];
  }, [searchQuery, allFiles]);

  const handleSelect = (result: SearchResult) => {
    if (result.type === 'file' || result.type === 'text') {
      const file = allFiles.find((f) => f.path === result.path);
      if (file) openFile(file);
    }
    setSearchOpen(false);
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'file': return <File size={16} color="var(--accent)" />;
      case 'text': return <Code size={16} color="var(--success)" />;
      case 'tool': return <Terminal size={16} color="var(--warning)" />;
      default: return <Search size={16} />;
    }
  };

  return (
    <div className="search-overlay" onClick={() => setSearchOpen(false)}>
      <div className="search-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="search-input-container">
          <Search size={18} color="var(--text-muted)" />
          <input
            ref={inputRef}
            className="search-input"
            placeholder="Search files, text, or tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button className="btn-icon" onClick={() => setSearchQuery('')}>
              <X size={16} />
            </button>
          )}
        </div>
        <div className="search-results">
          {results.length === 0 ? (
            <div style={{ padding: 24, textAlign: 'center', color: 'var(--text-muted)' }}>
              No results found
            </div>
          ) : (
            results.map((result, i) => (
              <div
                key={i}
                className="search-result-item"
                onClick={() => handleSelect(result)}
              >
                {getIcon(result.type)}
                <div>
                  <div className="search-result-title">{result.title}</div>
                  {result.description && (
                    <div className="search-result-path">{result.description}</div>
                  )}
                </div>
                <span className="search-result-badge">{result.type}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
