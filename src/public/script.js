const form = document.getElementById("upload-form");
const status = document.getElementById("status");
const result = document.getElementById("result");
const loadFilesButton = document.getElementById("load-files");
const filesContainer = document.getElementById("files");
const logoutButton = document.getElementById("logout-button");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const formData = new FormData(form);

  status.textContent = "Uploading...";

  const response = await fetch("/upload", {
    method: "POST",
    body: formData,
  });

  const data = await response.json();

  status.textContent = data.message;

  result.innerHTML = `
    <a href="${data.downloadUrl}">
      Download file
    </a>
  `;
});

loadFilesButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const response = await fetch("/files");

  const files = await response.json();

  filesContainer.innerHTML = files
    .map(
      (file) => `
      <div class="file-card">
        <div class="file-card__name">
          ${file.originalName}
        </div>

        <div class="file-card__meta">
          Downloads: ${file.downloads}
        </div>

        <div class="file-card__meta">
          Last download:
          ${file.lastDownloadedAt ?? "Never"}
        </div>
      </div>
    `,
    )
    .join("");
});

logoutButton?.addEventListener("click", async () => {
  await fetch("/logout", {
    method: "POST",
  });

  window.location.href = "/login.html";
});
