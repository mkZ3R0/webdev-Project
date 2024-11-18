import express from "express";

const router = express.Router();

router.post('/:id', (req, res) => {
    
    const idStr = req.params.id;
    return res.status(200).json({ message: `Booking created successfully for property ${idStr}` });

});

export default router;
