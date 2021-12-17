const express = require('express');
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model/index.js');
const { validateCreate, validateUpdate } = require('./validation');

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) {
    res.status(200).json(contact);
  } else res.status(404).json({ message: 'Not found' });
});

router.post('/', validateCreate, async (req, res, next) => {
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
});

router.delete('/:contactId', async (req, res, next) => {
  const removedContact = await removeContact(req.params.contactId);
  if (removedContact) {
    res.status(200).json({ message: 'contact deleted' });
  } else res.status(404).json({ message: 'Not found' });
});

router.put('/:contactId', validateUpdate, async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await updateContact(contactId, req.body);
  if (contact) {
    res.status(200).json({ contact });
  } else res.status(404).json({ message: 'Not founded' });
});

module.exports = router;
