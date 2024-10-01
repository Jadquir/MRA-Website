const url = "https://get-start-vh7xzcelwq-uc.a.run.app/?type=update&app_lang=en&user_lang=en&single=1";
function parseUpdateData(jsonData) {
    const { AutoUpdateUrl, InstallerUpdateUrl, DownloadLink, UpdateChangeLog } = jsonData;

    // Find the latest version from the UpdateChangeLog
    const latestVersion = UpdateChangeLog.reduce((latest, current) => {
        const latestVersionNumber = latest.version.join('.');
        const currentVersionNumber = current.version.join('.');
        return currentVersionNumber > latestVersionNumber ? current : latest;
    }, UpdateChangeLog[0]);

    return {
        LatestVersion: latestVersion.version.join('.'),
        DownloadUrl: DownloadLink,
        ZipUrl: AutoUpdateUrl,
        InstallerUrl: InstallerUpdateUrl
    };
}
function waitForElement(id, callback) { 
    // Check if the element already exists
    const element = document.getElementById(id);
    if (element) {
        callback(element);  // Call the callback with the existing element
        return;  // Exit the function early
    }
    var intervalTime = 100;
    var callbackInvoked = false;
    const observer = new MutationObserver((mutationsList, observer) => {
        const element = document.getElementById(id);
        if (element && !callbackInvoked) {
            callbackInvoked = true;
            callback(element);
            clearInterval(interval);
            observer.disconnect();  // Stop observing once the element is found
        }
    });

    // Start observing the document body for added nodes
    observer.observe(document.body, { childList: true, subtree: true });


    const interval = setInterval(() => {
        const element = document.getElementById(id);
        if (element&& !callbackInvoked) {
            clearInterval(interval);
            observer.disconnect();
            callback(element);
            callbackInvoked = true;
        }
    }, intervalTime);
}
function addToUI(parsedData){
    function changeElement(element, url){
        try {
            console.log(element);
            try {
                var textElement = element.getElementsByClassName("download-text")[0];
                textElement.innerText = textElement.innerText.replace("v0.110", "v"+parsedData.LatestVersion)
            } catch (error) {
                console.log(error);
            }
            try {
                var downloadElement = element.getElementsByClassName("download-url")[0];
                downloadElement.href = url; 
            } catch (error) {
                console.log(error);            
            }
        } catch (error) {
            console.log(error);
            element.styles.display = "none";
        }
      
    }
  console.log("UI: ", parsedData);
    // Use promises to ensure both elements are changed before proceeding
    const waitForFirst = new Promise((resolve) => {
        waitForElement("zip_download", (element) => {
            changeElement(element, parsedData.ZipUrl);
            console.log("Changed Zip");
            resolve(true);
        });
    });

    const waitForSecond = new Promise((resolve) => {
        waitForElement("installer_download", (element) => {
            changeElement(element, parsedData.InstallerUrl);

            console.log("Changed Installer");
            resolve(true);
        });
    });
    console.log("Waiting for changes");
   // Wait until both are resolved before proceeding with the rest
   Promise.all([waitForFirst, waitForSecond]).then(() => {
    // Now continue with the other elements after the first two have been updated
    waitForElement("download-container", (element) => {
        element.classList.add("loaded");
    });
    waitForElement("download-overlay", (element) => {
        element.classList.add("loaded");
    });
    console.log("Done");
});
}function delay(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
}
fetch(url).then(async response =>{
    try {
        const json = await response.json();
        var parsed = parseUpdateData(json);
        addToUI(parsed);
    } catch (error) {
        OnError(error);
    }

}).catch(error => {
    OnError(error);
})

function OnError(error){
    console.log("Error: " , error);
    waitForElement("error-overlay",(element) =>{
        element.classList.add("loaded");
        element.children[0].innerText = "Something went wrong.. Error: " + error;
    })
    waitForElement("download-overlay", (element) => {
        element.classList.add("loaded");
    });
}