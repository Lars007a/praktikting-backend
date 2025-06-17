import jwt from "jsonwebtoken";

export function loadUserFromToken(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    req.user = null;
    return next();
  }

  const token = authHeader;

  if (!token) {
    console.log("No token");
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      req.user = null;
      return next();
    }

    req.user = user;
    next();
  });
}

export function requiredUser(req, res, next) {
  if (req.user == null || req.user == undefined) {
    return res.status(401).send({
      status: "not ok",
      message: "adgang nægtet!",
      data: null,
    });
  }

  next();
}
