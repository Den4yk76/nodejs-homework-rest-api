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
  const result = await readContent();
  return { contacts: result, status: 200 };
};

const getContactById = async contactId => {
  const contacts = await readContent();
  const contact = contacts.find(elem => elem.id === Number(contactId));
  if (contact !== void 0) {
    return { contact, status: 200 };
  } else {
    return { message: 'Not found', status: 404 };
  }
};

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
