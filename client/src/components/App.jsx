import React from 'react';

function App () {
  const stats = ['HP', 'Attack', 'Defense', 'Sp_Attack', 'Sp_Defense', 'Speed'];
  const [pokemon1, setPokemon1] = React.useState({
    Name: 'Venusaur',
    HP: 80,
    Attack: 82,
    Defense: 83,
    Sp_Attack: 100,
    Ap_Defense: 100,
    Speed: 80
  });
  const [pokemon2, setPokemon2] = React.useState({
    Name: 'Charizard',
    HP: 78,
    Attack: 84,
    Defense: 78,
    Sp_Attack: 109,
    Ap_Defense: 85,
    Speed: 100
  });
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  };
  var randStat = stats[getRandomInt(stats.length)];
  return (
    <h2>Which Pokemon has the higher {randStat}?</h2>
  )
}

export default App;