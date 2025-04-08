const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = "your_secret_key"; // Use environment variables for security

// Authentication middleware
async function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']; // Get the Authorization header
    console.log(authHeader);
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Access Denied: No Bearer Token Provided" });
    }

    const token = authHeader.split(" ")[1]; // Extract the token part after "Bearer "

    try {

        console.log(jwt.verify(token, process.env.JWT_SECRET_KEY));
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Verify the token
        req.user = decoded; // Attach the decoded payload to the request object
        next(); // Proceed to the next middleware/route handler
    } catch (err) {
        return res.status(403).json({ message: "Invalid or Expired Token" });
    }
}

module.exports = authenticateToken;
