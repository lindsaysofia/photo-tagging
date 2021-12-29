import { Routes, Route, useNavigate } from "react-router-dom";
import Filter from "bad-words";
import list from "badwords-list";
import Game from "./components/Game";
import Home from "./components/Home";
import Leaderboard from "./components/Leaderboard";
import './App.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { doc, getDoc, getFirestore, updateDoc, arrayUnion, Timestamp} from "firebase/firestore";
import firebaseConfig from './config';
import { useEffect, useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Initialize Firebase

function App() {
  const  initialGameInfo = [
    {
      image: '',
      characters: [
        {
          name: 'sasuke',
          image: '',
        },
        {
          name: 'waldo',
          image: '',
        },
      ]
    },
    {
      image: '',
      characters: [
        {
          name: 'naruto',
          image: '',
        },
        {
          name: 'woody',
          image: '',
        },
        {
          name: 'ash',
          image: '',
        },
      ]
    },
    {
      image: '',
      characters: [
        {
          name: 'pikachu',
          image: '',
        },
      ]
    },
    {
      image: '',
      characters: [
        {
          name: 'waldo',
          image: '',
        },
      ]
    },
    {
      image: '',
      characters: [
        {
          name: 'swordfish',
          image: '',
        },
        {
          name: 'pretzel',
          image: '',
        },
        {
          name: 'heart',
          image: '',
        },
      ]
    },
    {
      image: '',
      characters: [
        {
          name: 'sonic',
          image: '',
        },
      ]
    },
  ]
  const [games, setGames] = useState(initialGameInfo);
  const [location, setLocation] = useState({currentX: 0, currentY: 0});
  const [charactersFound, setCharactersFound] = useState([]);
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [timeLapsed, setTimeLapsed] = useState(0);
  const [currentGameIndex, setCurrentGameIndex] = useState(0);
  const [stats, setStats] = useState([]);
  const navigate = useNavigate();
  const badwordsArray = list.array;
  const badwordsFilter = new Filter();
  badwordsFilter.addWords(...badwordsArray);


  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const storage = getStorage(app);

  const getGameImage = (gameIndex) => {
    const gameImageRef = ref(storage, `game${gameIndex + 1}.${gameIndex === 2 ? 'png': 'jpeg'}`);
    getDownloadURL(gameImageRef)
    .then((url) => {
      setGames((prevGames) => {
        const prevGamesCopy = prevGames.slice();
        prevGamesCopy[gameIndex].image = url;
        return prevGamesCopy;
      }); 
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const getCharacterImages = (gameIndex) => {
    games[gameIndex].characters.forEach((character, index) => {
      const characterImageRef = ref(storage, `characters/${character.name}.png`);
      getDownloadURL(characterImageRef)
      .then((url) => {
        setGames((prevGames) => {
          const prevGamesCopy = prevGames.slice();
          prevGamesCopy[gameIndex].characters[index].image = url;
          return prevGamesCopy;
        }); 
      })
      .catch((error) => {
        console.log(error);
      })
    }); 
  }

  async function getCharacterLocations(gameIndex) {
    games[gameIndex].characters.forEach((character, index) => {
      const docRef = doc(db, `game${gameIndex + 1}`, character.name);
      getDoc(docRef).then((docSnap) => {
        if (docSnap.exists()) {
          setGames((prevGames) => {
            const prevGamesCopy = prevGames.slice();
            prevGamesCopy[gameIndex].characters[index].location = docSnap.data();
            return prevGamesCopy;
          }); 
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      });
    });
  }

  const getGames = () => {
    games.forEach((game, index) => {
      getGameImage(index);
      getCharacterImages(index);
      getCharacterLocations(index);
    });
  };

  useEffect(() => {
    getGames();
    return () => {
      setGames(initialGameInfo);
    };
  }, []);

  const handleImageClick = (e) => {
    const {
      height,
      width,
      top,
      left,
    } = e.target.getBoundingClientRect();
    const {
      pageX,
      pageY,
      clientX,
      clientY,
    } = e;
    const imageX = clientX - left;
    const imageY = clientY - top;
    const dropdown = document.querySelector('.Dropdown');
    dropdown.style.left = `${pageX}px`;
    dropdown.style.top = `${pageY}px`;
    const percentageX = (imageX/width) * 100;
    const percentageY = (imageY/height) * 100;
    setLocation({currentX: percentageX, currentY: percentageY});
    
  };

  const initiateGame = () => {
    setStartTime(performance.now());
    resetGame();
  };

  const resetGame = () => {
    setCharactersFound([]);
    setName('');
  };

  const gameOver = () => {
    const endTime = performance.now();
    const popup = document.querySelector('.Popup');
    popup.style.visibility = 'visible';
    resetGame();
   setTimeLapsed((endTime - startTime)/1000);
  };

  async function addStat(newStat) {
    try {
      const statsRef = doc(db, `game${currentGameIndex + 1}`, "stats");
      await updateDoc(statsRef, {
        stats: arrayUnion(newStat)
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  const handleLeaderboardSubmission = (e) => {
    e.preventDefault();
    const input = document.getElementById('name');
    if (badwordsFilter.isProfane(name)) {
      input.setCustomValidity('Oh no! Your name contains profanity. Please remove before proceeding.');
    } else {
      input.setCustomValidity('');
    }
    input.reportValidity();
    const validityState = input.validity;
    if (validityState.valid) {
      const newStat = {
        name,
        time: timeLapsed,
        date: Timestamp.fromDate(new Date()),
      };
      addStat(newStat);
      navigate('/leaderboard');
      updateStats(currentGameIndex);
    }
  }

  const handleNameChange = (e) => {
    let newName = e.target.value.trim();
    setName(newName);
  }

  async function updateStats(index) {
    index = index || 0;
    try {
      const docRef = doc(db, `game${index + 1}`, "stats");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setStats(docSnap.data().stats)
      }
      
    } catch(e) {
      console.error("Error adding document: ", e);
    }
  }

  async function handleLeaderboardStats(index) {
    const gameTiles = Array.from(document.querySelectorAll('.GameTile.leaderboard'));
    gameTiles[currentGameIndex].classList.remove('active');
    gameTiles[index].classList.add('active');
    updateStats(index);
  }

  const handleDropdownSelection = (e) => {
    const dropdown = document.querySelector('.Dropdown');
    dropdown.style.left = '-1000px';
    dropdown.style.top = '-1000px';
    const { game: gameIndex, character: characterIndex} = e.target.dataset;
    const { name } = games[gameIndex].characters[characterIndex];
    if (charactersFound.includes(name)) {
      return;
    }
    const { x, y, delta } = games[gameIndex].characters[characterIndex].location;
    const {currentX, currentY } = location;
    const deltaXMinus = Math.abs(currentX - delta);
    const deltaXPlus = Math.abs(currentX + delta);
    const deltaYMinus = Math.abs(currentY - delta);
    const deltaYPlus = Math.abs(currentY + delta);
    const isFound = deltaYMinus <= y && deltaYPlus >= y && deltaXPlus >= x && deltaXMinus <= x;
    if (isFound) {
      let charactersFoundCopy = charactersFound.slice();
      charactersFoundCopy.push(name);
      if (charactersFoundCopy.length === games[gameIndex].characters.length) {
        gameOver();
      } else {
        setCharactersFound(charactersFoundCopy);
      }
    }
  };

  const updateCurrentGameIndex = (newIndex) => {
    setCurrentGameIndex(newIndex);
  };
  
  return (
    <Routes>
        <Route path="/game" element={<Game games={games} handleImageClick={handleImageClick} handleDropdownSelection={handleDropdownSelection} charactersFound={charactersFound} handleLeaderboardSubmission={handleLeaderboardSubmission} handleNameChange={handleNameChange} name={name} timeLapsed={timeLapsed} updateCurrentGameIndex={updateCurrentGameIndex} currentGameIndex={currentGameIndex}/>} />
        <Route path="/" element={<Home games={games} initiateGame={initiateGame} updateCurrentGameIndex={updateCurrentGameIndex} updateStats={updateStats}/>} />
        <Route path="/leaderboard" element={<Leaderboard games={games} handleLeaderboardStats={handleLeaderboardStats} currentGameIndex={currentGameIndex} updateCurrentGameIndex={updateCurrentGameIndex} stats={stats} initiateGame={initiateGame} />} />
    </Routes>
  );
}

export default App;
