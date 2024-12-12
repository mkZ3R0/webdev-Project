import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const verifyTokenAndAdmin = async (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;
  
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({message:"Unauthorized: No token provided or invalid format"});
      }
  
      const token = authHeader.split(" ")[1];
  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      const isExpired = Date.now() >= decoded.exp * 1000;
  
      if (isExpired) {
        return res.status(401).json({message:"Token Expired"});
      }
  
      const userId = decoded.id
    
      // Find the user in the database
      const user = await User.findById(userId);
  
      if (user.username != "admin") {
        return res.status(404).json({ message: 'Unauthorized access to admin resources' });
      };
  
      req.user = decoded;
    
      next();
    } catch (err) {
      console.error(err);
      return res.status(403).json({message:"Invalid Token"});
    }
  };
  
  export default verifyTokenAndAdmin;