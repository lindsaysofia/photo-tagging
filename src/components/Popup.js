import { Link } from "react-router-dom";
import '../styles/Popup.css'
function Popup(props) {
  const { handleLeaderboardSubmission, index, handleNameChange, name } = props;
  return (
    <div className="Popup">
      <form className="Popup-form" onSubmit={handleLeaderboardSubmission}>
        <Link 
          className="form-close"
          to="/"
        >
          X
        </Link>
        <h2>You finished in X seconds!</h2>
        <p>Submit your score on the global leaderboard!</p>
        <input 
          id="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          minLength="1"
          maxLength="20"
          required
          className="form-input"
        />
        <div className="form-buttons">
          <button 
            type="submit"
            className="form-submit"
            data-index={index}
            onClick={handleLeaderboardSubmission}
          >
            Submit Name
          </button>
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