import { useState } from "react";
import { apiFetch } from "../api";
import { useAuth } from "../AuthContext";
import DashboardUI from "../ui/DashboardUI";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";

function Dashboard() {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();

  const isPreview = !user;
  const queryMode = searchParams.get("mode");
  const savedMode = localStorage.getItem("dashboardMode");

  const [mode, setMode] = useState(
    queryMode || savedMode || "prompt"
  );

  useEffect(() => {
    if (queryMode === "prompt" || queryMode === "structured") {
      setMode(queryMode);
      localStorage.setItem("dashboardMode", queryMode);
    }
  }, [queryMode]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <DashboardUI
      isPreview={isPreview}
      user={user}
      mode={mode}
      setMode={setMode}
      prompt={prompt}
      setPrompt={setPrompt}
      numSongs={numSongs}
      setNumSongs={setNumSongs}
      maxDuration={maxDuration}
      setMaxDuration={setMaxDuration}
      genres={genres}
      setGenres={setGenres}
      mood={mood}
      setMood={setMood}
      playlistUrl={playlistUrl}
      playlistName={playlistName}
      setPlaylistName={setPlaylistName}
      showNameInput={showNameInput}
      setShowNameInput={setShowNameInput}
      loading={loading}
      generatePlaylist={generatePlaylist}
      isMenuOpen={isMenuOpen}
      setIsMenuOpen={setIsMenuOpen}
      handleLogout={handleLogout}
    />
  );
}

export default Dashboard;