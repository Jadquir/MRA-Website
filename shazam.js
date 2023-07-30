async function getObjectFromHttpPost(url) {
    try {
      const response = await fetch(url, {
        mode: 'cors',
        headers: {
          'Origin': 'https://jadquir.com/',
        }
      });
  
      if (!response.ok) {
        throw new Error("HTTP request failed");
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error getObjectFromHttpGet:", error.message);
      return null;
    }
  }const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function get_music(id) {
 
  try {
    return await getObjectFromHttpPost(`https://get-music-vh7xzcelwq-uc.a.run.app?id=${id}`);
  } catch (error) {
    // Handle errors
    console.error(error);
  }
  return null;
}

function GetImagePath(MusicImageLink, newSize) {
    if (!MusicImageLink) {
      return '';
    }
    var orgLink = MusicImageLink;
    var lastSlashIndex = orgLink.lastIndexOf('/');
    var baseUrl = orgLink.substring(0, lastSlashIndex + 1);
    var lastPart = orgLink.substring(lastSlashIndex + 1);
    var size = '';
    
    for (var i = 0; i < lastPart.length; i++) {
      if (!isNaN(parseInt(lastPart[i]))) {
        size += lastPart[i];
      } else {
        break;
      }
    }
    
    var lowFileName = lastPart.replaceAll(size, newSize.toString());
    return baseUrl + lowFileName;
  }
async function get_music_detail() {
  const urlParams = new URLSearchParams(window.location.search);
  const music_id = urlParams.get("id");
  if (music_id === null || music_id.length === 0) {
    return null;
  }
  let music = await get_music(music_id);
  if(music === null){
    return null
  }
  music.Images = GetImagePath(music.Images, 400);
  return music;
}

function resize_titles() {
  var maxWidth = 0;
  $(".info-title").each(function () {
    // Get the width of the current element
    var width = $(this).width();

    // Update the maximum width if necessary
    if (width > maxWidth) {
      maxWidth = width;
    }
  });
  maxWidth += 10;

  $(".info-title").css("min-width", maxWidth + "px");
}
function setMetaTags(title, description, imageUrl) {
  // Set the page title
  document.title = title;

  // Remove existing meta tags (if any)
  var existingMetaTags = document.querySelectorAll("meta");
  existingMetaTags.forEach(function (metaTag) {
    var property = metaTag.getAttribute("property");
    var name = metaTag.getAttribute("name");
    if (
      property === "og:title" ||
      property === "og:description" ||
      property === "og:image" ||
      name === "twitter:title" ||
      name === "twitter:description" ||
      name === "twitter:image"
    ) {
      metaTag.remove();
    }
  });

  // Create new meta tags
  var metaTags = [
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: imageUrl },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
  ];

  metaTags.forEach(function (tag) {
    var metaTag = document.createElement("meta");

    for (var key in tag) {
      metaTag.setAttribute(key, tag[key]);
    }

    document.head.appendChild(metaTag);
  });
}
function fade_out(){
  const overlay = document.querySelector('.mra-overlay');
  overlay.classList.add('closed');
}
function updateUI(music){
    console.log(music);
    const main = document.querySelector("#main");
    if (music === null) {
      main.innerHTML = "<h1>Something went wrong!</h1>";
      fade_out();
      return;
    }
    const image = document.querySelector(".music_image");
    const details = document.querySelector(".details");
    const openmra = document.querySelector("#open-mra-href");
    openmra.setAttribute("href",`mra://music/${music.Id}`)
  
    const image_src = (music === null || music.Images === null ||music.Images.length ===0) ? "../images/default.png" : music.Images;
    image.setAttribute("src", image_src);

    $("#bg-image").css("background-image",`url("${image_src}")`);
  
    function create_info(title, value) {
      // Create the parent div element
      var parentDiv = document.createElement("div");
      parentDiv.className = "info-parent";
  
      // Create the title span element
      var titleSpan = document.createElement("span");
      titleSpan.className = "info-title";
      titleSpan.textContent = title;
  
      // Create the text span element
      var textSpan = document.createElement("div");
      textSpan.className = "info-sep";
      textSpan.textContent = ":";
  
      // Create the text span element
      var textSpan = document.createElement("span");
      textSpan.className = "info-text";
      textSpan.textContent = value;
  
      if (value == null || value.length === 0) {
        parentDiv.style.display = "none";
      }
      // Append the title and text spans to the parent div
      parentDiv.appendChild(titleSpan);
      parentDiv.appendChild(textSpan);
      return parentDiv;
    }
    function create_title(value) {
      // Create the parent div element
      var parentDiv = document.createElement("div");
      parentDiv.className = "title-parent";
      // Create the text span element
      var textSpan = document.createElement("span");
      textSpan.className = "info-text";
      textSpan.textContent = value;
  
      // Append the title and text spans to the parent div
      parentDiv.appendChild(textSpan);
      return parentDiv;
    }
  
    details.innerHTML = "";
    details.appendChild(create_title(music.Title));
    details.appendChild(create_info("Artist", music.Artist));
    details.appendChild(create_info("Album", music.Album));
    details.appendChild(create_info("Genre", music.Genre));
    details.appendChild(create_info("Release Year", music.ReleaseYear));
    
    fade_out();
}

get_music_detail().then(function (result) {
  const music = result;
  if (music === null) {
    setMetaTags(
      "Something went wrong!",
      "",
      "https://mra.jadquir.com/images/logo.png"
    );
  } else {
    setMetaTags(
      `${music.Title} by ${music.Artist} - MRA - Jadquir`,
      "MRA (short for Music Recognition Application) is a music recognition application, or music identifier, like Shazam but for PC.",
      music.Images
    );
  }
 // Check if the page has already loaded
 if (document.readyState === 'complete') {
    // If the page has loaded, update the UI immediately
    updateUI(music);
  } else {
    // If the page is still loading, wait for it to finish
    $(document).ready(function() {
      updateUI(music);
    });
  }

});
