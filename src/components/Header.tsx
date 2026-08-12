import React, { useState } from 'react';

interface HeaderProps {
  onSearch: (query: string) => void;
  setView: (view: 'home' | 'favorites') => void;
  currentView: 'home' | 'favorites';
}

export const Header: React.FC<HeaderProps> = ({ onSearch, setView, currentView }) => {
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
      justifyContent: 'space-between',   // ← fixed
      alignItems: 'center',
      gap: '1.5rem',
      padding: '0.85rem 2rem',
      background: '#111',
      color: '#fff',
      borderBottom: '1px solid #333',    // full-width horizontal line
      width: '100%',
      boxSizing: 'border-box',
    }}
  >
    {/* Left: brand */}
    <h2 style={{ margin: 0, fontSize: '1.4rem', whiteSpace: 'nowrap' }}>
      VixamaMedia
    </h2>

    {/* Center: nav */}
    <nav style={{ display: 'flex', gap: '0.75rem' }}>
      <button
        onClick={() => setView('home')}
        style={{
          padding: '0.4rem 0.9rem',
          borderRadius: '6px',
          border: 'none',
          background: currentView === 'home' ? '#333' : 'transparent',
          color: '#fff',
          fontWeight: currentView === 'home' ? 600 : 400,
          cursor: 'pointer',
        }}
      >
        Home
      </button>
      <button
        onClick={() => setView('favorites')}
        style={{
          padding: '0.4rem 0.9rem',
          borderRadius: '6px',
          border: 'none',
          background: currentView === 'favorites' ? '#333' : 'transparent',
          color: '#fff',
          fontWeight: currentView === 'favorites' ? 600 : 400,
          cursor: 'pointer',
        }}
      >
        Favorites
      </button>
    </nav>

    {/* Right: search */}
    <form
      onSubmit={handleSubmit}
      style={{ display: 'flex', gap: '0.5rem', flex: '0 1 320px' }}
    >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Search movies..."
        style={{
          flex: 1,
          padding: '0.5rem 0.75rem',
          borderRadius: '6px',
          border: '1px solid #444',
          background: '#1a1a1a',
          color: '#fff',
          outline: 'none',
        }}
      />
      <button
        type="submit"
        style={{
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          border: 'none',
          background: '#444',
          color: '#fff',
          cursor: 'pointer',
          whiteSpace: 'nowrap',
        }}
      >
        Search
      </button>
    </form>
  </header>
);
};
