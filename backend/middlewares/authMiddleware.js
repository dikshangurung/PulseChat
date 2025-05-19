const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
	try {
		// Check if authorization header exists
		if (!req.headers.authorization) {
			return res.status(401).send({
				message: "Authorization header missing",
				success: false,
			});
		}

		const token = req.headers.authorization.split(" ")[1];

		if (!token) {
			return res.status(401).send({
				message: "No token provided",
				success: false,
			});
		}

		// Verify token and store userId in req object directly, not in body
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		req.userId = decoded.userId; // Store in req.userId instead of req.body.userId
		next();
	} catch (error) {
		return res.status(401).send({
			message: "Invalid or expired token",
			success: false,
		});
	}
};
