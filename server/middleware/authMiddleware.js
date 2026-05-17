const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
    try {

        // get token from headers
        const authHeader = req.headers.authorization;

        // check if token exists
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "No token, authorization denied",
        });
        }

        // extract token
        const token = authHeader.split(" ")[1];

        // verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // attach user data to request
        req.user = decoded;

        // move to next middleware/route
        next();

    } catch (error) {
        console.log(error);

        res.status(401).json({
        message: "Invalid token",
        });
    }
};

module.exports = authMiddleware;