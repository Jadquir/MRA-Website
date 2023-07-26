const urlParams = new URLSearchParams(window.location.search);

try {
  const music_id = urlParams.get("id");
  if (music_id !== null || music_id.length !== 0) {
    window.location.replace(`./music.html?id=${music_id}`);
  }
} catch (error) {}
try {
  const playlist_id = urlParams.get("p");
  if (playlist_id !== null || playlist_id.length !== 0) {
    window.location.replace(`./playlist.html?id=${playlist_id}`);
  }
} catch (error) {}
