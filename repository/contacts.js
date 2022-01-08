import Contact from '../model/contact.js';

const listContacts = async (userId, { favorite, page = 1, limit = 10 }) => {
  if (page <= 0 || parseInt(limit) <= 0) {
    page = 1;
    limit = 10;
  }

  const skipIndex = (page - 1) * parseInt(limit);

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

  result = await result
    .limit(parseInt(limit))
    .skip(skipIndex)
    .populate({ path: 'owner', select: 'email' });
  total = await total;

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
