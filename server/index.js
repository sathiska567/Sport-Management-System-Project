require("dotenv").config(); // Load environment variables

const express = require("express");
const cors = require("cors");

require("./db/mongoDb"); 

const app = express();

app.use(express.json()); // middlewares
app.use(cors());

const PORT = process.env.PORT || 3000; // Define a default port if PORT is not set in .env

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});