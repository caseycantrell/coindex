import "./App.css"
import axios from "axios";
import { useEffect, useState } from "react";
import Coin from "./Coin";
import Header from "./Header"


function App() {

  const [ coins, setCoins ] = useState([]);
  const [ search, setSearch ] = useState("");

  useEffect(() => {
    axios
    .get("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false")
    .then(res => {
      setCoins(res.data)
    }).catch(error => console.log(error));
  }, []);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  const filteredCoins = coins.filter(coin => 
      coin.name.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <>
    <Header />
    <div className="App">
      <div className="coin-search">
        <h1 className="coin-text">Search a cryptocurrency</h1>
        <form>
          <input type="text" placeholder="Search..." className="coin-input" onChange={handleChange}/>
        </form>
      </div>
      {filteredCoins.map(coin => {
        return (
          <Coin 
          key={coin.id} 
          name={coin.name} 
          image={coin.image} 
          symbol={coin.symbol} 
          price={coin.current_price} 
          volume={coin.total_volume} 
          priceChange={coin.price_change_percentage_24h} 
          marketcap={coin.market_cap}/>
        )
      })}
    </div>
    </>
  );
}

export default App;
