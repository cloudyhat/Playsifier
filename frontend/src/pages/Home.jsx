function Home() {
  const API_BASE = import.meta.env.VITE_API_BASE;

  const handleLogin = () => {
    window.location.href = `${API_BASE}/auth/login`;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <h1 className="text-5xl font-bold mb-6">Playsifier 🎵</h1>
      <p className="text-gray-400 mb-8">
        Generate AI-powered Spotify playlists instantly
      </p>
      <button
        onClick={handleLogin}
        className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-lg text-lg font-semibold transition"
      >
        Login with Spotify
      </button>
    </div>
  );
}

export default Home;