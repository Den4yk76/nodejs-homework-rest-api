const { uuid } = require('uuidv4');
const fs = require('fs/promises');
// const contacts = require('./contacts.json');
const path = require('path');
const e = require('cors');
const { constants } = require('buffer');

const readContent = async () => {
  const content = await fs.readFile(
    path.join(__dirname, 'contacts.json'),
    'utf8',
  );
  const result = JSON.parse(content);
  return result;
};

const listContacts = async () => {
  const contacts = await readContent();
  return contacts;
};

const getContactById = async contactId => {
  const contacts = await readContent();
  const contact = contacts.find(contact => contact.id.toString() === contactId);
  return contact;
};

const removeContact = async contactId => {
  const contacts = await readContent();
  const indexOfContact = contacts.findIndex(
    contact => contact.id.toString() === contactId,
  );
  if (indexOfContact !== -1) {
    const removedContact = contacts.splice(indexOfContact, 1);
    await fs.writeFile(
      path.join(__dirname, 'contacts.json'),
      JSON.stringify(contacts, null, 2),
    );
    return removedContact;
  }
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await readContent();
  const newContact = { id: uuid(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(
    path.join(__dirname, 'contacts.json'),
    JSON.stringify(contacts, null, 2),
  );
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await readContent();
  const indexOfContact = contacts.findIndex(
    contact => contact.id.toString() === contactId,
  );
  if (indexOfContact !== -1) {
    const updatedContact = {
      id: contactId,
      ...contacts[indexOfContact],
      ...body,
    };
    contacts[indexOfContact] = updatedContact;
    await fs.writeFile(
      path.join(__dirname, 'contacts.json'),
      JSON.stringify(contacts, null, 2),
    );
    return updatedContact;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
