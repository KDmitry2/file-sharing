class AuthController {
  async login(req, res) {
    const { login, password } = req.body;

    if (
      login === process.env.ADMIN_LOGIN &&
      password === process.env.ADMIN_PASSWORD
    ) {
      res.cookie("auth", "true");

      return res.json({
        success: true,
      });
    }

    return res.status(401).json({
      error: "Invalid credentials",
    });
  }

  async logout(req, res) {
    res.clearCookie("auth");

    return res.json({
      success: true,
    });
  }
}

export const authController = new AuthController();
