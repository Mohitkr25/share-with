const router = require("express").Router();

const File = require("../models/file");

router.get("/:uuid", async (req, res) => {
  const file = await File.findOne({ uuid: req.params.uuid });
  if (!file) {
    return res.render("download", { error: "Link has baeen expired" });
  }

  const response = await file.save();
  const filepath = `${__dirname}/../${file.path}`;
  res.download(filepath);
});

module.exports = router;
