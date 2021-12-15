const express = require('express');
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../../model/index.js');

router.get('/', async (req, res, next) => {
  const result = await listContacts();
  if (result.contacts) {
    res
      .status(result.status)
      .json({ contacts: result.contacts, status: result.status });
  } else {
    res.status(400).json({ Error: result.error });
  }
});

router.get('/:contactId', async (req, res, next) => {
  const { message, status, contact } = await getContactById(
    req.params.contactId,
  );
  if (contact) {
    res.status(status).json({ contact: contact, status: status });
  } else res.status(status).json({ message: message, status: status });
});

router.post('/', async (req, res, next) => {
  res.json({ message: 'post contact method' });
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'delete contactId method' });
});

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'patch contactId method' });
});

module.exports = router;
