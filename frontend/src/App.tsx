import React, { useEffect, useState, FormEvent } from 'react';
import axios from 'axios';
import './App.css';

interface Gif {
  id: string;
  title: string;
  images: {
    fixed_height: {
      url: string;
    };
  };
}

const App: React.FC = () => {
  const [gifs, setGifs] = useState<Gif[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [query, setQuery] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [isTrending, setIsTrending] = useState<boolean>(true);

  const LIMIT = 20;

  useEffect(() => {
    fetchGIFs();
  }, [searchTerm, page, isTrending]);

  const fetchGIFs = async () => {
    try {
      setLoading(true);
      const endpoint = !isTrending && searchTerm
        ? `http://localhost:5000/api/gifs/search?q=${searchTerm}&page=${page}&limit=${LIMIT}`
        : `http://localhost:5000/api/gifs/trending?page=${page}&limit=${LIMIT}`;

      const res = await axios.get<{ data: Gif[] }>(endpoint);
      setGifs(res.data.data);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setPage(1);
    setSearchTerm(query.trim());
    setIsTrending(false);
  };

  const handleShowTrending = () => {
    setQuery('');
    setSearchTerm('');
    setPage(1);
    setIsTrending(true);
  };

  return (
    <div className="App">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search GIFs..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit">Search</button>
        <button type="button" onClick={handleShowTrending}>
          Show Trending
        </button>
      </form>

      {loading ? (
        <div className="spinner"></div>
      ) : (
        <>
          <div className="grid">
            {gifs.map((gif) => (
              <div key={gif.id} className="card">
                <img src={gif.images.fixed_height.url} alt={gif.title || 'GIF'} />
                <p>{gif.title}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '20px' }}>
            <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
              Previous
            </button>
            <span style={{ margin: '0 10px' }}>Page {page}</span>
            <button onClick={() => setPage((p) => p + 1)}>Next</button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
