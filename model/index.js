const fs = require('fs/promises');
// const contacts = require('./contacts.json');
const path = require('path');

const readContent = async () => {
  const content = await fs.readFile(
    path.join(__dirname, 'contacts.json'),
    'utf8',
  );
  const result = JSON.parse(content);
  return result;
};

const listContacts = async () => {
  return await readContent();
};

const getContactById = async contactId => {};

const removeContact = async contactId => {};

const addContact = async body => {};

const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
