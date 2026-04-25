// API Base URL
const API_BASE = 'http://localhost:3000/api';

// API Object with all fetch methods
const API = {
  async getServices(params = {}) {
    try {
      const query = new URLSearchParams(params).toString();
      const url = query ? `${API_BASE}/services?${query}` : `${API_BASE}/services`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch services');
      return await response.json();
    } catch (err) {
      throw new Error(err.message || 'Request failed');
    }
  },

  async getService(id) {
    try {
      const response = await fetch(`${API_BASE}/services/${id}`);
      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Service not found');
      }
      return await response.json();
    } catch (err) {
      throw new Error(err.message || 'Request failed');
    }
  },

  async saveService(id) {
    try {
      const response = await fetch(`${API_BASE}/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceId: id })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to save service');
      }
      return data;
    } catch (err) {
      throw new Error(err.message || 'Request failed');
    }
  },

  async hireService(id) {
    try {
      const response = await fetch(`${API_BASE}/hire`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceId: id })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to hire service');
      }
      return data;
    } catch (err) {
      throw new Error(err.message || 'Request failed');
    }
  },

  async getSaved() {
    try {
      const response = await fetch(`${API_BASE}/saved`);
      if (!response.ok) throw new Error('Failed to fetch saved services');
      return await response.json();
    } catch (err) {
      throw new Error(err.message || 'Request failed');
    }
  },

  async getHired() {
    try {
      const response = await fetch(`${API_BASE}/hired`);
      if (!response.ok) throw new Error('Failed to fetch hired services');
      return await response.json();
    } catch (err) {
      throw new Error(err.message || 'Request failed');
    }
  }
};

// Helper Functions

// Show error message in banner
function showError(message) {
  const bannerContainer = document.querySelector('.container') || document.body;
  let banner = document.getElementById('error-banner');
  
  if (!banner) {
    banner = document.createElement('div');
    banner.id = 'error-banner';
    banner.className = 'error-banner show';
    bannerContainer.insertBefore(banner, bannerContainer.firstChild);
  }
  
  banner.textContent = message;
  banner.classList.add('show');
  
  // Auto-remove after 4 seconds
  setTimeout(() => {
    banner.classList.remove('show');
  }, 4000);
}

// Show loading spinner in container
function showSpinner(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  
  const spinner = document.createElement('div');
  spinner.className = 'spinner';
  spinner.id = `spinner-${containerId}`;
  container.innerHTML = '';
  container.appendChild(spinner);
}

// Remove spinner from container
function clearSpinner(containerId) {
  const spinner = document.getElementById(`spinner-${containerId}`);
  if (spinner) spinner.remove();
}

// Create HTML string for a service card
function createServiceCard(service, options = {}) {
  const { showSave = false } = options;
  
  // Create star rating display
  const fullStars = Math.floor(service.rating);
  const hasHalfStar = service.rating % 1 !== 0;
  let starsHtml = '';
  
  for (let i = 0; i < fullStars; i++) {
    starsHtml += '<span class="star">★</span>';
  }
  for (let i = fullStars; i < 5; i++) {
    starsHtml += '<span style="color: #d1d5db;">★</span>';
  }
  
  return `
    <div class="service-card" draggable="true" data-id="${service.id}">
      <img src="${service.image}" alt="${service.title}" class="card-image">
      <div class="card-body">
        <h3 class="card-title">${service.title}</h3>
        <p class="card-seller">by ${service.seller}</p>
        <div class="card-rating">${starsHtml} <span style="color: var(--text-muted);">${service.rating}</span> (${service.reviews} reviews)</div>
        <div class="card-price">$${service.price}</div>
        <div class="card-actions">
          <button class="btn-primary" data-action="view" data-id="${service.id}">View Details</button>
          ${showSave ? `<button class="btn-secondary" data-action="save" data-id="${service.id}">Save</button>` : ''}
        </div>
      </div>
    </div>
  `;
}

// Make API available globally
window.API = API;
window.showError = showError;
window.showSpinner = showSpinner;
window.clearSpinner = clearSpinner;
window.createServiceCard = createServiceCard;
