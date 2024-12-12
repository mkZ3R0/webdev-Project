import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).send("Unauthorized: No token provided or invalid format");
    }

    // Extract token from the "Bearer <token>" format
    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the token has expired
    const isExpired = Date.now() >= decoded.exp * 1000;

    if (isExpired) {
      return res.status(401).send("Token Expired");
    }

    // Attach decoded user info to the request for further use
    req.user = decoded;

    // Call the next middleware or route handler
    next();
  } catch (err) {
    console.error(err);
    return res.status(403).send("Invalid Token");
  }
};

export default verifyToken;