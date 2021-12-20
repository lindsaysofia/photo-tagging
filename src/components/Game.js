import { Link, useLocation } from "react-router-dom";
import '../styles/Game.css'

function Game(props) {
  const { games } = props;
  const location = useLocation();
  const { index } = location.state;
  return (
    <div className="Game">
      <nav className="Game-nav">
        <div className="Game-characters">
          {games[index].characters.map((character, index) => {
              return (
                <img 
                  key={index}
                  src={character.image}
                  alt={character.name}
                  className="Game-character"
                />
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
        />
      </main>
    </div>
  );
}

export default Game;