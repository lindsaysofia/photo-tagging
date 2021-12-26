import { Link, useLocation } from "react-router-dom";

function Leaderboard() {
  const location = useLocation();
  const { index } = location.state;
  console.log(index);
  return (
    <div>
      <h1>Leaderboard</h1>
    </div>
  );
}

export default Leaderboard;