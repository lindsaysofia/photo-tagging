import { Link, useLocation } from "react-router-dom";
import GameTile from "./GameTile";
import '../styles/Leaderboard.css';

function Leaderboard(props) {
  const { games, handleLeaderboardStats } = props;
  const location = useLocation();
  let index = 0;
  if (location.state) {
    index = location.state.index;
  }
  return (
    <div className="Leaderboard">
      <nav className="Leaderboard-nav">
        <Link to="/" className="Leaderboard-nav-link">
          <h1><i className="fas fa-search"></i> iSpy</h1>
          <p>Find the hidden characters!</p>
        </Link>
      </nav>
      <main className="Leaderboard-main">
        {games.map((game, gameIndex) => {
          return (
            <GameTile parent="leaderboard" key={gameIndex} game={game} index={gameIndex} active={gameIndex === index} handleLeaderboardStats={handleLeaderboardStats}/>
          );
        })}
        <div className="Leaderboard-stats">

        </div>
      </main>
    </div>
  );
}

export default Leaderboard;