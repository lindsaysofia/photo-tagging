import '../styles/Dropdown.css';

function Dropdown(props) {
  const { index, game, handleDropdownSelection } = props;
  return (
    <div className="Dropdown">
      {game.characters.map((character, characterIndex) => {
        return (
          <p 
            key={characterIndex} 
            data-game={index} 
            data-character={characterIndex}
            className="Dropdown-character"
            onClick={handleDropdownSelection}
            >
            {character.name}
          </p>
        );
      })}
    </div>
  );
};

export default Dropdown;