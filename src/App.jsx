import { Route, Routes } from "react-router";
import MusicComp from "./MusicComp";
import AddSongs from "./AddSongs";
import { useEffect, useState } from "react";

function App() {
  const [newSongs, setNewSongs] = useState([]);
  const songs = [
    {
      songName: "vinee-hieghts",
      filePath: "songs1.mp3",
      coverPath: "cover1.avif",
    },
    {
      songName: "breaking-news-symphony",
      filePath: "songs2.mp3",
      coverPath: "cover2.avif",
    },
    {
      songName: "whispers-of-the-wind",
      filePath: "songs3.mp3",
      coverPath: "cover3.avif",
    },
    {
      songName: "himalayan-village-fluets",
      filePath: "songs4.mp3",
      coverPath: "cover4.avif",
    },
    {
      songName: "galaxy",
      filePath: "songs5.mp3",
      coverPath: "cover5.avif",
    },
  ];

  useEffect(() => {
    setNewSongs(JSON.parse(localStorage.getItem("songs")) || songs);
  }, []);

  return (
    <>
      <Routes>
        <Route index element={<MusicComp songs={newSongs} />} />
        <Route path="/addSong" element={<AddSongs songs={newSongs} />} />
      </Routes>
    </>
  );
}

export default App;
