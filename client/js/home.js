// Home page logic
document.addEventListener('DOMContentLoaded', async () => {
  const featuredGrid = document.getElementById('featured-grid');
  
  if (!featuredGrid) return; // Only run on home page
  
  try {
    showSpinner('featured-grid');
    
    // Fetch all services, sort by rating descending, get top 4
    const services = await API.getServices();
    const featured = services
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4);
    
    clearSpinner('featured-grid');
    
    // Render featured services
    featuredGrid.innerHTML = featured
      .map(service => createServiceCard(service, { showSave: false }))
      .join('');
    
    // Add click listeners to View Details buttons
    featuredGrid.addEventListener('click', (e) => {
      if (e.target.dataset.action === 'view') {
        const serviceId = e.target.dataset.id;
        window.location.href = `services.html?id=${serviceId}`;
      }
    });
  } catch (err) {
    clearSpinner('featured-grid');
    showError(err.message);
  }
});
