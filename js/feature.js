function create_feature(element, isOdd) {
  // Create the parent div
  const featureParentDiv = document.createElement("div");
  featureParentDiv.classList.add("feature-parent", isOdd ? "odd" : "even");

  // Create the feature-image div
  const featureImageDiv = document.createElement("div");
  featureImageDiv.classList.add("feature-image");

  // Create the image slider div
  const imageSliderDiv = document.createElement("div");
  imageSliderDiv.classList.add("image-slider");

  // Create the ul element for images
  const ulImages = document.createElement("ul");
  ulImages.classList.add("images");
  ulImages.style.transform = "translateX(0px)";

  element.images.forEach((el) => {
    // Create the li element for the image
    const liImage = document.createElement("li");

    // Create the img element
    const imgElement = document.createElement("img");
    imgElement.classList.add("slider-image");
    imgElement.classList.add("feature-slider");
    imgElement.src = el.src;
    imgElement.setAttribute("alt", el.alt);
    // Append imgElement to liImage and liImage to ulImages
    liImage.appendChild(imgElement);
    ulImages.appendChild(liImage);
  });

  const slider1 = document.createElement("div");
  slider1.classList.add("slider");
  slider1.dataset.interval = element.interval ?? 4500;
  slider1.appendChild(ulImages);
  // Append ulImages to imageSliderDiv
  imageSliderDiv.appendChild(slider1);

  // Append imageSliderDiv to featureImageDiv
  featureImageDiv.appendChild(imageSliderDiv);

  // Create the feature-info div
  const featureInfoDiv = document.createElement("div");
  featureInfoDiv.classList.add("feature-info");

  // Create the h2 element for title
  const h2Title = document.createElement("h2");
  h2Title.textContent = element.title;

  // Create the ul element for details
  const ulDetails = document.createElement("ul");

  // Loop through the details array and create li elements for each detail
  for (const detail of element.details) {
    const liDetail = document.createElement("li");
    liDetail.textContent = detail.content;
    ulDetails.appendChild(liDetail);
  }

  // Append h2Title and ulDetails to featureInfoDiv
  featureInfoDiv.appendChild(h2Title);
  featureInfoDiv.appendChild(ulDetails);

  // Append featureImageDiv and featureInfoDiv to featureParentDiv
  featureParentDiv.appendChild(featureImageDiv);
  featureParentDiv.appendChild(featureInfoDiv);

  return featureParentDiv;
}

function create_features() {
  const parent = document.querySelector("#features > div");

  const createdList = [];
  for (let index = 0; index < features.length; index++) {
    const element = features[index];
    let isEven = index % 2 == 0;
    const created = create_feature(element, isEven);

    parent.appendChild(created);
    createdList.push(created);
  }
}
const features = [];

const spotify_integration = {
  images: [
    {
      src: "../images/features/spotify_click.png",
      alt: "MRA Transfer to the Spotify Button",
    },
    {
      src: "../images/features/spotify_playlist.png",
      alt: "Transfered Playlist From MRA",
    },
  ],
  title: "Spotify Integration",
  details: [
    {
      content:
        "Easily connect to Spotify and sync your MRA playlists with just one click",
    },
    {
      content:
        "Discover personalized Spotify recommendations based on your favorite musics you've found with MRA.",
    },
  ],
};

const playlistFeature = {
  images: [
    {
      src: "../images/features/create_playlist.png",
      alt: "Create Playlist Menu",
    },
    {
      src: "../images/features/add_to_playlist.png",
      alt: "Adding Music to a playlist in MRA",
    },
  ],
  title: "Playlists",
  details: [
    {
      content: "Create, orginize, share your custom playlists.",
    },
  ],
};
const backup = {
  images: [
    {
      src: "../images/features/backup.png",
      alt: "History and Liked Musics Backup Menu in MRA",
    },
  ],
  title: "Backup Feature",
  details: [
    {
      content: "Easily save and restore your MRA history and liked music.",
    },
  ],
};

const synced_music = {
  images: [
    {
      src: "../images/features/synced_lyrics.png",
      alt: "Karaoke-like synced music and lyrics in MRA",
    },
  ],
  title: "Synced Music Lyrics",
  details: [
    {
      content: "Enjoy karaoke-style lyrics synced perfectly with your musics.",
    },
  ],
};

const artist = {
  images: [
    {
      src: "../images/features/artist_details.png",
      alt: "Detailed Artist Profile Page in MRA",
    },
  ],
  title: "Detailed Artist Profiles",
  details: [
    {
      content:
        "Dive deep into artist profiles, explore their music, albums, and save them directly to your library.",
    },
    {
      content: "And also explore musics from the same album with ease..",
    },
  ],
};

features.push(spotify_integration);
features.push(playlistFeature);
features.push(backup);
features.push(synced_music);
features.push(artist);
window.addEventListener("load", function () {
  create_features();
});
