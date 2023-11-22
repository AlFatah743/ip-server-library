import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const bearerHeader = req.headers["mis"];

  if (!bearerHeader) {
    return res.status(401).json({ message: "mis" });
  }

  const bearer = bearerHeader.split(" ");
  const bearerToken = bearer[1];

  if (!bearerToken) {
    return res.status(401).json({ message: "mis" });
  }

  jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(404).json({ message: "mis" });
    }

    req.user = decoded;
    next();
  });
};