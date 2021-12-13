import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./components/Game";
import Home from "./components/Home";
import Leaderboard from "./components/Leaderboard";
import './App.css';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import firebaseConfig from './config';
import { useState } from "react";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

// Initialize Firebase

function App() {
  const [gameImages, setGameImages] = useState(['', '', '', '', '', '']);

  const app = initializeApp(firebaseConfig);
  const storage = getStorage(app);

  const gameImageRef1 = ref(storage, 'game1.jpeg');
  getDownloadURL(gameImageRef1)
  .then((url) => {
    setGameImages((prevGameImages) => {
      const prevGameImagesCopy = prevGameImages.slice();
      prevGameImagesCopy[0] = url;
      return prevGameImagesCopy;
    }); 
  })
  .catch((error) => {
    console.log(error);
  })
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
          <Route path="/game" element={<Game />} />
          <Route path="/" element={<Home gameImages={gameImages}/>} />
          <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
