import express from 'express';
import listingRoutes from "./routes/listingRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';

const app = express();

app.use('/images', express.static(path.join(process.cwd(), 'public/images'), {
    maxAge: '1y', 
    setHeaders: (res, path) => {
      if (path.endsWith('.jpg') || path.endsWith('.png') || path.endsWith('.gif')) {
        res.setHeader('Cache-Control', 'public, max-age=31536000'); 
      }
    }
  }));

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
app.use(express.json());
app.use('/api/listings', listingRoutes);
//Booking Routes => /api/booking
app.use('/api/bookings', bookingRoutes);
//User Routes => /api/auth
app.use("/api/auth", userRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
