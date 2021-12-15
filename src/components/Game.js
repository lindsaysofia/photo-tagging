import { Link } from "react-router-dom";

function Game(props) {
  const { gameImages } = props;
  return (
    <div className="Game">
      <nav className="Game-nav">
      <Link to="/" className="Game-nav-link">
        <h1><i className="fas fa-search"></i> iSpy</h1>
        <p>Find the hidden characters!</p>
      </Link>
      <Link to="/leaderboard" className="Home-nav-link">Leaderboard</Link>
      </nav>
      <main className="Nav-main">
        
      </main>
    </div>
  );
}

export default Game;