import Contact from '../model/contact.js';

const listContacts = async (userId, { favorite }) => {
  let filterCriteria = null;
  const total = await Contact.find({ owner: userId }).countDocuments();
  let result = await Contact.find({ owner: userId }).populate({
    path: 'owner',
    select: 'email',
  });
  if (favorite) {
    result = await Contact.find({
      owner: userId,
      favorite: [`${favorite}`],
    }).populate({
      path: 'owner',
      select: 'email',
    });
  }
  return { total, contacts: result };
};

const getContactById = async (userId, contactId) => {
  const result = await Contact.findOne({
    _id: contactId,
    owner: userId,
  }).populate({
    path: 'owner',
    select: 'email',
  });
  return result;
};

const removeContact = async (userId, contactId) => {
  const result = await Contact.findOneAndRemove({
    _id: contactId,
    owner: userId,
  }).populate({
    path: 'owner',
    select: 'email',
  });
  return result;
};

const addContact = async (userId, body) => {
  const result = await Contact.create({ ...body, owner: userId });
  return result;
};

const updateContact = async (userId, contactId, body) => {
  const result = await Contact.findOneAndUpdate(
    {
      _id: contactId,
      owner: userId,
    },
    { ...body },
    { new: true },
  ).populate({
    path: 'owner',
    select: 'email',
  });
  return result;
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
