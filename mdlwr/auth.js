import jwt from "jsonwebtoken";

export function loadUserFromToken(req, res, next) {
  //Gemmer brugeren i requesten.
  //Bliver kørt på alle requests.

  const authHeader = req.headers.authorization; //finder auth header, hvor token er.

  if (!authHeader) {
    req.user = null;
    return next();
  } //Hvis den ikke er der, sætter vi req.user til null, og køre videre.

  let token = authHeader;

  if(authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
  }

  //Tjekker om token er vores, en af vores tokens, som vi har udskrivet.
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      //Hvis ikke, sætter vi req.user til null og køre videre.
      req.user = null;
      return next(); //Return fordi stop funktionen her.
    }

    //Hvis det er en af vores, sætter vi req.user til den token vi har fået
    req.user = user;
    next();
  });
}


//For de endpoints, hvor man skal være logget ind med en bruger, med en eller anden rolle, hvad end der er admin eller demo.
export function requiredLogin(req, res, next) {

  if (req.user == null || req.user == undefined) {
    return res.status(401).send({
      status: "not ok",
      message: "adgang nægtet! Skal være logget ind. Måske er din token expired?",
      data: null,
    });
  }

  next();

}


//Funktion der kun køre på de endpoints der skal have en admin bruger.
export function requiredAdmin(req, res, next) {
  if(req.user.role != "admin") {
    return res.status(403).send({
      status: "not ok",
      message: "Skal være admin for at gøre dette!",
      data: null,
    })
  }

  //Ellers sender vi dem videre.
  next();
}
