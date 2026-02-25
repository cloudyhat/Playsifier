import { useState } from "react";

function DashboardUI({
  isPreview,
  user,
  mode,
  setMode,
  prompt,
  setPrompt,
  numSongs,
  setNumSongs,
  maxDuration,
  setMaxDuration,
  genres,
  setGenres,
  mood,
  setMood,
  playlistUrl,
  playlistName,
  setPlaylistName,
  showNameInput,
  setShowNameInput,
  loading,
  generatePlaylist,
  isMenuOpen,
  setIsMenuOpen,
  handleLogout
}) {
  // Local state to manage the mode switching dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-[#1A0F1E] text-[#D6DDC3] font-['Segoe_UI',_sans-serif] overflow-hidden">
      
      {/* NAVBAR */}
      <div className="absolute top-6 left-8 z-40">
        <h1 className="text-[32px] font-black tracking-wider uppercase text-[#D6DDC3] leading-none">
          PLAYSIFIER
        </h1>
      </div>

      {/* PROFILE BUTTON (TOP RIGHT) */}
      <button
        onClick={() => setIsMenuOpen(true)}
        className="absolute top-6 right-8 z-40 focus:outline-none"
      >
        {user?.image_url ? (
          <img
            src={user.image_url}
            alt="profile"
            className="w-10 h-10 rounded-full object-cover bg-gray-400"
          />
        ) : (
          <div className="w-10 h-10 bg-[#D9D9D9]/[0.27] rounded-full"></div>
        )}
      </button>

      {/* MAIN CONTENT */}
      <div className={`flex flex-col items-center justify-center min-h-screen transition px-4 ${isPreview ? "blur-md" : ""}`}>
        <div className="w-full max-w-2xl mt-8">
          
          <h2 className="text-[40px] font-semibold mb-2 leading-tight">
            Welcome, {user?.display_name || "Dark"}!
          </h2>
          <p className="text-[32px] font-semibold text-[#AEB59C] mb-8 leading-tight">
            What kind of playlist you want ?
          </p>

          {/* MAIN INPUT CONTAINER */}
          <div className="bg-[#D9D9D9]/[0.27] p-6 rounded-2xl relative shadow-lg">
            
            {mode === "structured" ? (
              <div className="space-y-3">
                <p className="text-[#8E947F] text-sm mb-4 px-2">
                  Fill out the below to generate your playlist:
                </p>
                <input
                  type="number"
                  placeholder="Number of songs"
                  value={numSongs}
                  onChange={(e) => setNumSongs(e.target.value)}
                  className="w-full bg-black/20 text-[#D6DDC3] placeholder-[#8E947F] px-5 py-2.5 rounded-full outline-none focus:ring-1 focus:ring-[#8E947F]/50 transition-all"
                />
                <input
                  type="number"
                  placeholder="Max duration (seconds)"
                  value={maxDuration}
                  onChange={(e) => setMaxDuration(e.target.value)}
                  className="w-full bg-black/20 text-[#D6DDC3] placeholder-[#8E947F] px-5 py-2.5 rounded-full outline-none focus:ring-1 focus:ring-[#8E947F]/50 transition-all"
                />
                <input
                  type="text"
                  placeholder="Genres (comma separated)"
                  value={genres}
                  onChange={(e) => setGenres(e.target.value)}
                  className="w-full bg-black/20 text-[#D6DDC3] placeholder-[#8E947F] px-5 py-2.5 rounded-full outline-none focus:ring-1 focus:ring-[#8E947F]/50 transition-all"
                />
                <input
                  type="text"
                  placeholder="Mood"
                  value={mood}
                  onChange={(e) => setMood(e.target.value)}
                  className="w-full bg-black/20 text-[#D6DDC3] placeholder-[#8E947F] px-5 py-2.5 rounded-full outline-none focus:ring-1 focus:ring-[#8E947F]/50 transition-all"
                />
              </div>
            ) : (
              <textarea
                placeholder="2 hour rock workout playlist..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="w-full bg-transparent text-[#D6DDC3] placeholder-[#8E947F] px-2 py-1 outline-none resize-none h-16 text-[24px] font-semibold text-[#AEB59C] mb-8 leading-tight"
              />
            )}

            {/* BOTTOM ROW (Name Playlist + Buttons) */}
            <div className="flex justify-between items-center mt-4 px-2">
              
              {/* Playlist Name Input */}
              <div className="text-sm text-[#8E947F] flex items-center">
                {!showNameInput ? (
                  <button
                    onClick={() => setShowNameInput(true)}
                    className="flex items-center gap-2 text-[#D6DDC3] hover:text-[#AEB59C] transition-colors"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                    Name your playlist
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                    </svg>
                    <input
                      autoFocus
                      type="text"
                      placeholder="Enter name..."
                      value={playlistName}
                      onChange={(e) => setPlaylistName(e.target.value)}
                      onBlur={() => {
                        if (!playlistName) setShowNameInput(false);
                      }}
                      className="bg-transparent text-[#D6DDC3] placeholder-[#8E947F] border-b border-[#8E947F] outline-none pb-0.5 w-40"
                    />

                    <button
                      onClick={() => {
                        setShowNameInput(false);
                        setPlaylistName("");
                      }}
                      className="text-xs hover:text-gray-200"
                    >
                      ✕
                    </button>
                  </div>
                )}
              </div>

              {/* Mode Switcher & Submit */}
              <div className="flex items-center gap-4 relative">
                
                {/* Dropdown Toggle */}
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="bg-black/40 border border-transparent hover:border-[#8E947F]/50 text-[#D6DDC3] px-4 py-1.5 rounded-full text-sm flex items-center gap-2 transition-all shadow-sm"
                >
                  {mode === "prompt" ? "Prompt" : "Structured"}
                  <svg 
                    className={`w-4 h-4 fill-current text-[#D6DDC3] transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                    viewBox="0 0 24 24"
                  >
                    <path d="M7 10l5 5 5-5z" />
                  </svg>
                </button>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute bottom-12 right-10 w-36 bg-[#1A0F1E] border border-[#8E947F]/30 text-[#D6DDC3] rounded-lg shadow-2xl overflow-hidden z-20">
                    <button
                      onClick={() => {
                        setMode("prompt");
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${mode === "prompt" ? "bg-white/10 font-semibold" : "hover:bg-white/5"}`}
                    >
                      Prompt
                    </button>
                    <button
                      onClick={() => {
                        setMode("structured");
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${mode === "structured" ? "bg-white/10 font-semibold" : "hover:bg-white/5"}`}
                    >
                      Structured
                    </button>
                  </div>
                )}
                {/* Generate Button */}
                <button
                  onClick={generatePlaylist}
                  disabled={loading}
                  className="text-[#D6DDC3] hover:text-white transition disabled:opacity-50"
                >
                  {loading ? (
                    <span className="text-sm tracking-widest animate-pulse">...</span>
                  ) : (
                    <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* LINK PILL (Below container) */}
          <div className="mt-6 flex justify-center h-10 items-center transition-all duration-300">
            {loading ? (
              /* 1. LOADING STATE */
              <div className="bg-black/20 border border-[#8E947F]/30 text-[#D6DDC3] px-16 py-1.5 rounded-full text-sm flex items-center gap-3 animate-pulse shadow-sm">
                <svg className="w-4 h-4 animate-spin text-[#D6DDC3]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Generating Playlist...
              </div>
            ) : playlistUrl ? (
              /* 2. SUCCESS STATE (Link Generated) */
              <a
                href={playlistUrl}
                target="_blank"
                rel="noreferrer"
                className="bg-black/40 border border-[#8E947F]/50 text-[#D6DDC3] font-semibold px-20 py-1.5 rounded-full text-sm flex items-center gap-2 hover:bg-black/60 hover:text-white hover:scale-105 transition-all shadow-lg"
              >
                Open Playlist
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                </svg>
              </a>
            ) : (
              /* 3. INITIAL STATE (Waiting for input) */
              <div className="bg-[#D9D9D9]/[0.05] border border-[#8E947F]/20 text-[#8E947F]/60 px-16 py-1.5 rounded-full text-sm cursor-default select-none">
                Playlist link will appear here
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SLIDE MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-[#2D2331] shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-8">
          <div className="flex justify-between items-start mb-12">
            {/* Menu Avatar */}
            {user?.image_url ? (
              <img
                src={user.image_url}
                alt="profile"
                className="w-12 h-12 rounded-full object-cover bg-gray-400"
              />
            ) : (
              <div className="w-12 h-12 bg-[#D9D9D9]/[0.27] rounded-full"></div>
            )}

            <button
              onClick={() => setIsMenuOpen(false)}
              className="text-[#D6DDC3] text-2xl leading-none hover:text-white transition"
            >
              ✕
            </button>
          </div>

          <div className="flex flex-col gap-5 text-sm">
            <button className="text-left text-[#D6DDC3] hover:text-white transition">
              My Playlists
            </button>
            <button
              onClick={handleLogout}
              className="text-left text-[#D6DDC3] hover:text-red-400 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* MENU BACKDROP */}
      {isMenuOpen && (
        <div
          onClick={() => setIsMenuOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
        />
      )}

      {/* PREVIEW OVERLAY (Gated content) */}
      {isPreview && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#1A0F1E]/80 backdrop-blur-md z-50">
          <div className="bg-[#D9D9D9]/[0.27] p-8 rounded-2xl text-center shadow-2xl max-w-md w-full mx-4">
            <h2 className="text-lg text-[#D6DDC3] mb-6">
              Connect your Spotify to access Dashboard
            </h2>
            <button
              onClick={() =>
                (window.location.href = `${import.meta.env.VITE_API_BASE}/auth/login`)
              }
              className="bg-black/50 border border-[#8E947F]/30 text-[#D6DDC3] font-semibold px-8 py-2.5 rounded-full hover:bg-black/70 hover:border-[#8E947F]/60 transition-all shadow-md"
            >
              Connect Spotify
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default DashboardUI;