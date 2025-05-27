import jwt from "jsonwebtoken";

import { JWT_SECRET_KEY } from "../settings.mjs";

export const auth = (req, res, next) => {
  const authorizationHeader = req.header("Authorization");
  const type = authorizationHeader && authorizationHeader?.split(" ")[0];
  const token = authorizationHeader && authorizationHeader?.split(" ")[1];
  
  if(!type || type !== "Bearer")
    return res.status(401).json({ error: "Access denied. Invalid authorization scheme." });

  if (!token)
    return res.status(401).json({ error: "Access denied. No token provided." });
  
  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};
