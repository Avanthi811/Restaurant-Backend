import jwt from "jsonwebtoken";

const validation = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(400).json({
      status: "Failed",
      message: "JWT token not provided or wrong format",
    });
  }

  const jwtCheck = token.split(" ")[1];
  try {
    const code = jwt.verify(jwtCheck, process.env.JWT_SECRET || "secret");
    req.user = code;
    next();
  } 
  catch (error) {
    return res.status(401).json({
      status: "Failed",
      message: "Failed to verify JWT token",
      error: error.message,
    });
  }
};

export default validation;