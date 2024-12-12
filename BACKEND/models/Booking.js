import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
{
    property_id: { type: String, required: true },
    user_id: { type: String, required: true },
    user_name: { type: String, required: true },
    user_email: { type: String, required: true },
    user_contact: { type: String, required: true },
    check_in: { type: Date, required: true },
    check_out: { type: Date, required: true },
    total_price: { type: Number, required: true }
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;