async function getObjectFromHttpGet(url) {
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

async function get_playlist(id) {
 
  try {
    return await getObjectFromHttpGet(`http://127.0.0.1:5001/mra-musicidentifier/us-central1/get_playlist_site?playlistId=${id}`);
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
async function get_playlist_detail() {
  const urlParams = new URLSearchParams(window.location.search);
  const music_id = urlParams.get("id");
  if (music_id === null || music_id.length === 0) {
    return null;
  }
  let response = await get_playlist(music_id);
  if(response === undefined|| response === null){
    return null
  } 
  if(response.success === null || response.success === false ){
    return null
  }
  const  playlist=  response.playlist;


  playlist.Thumbnail = GetImagePath(playlist.Thumbnail, 400);
  return playlist;
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
function updateUI(playlist){
    console.log(playlist);
    const main = document.querySelector("#main");
    if (playlist === null) {
      main.innerHTML = "<h1>Something went wrong!</h1>";
      fade_out();
      return;
    }
    const image = document.querySelector(".music_image");
    const details = document.querySelector(".details");
    const openmra = document.querySelector("#open-mra-href");
    openmra.setAttribute("href",`mra://playlist/${playlist.playlistId}`)
  
    const image_src = (playlist === null || playlist.Thumbnail === null ||playlist.Thumbnail.length ===0) ? "./images/default.png" : playlist.Thumbnail;
    image.setAttribute("src", image_src);

    $("#bg-image").css("background-image",`url("${image_src}")`);
    function whitenHexColor(hexColor, amount) {
      // Remove the '#' symbol if present
      hexColor = hexColor.replace('#', '');
    
      // Convert the hex color to an RGB representation
      const red = parseInt(hexColor.substring(0, 2), 16);
      const green = parseInt(hexColor.substring(2, 4), 16);
      const blue = parseInt(hexColor.substring(4, 6), 16);
    
      // Adjust the RGB values to lighten the color
      const whitenRed = Math.min(255, red + amount);
      const whitenGreen = Math.min(255, green + amount);
      const whitenBlue = Math.min(255, blue + amount);
    
      // Convert the new RGB values back to a hex color
      const whitenHexColor = `#${(whitenRed << 16 | whitenGreen << 8 | whitenBlue).toString(16).padStart(6, '0')}`;
    
      return whitenHexColor;
    }
    function create_info(title, value,color,isOverflow) {

      // Create the parent div element
      var parentDiv = document.createElement("div");
      parentDiv.className = "info-parent";
  
      // Create the title span element
      var titleSpan = document.createElement("span");
      titleSpan.className = "info-title";
      titleSpan.textContent = title;
  
      // Create the text span element
      var textSpan = document.createElement("span");
      textSpan.className = "info-text";
      textSpan.textContent = value;
      
      if(color !== undefined  && color !== null){
        const color1 = "#" + color;
        textSpan.classList.add("glowing-text"),
        textSpan.style.setProperty("--text-color", whitenHexColor(color1,50));
        textSpan.style.setProperty("--glow-color", color1);
      }
      
      if(isOverflow !== undefined  && isOverflow !== null){
        if(isOverflow ===  true){

          textSpan.style.overflowY  =  "auto";
        }
      }
  
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
    details.appendChild(create_title(playlist.Title));
    details.appendChild(create_info("Description:", playlist.Description,null,true));
    details.appendChild(create_info("Created By:", playlist.OwnerName,playlist.OwnerColor));
    details.appendChild(create_info("Music Amount", playlist.MusicAmount));
    
    fade_out();
}

// get_playlist_detail().then(function (result) {
//   const music = result;
//   if (music === null) {
//     setMetaTags(
//       "Something went wrong!",
//       "",
//       "https://mra.jadquir.com/images/logo.png"
//     );
//   } else {
//     setMetaTags(
//       `${music.Title} by ${music.OwnerName} - MRA - Jadquir`,
//       "MRA (short for Music Recognition Application) is a music recognition application, or music identifier, like Shazam but for PC.",
//       music.Images
//     );
//   }
//  // Check if the page has already loaded
//  if (document.readyState === 'complete') {
//     // If the page has loaded, update the UI immediately
//     updateUI(music);
//   } else {
//     // If the page is still loading, wait for it to finish
//     $(document).ready(function() {
//       updateUI(music);
//     });
//   }

// });
const  p  =  {
  Description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu\r\n",
MusicAmount: 1,
OwnerColor: "ff8b40",
OwnerName: "Jadquir",
Thumbnail: "https://is3-ssl.mzstatic.com/image/thumb/Music116/v4/87/39/67/873967ea-fb2e-390c-31f2-7db946ede0cd/cover.jpg/400x400cc.jpg",
Title: "custom  1",
playlistId: "4voe6ca0m2Z"
}
if (document.readyState === 'complete') 
  updateUI(p);
else {
$(document).ready(function() {
  updateUI(p);
});}