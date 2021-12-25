import { Link, useLocation } from "react-router-dom";
import '../styles/Game.css'
import Dropdown from "./Dropdown";

function Game(props) {
  const { games, handleImageClick, handleDropdownSelection, charactersFound } = props;
  const location = useLocation();
  const { index } = location.state;

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
                    className={`Game-character${charactersFound.includes(character.name) ? ' found' : ''}`}
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
          onClick={handleImageClick}
        />
        <Dropdown index={index} game={games[index]} handleDropdownSelection={handleDropdownSelection}/>
      </main>
    </div>
  );
}

export default Game;