import { useState } from "react";
import { apiFetch } from "../api";

function Dashboard() {
  const [prompt, setPrompt] = useState("");
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generatePlaylist = async () => {
    setLoading(true);
    setPlaylistUrl("");

    try {
      const response = await apiFetch(
        "/playlist/generate-from-prompt",
        {
          method: "POST",
          body: JSON.stringify({ prompt }),
        }
      );

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

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center pt-20">
      <h2 className="text-3xl font-bold mb-6">Create Your Playlist</h2>

      <input
        type="text"
        placeholder="2 hour indie workout playlist..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="w-96 px-4 py-2 rounded-lg text-black mb-4"
      />

      <button
        onClick={generatePlaylist}
        disabled={loading}
        className={`px-6 py-2 rounded-lg font-semibold transition ${
          loading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-600"
        }`}
      >
        {loading ? "Generating..." : "Generate"}
      </button>

      {playlistUrl && (
        <a
          href={playlistUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-6 text-green-400 underline"
        >
          Open Playlist on Spotify
        </a>
      )}
    </div>
  );
}

export default Dashboard;