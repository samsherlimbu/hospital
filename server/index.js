const express = require('express');
const cors = require('cors');
const dbConnect = require('./src/db/connection');
const userRoute = require('./src/routes/user');
const messageRoute = require('./src/routes/message');
const doctorRoute = require('./src/routes/doctor');
const departmentRoute = require('./src/routes/department');
const detailsRoute = require('./src/routes/details');
const appointmentRoute = require('./src/routes/appointment');
 const Appointment = require('./src/models/appointment'); // Import appointment routes
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
app.use(appointmentRoute); // Use appointment routes

const port = process.env.PORT || 8000;

app.use('/doctor-image', express.static(path.join(__dirname, '/uploads/image')));

io.on('connection', (socket) => {
  console.log('A user connected', socket.id);

  socket.on('appointments', async (appointments) => {
    try {
      const newAppointment = new Appointment(appointments);
      await newAppointment.save(); // Ensure this is awaited
      io.emit('update-appointments', appointments);
    } catch (error) {
      console.error('Error saving appointment:', error);
    }
  });
});


server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
