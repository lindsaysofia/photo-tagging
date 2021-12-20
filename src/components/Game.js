import { Link } from "react-router-dom";

function Game(props) {
  const { games } = props;
  return (
    <div className="Game">
      <nav className="Game-nav">
      <Link to="/" className="Game-nav-link">
        <h1><i className="fas fa-search"></i> iSpy</h1>
        <p>Find the hidden characters!</p>
      </Link>
      <Link to="/leaderboard" className="Home-nav-link">Leaderboard</Link>
      </nav>
      <main className="Nav-main" style={{background: 'black', height: '100vh'}}>
        <img 
        />
      </main>
    </div>
  );
}

export default Game;