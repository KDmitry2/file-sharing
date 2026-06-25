export function authMiddleware(req, res, next) {
  const cookies = req.headers.cookie;

  if (!cookies) {
    return res.redirect("/login.html");
  }

  const authCookie = cookies
    .split(";")
    .find((cookie) => cookie.trim().startsWith("auth="));

  const auth = authCookie?.split("=")[1];

  if (auth === "true") {
    return next();
  }

  return res.redirect("/login.html");
}
