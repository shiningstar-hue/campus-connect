const API_BASE = "https://campus-connect-backend-lljm.onrender.com";

const form = document.getElementById("registerForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${API_BASE}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      msg.innerText = data.message || "Registration failed ❌";
      msg.style.color = "red";
      return;
    }

    msg.innerText = "Registration successful ✅ Redirecting to login...";
    msg.style.color = "green";

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1500);
  } catch (err) {
    msg.innerText = "Server error ❌";
    msg.style.color = "red";
  }
});
