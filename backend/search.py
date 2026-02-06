import spotipy
from spotipy.oauth2 import SpotifyOAuth

sp = spotipy.Spotify(auth_manager=SpotifyOAuth(
    client_id="63c9ec7fa30240169226e26a8220393a",
    client_secret="9e1379ac7bb94ca584d21c5e5af06726",
    redirect_uri="http://127.0.0.1:8000/callback",
    scope="user-library-read"
))

results = sp.current_user_saved_tracks(limit=30)
for idx, item in enumerate(results['items']):
    track = item['track']
    print(idx, track['artists'][0]['name'], " – ", track['name'])