import { Link } from "react-router-dom";
import '../styles/Home.css';
import GameTile from "./GameTile";

function Home(props) {
  const { games, initiateGame, updateCurrentGameIndex, updateStats } = props;
  return (
    <div className="Home">
      <nav className="Home-nav">
        <Link to="/" className="Home-nav-link">
          <h1><i className="fas fa-search"></i> iSpy</h1>
          <p>Find the hidden characters!</p>
        </Link>
        <Link to="/leaderboard" className="Home-nav-link" onClick={updateStats}>Leaderboard</Link>
      </nav>
      <main className="Home-main">
        {games.map((game, index) => {
          return (
            <GameTile parent="home" key={index} game={game} index={index} initiateGame={initiateGame} updateCurrentGameIndex={updateCurrentGameIndex} />
          );
        })}
      </main>
    </div>
  );
}

export default Home;