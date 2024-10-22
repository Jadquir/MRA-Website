const erroText = document.querySelector("#error_text");
const container = document.querySelector("#gift-contaner");
const dialog = document.querySelector("#dialog");
const giftInfo = document.querySelector("#gifts");
const form = document.querySelector("#claim_form");


const urlParams = new URLSearchParams(window.location.search);
const code = urlParams.get("code");

function set_dialog_loading(text) {}

function fade_out() {
  const overlay = document.querySelector(".mra-overlay");
  overlay.classList.add("closed");
}

async function getObjectFromHttpPost(url,body) {
    try {
      const response = await fetch(url, {
        mode: "cors",
        method: "POST", // Set the HTTP method to POST
        body: JSON.stringify(body),
        headers: {
          Origin: "https://jadquir.com/",
        },
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
  }
  async function getObjectFromHttpget(url) {
    try {
      return null;
      const response = await fetch(url, {
        mode: "cors",
        headers: {
          Origin: "https://jadquir.com/",
        },
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
  }
async function get_gift_info() {
  if (code === undefined || code === null || code.length === 0) {
    return null;
  }
  const info = await getObjectFromHttpget(
    `https://get-gift-info-vh7xzcelwq-uc.a.run.app?gift_code=${code}`
  );
  if (info === undefined || info == null) {
    error("Invalid Gift Code");
    return null;
  }
  if (info.error === true) {
    error(info.message);
    return null;
  }
return info.gift_info;
}
var isError = false;
function error(text){
    isError = true;
    container.innerHTML = `<span>${text}</span>`
}
function setdata(gift_data){
    giftInfo.innerHTML = `You will get <b class="glow" style="--text-color: #${gift_data.tier_color}; --glow-color:  #${gift_data.tier_color}99;">Tier ${gift_data.tier}</b> for <b>${gift_data.days} Days</b>`
}
async function logSubmit(event){    
    event.preventDefault();    
    if(isClaimInProgress === true)return;
    // Get submitted data
    // Get the form element using event.target
    const formElement = event.target;
    
    // Get submitted data using FormData
    const formData = new FormData(formElement);

    // Convert FormData to an object
    const submittedData = {};
    formData.forEach((value, key) => {
        submittedData[key] = value;
    });


    const postData = {
        email: submittedData.email
    };
    await claim_gift(postData);

}
form.addEventListener('submit', logSubmit);


function claim_error(text){
    erroText.textContent = text;
}
const progress = document.querySelector(".progress-bar");
const emailInput = document.querySelector("#email");
const submitButton = document.querySelector("#submit_button");
var isClaimInProgress = false;
function disable_form(){
    claim_error("");
    isClaimInProgress = true;
    progress.classList.add("open");
    emailInput.disabled = true;
    submitButton.disabled = true;
    
}
function activate_form(){    isClaimInProgress = false;
    progress.classList.remove("open");
    emailInput.disabled = false;
    submitButton.disabled = false;
}
async function claim_gift(post_data){
    disable_form();
    const a = await getObjectFromHttpPost(
      "https://claim-free-trial-web-vh7xzcelwq-uc.a.run.app"      
      ,post_data);  
      console.log(a);
    if(a === undefined ||a == null){
        claim_error("Something went wrong!");
        activate_form();
        return;
    }
    if(!a.success){
        claim_error(a.message ?? a.ErrorMessage);
        activate_form();
        return;
    }
    activate_form();
    openCongratulationsDialog();
}// Function to open the congratulations dialog
function openCongratulationsDialog() {
    var dialog = document.getElementById('congratulationsDialog');
    dialog.showModal();
  }

  // Function to close the congratulations dialog
  function closeCongratulationsDialog() {
    var dialog = document.getElementById('congratulationsDialog');
    dialog.close();
  }
  fade_out();