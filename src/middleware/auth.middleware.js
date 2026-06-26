export function authMiddleware(req, res, next) {
  const cookies = req.headers.cookie;

  if (cookies?.includes("auth=true")) {
    return next();
  }

  return res.status(401).json({
    error: "Unauthorized",
  });
}
