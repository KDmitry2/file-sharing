import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fileRoutes from "./routes/file.routes.js";
import authRoutes from "./routes/auth.route.js";
import { fileService } from "./services/file.service.js";
import { authMiddleware } from "./middleware/auth.middleware.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use(authRoutes);
app.use(fileRoutes);

setInterval(
  async () => {
    await fileService.cleanupExpiredFiles();
  },
  24 * 60 * 60 * 1000,
);

export default app;
