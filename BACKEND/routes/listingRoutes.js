import express from "express";
import properties from '../Data/PROPERTIES.json' assert { type: 'json' };

const router = express.Router();

// Endpoint to fetch property listings
router.get('', (req, res) => {
    try 
    {
        return res.status(200).json(properties.listings);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

//SEARCH BASED ON LOCATION Must come before the /:id route as it will be treated as a parameter otherwise of id
router.get('/search', (req, res) => {
    try 
    {
        const { query } = req.query;
        
        if (!query) {
            return res.status(400).json({ message: 'Location query parameter is required' });
        }
      
        const filteredListings = properties.listings.filter(listing =>
            listing.location.toLowerCase().includes(query.toLowerCase())
        );
      
        return res.status(200).json(filteredListings);

    } catch (error) 
    {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

//Endpoint to fetch a single property listing
router.get('/:id', (req, res) => {
    try 
    {
        const id = parseInt(req.params.id, 10);
        if (!id) {
            return res.status(400).json({ message: 'Invalid property id' });
        }
        const property = properties.listings.find((p) => p.id === id);
        if (property) {
            return res.status(200).json(property);
        } else {
            return res.status(404).json({ message: 'Property not found' });
        }
    } catch (error) 
    {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});
  

export default router;