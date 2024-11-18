import express from 'express';
import listingRoutes from "./routes/listingRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import cors from 'cors';

const app = express();
const port = 8000;

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
