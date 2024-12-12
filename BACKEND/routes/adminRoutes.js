import express from "express";
import Property from "../models/Property.js";
import Booking from "../models/Booking.js";

const router = express.Router();


router.get("/listings", async (req, res) => {

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
router.post("/listings", async (req, res) => {

    try 
    {
        const {img, title, types, location, guests, bedrooms, bathrooms, price_per_night, rating, reviews_count, description, amenities} = req.body;

        const newProperty = new Property({
            img, title, types, location, guests, bedrooms, bathrooms, price_per_night, rating, reviews_count, description, amenities
        });

        await newProperty.save();
        return res.status(201).json({message : 'Property added successfully'});

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

router.delete("/listings/:id", async (req, res) => {
    
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

router.get("/bookings", async (req, res) => {
    
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