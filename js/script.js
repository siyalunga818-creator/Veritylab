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

// ========== Memory Feature ==========
const memoryInput = document.getElementById('memoryInput');
const addMemoryBtn = document.getElementById('addMemoryBtn');
const memoryList = document.getElementById('memoryList');

const STORAGE_KEY = 'veritylab_memories';

// Load memories from localStorage
function loadMemories() {
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

// Save memories to localStorage
function saveMemories(memories) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(memories));
}

// Render the memory list
function renderMemories() {
  const memories = loadMemories();
  memoryList.innerHTML = '';
  
  if (memories.length === 0) {
    memoryList.innerHTML = '<div class="memory-empty">No memories yet.</div>';
    return;
  }
  
  memories.forEach((memory, index) => {
    const item = document.createElement('div');
    item.className = 'memory-item';
    
    const span = document.createElement('span');
    span.textContent = memory;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      deleteMemory(index);
    });
    
    item.appendChild(span);
    item.appendChild(deleteBtn);
    memoryList.appendChild(item);
  });
}

// Add a new memory
function addMemory() {
  const text = memoryInput.value.trim();
  if (!text) return;
  
  const memories = loadMemories();
  memories.push(text);
  saveMemories(memories);
  
  memoryInput.value = '';
  renderMemories();
}

// Delete a memory by index
function deleteMemory(index) {
  const memories = loadMemories();
  memories.splice(index, 1);
  saveMemories(memories);
  renderMemories();
}

// Add event listeners for memory feature
addMemoryBtn.addEventListener('click', addMemory);
memoryInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addMemory();
});

// Initial render
renderMemories();
