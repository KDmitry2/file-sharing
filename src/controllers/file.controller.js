import { fileService } from "../services/file.service.js";
import path from "path";

class FileController {
  async upload(req, res) {
    if (!req.file) {
      return res.status(400).json({
        error: "File is required",
      });
    }

    const metadata = await fileService.createFileMetadata(req.file);

    res.json({
      downloadUrl: `/download/${metadata.id}`,
    });
  }

  async download(req, res) {
    const { id } = req.params;

    const file = await fileService.getFileById(id);

    if (!file) {
      return res.status(404).json({
        error: "File not found",
      });
    }

    await fileService.incrementDownloads(id);

    res.download(
      path.resolve("src/uploads", file.storedName),
      file.originalName,
    );
  }

  async getFiles(req, res) {
    const files = await fileService.getStatistics();

    res.json(files);
  }
}

export const fileController = new FileController();
