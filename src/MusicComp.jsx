import React, { useRef, useState, useEffect } from "react";
import { FaBackward, FaForward, FaPause, FaPlay } from "react-icons/fa";

//ComponentDescription
function MusicComp() {
  const [activeSongIndex, setActiveSongIndex] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongName, setCurrentSongName] = useState("");
  const audio = useRef(new Audio("songs1.mp3"));

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

  // useEffect to ensure event listener is set only once
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
    <>
      <div className="h-screen w-screen bg-yellow-100 ">
        {/* Nav Section  */}
        <nav className="bg-black py-3 px-6 text-white">
          <ul className="text-xl font-bold cursor-pointer font-sans flex gap-5 items-center ">
            <img
              className="h-10 rounded-4xl "
              src="brand logo.webp"
              alt="logo"
            />
            <li>Home</li>
            <li>About</li>
            <li>Services</li>
          </ul>
        </nav>

        {/* songs list section  */}

        <div className=" rounded-md p-5 h-108 w-4xl bg-[url('https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVhZHBob25lcyUyMGJsYWNrfGVufDB8fDB8fHww')] bg-cover bg-center mx-auto mt-12">
          {songs.map((song, i) => {
            return (
              <div
                key={i}
                className="flex px-4 py-2 text-md items-center mb-2 bg-white text-black w-1/2 rounded-lg justify-between font-bold"
              >
                <img
                  className="h-8 rounded-4xl "
                  src={song.coverPath}
                  alt="logo"
                />
                <span> {song.songName} </span>
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    playSong(i);
                  }}
                >
                  {activeSongIndex === i ? (
                    audio.current.paused ? (
                      <FaPlay />
                    ) : (
                      <FaPause />
                    )
                  ) : (
                    <FaPlay />
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom section */}

        <div className=" p-4 bg-black text-white justify-center items-center flex mt-8 flex-col ">
          <div className=" absolute left-0 ml-4 text-xl ">
            {" "}
            {currentSongName}{" "}
          </div>
          <div className="flex gap-5 text-xl">
            <button className="cursor-pointer" onClick={previousSong}>
              <FaBackward />
            </button>
            <button className="cursor-pointer" onClick={masterplay}>
              {!isPlaying ? <FaPlay /> : <FaPause />}
            </button>
            <button className="cursor-pointer" onClick={nextSong}>
              <FaForward />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default MusicComp;
