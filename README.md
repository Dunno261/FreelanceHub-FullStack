# FreelanceHub

A full-stack freelance marketplace platform where users can browse, search, filter, save, and hire professional freelance services.

## Description

FreelanceHub is a modern freelance marketplace built with Express.js backend and vanilla JavaScript frontend. Users can explore thousands of professional services across multiple categories, save their favorites, and hire freelancers directly through the platform.

## Features

- 🔍 **Advanced Search & Filtering** - Search by service name and filter by category (Design, Development, Writing, Marketing)
- ⭐ **Rating System** - View detailed ratings and reviews for each service
- 💰 **Smart Sorting** - Sort services by price and rating
- 💾 **Save for Later** - Save favorite services to your dashboard
- 👔 **Hire Services** - Hire freelancers directly with a confirmation flow
- 🎯 **Drag & Drop** - Intuitive drag-to-save functionality
- 📱 **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
- 🚀 **Real-time Updates** - Instant feedback on all user actions

## Tech Stack

**Frontend:** HTML5, CSS3, Vanilla JavaScript (no frameworks or build tools)

**Backend:** Node.js, Express.js, in-memory data storage

**Additional:** CORS for cross-origin requests

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/services` | Get all services (supports `?category=` and `?search=` query params) |
| GET | `/api/services/:id` | Get a single service by ID |
| POST | `/api/services` | Add a new service |
| POST | `/api/save` | Save a service to your dashboard |
| POST | `/api/hire` | Hire a service |
| GET | `/api/saved` | Get all saved services |
| GET | `/api/hired` | Get all hired services |

## Setup & Run

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

```bash
cd FreelanceHub
npm install
```

### Running the Application

**Start the Backend Server:**
```bash
npm start
```
The server will run on `http://localhost:3000`

**Open the Frontend:**
Since the frontend is vanilla HTML/CSS/JS with no build tools, you have two options:

1. **Using Live Server (VS Code Extension):**
   - Install the Live Server extension
   - Right-click `client/index.html` and select "Open with Live Server"

2. **Using Python's Simple HTTP Server:**
   ```bash
   cd client
   python -m http.server 8000
   # Open http://localhost:8000
   ```

3. **Using Node's http-server:**
   ```bash
   npm install -g http-server
   cd client
   http-server
   # Open http://localhost:8080
   ```

**Development Mode (with auto-reload):**
```bash
npm run dev
```

## Project Structure

```
/FreelanceHub
├── /client
│   ├── index.html          ← Home page
│   ├── services.html       ← Services listing & browsing
│   ├── dashboard.html      ← User dashboard (saved + hired)
│   ├── /css
│   │   └── style.css       ← All styling and responsive design
│   └── /js
│       ├── api.js          ← Centralized API fetch wrapper
│       ├── home.js         ← Home page logic
│       ├── services.js     ← Services page with filtering & modals
│       └── dashboard.js    ← Dashboard tab management
├── /server
│   ├── server.js           ← Express.js entry point
│   ├── /routes
│   │   └── services.js     ← API route definitions
│   ├── /controllers
│   │   └── servicesController.js ← Business logic for endpoints
│   └── /data
│       └── services.js     ← In-memory seed data (12 services)
├── package.json            ← Project dependencies
└── README.md               ← This file
```

## Data Model

Each service contains:
- `id` - Unique identifier
- `title` - Service name
- `category` - One of: Design, Development, Writing, Marketing
- `description` - Detailed service description
- `price` - Service cost in USD
- `rating` - Average rating (1-5 stars)
- `reviews` - Number of reviews
- `deliveryDays` - Estimated delivery time
- `seller` - Freelancer username
- `image` - Service image URL

## Usage Guide

### Browsing Services
1. Click "Browse Services" from the home page
2. Use the search bar to find specific services
3. Filter by category using the category buttons
4. Sort by price or rating using the dropdown

### Saving Services
- Click the "Save" button on any service card
- Or drag a service card to the "Drop to Save" zone at the bottom
- View saved services in your Dashboard

### Hiring Services
1. Click "View Details" on a service
2. Review the service information in the modal
3. Click "Hire Now"
4. Confirm the hire in the confirmation dialog
5. View hired services in your Dashboard

### Managing Your Dashboard
- Switch between "Saved Services" and "Hired Services" tabs
- Click "View Details" on any saved or hired service for more information

## Features in Detail

### Search & Filter
- Case-insensitive search across service titles
- Filter by 4 categories: Design, Development, Writing, Marketing
- Combine search and filters for precise results

### Sorting Options
- Default (original order)
- Price: Low to High
- Price: High to Low
- Highest Rating

### Error Handling
- User-friendly error messages for failed operations
- Graceful handling of "already saved/hired" scenarios
- Auto-dismissing error banners

### Responsive Design
- Desktop: 3-column grid layout
- Tablet: 2-column grid layout
- Mobile: 1-column layout
- All interactive elements are touch-friendly

## Future Enhancements

- User authentication and profiles
- Review and rating system
- Payment processing integration
- Service messaging system
- Advanced filtering (price range, delivery time)
- Service recommendations based on browsing history
- Seller analytics dashboard

## License

This project is created for educational purposes.

## Author

Created as part of a Web Programming Lab assignment.
