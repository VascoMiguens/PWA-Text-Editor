const butInstall = document.getElementById("buttonInstall");

window.addEventListener("beforeinstallprompt", (event) => {
  // assign the event object to the window.deferredPrompt property
  window.deferredPrompt = event;

  // toggle the class "hidden" on the element butInstall
  butInstall.classList.toggle("hidden", false);
});

butInstall.addEventListener("click", async () => {
  // check if the window.deferredPrompt variable is defined
  const promptEvent = window.deferredPrompt;
  // if the window.deferredPrompt variable is not defined return
  if (!promptEvent) {
    return;
  }
  // if the window.deferredPrompt variable is defined prompt the user to install the application
  promptEvent.prompt();
  // set the window.deferredPrompt variable to null
  window.deferredPrompt = null;
  // toggle the hiddent class to true
  butInstall.classList.toggle("hidden", true);
});

// event listener that listens to the "appinstalled" event and sets window.deferredPrompt to null
window.addEventListener("appinstalled", (event) => {
  window.deferredPrompt = null;
});
