const API_BASE = "https://campus-connect-backend-lljm.onrender.com";

const form = document.getElementById("loginForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch(`${API_BASE}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      msg.innerText = data.message || "Login failed ❌";
      msg.style.color = "red";
      return;
    }

    localStorage.setItem("token", data.token);

    msg.innerText = "Login successful ✅";
    msg.style.color = "green";

    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);

  } catch (err) {
    msg.innerText = "Server error ❌";
    msg.style.color = "red";
  }
});
