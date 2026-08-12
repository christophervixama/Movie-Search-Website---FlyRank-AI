import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { MovieGrid } from './components/MovieGrid';
import type { Movie } from './components/MovieGrid';

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [view, setView] = useState<'home' | 'favorites'>('home');
  const [loading, setLoading] = useState(false);

  // Load favorites from local memory when the app opens
  useEffect(() => {
    const savedFavs = localStorage.getItem('media-vault-favs');
    if (savedFavs) {
      setFavorites(JSON.parse(savedFavs));
    }
  }, []);

  // Use a free API key to pull actual movie data from a public registry
  const handleSearch = async (query: string) => {
    setLoading(true);
    setView('home');
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=eedd8de`
      );
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = (movie: Movie) => {
    let updatedFavorites = [...favorites];
    const exists = favorites.some((fav) => fav.imdbID === movie.imdbID);

    if (exists) {
      updatedFavorites = updatedFavorites.filter((fav) => fav.imdbID !== movie.imdbID);
    } else {
      updatedFavorites.push(movie);
    }

    setFavorites(updatedFavorites);
    localStorage.setItem('media-vault-favs', JSON.stringify(updatedFavorites));
  };

  return (
    <div style={{ minHeight: '100vh', background: '#222', color: '#fff', fontFamily: 'sans-serif', width: '100%' }}>
      <Header onSearch={handleSearch} setView={setView} currentView={view} />
      
      <main style={{ padding: '1rem' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>Loading cinematic records...</div>
        ) : view === 'home' ? (
          <MovieGrid 
            movies={movies} 
            favorites={favorites} 
            onToggleFavorite={handleToggleFavorite} 
          />
        ) : (
          <div>
            <h3 style={{ paddingLeft: '2rem', marginTop: '2rem' }}>Your Curated Vault Favorites</h3>
            <MovieGrid 
              movies={favorites} 
              favorites={favorites} 
              onToggleFavorite={handleToggleFavorite} 
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
