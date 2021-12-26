import { Link } from "react-router-dom";
import '../styles/GameTile.css';

function GameTile(props) {
  const { game, index, parent } = props;
  if (parent === 'home') {
    return (
      <Link to="/game" state={{ index: index }} className="GameTile">
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
    <div data-index={index} onClick={handleLeaderboardStats} className={`GameTile leaderboard${active? ' active' : ''}`}>
      <img 
        src={game.image} 
        alt=""
        className="GameTile-image"
        data-index={index}
      />
      <div className="GameTile-description" data-index={index}>
        <h3 data-index={index}>Game {index + 1}</h3>
        <div className="GameTile-characters" data-index={index}>
          {game.characters.map((character, characterIndex) => {
            return (
              <img 
                key={characterIndex}
                src={character.image}
                alt={character.name}
                className="GameTile-character"
                data-index={index}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default GameTile;