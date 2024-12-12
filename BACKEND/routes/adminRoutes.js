import express from "express";
import Property from "../models/Property.js";
import Booking from "../models/Booking.js";
import upload from '../middlewares/uploadImage.js';
import verifyToken from "../middlewares/authMiddleware.js";

const router = express.Router();


router.get("/listings", verifyToken, async (req, res) => {

    try 
    {
        const allProperties = await Property.find();
        return res.status(200).json(allProperties);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

//post a new listing
//TODO: TAKE IMAGE FILE AND DOWNLOAD TO PUBLIC/IMAGES
router.post("/listings", upload.single('img'), verifyToken , async (req, res) => {
    try {
        const {
          title,
          types,
          location,
          guests,
          bedrooms,
          bathrooms,
          price_per_night,
          rating,
          reviews_count,
          description,
          amenities,
        } = req.body;
    
        // Validate required fields
        if (
          !title ||
          !types ||
          !location ||
          !guests ||
          !bedrooms ||
          !bathrooms ||
          !price_per_night ||
          !rating ||
          !reviews_count ||
          !description ||
          !amenities
        ) {
          return res.status(400).json({ message: 'All fields are required.' });
        }
    
        // Parse JSON strings for arrays if they are sent as JSON strings
        const parsedTypes = typeof types === 'string' ? JSON.parse(types) : types;
        const parsedAmenities = typeof amenities === 'string' ? JSON.parse(amenities) : amenities;
    
        // Get the image path
        const imgPath = req.file ? `${req.file.filename}` : null;
    
        if (!imgPath) {
          return res.status(400).json({ message: 'Image upload failed.' });
        }
    
        // Create a new property
        const newProperty = new Property({
          img: imgPath,
          title,
          types: parsedTypes,
          location,
          guests,
          bedrooms,
          bathrooms,
          price_per_night,
          rating,
          reviews_count,
          description,
          amenities: parsedAmenities,
        });
    
        // Save to the database
        await newProperty.save();
    
        res.status(201).json({ message: 'Property added successfully', property: newProperty });
      } catch (error) {
        console.error('Error adding property:', error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
      }
});

router.delete("/listings/:id", verifyToken, async (req, res) => {
    
        try 
        {
            const id = req.params.id;
            await Property.findByIdAndDelete(id);
            return res.status(200).json({message : 'Property deleted successfully'});
    
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
});

router.get("/bookings", verifyToken, async (req, res) => {
    
        try 
        {
            const allBookings = await Booking.find();
            return res.status(200).json(allBookings);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: 'Internal Server Error' });
        }
});

export default router;