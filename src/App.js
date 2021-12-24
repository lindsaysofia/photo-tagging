import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./components/Game";
import Home from "./components/Home";
import Leaderboard from "./components/Leaderboard";
import './App.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { doc, getDoc, getFirestore } from "firebase/firestore";
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

  const handleDropdownSelection = (e) => {
    const { game: gameIndex, character: characterIndex} = e.target.dataset;
    const { x, y, delta } = games[gameIndex].characters[characterIndex].location;
    const {currentX, currentY } = location;
    const deltaXMinus = Math.abs(currentX - delta);
    const deltaXPlus = Math.abs(currentX + delta);
    const deltaYMinus = Math.abs(currentY - delta);
    const deltaYPlus = Math.abs(currentY + delta);
    console.log(deltaYMinus <= y && deltaYPlus >= y && deltaXPlus >= x && deltaXMinus <= x);
  };
  
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
          <Route path="/game" element={<Game games={games} handleImageClick={handleImageClick} handleDropdownSelection={handleDropdownSelection}/>} />
          <Route path="/" element={<Home games={games} />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
