const express = require('express');
const cors = require('cors');
const dbConnect = require('./src/db/connection');
const userRoute = require('./src/routes/user');
const messageRoute = require('./src/routes/message');
const doctorRoute = require('./src/routes/doctor');
const departmentRoute = require('./src/routes/department');
const detailsRoute = require('./src/routes/details');
const appointmentRoute = require('./src/routes/appointment');
const patientRoute = require('./src/routes/patient'); // Import appointment routes
const galleryRoute = require('./src/routes/gallery');
const AboutRoute = require('./src/routes/about');
const AboutUsRoute =require('./src/routes/AboutUs')
const FeedbackRoute = require('./src/routes/feedback')
const { Server } = require('socket.io');
const { createServer } = require('node:http');
const path = require('path');
require('dotenv').config();

// Connect to the database
dbConnect();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
  },
});

app.use(cors());
app.use(express.json());

// Use routes
app.use(userRoute);
app.use(messageRoute);
app.use(doctorRoute);
app.use(departmentRoute);
app.use(detailsRoute);
app.use(appointmentRoute);
app.use(patientRoute);
app.use(galleryRoute);
app.use(AboutRoute);
app.use(AboutUsRoute);
app.use(FeedbackRoute)

const port = process.env.PORT || 8000;

// Static file serving
app.use('/doctor-image', express.static(path.join(__dirname, '/uploads/image')));
app.use('/message-image', express.static(path.join(__dirname, '/uploads/messageImage')));
app.use('/gallery-image', express.static(path.join(__dirname, '/uploads/galleryImage')));
io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  socket.on('appointments', async (appointments) => {
    try {
      const newAppointment = new Appointment(appointments);
      await newAppointment.save();
      io.emit('update-appointments', appointments);
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
