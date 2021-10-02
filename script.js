const File = require("./models/file");
const fs = require("fs");

const connectDB = require("./config/db");
connectDB();

async function fetchData() {
  const pastedate = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const files = await File.find({ createdAt: { $lt: pastedate } });

  if (files.length) {
    for (const file of files) {
      try {
        fs.unlinkSync(file.path);
        await file.remove();
        console.log(`successfuly deleted ${file.filename}`);
      } catch (err) {
        console.log(`Error while deleting file ${err}`);
      }
    }
    console.log(`JOB done`);
  }
}
fetchData().then(process.exit);
