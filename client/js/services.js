// Services page state and logic
let state = {
  allServices: [],
  filtered: [],
  searchQuery: '',
  activeCategory: 'All',
  sortBy: 'default'
};

let currentDetailServiceId = null;
let pendingHireServiceId = null;

// Initialize page on DOMContentLoaded
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Fetch all services
    showSpinner('services-grid');
    state.allServices = await API.getServices();
    state.filtered = [...state.allServices];
    clearSpinner('services-grid');
    
    // Check URL parameters
    const params = new URLSearchParams(window.location.search);
    const categoryParam = params.get('category');
    const idParam = params.get('id');
    
    if (categoryParam) {
      state.activeCategory = categoryParam;
      const categoryBtn = document.querySelector(`[data-category="${categoryParam}"]`);
      if (categoryBtn) {
        document.querySelectorAll('[data-category]').forEach(btn => btn.classList.remove('active'));
        categoryBtn.classList.add('active');
      }
    }
    
    applyFilters();
    renderGrid();
    setupEventListeners();
    
    // If id param present, open detail modal
    if (idParam) {
      const service = state.allServices.find(s => s.id === parseInt(idParam));
      if (service) {
        openDetailModal(parseInt(idParam));
      }
    }
  } catch (err) {
    clearSpinner('services-grid');
    showError(err.message);
  }
});

// Apply filters and sort
function applyFilters() {
  let filtered = [...state.allServices];
  
  // Filter by category
  if (state.activeCategory !== 'All') {
    filtered = filtered.filter(s => s.category === state.activeCategory);
  }
  
  // Filter by search query
  if (state.searchQuery) {
    const query = state.searchQuery.toLowerCase();
    filtered = filtered.filter(s => s.title.toLowerCase().includes(query));
  }
  
  // Sort
  if (state.sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }
  
  state.filtered = filtered;
}

// Render service grid
function renderGrid() {
  const grid = document.getElementById('services-grid');
  
  if (state.filtered.length === 0) {
    grid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-state-icon">🔍</div>
        <p class="empty-state-text">No services found. Try adjusting your filters.</p>
      </div>
    `;
    return;
  }
  
  grid.innerHTML = state.filtered
    .map(service => createServiceCard(service, { showSave: true }))
    .join('');
  
  // Attach event listeners to cards
  grid.querySelectorAll('[data-action="view"]').forEach(btn => {
    btn.addEventListener('click', () => {
      openDetailModal(parseInt(btn.dataset.id));
    });
  });
  
  grid.querySelectorAll('[data-action="save"]').forEach(btn => {
    btn.addEventListener('click', () => {
      handleSave(parseInt(btn.dataset.id));
    });
  });
  
  // Setup drag listeners
  grid.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('serviceId', card.dataset.id);
    });
  });
}

// Open detail modal
async function openDetailModal(id) {
  try {
    const service = await API.getService(id);
    currentDetailServiceId = id;
    
    // Populate modal
    document.getElementById('modal-image').src = service.image;
    document.getElementById('modal-title').textContent = service.title;
    document.getElementById('modal-seller').textContent = `by ${service.seller}`;
    document.getElementById('modal-description').textContent = service.description;
    document.getElementById('modal-price').textContent = service.price;
    document.getElementById('modal-delivery').textContent = service.deliveryDays;
    document.getElementById('modal-rating').textContent = service.rating.toFixed(1);
    
    // Set hire button data-id
    document.getElementById('hire-btn').dataset.id = id;
    
    // Show modal
    document.getElementById('detail-modal').classList.add('show');
  } catch (err) {
    showError(err.message);
  }
}

// Close detail modal
function closeDetailModal() {
  document.getElementById('detail-modal').classList.remove('show');
  currentDetailServiceId = null;
}

// Open confirm modal
function openConfirmModal(serviceId) {
  const service = state.allServices.find(s => s.id === serviceId);
  if (!service) return;
  
  pendingHireServiceId = serviceId;
  document.getElementById('confirm-message').textContent = 
    `Are you sure you want to hire "${service.title}" for $${service.price}?`;
  
  document.getElementById('confirm-modal').classList.add('show');
}

// Close confirm modal
function closeConfirmModal() {
  document.getElementById('confirm-modal').classList.remove('show');
  pendingHireServiceId = null;
}

// Handle save service
async function handleSave(id) {
  try {
    await API.saveService(id);
    showSuccessToast('Service saved!');
  } catch (err) {
    showError(err.message);
  }
}

// Handle hire service
async function handleHire(id) {
  try {
    showSpinner('confirm-modal');
    await API.hireService(id);
    clearSpinner('confirm-modal');
    closeConfirmModal();
    showSuccessToast('Service hired successfully!');
  } catch (err) {
    clearSpinner('confirm-modal');
    showError(err.message);
  }
}

// Show success toast
function showSuccessToast(message) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background-color: #10b981;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 999;
    animation: slideUp 0.3s ease-out;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);
  
  setTimeout(() => {
    toast.style.animation = 'slideDown 0.3s ease-out';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Setup event listeners
function setupEventListeners() {
  // Search input
  document.getElementById('search-input').addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    applyFilters();
    renderGrid();
  });
  
  // Category filter buttons
  document.querySelectorAll('[data-category]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeCategory = btn.dataset.category;
      document.querySelectorAll('[data-category]').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      applyFilters();
      renderGrid();
    });
  });
  
  // Sort select
  document.getElementById('sort-select').addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    applyFilters();
    renderGrid();
  });
  
  // Modal close buttons and overlay
  document.getElementById('detail-modal').addEventListener('click', (e) => {
    if (e.target.id === 'detail-modal' || e.target.id === 'detail-cancel-btn' || e.target.classList.contains('modal-close')) {
      closeDetailModal();
    }
  });
  
  document.getElementById('confirm-modal').addEventListener('click', (e) => {
    if (e.target.id === 'confirm-modal' || e.target.id === 'confirm-cancel-btn') {
      closeConfirmModal();
    }
  });
  
  // Hire button in detail modal
  document.getElementById('hire-btn').addEventListener('click', () => {
    closeDetailModal();
    openConfirmModal(currentDetailServiceId);
  });
  
  // Confirm hire button
  document.getElementById('confirm-hire-btn').addEventListener('click', () => {
    handleHire(pendingHireServiceId);
  });
  
  // Drag and drop
  const dropZone = document.getElementById('drop-zone');
  
  dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('drag-over');
  });
  
  dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('drag-over');
  });
  
  dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('drag-over');
    const serviceId = parseInt(e.dataTransfer.getData('serviceId'));
    handleSave(serviceId);
  });
}
