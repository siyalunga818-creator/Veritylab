// Simple client-side script for VerityLab test app

const input = document.getElementById('userInput');
const btn = document.getElementById('testBtn');
const result = document.getElementById('result');

btn.addEventListener('click', () => {
  const text = input.value;
  // Escape HTML to avoid injection
  const escaped = text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  result.textContent = escaped;
});

// Allow Enter key to submit
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') btn.click();
});
