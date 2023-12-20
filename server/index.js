require("dotenv").config(); // Load environment variables

const express = require("express");
const cors = require("cors");

const authRouter = require("./router/userRouter");
const adminRouter = require("./router/adminRouter");

require("./db/mongoDb"); 

const app = express();

app.use(express.json()); // middlewares
app.use(cors());

app.use("/api/v1/user/", authRouter);
app.use("/api/v1/admin", adminRouter);

const PORT = process.env.PORT || 3000; // Define a default port if PORT is not set in .env

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});