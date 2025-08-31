const form = document.querySelector("#contactForm");
let isSubmitting = false;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  

  if (isSubmitting) return;
  
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  

  isSubmitting = true;
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";
  
  const formData = new FormData(form);
  const name = formData.get("name");
  const email = formData.get("email");
  const message = formData.get("message");
  
  if (!name || !email || !message) {
    alert("Please fill in all fields");
    resetButton();
    return;
  }
  
  try {
    const response = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, message }),
    });
    
    if (response.ok) {
      showQuickMessage("✅ Message sent!", "success");
      form.reset(); 
    } else {
      throw new Error("Failed to send message");
    }
  } catch (error) {
    console.error("Error:", error);
    showQuickMessage("❌ Failed to send message", "error");
  } finally {
    resetButton();
  }
  
  function resetButton() {
    isSubmitting = false;
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }
});

function showQuickMessage(message, type) {
  const existingMessage = document.querySelector('.quick-message');
  if (existingMessage) {
    existingMessage.remove();
  }

  const messageDiv = document.createElement('div');
  messageDiv.className = `quick-message ${type}`;
  messageDiv.textContent = message;
  
  // Style the message
  messageDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 12px 20px;
    border-radius: 8px;
    color: white;
    font-weight: bold;
    z-index: 10000;
    animation: slideIn 0.3s ease-out;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;
  
  // Set background color based on type
  if (type === 'success') {
    messageDiv.style.background = '#2563eb';
  } else {
    messageDiv.style.background = '#ef4444'; 
  }
  
  // Add to page
  document.body.appendChild(messageDiv);
  
  // Auto-remove after 3 seconds
  setTimeout(() => {
    messageDiv.style.animation = 'slideOut 0.3s ease-in';
    setTimeout(() => messageDiv.remove(), 300);
  }, 3000);
}


const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);
