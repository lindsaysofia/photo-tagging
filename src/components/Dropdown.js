import '../styles/Dropdown.css';

function Dropdown(props) {
  const { game } = props;
  return (
    <div className="Dropdown">
      {game.characters.map((character, index) => {
        return (
          <p key={index} className="Dropdown-character">{character.name}</p>
        );
      })}
    </div>
  );
};

export default Dropdown;