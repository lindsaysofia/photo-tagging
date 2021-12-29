import { Link } from "react-router-dom";
import GameTile from "./GameTile";
import '../styles/Leaderboard.css';

function Leaderboard(props) {
  const statsHeader = ['Place', 'Player', 'Time (Seconds)', 'Date'];
  const { games, handleLeaderboardStats, currentGameIndex, updateCurrentGameIndex, stats, initiateGame } = props;
  stats.sort((firstStat, secondStat) => {
    return firstStat.time - secondStat.time;
  });
  return (
    <div className="Leaderboard">
      <nav className="Leaderboard-nav">
        <Link to="/" className="Leaderboard-nav-link">
          <h1><i className="fas fa-search"></i> iSpy</h1>
          <p>Find the hidden characters!</p>
        </Link>
      </nav>
      <main className="Leaderboard-main">
        <div className="Leaderboard-games">
          {games.map((game, gameIndex) => {
            return (
              <GameTile parent="leaderboard" key={gameIndex} game={game} index={gameIndex} active={gameIndex === currentGameIndex} handleLeaderboardStats={handleLeaderboardStats} updateCurrentGameIndex={updateCurrentGameIndex}/>
            );
          })}
        </div>
        <Link to="/game" className="Leaderboard-play" onClick={() => {
          initiateGame();
        }}>Play this Level</Link>
        <div className="Leaderboard-stats">
          {statsHeader.map((header, headerIndex) => {
            return <h3 key={headerIndex} className="stats-header">{header}</h3>
          })}
          {stats.map((stat, statIndex) => {
            return [<p key={`${statIndex}1`} className="stat">{statIndex + 1}</p>, <p key={`${statIndex}2`} className="stat">{stat.name}</p>, <p key={`${statIndex}3`} className="stat">{stat.time.toFixed(4)}</p>, <p key={`${statIndex}4`} className="stat">{stat.date.toDate().toDateString()}</p>]
          })}
        </div>
      </main>
    </div>
  );
}

export default Leaderboard;