import { useState, useEffect } from 'react';
import './App.css';
const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;
import Ban from './components/ban';
import History from './components/history';

function App() {
  const [currentCat, setCats] = useState(null);
  const [history, setHistory] = useState([]);
  const [banList, setBanList] = useState([]); // State for the ban list

  const fetchNewCat = async () => {
    try {
      const response = await fetch(`https://api.thecatapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=1&api_key=${ACCESS_KEY}`);
      const data = await response.json();
      // console.log("API Response:", data); // Debugging the API response

      if (data.length === 0) {
        console.error("No data returned from the API");
        return;
      }

      const newCat = data
        .filter((cat) => cat.breeds && cat.breeds.length > 0)
        .map((cat) => {
          const breed = cat.breeds[0];
          return {
            id: breed.id || "Unknown",
            name: breed.name || "Unknown",
            origin: breed.origin || "Unknown",
            weight: breed.weight?.metric || "Unknown",
            lifeSpan: breed.life_span || "Unknown",
            temperament: breed.temperament
              ? breed.temperament.split(", ")[0]
              : "Unknown",
            image: cat.url || null, // Handle cases where the image URL is missing
          };
        })
        .find((cat) => !banList.includes(cat.origin)); // Skip banned attributes

      if (!newCat) {
        console.error("No valid cat data found");
        return;
      }

      console.log("New Cat Object:", newCat); // Debugging the newCat object
      setCats(newCat);
      setHistory((prevHistory) => [...prevHistory, newCat]); // Add the new cat to the history
    } catch (error) {
      console.error("Error fetching cat data:", error);
    }
  };

  const addToBanList = (attribute) => {
    if (!banList.includes(attribute)) {
      setBanList((prevBanList) => [...prevBanList, attribute]);
    }
  };

  const removeFromBanList = (attribute) => {
    setBanList((prevBanList) => prevBanList.filter((item) => item !== attribute));
  };

  useEffect(() => {
    fetchNewCat();
  }, []);


  return (
    <div className='App'>
      <div className="main-content">
        <h1>Trippin' on Cats</h1>
        <p>Discover cats from your wildest dreams!</p>
        <div className='main-container'>
          {currentCat ? (
            <>
              <p>{currentCat.name || "Unknown Name"}</p>
              <div className="attributes">
                <button onClick={() => addToBanList(currentCat.temperament)}>{currentCat.temperament || "Unknown Breed"}</button>
                <button onClick={() => addToBanList(currentCat.weight)}>{currentCat.weight || "Unknown Weight"}</button>
                <button onClick={() => addToBanList(currentCat.origin)}>{currentCat.origin || "Unknown Origin"}</button>
                <button onClick={() => addToBanList(currentCat.lifeSpan)}>{currentCat.lifeSpan || "Unknown Lifespan"}</button>
              </div>
              {currentCat.image ? (
                <img src={currentCat.image} alt={currentCat.name || "Cat"} className="cat-image" />
              ) : (
                <p>No image available</p>
              )}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <button onClick={fetchNewCat}>Discover</button>
        <Ban banList={banList} removeFromBanList={removeFromBanList} />
        <History history={history} />
      </div>
    </div>
  );
}

export default App;