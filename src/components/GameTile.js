import { Link } from "react-router-dom";
import '../styles/GameTile.css';

function GameTile(props) {
  const { game, index } = props;
  
  return (
    <Link to="/game" className="GameTile">
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

export default GameTile;