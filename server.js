const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");
app.use(express.static("public"));

const connectDB = require("./config/db");
app.use(express.json);

connectDB();
//template engine

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");

//Routes
app.use("/api/files", require("./routes/files"));

app.use("/files", require("./routes/show.js"));
app.use("/files/download", require("./routes/download"));
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
