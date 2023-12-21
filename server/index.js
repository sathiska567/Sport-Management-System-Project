// index.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const initDatabase = require('./db/db');
const adminRoutes = require('./routes/adminRoutes');
const cookieParser = require('cookie-parser');



const app = express();

app.use(bodyParser.json());

app.use(cors({
  origin: ["http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST"]
}));

app.use(cookieParser())


// Initialize the database connection
initDatabase();


// Use the admin routes
app.use('/admin', adminRoutes);


const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
