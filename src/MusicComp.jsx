import React, { useRef, useState, useEffect } from "react";
import { FaBackward, FaForward, FaPause, FaPlay } from "react-icons/fa";
import { Link } from "react-router";

function MusicComp({ songs }) {
  const [activeSongIndex, setActiveSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongName, setCurrentSongName] = useState("");
  const audio = useRef(new Audio("songs1.mp3"));

  useEffect(() => {
    audio.current.onended = () => {
      nextSong();
    };
    return () => {
      audio.current.pause();
      audio.current.src = "";
    };
  }, []);

  function playSong(i) {
    if (activeSongIndex === i) {
      if (audio.current.paused) {
        audio.current.play();
        setActiveSongIndex(i);
        setCurrentSongName(songs[i].songName);
      } else {
        audio.current.pause();
        setActiveSongIndex(null);
      }
    } else {
      audio.current.pause();
      audio.current.src = songs[i].filePath;
      audio.current.play();
      setActiveSongIndex(i);
      setCurrentSongName(songs[i].songName);
    }
  }

  function masterplay() {
    if (activeSongIndex === null) {
      playSong(0);
      setIsPlaying(true);
    } else {
      if (audio.current.paused) {
        audio.current.play();
        setIsPlaying(true);
      } else {
        audio.current.pause();
        setIsPlaying(false);
      }
    }
  }

  function previousSong() {
    let previousIndex =
      activeSongIndex !== null
        ? (activeSongIndex - 1 + songs.length) % songs.length
        : songs.length - 1;
    playSong(previousIndex);
  }

  function nextSong() {
    let nextIndex =
      activeSongIndex !== null ? (activeSongIndex + 1) % songs.length : 0;
    playSong(nextIndex);
  }

  return (
    <div className="h-screen w-screen bg-yellow-100">
      {/* Nav Section */}
      <nav className="bg-black py-3 px-6 text-white flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-3">
          <img className="h-10 rounded-full" src="brand logo.webp" alt="logo" />
          <ul className="text-lg font-bold flex gap-4">
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
            <Link to={"/addSong"}>Add Song</Link>
          </ul>
        </div>
      </nav>

      {/* Songs List Section */}
      <div className="rounded-md p-5 h-96 w-11/12 bg-cover bg-center mx-auto mt-18 mb-12 overflow-y-auto" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lcyUyMGJsYWNrfGVufDB8fDB8fHww')" }}>
        {songs.map((song, i) => (
          <div key={i} className="flex items-center px-4 py-2 text-md bg-white text-black w-full sm:w-3/4 md:w-1/2 rounded-lg justify-between font-bold mb-2">
            <img className="h-8 rounded-full" src={song.coverPath} alt="logo" />
            <span className="truncate max-w-xs">{song.songName}</span>
            <button className="cursor-pointer" onClick={() => playSong(i)}>
              {activeSongIndex === i ? (audio.current.paused ? <FaPlay /> : <FaPause />) : <FaPlay />}
            </button>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="p-4 bg-black text-white flex flex-col items-center mt-6 w-full">
        <div className="text-lg mb-2 truncate max-w-xs text-center">{currentSongName}</div>
        <div className="flex gap-4 text-xl">
          <button className="cursor-pointer" onClick={previousSong}><FaBackward /></button>
          <button className="cursor-pointer" onClick={masterplay}>{!isPlaying ? <FaPlay /> : <FaPause />}</button>
          <button className="cursor-pointer" onClick={nextSong}><FaForward /></button>
        </div>
      </div>
    </div>
  );
}

export default MusicComp;
