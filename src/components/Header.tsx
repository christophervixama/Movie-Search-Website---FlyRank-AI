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
    <header style={{ display: 'flex', justifyContent: 'between', padding: '1rem', background: '#111', color: '#fff', alignItems: 'center' }}>
      <h2>VixamaMedia</h2>
      <nav>
        <button 
          onClick={() => setView('home')} 
          style={{ marginRight: '1rem', fontWeight: currentView === 'home' ? 'bold' : 'normal' }}
        >
          Home
        </button>
        <button 
          onClick={() => setView('favorites')} 
          style={{ fontWeight: currentView === 'favorites' ? 'bold' : 'normal' }}
        >
          Favorites
        </button>
      </nav>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Search movies..." 
          style={{ padding: '0.5rem', marginRight: '0.5rem' }}
        />
        <button type="submit" style={{ padding: '0.5rem' }}>Search</button>
      </form>
    </header>
  );
};
