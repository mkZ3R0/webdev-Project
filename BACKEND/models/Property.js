import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
{
    img: { type: String, required: true },
    title: { type: String, required: true },
    types: { type: [String], required: true },
    location: { type: String, required: true },
    guests: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    price_per_night: { type: Number, required: true },
    rating: { type: Number, required: true },
    reviews_count: { type: Number, required: true },
    description: { type: String, required: true },
    amenities: { type: [String], required: true }
  });
  
  const Property = mongoose.model("Property", propertySchema);
  export default Property;