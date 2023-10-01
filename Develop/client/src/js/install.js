const butInstall = document.getElementById('buttonInstall');

let deferredPrompt; // Will store the event for later use

// Logic for installing the PWA
window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default behavior of the event
  event.preventDefault();
  // Store the event for later use
  deferredPrompt = event;

  // Show the install button to the user (you might need to set its display property)
  butInstall.style.display = 'block';

  // Implement a click event handler on the `butInstall` element
  butInstall.addEventListener('click', async () => {
    // Show the installation prompt to the user
    deferredPrompt.prompt();
    // Wait for the user's choice
    const choiceResult = await deferredPrompt.userChoice;
    // Reset the deferredPrompt variable
    deferredPrompt = null;
    // Hide the install button
    butInstall.style.display = 'none';

    // Check if the user accepted the installation
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the installation');
    } else {
      console.log('User dismissed the installation');
    }
  });
});

// Add an event handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  console.log('App installed successfully!', event);
  // You can add logic here for what happens after the app is successfully installed
});
