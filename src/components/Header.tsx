import React, { useState } from 'react';

interface HeaderProps {
  onSearch: (query: string) => void;
  setView: (view: 'home' | 'favorites') => void;
  currentView: 'home' | 'favorites';
  onLogoClick: () => void;          // ← add this
}

export const Header: React.FC<HeaderProps> = ({ 
  onSearch, 
  setView, 
  currentView,
  onLogoClick          // ← add this
}) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSearch(input);
    }
  };

  return (
    <header
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '2rem',
        padding: '0.9rem 2.5rem',
        background: '#0f0f0f',
        color: '#fff',
        borderBottom: '1px solid #2a2a2a',
        width: '100%',
        boxSizing: 'border-box',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Brand */}
      <h2
        style={{
          margin: 0,
          fontSize: '1.45rem',
          fontWeight: 600,
          letterSpacing: '-0.02em',
          whiteSpace: 'nowrap',
          cursor: 'pointer',
        }}
        onClick={onLogoClick}
      >
        VixamaMedia
      </h2>

      {/* Navigation */}
      <nav style={{ display: 'flex', gap: '0.4rem' }}>
        {(['home', 'favorites'] as const).map((view) => (
          <button
            key={view}
            onClick={() => setView(view)}
            style={{
              padding: '0.45rem 1.1rem',
              borderRadius: '999px',
              border: 'none',
              background: currentView === view ? '#2a2a2a' : 'transparent',
              color: currentView === view ? '#fff' : '#aaa',
              fontWeight: currentView === view ? 600 : 450,
              fontSize: '0.95rem',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
            }}
            onMouseEnter={(e) => {
              if (currentView !== view) {
                e.currentTarget.style.background = '#1f1f1f';
                e.currentTarget.style.color = '#ddd';
              }
            }}
            onMouseLeave={(e) => {
              if (currentView !== view) {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#aaa';
              }
            }}
          >
            {view === 'home' ? 'Home' : 'Favorites'}
          </button>
        ))}
      </nav>

      {/* Search */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          gap: '0.5rem',
          flex: '0 1 340px',
          maxWidth: '360px',
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Search movies..."
          style={{
            flex: 1,
            padding: '0.55rem 1rem',
            borderRadius: '999px',
            border: '1px solid #333',
            background: '#1a1a1a',
            color: '#fff',
            fontSize: '0.95rem',
            outline: 'none',
            transition: 'border-color 0.15s ease',
          }}
          onFocus={(e) => (e.currentTarget.style.borderColor = '#555')}
          onBlur={(e) => (e.currentTarget.style.borderColor = '#333')}
        />
        <button
          type="submit"
          style={{
            padding: '0.55rem 1.25rem',
            borderRadius: '999px',
            border: 'none',
            background: '#3a3a3a',
            color: '#fff',
            fontWeight: 500,
            fontSize: '0.95rem',
            cursor: 'pointer',
            whiteSpace: 'nowrap',
            transition: 'background 0.15s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.background = '#4a4a4a')}
          onMouseLeave={(e) => (e.currentTarget.style.background = '#3a3a3a')}
        >
          Search
        </button>
      </form>
    </header>
  );
};
