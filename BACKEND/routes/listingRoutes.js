import express from "express";
import Property from '../models/Property.js';
// import properties from '../PROPERTIES.json' assert { type: 'json' };;

const router = express.Router();

// Endpoint to fetch property listings
router.get('', async (req, res) => {
    try 
    {
        const allProperties = await Property.find();
        return res.status(200).json(allProperties);
    } catch (error) {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

//SEARCH BASED ON LOCATION Must come before the /:id route as it will be treated as a parameter otherwise of id
router.get('/search', async (req, res) => {//http://localhost:8000/api/listings/search?query=california
    try 
    {
        const { query } = req.query;
        
        if (!query) {
            return res.status(400).json({ message: 'Location query parameter is required' });
        }
        //i option making it case insensitive
        const filteredListings = await Property.find({ location: { $regex: query, $options: 'i' } });
      
        return res.status(200).json(filteredListings);

    } catch (error) 
    {
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

//Endpoint to fetch a single property listing
router.get('/:id', async (req, res) => {
    try 
    {
        const {id} = req.params; 
        if (!id) {
            return res.status(400).json({ message: 'Invalid property id' });
        }
        
        const property = await Property.findById(id);

        if (property) {
            return res.status(200).json(property);
        } else {
            return res.status(404).json({ message: 'Property not found' });
        }
    } catch (error) 
    {
        console.log(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});




//endpoint to post all properties from static file to the database
//was used to initially seed the database
// router.post('/seed', async (req, res) => {
//     try 
//     {
//         await Property.insertMany(properties.listings);
//         return res.status(200).json({ message: 'Properties seeded successfully' });
//     } catch (error) 
//     {
//         console.log(error);
//         return res.status(500).json({ message: 'Internal Server Error' });
//     }
// });

export default router;