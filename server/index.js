const express = require("express");
const cors = require("cors");
const auth = require("./Middleware/auth");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(express.json());
// support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));
// to get json data
// support parsing of application/json type post data
app.use(bodyParser.json());

app.use("/api/users", require("./Routes/user"));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Listening on ${port}`);
});
