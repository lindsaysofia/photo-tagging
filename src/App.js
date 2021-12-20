import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./components/Game";
import Home from "./components/Home";
import Leaderboard from "./components/Leaderboard";
import './App.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
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
          name: 'nemo',
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

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  const getGameImage = (gameIndex) => {
    const gameImageRef = ref(storage, `game${gameIndex + 1}.${gameIndex === 2 ? 'png': gameIndex === 3 ? 'webp' : 'jpeg'}`);
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

  const getGames = () => {
    games.forEach((game, index) => {
      getGameImage(index);
      getCharacterImages(index);
    });
  };

  

  useEffect(() => {
    getGames();
  }, []);

  

  
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
          <Route path="/game" element={<Game games={games} />} />
          <Route path="/" element={<Home games={games} />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
