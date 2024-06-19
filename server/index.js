// server/index.js
const express = require('express');
const cors = require('cors');
const dbConnect = require('./src/db/connection');
const userRoute = require('./src/routes/user');
const messageRoute = require('./src/routes/message');
const doctorRoute = require('./src/routes/doctor');
require('dotenv').config();

// Connect to the database
dbConnect();

const app = express();

app.use(cors());
// body parser
app.use(express.json());

app.use(userRoute);
app.use(messageRoute);
app.use(doctorRoute)

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
