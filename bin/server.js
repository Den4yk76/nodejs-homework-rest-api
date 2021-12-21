const app = require('../app');
const mongoose = require('mongoose');

const URL =
  'mongodb+srv://Den4yk76:Den4yk76@cluster0.wdqol.mongodb.net/db-contacts?retryWrites=true&w=majority';
const PORT = process.env.PORT || 3000;

// const contactsSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, 'Set name for contact'],
//   },
//   email: {
//     type: String,
//   },
//   phone: {
//     type: String,
//   },
//   favorite: {
//     type: Boolean,
//     default: false,
//   },
// });

// const Contacts = await mongoose.model('contacts', contactsSchema);
// const FindedContacts = await Contacts.find();
// console.log(FindedContacts);

const start = async () => {
  try {
    await mongoose.connect(URL, { useNewUrlParser: true });
    console.log('Database connection successful');
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

start();
