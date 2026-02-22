import { useState } from "react";
import { apiFetch } from "../api";
import { useAuth } from "../AuthContext";

function Dashboard() {
  const { user } = useAuth();
  const [mode, setMode] = useState("prompt"); // "prompt" | "structured"

  const [prompt, setPrompt] = useState("");
  const [numSongs, setNumSongs] = useState(15);
  const [maxDuration, setMaxDuration] = useState("");
  const [genres, setGenres] = useState("");
  const [mood, setMood] = useState("");

  const [playlistUrl, setPlaylistUrl] = useState("");
  const [playlistName, setPlaylistName] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);
  const [loading, setLoading] = useState(false);

  const generatePlaylist = async () => {
    setLoading(true);
    setPlaylistUrl("");

    try {
      let response;

      if (mode === "prompt") {
        response = await apiFetch("/playlist/generate-from-prompt", {
          method: "POST",
          body: JSON.stringify({
            prompt,
            playlist_name: playlistName || null
          }),
        });
      } else {
        response = await apiFetch("/playlist/generate", {
          method: "POST",
          body: JSON.stringify({
            num_songs: Number(numSongs),
            max_duration_sec: maxDuration ? Number(maxDuration) : null,
            genres: genres ? genres.split(",").map(g => g.trim()) : [],
            mood: mood || null,
            playlist_name: playlistName || null
          }),
        });
      }

      if (!response.ok) {
        throw new Error("Failed to generate playlist");
      }

      const data = await response.json();
      setPlaylistUrl(data.playlist_url);
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await apiFetch("/auth/logout");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center relative">
      
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-6 right-6 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg"
      >
        Logout
      </button>

      <div className="bg-gray-800 p-8 rounded-xl shadow-xl w-[500px]">

      <div className="flex flex-col items-center mb-6">
        {user?.image_url ? (
          <img
            src={user.image_url}
            alt="Profile"
            className="w-14 h-14 rounded-full object-cover"
          />
        ) : (
          <div className="w-14 h-14 bg-green-600 rounded-full flex items-center justify-center text-xl font-bold">
            {user?.display_name?.charAt(0)}
          </div>
        )}

        <h2 className="text-2xl font-semibold mt-3">
          Welcome {user?.display_name}
        </h2>

        <p className="text-gray-400 text-sm mt-1">
          Create your personalized Spotify playlist
        </p>
      </div>

      <div className="mb-6 text-center">

        {!showNameInput ? (
          <button
            onClick={() => setShowNameInput(true)}
            className="text-sm text-green-400 hover:underline"
          >
            ✏️ Name this playlist
          </button>
        ) : (
          <div className="mt-4 space-y-3">

            <input
              type="text"
              placeholder="Enter custom playlist name"
              value={playlistName}
              onChange={(e) => setPlaylistName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg text-black"
            />

            <button
              onClick={() => {
                setShowNameInput(false);
                setPlaylistName("");
              }}
              className="text-xs text-gray-400 hover:text-gray-200"
            >
              Cancel custom name
            </button>

          </div>
        )}

      </div>

        {/* Mode Toggle */}
        <div className="flex mb-6 space-x-4 justify-center">
          <button
            onClick={() => setMode("prompt")}
            className={`px-4 py-2 rounded ${
              mode === "prompt"
                ? "bg-blue-600"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            ✨ Prompt
          </button>

          <button
            onClick={() => setMode("structured")}
            className={`px-4 py-2 rounded ${
              mode === "structured"
                ? "bg-blue-600"
                : "bg-gray-700 hover:bg-gray-600"
            }`}
          >
            🎛 Structured
          </button>
        </div>

        {/* Dynamic Form */}
        {mode === "prompt" ? (
          <input
            type="text"
            placeholder="2 hour indie workout playlist..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="w-full px-4 py-2 rounded-lg text-black mb-4"
          />
        ) : (
          <div className="flex flex-col space-y-4 mb-4">
            <input
              type="number"
              placeholder="Number of songs"
              value={numSongs}
              onChange={(e) => setNumSongs(e.target.value)}
              className="px-4 py-2 rounded-lg text-black"
            />

            <input
              type="number"
              placeholder="Max duration (seconds)"
              value={maxDuration}
              onChange={(e) => setMaxDuration(e.target.value)}
              className="px-4 py-2 rounded-lg text-black"
            />

            <input
              type="text"
              placeholder="Genres (comma separated)"
              value={genres}
              onChange={(e) => setGenres(e.target.value)}
              className="px-4 py-2 rounded-lg text-black"
            />

            <input
              type="text"
              placeholder="Mood"
              value={mood}
              onChange={(e) => setMood(e.target.value)}
              className="px-4 py-2 rounded-lg text-black"
            />
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={generatePlaylist}
          disabled={loading}
          className={`w-full px-6 py-2 rounded-lg font-semibold transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? "Generating..." : "Generate Playlist"}
        </button>

        {/* Result */}
        {playlistUrl && (
          <a
            href={playlistUrl}
            target="_blank"
            rel="noreferrer"
            className="block mt-6 text-center text-green-400 underline"
          >
            Open Playlist on Spotify
          </a>
        )}
      </div>
    </div>
  );
}

export default Dashboard;