<h1>🎵 Playsifier</h1>
<h2>Smart Spotify Playlist Generator</h2>

<p>
  <strong>Playsifier</strong> is a Spotify-connected application that automatically creates playlists
  inside a user’s Spotify account based on custom preferences or natural language prompts.
</p>

<p>
  The project is being built to deeply understand Spotify’s recommendation ecosystem,
  backend architecture, and prompt-to-logic conversion by implementing everything from scratch.
</p>

<h3>🚧 Current Status</h3>
<ul>
  <li>Backend development in progress</li>
  <li>Frontend integration is currently being added</li>
  <li>Natural language understanding uses rule-based parsing (MCP); LLM integration is planned</li>
</ul>

<h3>✨ Features</h3>
<ul>
  <li>Spotify OAuth authentication</li>
  <li>Fetch songs directly from the user’s Spotify library</li>
  <li>Automatic playlist creation inside Spotify</li>
  <li>
    Two playlist creation modes:
    <ul>
      <li>Natural language prompt-based</li>
      <li>Structured user input (form-based)</li>
    </ul>
  </li>
  <li>
    Filter support for:
    <ul>
      <li>Genre</li>
      <li>Artist</li>
      <li>Mood</li>
      <li>Popularity</li>
      <li>Duration</li>
      <li>Explicit content</li>
      <li>Audio features (energy, valence, danceability, etc.)</li>
    </ul>
  </li>
  <li>Modular and extensible backend architecture</li>
</ul>

<h3>🐳 Quick Start with Docker</h3>

<p>
  The easiest way to run Playsifier is using Docker and Docker Compose:
</p>

<pre><code class="language-bash"># 1. Clone the repository
git clone https://github.com/yourusername/Playsifier
cd Playsifier

# 2. Setup environment (Windows)
setup-docker.bat

# Or Linux/Mac:
./setup-docker.sh

# 3. Or manually:
cp .env.example .env
# Edit .env with your Spotify API credentials
docker-compose up -d
</code></pre>

<p>
  <strong>Access URLs:</strong>
</p>
<ul>
  <li>Frontend: http://localhost:5173</li>
  <li>Backend API: http://localhost:8000</li>
  <li>API Documentation: http://localhost:8000/docs</li>
</ul>

<p>
  See <a href="DOCKER_DEPLOYMENT.md">DOCKER_DEPLOYMENT.md</a> for detailed deployment instructions.
</p>

<h3>🎼 Playlist Generation Logic</h3>
<p>
  Playsifier follows a transparent, filter-driven approach to playlist generation.
</p>

<h4>1️⃣ Song Collection</h4>
<ul>
  <li>Retrieves tracks from the user’s Spotify library</li>
  <li>Fetches track metadata, artist genres, and audio features</li>
</ul>

<h4>2️⃣ Playlist Creation Modes</h4>

<h5>🧠 Natural Language Prompt Handling</h5>
<p>Users can describe a playlist in plain English, for example:</p>

<pre>
Create a playlist with 25 chill indie acoustic songs under 3 minutes for early mornings
</pre>

<p>The system:</p>
<ul>
  <li>Parses the prompt using MCP (rule-based logic)</li>
  <li>Extracts intent such as song count, genres, mood, and duration</li>
  <li>Converts the prompt into structured filters</li>
  <li>Applies these filters to the user’s song collection</li>
</ul>

<p>
  <em>LLM-based prompt understanding will be added in future versions.</em>
</p>

<h5>📝 Structured User Input (Form-Based)</h5>
<p>Users can also generate playlists by directly selecting attributes such as:</p>
<ul>
  <li>Genre</li>
  <li>Artist</li>
  <li>Minimum and maximum duration</li>
  <li>Popularity range</li>
  <li>Mood</li>
  <li>Explicit content preference</li>
</ul>

<p>
  These inputs are converted directly into filtering rules and applied deterministically.
</p>

<h4>3️⃣ Filtering &amp; Selection</h4>
<p>Tracks are filtered using:</p>
<ul>
  <li>Metadata constraints (duration, popularity, explicit)</li>
  <li>Genre matching via artist genres</li>
  <li>Audio feature thresholds</li>
</ul>
<p>
  The top <strong>N</strong> matching tracks are selected.
</p>

<h4>4️⃣ Playlist Creation</h4>
<ul>
  <li>A new playlist is created in the user’s Spotify account</li>
  <li>Selected tracks are added automatically</li>
  <li>The playlist becomes instantly available in Spotify</li>
</ul>

<p>
  Playsifier is designed as a learning-focused, extensible system that can evolve from
  rule-based logic to ML and LLM-powered recommendations over time.
</p>
