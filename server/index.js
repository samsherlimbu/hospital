const express = require('express');
const cors = require('cors');
const dbConnect = require('./src/db/connection');
const userRoute = require('./src/routes/user');
const messageRoute = require('./src/routes/message');
const doctorRoute = require('./src/routes/doctor');
const departmentRoute = require('./src/routes/department');
const imageRoute = require('./src/routes/image');
const multer = require('multer');
require('dotenv').config();

// Connect to the database
dbConnect();

const app = express();

app.use(cors());

// Increase payload limit
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10 MB file size limit
});

// Use the multer upload middleware for the image route
app.post('/uploadimage', upload.fields([{ name: 'frontImage' }, { name: 'doctorImage' }]), (req, res) => {
  // Handle the postimage controller here directly
  const { postimage } = require('./src/controllers/image');
  postimage(req, res);
});

// Other routes
app.use(userRoute);
app.use(messageRoute);
app.use(doctorRoute);
app.use(departmentRoute);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
