const contacts = require("./contacts");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contactList = await contacts.listContacts();
      console.table(contactList);
      break;

    case "get":
      if (!id) {
        return console.log("param 'id' required");
      }

      const searchedContatc = await contacts.getContactById(id);
      if (!searchedContatc) {
        return console.log(`Contact with id: ${id} not found.`);
      }

      console.table(searchedContatc);
      break;

    case "add":
      if (!name || !email || !phone) {
        return console.log("params 'name', 'email', 'phone' required");
      }

      const newContact = await contacts.addContact(name, email, phone);
      console.table(newContact);
      break;

    case "remove":
      if (!id) {
        return console.log("param 'id' required");
      }

      const removedContact = await contacts.removeContact(id);
      if (!removedContact) {
        return console.log(`Contact with id: ${id} not found.`);
      }

      console.table(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
