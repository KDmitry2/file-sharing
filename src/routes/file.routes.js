import { Router } from "express";
import multer from "multer";
import { fileController } from "../controllers/file.controller.js";

const router = Router();

const upload = multer({
  dest: "src/uploads/",
});

router.get("/download/:id", fileController.download);

router.get("/files", fileController.getFiles);

router.post("/upload", upload.single("file"), fileController.upload);

export default router;
