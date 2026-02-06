import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({success: false, message: "Authorization header not provided!"});
    }

    if (!authHeader.startsWith("Bearer ")) {
      return res.status(401).json({success: false,message: "Invalid token format"});
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({success: false,message: "Token not provided"});
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    next();
  } 
  catch (error) {
    console.error(error)
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};

export default authUser;
