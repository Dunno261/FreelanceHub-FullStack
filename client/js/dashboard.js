// Dashboard page logic
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // Load saved and hired services in parallel
    const [savedServices, hiredServices] = await Promise.all([
      API.getSaved(),
      API.getHired()
    ]);
    
    // Render saved services
    renderTab('saved', savedServices);
    
    // Render hired services
    renderTab('hired', hiredServices);
    
    // Setup tab switching
    setupTabs();
  } catch (err) {
    showError(err.message);
  }
});

// Render a tab's services
function renderTab(tabName, services) {
  const gridId = `${tabName}-grid`;
  const emptyId = `${tabName}-empty`;
  const grid = document.getElementById(gridId);
  const emptyState = document.getElementById(emptyId);
  
  if (services.length === 0) {
    grid.innerHTML = '';
    emptyState.style.display = 'block';
  } else {
    grid.innerHTML = services
      .map(service => createServiceCard(service, { showSave: false }))
      .join('');
    emptyState.style.display = 'none';
  }
}

// Setup tab switching
function setupTabs() {
  const tabSaved = document.getElementById('tab-saved');
  const tabHired = document.getElementById('tab-hired');
  const savedPanel = document.getElementById('saved-panel');
  const hiredPanel = document.getElementById('hired-panel');
  
  tabSaved.addEventListener('click', () => {
    savedPanel.classList.add('show');
    hiredPanel.classList.remove('show');
    tabSaved.classList.add('active');
    tabHired.classList.remove('active');
  });
  
  tabHired.addEventListener('click', () => {
    hiredPanel.classList.add('show');
    savedPanel.classList.remove('show');
    tabHired.classList.add('active');
    tabSaved.classList.remove('active');
  });
}
