import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import '../styles/Game.css'
import Dropdown from "./Dropdown";

function Game(props) {
  const { games } = props;
  const location = useLocation();
  const { index } = location.state;

  const handleClick = (e) => {
    const elementX = e.target.getBoundingClientRect().x;
    const elementY = e.target.getBoundingClientRect().y;
    const { clientX, clientY } = e;
    const x = clientX - elementX;
    const y = clientY - elementY;
    const dropdown = document.querySelector('.Dropdown');
    console.log(dropdown);
    dropdown.style.left = `${clientX + window.scrollX}px`;
    dropdown.style.top = `${clientY + window.scrollY}px`;
    dropdown.style.visibility = 'visible';
  };

  return (
    <div className="Game">
      <nav className="Game-nav">
        <div className="Game-characters">
          {games[index].characters.map((character, index) => {
              return (
                <div key={index}>
                  <img 
                    src={character.image}
                    alt={character.name}
                    className="Game-character"
                  />
                  <p className="Game-character-name">{character.name}</p>
                </div>
              );
            })}
        </div>
        <Link to="/" className="Game-nav-link">
          <h1><i className="fas fa-search"></i> iSpy</h1>
          <p>Find the hidden characters!</p>
        </Link>
        <Link to="/leaderboard" className="Game-nav-link">Leaderboard</Link>
      </nav>
      <main className="Game-main">
        <img 
          src={games[index].image}
          alt=""
          className="Game-image"
          onClick={handleClick}
        />
        <Dropdown game={games[index]}/>
      </main>
    </div>
  );
}

export default Game;