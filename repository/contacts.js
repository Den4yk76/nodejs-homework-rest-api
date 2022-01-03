import Contact from '../model/contact.js';

const listContacts = async (userId, { favorite, page = 1, limit = 10 }) => {
  let total = Contact.find({ owner: userId }).countDocuments();
  let result = Contact.find({ owner: userId });
  if (favorite) {
    total = Contact.find({
      owner: userId,
      favorite: [`${favorite}`],
    }).countDocuments();
    result = Contact.find({
      owner: userId,
      favorite: [`${favorite}`],
    });
  }

  total = await total;
  result = await result.populate({
    path: 'owner',
    select: 'email',
  });

  if (page > 0 && limit > 0) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    result = result.slice(startIndex, endIndex);
  }

  return { total, page, limit, contacts: result };
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
