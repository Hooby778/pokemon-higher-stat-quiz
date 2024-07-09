import React from 'react';
import axios from 'axios';

function App () {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  };
  const stats = ['HP', 'Attack', 'Defense', 'Sp_Attack', 'Sp_Defense', 'Speed'];
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
  var pokemon1 = pokemonList[getRandomInt(pokemonList.length)];
  var pokemon2 = pokemonList[getRandomInt(pokemonList.length)];
  const [score, setScore] = React.useState(0);
  const [highScore, setHighScore] = React.useState(0);
  var randStat = stats[getRandomInt(stats.length)];
  var randChoice1 = getRandomInt(1025);
  var randChoice2 = getRandomInt(1025);
  if (pokemon1 && pokemon2) {
    return (
      <div>
        <p>High Score: {highScore}</p>
        <p>Current Score: {score}</p>
        <h2>Which Pokemon has the higher {randStat}?</h2>
        <button onClick={() => {
          if (pokemon1[randStat] >= pokemon2[randStat]) {
            setScore(score + 1);
          } else {
            if (score > highScore) {
              axios.patch('/pokemon', {"HP": score})
              setHighScore(score);
            }
            setScore(0);
          }
        }}>{pokemon1.Name}</button>
        <button onClick={() => {
          if (pokemon2[randStat] >= pokemon1[randStat]) {
            setScore(score + 1);
          } else {
            if (score > highScore) {
              axios.patch('/pokemon', {"HP": score})
              setHighScore(score);
            }
            setScore(0);
          }
        }}>{pokemon2.Name}</button>
      </div>
    )
  } else {
    return <p>Loading...</p>
  }
}

export default App;