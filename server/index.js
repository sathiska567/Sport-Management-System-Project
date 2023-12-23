require("dotenv").config(); // Load environment variables

const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const router = require("./Aatheek/routes/userRoutes");
const initDatabase = require("./db/db");
const cookieParser = require('cookie-parser');

const app = express();

app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST"]
})); // Apply cors middleware first

app.use(express.json()); // Middlewares
app.use(cookieParser());


initDatabase();

app.get('/', (req, res) => {
  res.send('Hello, this is the root path!');
});

app.use('/user', router);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
