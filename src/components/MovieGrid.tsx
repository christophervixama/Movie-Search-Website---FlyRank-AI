import React from 'react';

export interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface MovieGridProps {
  movies: Movie[];
  favorites: Movie[];
  onToggleFavorite: (movie: Movie) => void;
}

export const MovieGrid: React.FC<MovieGridProps> = ({ movies, favorites, onToggleFavorite }) => {
  if (movies.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '3rem', color: '#888' }}>
        <p>No movies found. Try searching for something above!</p>
      </div>
    );
  }

  return (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
      gap: '2rem', 
      padding: '2rem',
      background: '#222'
    }}>
      {movies.map((movie) => {
        const isFavorite = favorites.some((fav) => fav.imdbID === movie.imdbID);
        
        return (
          <div key={movie.imdbID} style={{ 
            background: '#333', 
            borderRadius: '8px', 
            overflow: 'hidden', 
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <img 
              src={movie.Poster !== 'N/A' ? movie.Poster : 'https://placeholder.com'} 
              alt={movie.Title} 
              style={{ width: '100%', height: '300px', objectFit: 'cover' }}
            />
            <div style={{ padding: '1rem' }}>
              <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1rem' }}>{movie.Title}</h4>
              <p style={{ margin: '0 0 1rem 0', color: '#aaa', fontSize: '0.9rem' }}>{movie.Year}</p>
              <button 
                onClick={() => onToggleFavorite(movie)}
                style={{ 
                  width: '100%', 
                  padding: '0.5rem', 
                  background: isFavorite ? '#ff4d4d' : '#3b7cf6', 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                {isFavorite ? '❤️ Unfavorite' : '🖤 Favorite'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
