import jwt from "jsonwebtoken";

export function loadUserFromToken(req, res, next) {
  //Gemmer brugeren i requesten.
  //Bliver kørt på alle requests.

  const authHeader = req.headers.authorization; //finder auth header, hvor token er.

  if (!authHeader) {
    req.user = null;
    return next();
  } //Hvis den ikke er der, sætter vi req.user til null, og køre videre.

  const token = authHeader;

  //Tjekker om token er vores, en af vores tokens, som vi har udskrivet.
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      //Hvis ikke, sætter vi req.user til null og køre videre.
      req.user = null;
      return next();
    }

    //Hvis det er en af vores, sætter vi req.user til den token vi har fået
    req.user = user;
    next();
  });
}

//Funktion der kun køre på de endpoints der skal have en bruger.
export function requiredUser(req, res, next) {
  //Tjekker om req.user er null, og hvis er, så siger vi bare adgang er nægtet.
  if (req.user == null || req.user == undefined) {
    return res.status(401).send({
      status: "not ok",
      message: "adgang nægtet!",
      data: null,
    });
  }

  //Ellers sender vi dem videre.
  next();
}
