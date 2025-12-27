const form = document.getElementById("loginForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:3000/api/users/login", {
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

    // ✅ Save token
    localStorage.setItem("token", data.token);

    msg.innerText = "Login successful ✅";
    msg.style.color = "green";

    // 👉 Redirect to dashboard
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 1000);

  } catch (err) {
    msg.innerText = "Server error ❌";
    msg.style.color = "red";
  }
});
