import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fileRoutes from "./routes/file.routes.js";
import { fileService } from "./services/file.service.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

setInterval(
  async () => {
    await fileService.cleanupExpiredFiles();
  },
  24 * 60 * 60 * 1000,
);

app.use(express.static(path.join(__dirname, "public")));

app.use(fileRoutes);

export default app;
