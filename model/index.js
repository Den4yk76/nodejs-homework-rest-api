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
  const result = await readContent();
  return { contacts: result, status: 200 };
};

const getContactById = async contactId => {
  const contacts = await readContent();
  const contact = contacts.find(elem => elem.id.toString() === contactId);
  if (contact !== void 0) {
    return { contact, status: 200 };
  } else {
    return { message: 'Not found', status: 404 };
  }
};

const removeContact = async contactId => {
  const contacts = await readContent();
  const indexOfContact = contacts.findIndex(
    currentValue => currentValue.id.toString() === contactId,
  );
  if (indexOfContact !== -1) {
    contacts.splice(indexOfContact, 1);
    await fs.writeFile(
      path.join(__dirname, 'contacts.json'),
      JSON.stringify(contacts, null, 2),
    );
    return { message: 'contact deleted', status: 200 };
  } else {
    return { message: 'Not found', status: 404 };
  }
};

const addContact = async body => {
  const contacts = await readContent();
  const { name, email, phone } = body;
  const newContact = { id: uuid(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(
    path.join(__dirname, 'contacts.json'),
    JSON.stringify(contacts, null, 2),
  );
  return { newContact, status: 200 };
};

const updateContact = async (contactId, { name, email, phone }) => {
  const contacts = await readContent();
  let updatedContact;
  const updatedContacts = contacts.map(contact => {
    if (contact.id.toString() === contactId) {
      if (name) {
        contact.name = name;
      }
      if (email) {
        contact.email = email;
      }
      if (phone) {
        contact.phone = phone;
      }
      updatedContact = contact;
      return contact;
    } else {
      return contact;
    }
  });

  await fs.writeFile(
    path.join(__dirname, 'contacts.json'),
    JSON.stringify(updatedContacts, null, 2),
  );

  if (updatedContact) {
    return { updatedContact, status: 200 };
  } else return { message: 'Not found', status: 404 };
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
