import { Link } from "react-router-dom";
import '../styles/Game.css'
import Dropdown from "./Dropdown";
import Popup from "./Popup";

function Game(props) {
  const { games, handleImageClick, handleDropdownSelection, charactersFound, handleLeaderboardSubmission, handleNameChange, name, timeLapsed, updateCurrentGameIndex, currentGameIndex } = props;

  return (
    <div className="Game">
      <Popup handleLeaderboardSubmission={handleLeaderboardSubmission} index={currentGameIndex} handleNameChange={handleNameChange} name={name} timeLapsed={timeLapsed} />
      <nav className="Game-nav">
        <div className="Game-characters">
          {games[currentGameIndex].characters.map((character, index) => {
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
          src={games[currentGameIndex].image}
          alt=""
          className="Game-image"
          onClick={handleImageClick}
        />
        <Dropdown index={currentGameIndex} game={games[currentGameIndex]} handleDropdownSelection={handleDropdownSelection}/>
      </main>
    </div>
  );
}

export default Game;