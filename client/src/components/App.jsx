import React from 'react';
import axios from 'axios';

var pokemon1;
var pokemon2;

function App () {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  };
  const stats = ['HP', 'Attack', 'Defense', 'Special Attack', 'Special Defense', 'Speed'];
  const [endScreen, setEndScreen] = React.useState(false);
  //const [startScreen, setStartScreen] = React.useState(true);
  const [pokemonList, setPokemonList] = React.useState([]);
  React.useEffect(() => {
    axios.get('/pokemon')
    .then((results) => {
      setPokemonList(results.data);
      setHighScore(results.data[1025].HP);
    })
    .catch((err) => {
      console.log(err);
    })
  }, []);
  if (!endScreen){
    pokemon1 = pokemonList[getRandomInt(pokemonList.length)];
    pokemon2 = pokemonList[getRandomInt(pokemonList.length)];
  }
  const [score, setScore] = React.useState(0);
  const [highScore, setHighScore] = React.useState(0);
  var randStat = stats[getRandomInt(stats.length)];
  var randChoice1 = getRandomInt(1024);
  var randChoice2 = getRandomInt(1024);
  if (pokemon1 && pokemon2 && !endScreen) {
    return (
      <div>
        <p>High Score: {highScore}</p>
        <p>Current Score: {score}</p>
        <h2>Which Pokemon has the higher {randStat}?</h2>
        <img src={pokemon1.Photo}></img>
        <button onClick={() => {
          if (pokemon1[randStat] >= pokemon2[randStat]) {
            setScore(score + 1);
          } else {
            if (score > highScore) {
              axios.patch('/pokemon', {"HP": score})
              setHighScore(score);
            }
            setEndScreen(true);
          }
        }}>{pokemon1.Name}</button>
        <img src={pokemon2.Photo}></img>
        <button onClick={() => {
          if (pokemon2[randStat] >= pokemon1[randStat]) {
            setScore(score + 1);
          } else {
            if (score > highScore) {
              axios.patch('/pokemon', {"HP": score})
              setHighScore(score);
            }
            setEndScreen(true);
          }
        }}>{pokemon2.Name}</button>
      </div>
    )
  } else if (pokemon1 && pokemon2 && endScreen) {
    return (
      <div>
        <h2>Nice Try!</h2>
        <p>High Score: {highScore}</p>
        <p>Your Score: {score}</p>
        <button onClick={() => {
          setEndScreen(false);
          setScore(0);
        }}>Play Again</button>
        <img src={pokemon1.Photo}></img>
        <ul>
          <li>HP: {pokemon1.HP}</li>
          <li>Attack: {pokemon1.Attack}</li>
          <li>Defense: {pokemon1.Defense}</li>
          <li>Special Attack: {pokemon1['Special Attack']}</li>
          <li>Special Defense: {pokemon1['Special Defense']}</li>
          <li>Speed: {pokemon1.Speed}</li>
        </ul>
        <img src={pokemon2.Photo}></img>
        <ul>
          <li>HP: {pokemon2.HP}</li>
          <li>Attack: {pokemon2.Attack}</li>
          <li>Defense: {pokemon2.Defense}</li>
          <li>Special Attack: {pokemon2['Special Attack']}</li>
          <li>Special Defense: {pokemon2['Special Defense']}</li>
          <li>Speed: {pokemon2.Speed}</li>
        </ul>
      </div>
    )
  } else {
    return <p>Loading...</p>
  }
}

export default App;