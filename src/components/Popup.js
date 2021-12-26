import { Link, useLocation } from "react-router-dom";
import '../styles/Popup.css'
function Popup() {
  return (
    <div className="Popup">
      <form className="Popup-form">
        <button className="form-close">X</button>
        <h2>You finished in X seconds!</h2>
        <p>Submit your score on the global leaderboard!</p>
        <input 
          type="text"
          placeholder="Name"
          className="form-input"
        />
        <div className="form-buttons">
          <button 
            type="submit"
            className="form-submit"
          >
            Submit Score
          </button>
          <button className="form-nosubmit">No, thanks</button>
        </div>
      </form>
    </div>
  );
}

export default Popup;