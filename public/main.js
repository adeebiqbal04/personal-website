const form = document.querySelector("#contactForm");
let isSubmitting = false;

form.addEventListener("submit", async (e) => {
  if (isSubmitting) return;
  
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  
  // Show loading state
  isSubmitting = true;
  submitButton.disabled = true;
  submitButton.textContent = "Sending...";
  
  // Let the form submit naturally to Web3Forms
  // The page will redirect to a success page, then back
  
  // Reset button after a delay (in case user comes back)
  setTimeout(() => {
    isSubmitting = false;
    submitButton.disabled = false;
    submitButton.textContent = originalText;
  }, 3000);
});

// Function to show quick, non-blocking messages
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

// Add CSS animations
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
