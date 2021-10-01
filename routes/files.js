const router = require("express").Router();
const multer = require("multer");
const path = require("path");

const File = require("../models/file");
const { v4: uuid4 } = require("uuid");

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()} - ${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;

    cb(null, uniqueName);
  },
});

let upload = multer({
  storage,
  limit: { fileSize: 1000000 * 100 },
}).single("myfile");

router.post("/", (req, res) => {
  // store file
  upload(req, res, async (err) => {
    //validate response
    if (!req.file) {
      return res.json({ error: "All fields are require" });
    }

    if (err) {
      return res.status(500).send({ error: err.message });
    }
    //Store into database

    const file = new File({
      filename: req.file.filename,
      uuid: uuid4(),
      path: req.file.path,
      size: req.file.size,
    });

    const response = await file.save();
    return res.json({
      file: `${process.env.APP_BASE_URL}/files/${response.uuid}`,
    });
  });

  // Response -> Link
});

router.post("/send", async (req, res) => {
  // validate request
  const { uuid, emailTo, emailfrom } = req.body;
  if (!uuid || !emailTo || !emailfrom) {
    return res.status(422).send({ error: "All fields are required" });
  }

  // Get data from database
  const file = await File.findOne({ uuid: uuid });
  if (file.sender) {
    return res.status(422).send({ error: "Email already sent" });
  }
  file.sender = emailfrom;
  file.reciever = emailTo;
  const response = await file.save();

  // send email

  const sendMail = require("../services/emailService");
  sendMail({
    from: emailfrom,
    to: emailTo,
    subject: "File sharing with easy",
    text: `${emailfrom} shared a file with you`,
    html: require("../services/emailTemplate")({
      emailFrom: emailfrom,
      downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
      size: parseInt(file.size / 1000) + "KB",
      expires: "24 Hours",
    }),
  });
});

module.exports = router;
