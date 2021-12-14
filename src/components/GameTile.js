import { Link } from "react-router-dom";
import '../styles/GameTile.css';

function GameTile(props) {
  const { imageSrc, index } = props;
  return (
    <Link to="/game" className="GameTile">
      <img 
        src={imageSrc} 
        alt=""
        className="GameTile-image"
      />
      <div className="GameTile-description">
        <h3>Game {index + 1}</h3>
      </div>
    </Link>
  );
}

export default GameTile;