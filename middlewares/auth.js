import jwt from "jsonwebtoken";

function verifyIt(req, res, next) {
  const token = req.headers.cookie ? req.headers.cookie.split("=")[1] : null;
  if (!token) return res.redirect("login");
  jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
    if (err) return res.redirect("login");
    req.user = user;
    next();
  });
}
export { verifyIt };
