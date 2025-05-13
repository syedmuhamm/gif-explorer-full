import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [gifs, setGifs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/gifs/trending')
      .then(res => {
        setGifs(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="container">
      {loading ? <div className="spinner">Loading...</div> : (
        <div className="grid">
          {gifs.map(gif => (
            <div key={gif.id} className="card">
              <img src={gif.images.fixed_height.url} alt={gif.title} />
              <p>{gif.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;