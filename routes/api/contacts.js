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
  const { name, email, phone } = req.body;
  if (name && email && phone) {
    const { newContact, status } = await addContact({
      name,
      email,
      phone,
    });
    res.status(status).json({ contact: newContact, status });
  } else {
    res
      .status(400)
      .json({ message: 'missing required name field', status: 400 });
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const { message, status } = await removeContact(req.params.contactId);
  if (status === 200) {
    res.status(status).json({ message: message });
  } else {
    res.status(status).json({ message: message });
  }
});

router.patch('/:contactId', async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name && !email && !phone) {
    res.status(400).json({ message: 'missing fields' });
  } else {
    const { updatedContact, message, status } = await updateContact(
      req.params.contactId,
      req.body,
    );
    if (status === 200) {
      res.status(status).json({ updatedContact, status });
    } else {
      res.status(status).json({ message, status });
    }
  }
});

module.exports = router;
