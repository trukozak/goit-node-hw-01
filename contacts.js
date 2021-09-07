const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "./db/contacts.json");

async function getContactsPath() {
  try {
    const data = await fs.readFile(contactsPath);
    const result = JSON.parse(data);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

async function listContacts() {
  try {
    const result = await getContactsPath();
    console.table(result);
  } catch (error) {
    console.log(error.message);
  }
}

async function getContactById(contactId) {
  try {
    const result = await getContactsPath();

    const oneContact = await result.find(
      (item) => String(item.id) === contactId
    );
    return oneContact;
  } catch (error) {
    console.log(error.message);
  }
}

async function removeContact(contactId) {
  try {
    const result = await getContactsPath();

    const idx = await result.findIndex((item) => String(item.id) === contactId);
    const removeContact = result[idx];
    const newContacts = result.filter((_, index) => index !== idx);
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));

    return removeContact;
  } catch (error) {
    console.log(error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const result = await getContactsPath();

    const newData = { id: v4(), name, email, phone };
    const newContacts = [...result, newData];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));

    return newData;
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
