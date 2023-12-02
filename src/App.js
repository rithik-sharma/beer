
import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [beers, setBeers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBeers();
  }, []);

  const fetchBeers = async () => {
    try {
      const response = await fetch('https://api.punkapi.com/v2/beers');
      const data = await response.json();
      setBeers(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBeers = beers.filter((beer) =>
    beer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <Navbar />
      <h1>Beer Catalog</h1>
      <input
        type="text"
        placeholder="Search beers..."
        value={searchTerm}
        onChange={handleSearch}
      />
      <div className="beer-list">
        {filteredBeers.map((beer) => (
          <div key={beer.id} className="beer-card">
            <img className='image' src={beer.image_url} alt={beer.name} />
            <h2>{beer.name}</h2>
            <p>{beer.tagline}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default App;

