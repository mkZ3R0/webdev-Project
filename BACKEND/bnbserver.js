import express from 'express';
import listingRoutes from "./routes/listingRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

const app = express();
const port = 8000;

//Listing Routes => /api/listings
app.use('/api/listings', listingRoutes);
//Booking Routes => /api/booking
app.use('/api/bookings', bookingRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
