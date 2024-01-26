import './App.css';
import { useState, useEffect } from 'react';
import useSWR from 'swr';

// const fetcher = (...args) => fetch(...args).then((response)=>response.json)

function App() {

  const [gameTitle, setGameTitle] = useState ('');
  const [searchedGames, setSearchedGames] = useState([])
  const [gameDeals, setGameDeals] = useState([])


// const {data, error} = useSWR('https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15&pageSize=3',fetcher);


  const searchGame = () => {
    fetch (`https://www.cheapshark.com/api/1.0/games?title=${gameTitle}&limit=3`)
    .then((response)=> response.json())
    .then ((data) => {
      setSearchedGames(data)
      console.log(data)
    })
  };
useEffect (() => {
  fetch(`https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=15&pageSize=3`)
  .then ((response) => response.json())
  .then((data)=> {
    setGameDeals(data)
    console.log(data)
  })
},[])

  return (
    <div className="App">
     
      <div className='searchSection'>
      <div className='shadow'>
      </div>
        <h1>Search A Game</h1>
        <input type='text' placeholder='GTA...' onChange={(event)=> {
          setGameTitle(event.target.value);
        }}/>
        <button onClick={searchGame}> Search Game Title</button>

        <div className='circle'>
        <div className='games'>
          {searchedGames.map((game,key)=> {
            return<div className='game' key={key}>{game.external}
            <img src={game.thumb}/>
            {game.cheapest}
            </div>
          })}
        </div>
        </div>

      </div>

      <div className='dealsSection'>
        <div id='head'>
        <h1 className='latest'> ✨ Latest Deals 💥</h1>
        </div>
        <div className='deal'>
        {gameDeals.map((game,key) => {
          return(
            <div id='deals' key={key}><h3>{game.title}</h3>
            <p>Normal Price: {game.normalPrice}</p>
            <p>Deal Price: {game.salePrice}</p>
            <h3>YOU SAVE {game.savings.substr(0,2)}%</h3>
            <img className='dealsImg' src={game.thumb}/>
            </div>
          )
        })
        
      }
        </div>
      </div>
    </div>
  );
}

export default App;
