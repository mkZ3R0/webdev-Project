import express from 'express';
import listingRoutes from "./routes/listingRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
const port = 8000;

const URI = process.env.MONGODB_URI;

mongoose.connect(URI);
console.log(URI);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.log('Error: ', err);
});

mongoose.connection.on('disconnected', () => { 
    console.log('MongoDB disconnected');
});

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

//Listing Routes => /api/listings
app.use('/api/listings', listingRoutes);
//Booking Routes => /api/booking
app.use('/api/bookings', bookingRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
