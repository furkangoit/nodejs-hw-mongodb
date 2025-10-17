import fs from 'fs/promises';
import path from 'path';
import { initMongoConnection } from './db/initMongoConnection.js';
import { Contact } from './db/models/Contact.js';

const importContacts = async () => {
  try {
    // Initialize MongoDB connection
    await initMongoConnection();

    // Read contacts.json file
    const contactsPath = path.join(process.cwd(), 'contacts.json');
    const contactsData = await fs.readFile(contactsPath, 'utf-8');
    const contacts = JSON.parse(contactsData);

    // Clear existing contacts (optional)
    await Contact.deleteMany({});
    console.log('Existing contacts cleared.');

    // Import contacts
    const importedContacts = await Contact.insertMany(contacts);
    console.log(`Successfully imported ${importedContacts.length} contacts to the database.`);

    // Display collection name for verification
    console.log(`Collection name: ${Contact.collection.name}`);

    process.exit(0);
  } catch (error) {
    console.error('Error importing contacts:', error.message);
    process.exit(1);
  }
};

importContacts();