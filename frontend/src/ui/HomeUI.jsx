function HomeUI({ handleLogin, openPromptMode, openStructuredMode, openPreviewDashboard }) {
  return (
    <div className="bg-[#1A0F1E] text-[#D6DDC3] font-['Segoe_UI',_sans-serif] min-h-screen overflow-x-hidden">
      
      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-10 py-6 max-w-7xl mx-auto w-full">
        <div>
          {/* Ensure you save your logo image in the public folder as logo.png */}
          <img src="/logo.svg" alt="Playsifier" className="h-12 w-auto object-contain" />
        </div>
        <div className="flex items-center space-x-8 text-sm font-semibold">
          <a href="mailto:your.email@example.com" className="hover:text-white transition-colors">Contact</a>
          <button 
            onClick={openPreviewDashboard} 
            className="px-5 py-2 rounded-full border border-[#D6DDC3]/30 hover:bg-[#D6DDC3]/10 hover:border-[#D6DDC3]/60 transition-all duration-300 active:scale-95"
          >
            Dashboard
          </button>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="flex flex-col items-center text-center mt-12 px-6 max-w-4xl mx-auto">
        <h1 className="text-[64px] font-black tracking-wide leading-tight text-[#D6DDC3]">
          PLAYSIFIER
        </h1>

        <p className="text-xl mt-3 text-[#AEB59C] font-semibold">
          A well-suited spotify list according to your taste
        </p>

        <div className="flex flex-wrap justify-center gap-5 mt-10">
          <button 
            onClick={openPromptMode} 
            className="bg-[#570F0F] text-[#D6DDC3] px-6 py-3 rounded-full text-[17px] font-semibold shadow-lg shadow-[#570F0F]/20 hover:bg-[#6e1313] hover:shadow-[#570F0F]/40 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 ease-in-out"
          >
            Create Your Personalized Playlist
          </button>

          <button
            onClick={handleLogin}
            className="bg-[#286400] text-[#D6DDC3] px-6 py-3 rounded-full text-[17px] font-semibold shadow-lg shadow-[#286400]/20 hover:bg-[#348000] hover:shadow-[#286400]/40 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 ease-in-out"
          >
            Connect Your Spotify
          </button>
        </div>
      </section>

      
      {/* BIG GRADIENT CARD - Mesh Gradient / Ambient Stage Lighting */}
      <section className="px-10 max-w-7xl mx-auto mt-16">
        <div className="relative h-[32rem] w-full rounded-2xl bg-[#E2F0CB] shadow-2xl overflow-hidden flex items-center justify-center">
          
          {/* Glowing Ambient Orbs for Fluid Blending */}
          <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[90%] bg-[#F4C5D9] rounded-full blur-[100px] opacity-90"></div>
          <div className="absolute -bottom-[20%] -right-[10%] w-[70%] h-[90%] bg-[#009A8D] rounded-full blur-[120px] opacity-80"></div>
          
          {/* Heavy Glass Overlay to melt the colors together seamlessly */}
          <div className="absolute inset-0 bg-white/10 backdrop-blur-[60px]"></div>
          {/* Floating Playlist Cards (Fanned Layout) */}
          <div className="relative z-10 flex items-center justify-center">
            
            {/* Image 1 (Far Left) */}
            <img 
              src="/happy.png" 
              alt="Playlist 1" 
              className="w-32 md:w-56 h-auto rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.8)] -rotate-12 translate-y-8 z-10 -mr-20 md:-mr-36 hover:rotate-0 hover:translate-y-0 hover:scale-110 hover:z-50 transition-all duration-500 cursor-pointer" 
            />
            
            {/* Image 2 */}
            <img 
              src="/random2.png" 
              alt="Playlist 2" 
              className="w-40 md:w-64 h-auto rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.8)] -rotate-6 translate-y-4 z-20 -mr-20 md:-mr-36 hover:rotate-0 hover:translate-y-0 hover:scale-110 hover:z-50 transition-all duration-500 cursor-pointer" 
            />
            
            {/* Image 3 */}
            <img 
              src="/rock.png" 
              alt="Playlist 3" 
              className="w-48 md:w-72 h-auto rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.8)] -rotate-3 translate-y-1 z-30 -mr-20 md:-mr-36 hover:rotate-0 hover:translate-y-0 hover:scale-110 hover:z-50 transition-all duration-500 cursor-pointer" 
            />
            
            {/* Image 4 (Center - Largest & Front) */}
            <img 
              src="/jazz.png" 
              alt="Playlist 4" 
              className="w-56 md:w-80 h-auto rounded-xl shadow-[0_0_40px_rgba(0,0,0,0.9)] z-40 hover:scale-105 hover:z-50 transition-all duration-500 cursor-pointer border border-white/10" 
            />
            
            {/* Image 5 */}
            <img 
              src="/indie.png" 
              alt="Playlist 5" 
              className="w-48 md:w-72 h-auto rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.8)] rotate-3 translate-y-1 z-30 -ml-20 md:-ml-36 hover:rotate-0 hover:translate-y-0 hover:scale-110 hover:z-50 transition-all duration-500 cursor-pointer" 
            />
            
            {/* Image 6 */}
            <img 
              src="/tame.png" 
              alt="Playlist 6" 
              className="w-40 md:w-64 h-auto rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.8)] rotate-6 translate-y-4 z-20 -ml-20 md:-ml-36 hover:rotate-0 hover:translate-y-0 hover:scale-110 hover:z-50 transition-all duration-500 cursor-pointer" 
            />
            
            {/* Image 7 (Far Right) */}
            <img 
              src="/mix.png" 
              alt="Playlist 7" 
              className="w-32 md:w-56 h-auto rounded-xl shadow-[0_0_20px_rgba(0,0,0,0.8)] rotate-12 translate-y-8 z-10 -ml-20 md:-ml-36 hover:rotate-0 hover:translate-y-0 hover:scale-110 hover:z-50 transition-all duration-500 cursor-pointer" 
            />

          </div>
          
        </div>
      </section>

      {/* SUBTEXT */}
      <p className="text-center text-[15px] text-[#AEB59C] mt-8 mb-8 font-medium">
        A service made for Spotify Users
      </p>

      {/* MOVING GREEN STRIP */}
      <div className="w-full bg-[#286400] overflow-hidden py-5 shadow-xl border-y border-[#D6DDC3]/20 relative group">
        {/* 'group-hover' pauses the animation so users can actually read it */}
        <div className="flex whitespace-nowrap animate-marquee group-hover:[animation-play-state:paused] text-[15px] uppercase tracking-widest font-black text-[#D6DDC3] transition-all duration-300">
          
          {/* Repeating the content ensures a perfectly seamless loop without blank gaps */}
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center">
              <span className="mx-8">Integrated with your Spotify Account</span>
              <span className="text-[#AEB59C]/60 text-xl leading-none">•</span>
              <span className="mx-8 text-[#D6DDC3]/80">Integration with other apps coming soon</span>
              <span className="text-[#AEB59C]/60 text-xl leading-none">•</span>
            </div>
          ))}

        </div>
      </div>

      {/* FEATURES SECTION */}
      <section className="max-w-6xl mx-auto px-10 py-28 space-y-32">
        
        {/* Feature 1 (Text Left, Image Right) */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-16">
          <div className="flex-1 max-w-md">
            <h3 className="text-[28px] font-bold mb-4">Prompt-Based</h3>
            <p className="text-[15px] text-[#AEB59C] leading-relaxed mb-8">
              Turn your thoughts into perfectly curated playlists using natural language.<br />
              Describe the vibe, mood, or moment and let AI craft the soundtrack.
            </p>
            <button 
              onClick={openPromptMode} 
              className="bg-[#570F0F] text-[#D6DDC3] px-6 py-3 rounded-full text-[17px] font-semibold shadow-md shadow-[#570F0F]/20 hover:bg-[#6e1313] hover:shadow-lg hover:shadow-[#570F0F]/40 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 ease-in-out"
            >
              Generate Playlists
            </button>
          </div>
          <div className="flex-1 w-full h-80 rounded-2xl bg-gradient-to-br from-pink-200 to-pink-300 shadow-xl relative overflow-hidden flex items-center justify-center group">
            {/* Texture overlay */}
            <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
            {/* Glowing Icon */}
            <div className="relative z-10 bg-white/20 p-6 rounded-full shadow-[0_0_40px_rgba(255,255,255,0.6)] group-hover:scale-110 transition-transform duration-500">
              <svg className="w-16 h-16 text-[#570F0F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Feature 2 (Image Left, Text Right) */}
        <div className="flex flex-col md:flex-row-reverse justify-between items-center gap-16">
          <div className="flex-1 max-w-md">
            <h3 className="text-[28px] font-bold mb-4">
              Rhythm-Based Structured Engine
            </h3>
            <p className="text-[15px] text-[#AEB59C] leading-relaxed mb-8">
              Build playlists using precise filters like mood, genre, energy, and era.<br />
              A structured engine designed for consistent, personalized results.
            </p>
            <button 
              onClick={openStructuredMode} 
              className="bg-[#570F0F] text-[#D6DDC3] px-6 py-3 rounded-full text-[17px] font-semibold shadow-md shadow-[#570F0F]/20 hover:bg-[#6e1313] hover:shadow-lg hover:shadow-[#570F0F]/40 hover:-translate-y-0.5 active:scale-95 transition-all duration-300 ease-in-out"
            >
              Start Generating
            </button>
          </div>
          <div className="flex-1 w-full h-80 rounded-2xl bg-gradient-to-tr from-[#DDB5DD] to-[#F1E0F1] shadow-xl relative overflow-hidden flex items-center justify-center group">
             {/* Glowing Icon */}
             <div className="relative z-10 bg-white/30 p-6 rounded-2xl shadow-[0_0_40px_rgba(255,255,255,0.5)] group-hover:scale-110 transition-transform duration-500">
              <svg className="w-16 h-16 text-[#570F0F]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
            </div>
          </div>
        </div>

      </section>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto px-10 py-16 border-t border-[#8E947F]/20 flex flex-col md:flex-row justify-between gap-10">
        
        <div className="max-w-xs">
          <p className="font-bold text-lg mb-2">PLAYSIFIER</p>
          <p className="text-[#AEB59C] text-[13px] mb-6 leading-relaxed">
            Intelligent engine for creating perfectly tailored playlists in seconds.
          </p>
          
          {/* Social Icons - Using simple SVG placeholders */}
          <div className="flex gap-4 text-[#D6DDC3]">
            <a href="https://github.com/yourusername" target="_blank" rel="noreferrer" className="hover:text-white hover:-translate-y-1 transition-transform duration-300">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
            <a href="#" className="hover:text-white hover:-translate-y-1 transition-transform duration-300">
               <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="#" className="hover:text-white hover:-translate-y-1 transition-transform duration-300">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
            </a>
          </div>
        </div>

        <div className="flex gap-24 text-[13px]">
          <div>
            <p className="font-semibold mb-4 text-[#D6DDC3]">Features</p>
            <div className="space-y-3 text-[#AEB59C]">
              <p>Prompt-Based generation</p>
              <p>Form - Based generation</p>
              <p>Rhythm-Based Analyzer</p>
              <p>Spotify Integrated</p>
            </div>
          </div>
          <div>
            <p className="font-semibold mb-4 text-[#D6DDC3]">Support</p>
            <div className="space-y-3 text-[#AEB59C] flex flex-col items-start">
              <a href="mailto:your.email@example.com" className="hover:text-white transition-colors">
                Contact
              </a>
            </div>
          </div>
        </div>
        
      </footer>

    </div>
  );
}

export default HomeUI;