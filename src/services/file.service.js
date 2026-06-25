import fs from "fs/promises";
import path from "path";
import { v4 as uuid } from "uuid";

const FILES_DB = path.resolve("src/data/files.json");

class FileService {
  async getFiles() {
    const data = await fs.readFile(FILES_DB, "utf-8");

    return JSON.parse(data);
  }

  async saveFiles(files) {
    await fs.writeFile(FILES_DB, JSON.stringify(files, null, 2));
  }

  async createFileMetadata(file) {
    const files = await this.getFiles();

    const id = uuid();

    const metadata = {
      id,
      originalName: file.originalname,
      storedName: file.filename,
      createdAt: new Date().toISOString(),
      lastDownloadedAt: null,
      downloads: 0,
    };

    files.push(metadata);

    await this.saveFiles(files);

    return metadata;
  }

  async getFileById(id) {
    const files = await this.getFiles();

    return files.find((file) => file.id === id);
  }

  async incrementDownloads(id) {
    const files = await this.getFiles();

    const file = files.find((file) => file.id === id);

    if (!file) {
      throw new Error("File not found");
    }

    file.downloads += 1;
    file.lastDownloadedAt = new Date().toISOString();

    await this.saveFiles(files);

    return file;
  }

  async getStatistics() {
    const files = await this.getFiles();
    return files.map((file) => ({
      id: file.id,
      originalName: file.originalName,
      downloads: file.downloads,
      lastDownloadedAt: file.lastDownloadedAt,
    }));
  }

  async cleanupExpiredFiles() {
    const files = await this.getFiles();

    const expiredFiles = files.filter((file) => {
      const date = file.lastDownloadedAt || file.createdAt;

      const daysPassed = (Date.now() - new Date(date)) / (1000 * 60 * 60 * 24);

      return daysPassed >= 30;
    });

    await Promise.all(
      expiredFiles.map((file) =>
        fs.unlink(path.resolve("src/uploads", file.storedName)).catch(() => {}),
      ),
    );

    const actualFiles = files.filter(
      (file) => !expiredFiles.some((expired) => expired.id === file.id),
    );

    await this.saveFiles(actualFiles);
  }
}

export const fileService = new FileService();
