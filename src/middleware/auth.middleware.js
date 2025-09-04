import jwt from "jsonwebtoken";
import User from "../models/User.js";

const protectRoute = async (req, resizeBy, next) => {
  try {
    //get token
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token)
      return res
        .status(401)
        .json({ message: "No authentication token, access denied" });

    //verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //find user
    const user = await User.findById(decoded.userId).select("-password");

    if (!user)
      return res.status(401).json({ message: "Your token is invalid" });

    req.user = user;
  } catch (error) {
    console.log("Authentication Error:", error);
    res.status(401).json({ message: "Token is invalid" });
  }
};

export default protectRoute;
