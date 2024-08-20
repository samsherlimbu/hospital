const express = require('express');
const cors = require('cors');
const dbConnect = require('./src/db/connection');
const userRoute = require('./src/routes/user');
const messageRoute = require('./src/routes/message');
const doctorRoute = require('./src/routes/doctor');
const departmentRoute = require('./src/routes/department');
const detailsRoute = require('./src/routes/details');
const path = require('path')
require('dotenv').config();

// Connect to the database
dbConnect();

const app = express();

app.use(cors());

// Increase payload limit
 app.use(express.json());

app.use(userRoute);
app.use(messageRoute);
app.use(doctorRoute);
app.use(departmentRoute);
app.use(detailsRoute);

const port = process.env.PORT || 8000;

app.use('/doctor-image', express.static(path.join(__dirname, '/uploads/image')))

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});