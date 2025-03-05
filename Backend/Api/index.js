const express = require("express");
const cors = require("cors");
const usersRoutes = require("./Routes/UsersRoutes");
const bodyParser = require("body-parser");
const path = require("path");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8000;

// app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use (bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, "uploads")));
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:3000",
  credentials: true,
}));

app.use("/api/users", usersRoutes);


// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
  