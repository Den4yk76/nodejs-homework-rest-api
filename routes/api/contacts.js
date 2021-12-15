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
  try {
    const contactsList = await listContacts();
    res.json(contactsList);
  } catch (error) {
    res.status(error.status).json(error.message);
  }
});

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'get contactId method' });
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
