import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [isTrending, setIsTrending] = useState(true); // NEW STATE

  const LIMIT = 20;

  useEffect(() => {
    fetchGIFs();
  }, [searchTerm, page, isTrending]);

  const fetchGIFs = () => {
    setLoading(true);
    const endpoint = !isTrending && searchTerm
      ? `http://localhost:5000/api/gifs/search?q=${searchTerm}&page=${page}&limit=${LIMIT}`
      : `http://localhost:5000/api/gifs/trending?page=${page}&limit=${LIMIT}`;

    axios.get(endpoint)
      .then(res => {
        setGifs(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearchTerm(query.trim());
    setIsTrending(false); // switch to search mode
  };

  const handleShowTrending = () => {
    setQuery('');
    setSearchTerm('');
    setPage(1);
    setIsTrending(true);
  };

  const handleNext = () => setPage(prev => prev + 1);
  const handlePrev = () => setPage(prev => Math.max(prev - 1, 1));

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
        <button type="button" onClick={handleShowTrending} style={{ marginLeft: '10px' }}>
          Show Trending
        </button>
      </form>

      {loading ? (
        <div className="spinner"></div>
      ) : (
        <>
          <div className="grid">
            {gifs.map(gif => (
              <div key={gif.id} className="card">
                <img src={gif.images.fixed_height.url} alt={gif.title || "GIF"} />
                <p>{gif.title}</p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '20px' }}>
            <button onClick={handlePrev} disabled={page === 1}>
              Previous
            </button>
            <span style={{ margin: '0 10px' }}>Page {page}</span>
            <button onClick={handleNext}>
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
