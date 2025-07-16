const form = document.querySelector(".contact-form");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent default form action (page reload)
  fetch('http://127.0.0.1:5001/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        alert("✅ Email sent successfully!");
        form.reset(); // Clear form
      } else {
        alert("❌ Failed to send email.");
      }
    })
    .catch(err => {
      console.error("Error:", err);
      alert("❌ Something went wrong.");
    });
});
