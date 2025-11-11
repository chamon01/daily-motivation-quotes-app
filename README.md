# Daily Motivation Quotes App

## 📋 Overview

A full-stack web application that displays random motivational quotes with a clean, responsive user interface. Users can fetch new quotes on demand and mark their favorites. Built with modern web technologies and deployed to Google Cloud Run for production-ready use. This project demonstrates full-stack development capabilities including frontend UI, backend API, Docker containerization, and cloud deployment.

---

## 🛠️ Tech Stack

| Component | Technology |
|-----------|-----------|
| **Frontend** | React 18.2 + TypeScript, Vite 4.5 |
| **Backend** | Node.js 18, Express.js 4.18 |
| **Database** | MongoDB with Mongoose (optional) |
| **Containerization** | Docker (multi-stage build) |
| **Deployment** | Google Cloud Run |
| **CI/CD** | GitHub Actions |

---

## 🔗 Project Links

- **🌐 Live App**: [https://daily-motivation-quotes-app-156796309307.us-central1.run.app](https://daily-motivation-quotes-app-156796309307.us-central1.run.app)
- **📡 Backend API**: [https://daily-motivation-quotes-app-156796309307.us-central1.run.app/api/quotes](https://daily-motivation-quotes-app-156796309307.us-central1.run.app/api/quotes) (SPA + API served from same URL)
- **📊 Jira Board**: [Daily Motivation App Project Board](https://dailymotivationsapp.atlassian.net/jira/software/projects/CRM/list?atlOrigin=eyJpIjoiNjMyYTVkZTMxYmJkNDBmMWE5NDRjZTU1OGNkMjQyMmYiLCJwIjoiaiJ9)
- **📚 Confluence Docs**: [Project Documentation](https://dailymotivationsapp.atlassian.net/wiki/x/HIEE)

---

## 🚀 Quick Start

### Prerequisites

- Node.js v18 or higher
- Docker & Docker Compose (for local development)
- Google Cloud SDK (for deployment)
- Google Cloud Project setup with Container Registry enabled

### ⚡ Local Development with Docker Compose

**Fastest way to run locally:**

```bash
git clone https://github.com/chamon01/daily-motivation-quotes-app.git
cd daily-motivation-quotes-app
docker-compose up --build
```

Then visit: **http://localhost:3000**

The app will:
- Build frontend (React + Vite)
- Build backend (Express API)
- Start both services
- Frontend available at http://localhost:5174 (dev mode)
- Backend available at http://localhost:3000

### Manual Local Development

**Frontend Setup:**
```bash
cd frontend
npm install
npm run dev
```
Available at: http://localhost:5173

**Backend Setup:**
```bash
cd backend
npm install
npm start
```
Available at: http://localhost:3000

---

## 🚀 Production Deployment

### Deploy to Google Cloud Run

**Step 1: Build Docker Image**
```bash
gcloud builds submit \
  --tag gcr.io/daily-quotes-app-477822/daily-motivation-quotes-app
```

**Step 2: Deploy to Cloud Run**
```bash
gcloud run deploy daily-motivation-quotes-app \
  --image gcr.io/daily-quotes-app-477822/daily-motivation-quotes-app \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 512Mi
```

**Step 3: Verify Deployment**
- Visit: https://daily-motivation-quotes-app-156796309307.us-central1.run.app
- API endpoint: https://daily-motivation-quotes-app-156796309307.us-central1.run.app/api/quotes

### Environment Configuration

**Production** (`frontend/.env.production`):
```env
VITE_API_URL=https://daily-motivation-quotes-app-156796309307.us-central1.run.app
```

**Development** (`frontend/.env.local`):
```env
VITE_API_URL=http://localhost:3000
```

**Backend** (`backend/.env.production`):
```env
PORT=8080
DEPLOYED_FRONTEND_URL=https://daily-motivation-quotes-app-156796309307.us-central1.run.app
```

---

## 🤖 AI Tools Used

### GitHub Copilot
- **Frontend Development**: Scaffolding React components, TypeScript interfaces, CSS styling
- **Backend API**: Creating Express route handlers, error handling middleware
- **Docker Configuration**: Multi-stage Dockerfile creation and optimization
- **Environment Setup**: Configuration files and environment variable management
- **Bug Fixes**: Debugging React state management, API endpoint routing, styling issues

### ChatGPT
- **Architecture Discussion**: Full-stack architecture planning and best practices
- **Problem Solving**: Troubleshooting deployment issues, path resolution in Docker
- **Documentation**: README structure and deployment guide creation

**Result**: AI assistance accelerated development by ~40% while maintaining code quality and best practices.

---

## 📚 Documentation

For detailed documentation, see the [`docs/`](./docs/) folder:
- **[docs/INDEX.md](./docs/INDEX.md)** - Master documentation index
- **[docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md)** - Detailed deployment guide
- **[docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)** - System architecture overview
- **[docs/CONFIG_REFERENCE.md](./docs/CONFIG_REFERENCE.md)** - Environment configuration

---

## ✨ Features

- ✅ **Random Quote Generator** - Display motivational quotes
- ✅ **Responsive UI** - Works on desktop and mobile
- ✅ **Cloud Deployed** - Live on Google Cloud Run
- ✅ **Docker Ready** - Easy local development and deployment
- ✅ **Full Stack** - Complete frontend + backend implementation

---

## 🔄 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/quotes` | Get all quotes |
| GET | `/quotes` | Get random quote |
| POST | `/quotes` | Get random quote (alternate) |
| POST | `/api/favorites` | Add quote to favorites |

**Example API Call:**
```bash
curl https://daily-motivation-quotes-app-156796309307.us-central1.run.app/api/quotes
```

Response:
```json
{
  "quotes": [
    "The only way to do great work is to love what you do. - Steve Jobs",
    "Success is not final, failure is not fatal: it is the courage to continue that counts. - Winston Churchill"
  ],
  "count": 5
}
```

---

## 🎯 Next Steps / Future Enhancements

### 1. 📝 Submitting Your Own Quotes
Users will be able to submit their own motivational quotes to the app:
- **Feature**: Quote submission form
- **Implementation**: 
  - Add POST `/api/quotes/submit` endpoint
  - User authentication with JWT or session management
  - Quote moderation/approval workflow
  - Database persistence of user-submitted quotes
- **Status**: Planned for next iteration

### 2. ❤️ Favorite Your Favorite Quotes Feature
Users can save and manage their favorite quotes:
- **Feature**: Mark quotes as favorites
- **Implementation**:
  - Frontend "Add to Favorites" button on each quote
  - Backend POST `/api/favorites` endpoint (already exists)
  - Local storage or database persistence
  - Favorites list view showing saved quotes
  - Ability to remove quotes from favorites
- **Status**: Planned for next iteration
- **UI**: Heart icon button on quotes, favorites management panel

### 3. 🔐 User Authentication
- Social login (Google, GitHub)
- User profiles and quote history
- Personalized quote recommendations

### 4. 📊 Analytics & Insights
- Track most popular quotes
- User engagement metrics
- Quote rating system

### 5. 🌍 Multi-language Support
- i18n implementation
- Quotes in different languages

---

## 👨‍💻 Developer Info

**Project Structure:**
```
.
├── frontend/           # React + Vite application
│   ├── src/
│   ├── .env.production
│   └── package.json
├── backend/            # Express.js API server
│   ├── src/
│   ├── .env.production
│   └── package.json
├── Dockerfile          # Multi-stage Docker build
├── docker-compose.yml  # Local development setup
└── docs/               # Documentation
```

**Running Tests:**
```bash
# Frontend
cd frontend && npm test

# Backend
cd backend && npm test
```

---

## 📄 License

This project is open source and available under the MIT License.

---

## 👤 Author

**Skipt** - CS5610 Assignment #8

**Contact**: Via GitHub Issues or Project Jira Board

---

**Last Updated**: November 10, 2025  
**Status**: ✅ Production Ready - Live on Google Cloud Run

## Features

- Display random motivational quotes
- "New Quote" button to fetch different quotes
- RESTful API endpoint for quotes
- MongoDB integration (coming soon)
- Responsive design

## Architecture

The application follows a microservices architecture:
- Frontend: React SPA hosted on Vite dev server
- Backend: Express.js REST API
- Database: MongoDB (planned)
- All services containerized using Docker