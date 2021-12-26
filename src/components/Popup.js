import { Link } from "react-router-dom";
import '../styles/Popup.css'
function Popup(props) {
  const { handleLeaderboardSubmission, index } = props;
  return (
    <div className="Popup">
      <form className="Popup-form">
        <Link 
          className="form-close"
          to="/"
        >
          X
        </Link>
        <h2>You finished in X seconds!</h2>
        <p>Submit your score on the global leaderboard!</p>
        <input 
          type="text"
          placeholder="Name"
          className="form-input"
        />
        <div className="form-buttons">
          <Link 
            to="/leaderboard"
            state={{ index: index }}
            type="submit"
            className="form-submit"
            data-index={index}
            onClick={handleLeaderboardSubmission}
          >
            Submit Score
          </Link>
          <Link 
            to="/"
            className="form-nosubmit"
          >
            No, thanks
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Popup;