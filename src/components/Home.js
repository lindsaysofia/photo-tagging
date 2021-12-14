import { Link } from "react-router-dom";
import '../styles/Home.css';
import GameTile from "./GameTile";

function Home(props) {
  const { gameImages } = props;
  return (
    <div className="Home">
      <nav className="Home-nav">
      <Link to="/" className="Home-nav-link">
        <h1><i className="fas fa-search"></i> iSpy</h1>
        <p>Find the hidden characters!</p>
      </Link>
      <Link to="/leaderboard" className="Home-nav-link">Leaderboard</Link>
      </nav>
      <main>
        {gameImages.map((imageSrc, index) => {
          return (
            <GameTile key={index} imageSrc={imageSrc} index={index} />
          );
        })}
      </main>
    </div>
  );
}

export default Home;