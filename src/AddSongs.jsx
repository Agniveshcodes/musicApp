import React, { useState } from "react";
import { Link } from "react-router";

//ComponentDescription
function AddSongs({ songs }) {
  const [songName, setSongName] = useState("");
  const [songUrl, setSongUrl] = useState("");
  const [songImageUrl, setSongImageUrl] = useState("");

  console.log(songs);

  function addTheSong() {
    songs.push({
      songName: songName,
      filePath: songUrl,
      coverPath: songImageUrl,
    });
    setSongName("");
    setSongImageUrl("");
    setSongUrl("");
    localStorage.setItem("songs", JSON.stringify(songs));
  }
  return (
    <>
      {/* nav section  */}
      <nav className="bg-black py-3 px-6 text-white">
        <ul className="text-xl font-bold cursor-pointer font-sans flex gap-5 items-center ">
          <img className="h-10 rounded-4xl " src="brand logo.webp" alt="logo" />
          <Link to={"/"}> Home </Link>
        </ul>
      </nav>

      {/* adding song  */}
      <div className="p-4 flex justify-center items-center flex-col w-fit mx-auto mt-40 border-2 border-gray-400 rounded-md">
        <input
          value={songName}
          type="text"
          placeholder="Song Name"
          onChange={(e) => {
            setSongName(e.target.value);
          }}
          className="border-2 border-gray-200 rounded-md px-2 py-1 mb-2 "
        />
        <input
          value={songUrl}
          type="url"
          placeholder="Song url"
          onChange={(e) => {
            setSongUrl(e.target.value);
          }}
          className="border-2 border-gray-200 rounded-md px-2 py-1 mb-2"
        />
        <input
          value={songImageUrl}
          type="url"
          placeholder="Song Image Url"
          onChange={(e) => {
            setSongImageUrl(e.target.value);
          }}
          className="border-2 border-gray-200 rounded-md px-2 py-1 mb-2 text-md"
        />
        <div className="flex self-end">
          <button
            onClick={addTheSong}
            className=" cursor-pointer bg-indigo-500 text-white font-semibold px-2 py-1 rounded-md"
          >
            {" "}
            add song{" "}
          </button>
        </div>
      </div>
    </>
  );
}

export default AddSongs;
