import { Link } from "react-router-dom";
import '../styles/Home.css';

function Home() {
  return (
    <div className="Home">
      <nav className="Home-nav">
      <Link to="/" className="Home-nav-link">
        <h1><i className="fas fa-search"></i> iSpy</h1>
        <p>Find the hidden characters!</p>
      </Link>
      <Link to="/leaderboard" className="Home-nav-link">Leaderboard</Link>
      </nav>
    </div>
  );
}

export default Home;