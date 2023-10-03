import { openDB } from 'idb';

// Initialize the database
const initdb = async () => {
  const db = await openDB('jate', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('jate')) {
        // Create the object store if it doesn't exist
        const store = db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
        // Add an index for timestamp if needed
        store.createIndex('timestamp', 'timestamp');
        console.log('Created Databse!');
      }
    },
  });
  return db;
};

// Add content to the database
export const putDb = async (content) => {
  const db = await initdb();
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');

  // Use add() method to add data to the object store with a timestamp
  await store.add({ content, timestamp: Date.now() });
  await tx.done;
};

// Get all content from the database
export const getDb = async () => {
  const db = await initdb();
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');

  // Use getAll() method to retrieve all data from the object store
  const content = await store.getAll();
  await tx.done;
  return content;
};

initdb(); // Call initdb to ensure the database is initialized when the module is imported
