// Import necessary modules and styles
import { Workbox } from 'workbox-window';
import Editor from './editor';
import './database';
import '../css/style.css';

// Get the main container element from the DOM
const main = document.querySelector('#main');

// Function to show loading spinner while editor is loading
const loadSpinner = () => {
  const spinner = document.createElement('div');
  spinner.classList.add('spinner');
  spinner.innerHTML = `
    <div class="loading-container">
      <div class="loading-spinner"></div>
    </div>
  `;
  main.appendChild(spinner);
};

// Create a new instance of the Editor class
const editor = new Editor();

// Check if editor is loaded, if not, display loading spinner
if (typeof editor === 'undefined') {
  loadSpinner();
}

// Check if service workers are supported
if ('serviceWorker' in navigator) {
  // Register Workbox service worker
  const workboxSW = new Workbox('/src-sw.js');
  workboxSW.register();
} else {
  console.error('Service workers are not supported in this browser.');
}
