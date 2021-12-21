import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import '../styles/Game.css'
import Dropdown from "./Dropdown";

function Game(props) {
  const { games } = props;
  const location = useLocation();
  const { index } = location.state;

  const handleClick = (e) => {
    const delta = 0;
    const coordinates ={x: 0,  y: 0}
    const {
      height,
      width,
      top,
      left,
    } = e.target.getBoundingClientRect();
    const {
      pageX,
      pageY,
      clientX,
      clientY,
    } = e;
    const imageX = clientX - left;
    const imageY = clientY - top
    const dropdown = document.querySelector('.Dropdown');
    dropdown.style.left = `${pageX}px`;
    dropdown.style.top = `${pageY}px`;
    console.log(imageX <= coordinates.x + delta && imageX >= coordinates.x - delta && imageY <= coordinates.y + delta && imageY >= coordinates.y - delta);
    console.log({imageX, imageY}, coordinates)
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