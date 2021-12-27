import { Link } from "react-router-dom";
import '../styles/GameTile.css';

function GameTile(props) {
  const { game, index, parent, initiateGame, updateCurrentGameIndex } = props;
  if (parent === 'home') {
    return (
      <Link to="/game" className="GameTile" onClick={() => {
        initiateGame();
        updateCurrentGameIndex(index);
      }}>
        <img 
          src={game.image} 
          alt=""
          className="GameTile-image"
        />
        <div className="GameTile-description">
          <h3>Game {index + 1}</h3>
          <div className="GameTile-characters">
            {game.characters.map((character, index) => {
              return (
                <img 
                  key={index}
                  src={character.image}
                  alt={character.name}
                  className="GameTile-character"
                />
              );
            })}
          </div>
        </div>
      </Link>
    );
  }
  const { active, handleLeaderboardStats } = props;
  return (
    <div onClick={() => {
      handleLeaderboardStats(index);
      updateCurrentGameIndex(index);
    }} className={`GameTile leaderboard${active? ' active' : ''}`}>
      <img 
        src={game.image} 
        alt=""
        className="GameTile-image"
      />
      <div className="GameTile-description">
        <h3>Game {index + 1}</h3>
        <div className="GameTile-characters">
          {game.characters.map((character, characterIndex) => {
            return (
              <img 
                key={characterIndex}
                src={character.image}
                alt={character.name}
                className="GameTile-character"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GameTile;