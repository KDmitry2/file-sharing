const form = document.getElementById("login-form");
const errorElement = document.getElementById("login-error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  errorElement.textContent = "";

  const login = document.getElementById("login").value;

  const password = document.getElementById("password").value;

  const response = await fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      login,
      password,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    errorElement.textContent = data.error;

    return;
  }

  window.location.href = "/";
});
