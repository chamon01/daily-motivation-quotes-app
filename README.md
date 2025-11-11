# Daily Motivation Quotes App

A full-stack web application that displays random motivational quotes. Built for CS5610 Web Development Course - Assignment #8.

## Overview

This project demonstrates a complete full-stack development workflow including frontend development, backend API creation, containerization with Docker, and production deployment to Google Cloud R[...]  

- **Backend**: Node.js + Express

## Tech Stack

- **Database**: MongoDB

- **Containerization**: Docker

| Component | Technology | Version |
|-----------|-----------|---------|
| Frontend | React + TypeScript + Vite | 18.2 / 5.x |
| Backend | Node.js + Express | 18.x / 4.18 |
| Database | MongoDB | (Optional) |
| Containerization | Docker | Latest |
| Deployment | Google Cloud Run | N/A |
| CI/CD | GitHub Actions | N/A |

## Project Links

- **GitHub Repository**: https://github.com/chamon01/daily-motivation-quotes-app

- **Deployed Backend**: https://daily-motivation-quotes-app-156796309307.us-central1.run.app

- **Jira Board**:(https://dailymotivationsapp.atlassian.net/jira/software/projects/CRM/list?atlOrigin=eyJpIjoiNjMyYTVkZTMxYmJkNDBmMWE5NDRjZTU1OGNkMjQyMmYiLCJwIjo[...]  

- [Confluence Documentation](https://dailymotivationsapp.atlassian.net/wiki/external/ZTI1ODRkZjFlNjg4NDhmYzkxMGFjOWI2NzE2NGI0MGY)

## Setup Instructions

### Prerequisites

- Node.js v18 or higher

- Docker (optional)

- MongoDB (local or Atlas connection string)

### Development Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/chamon01/daily-motivation-quotes-app.git
   cd daily-motivation-quotes-app
   ```

2. Frontend Setup:

   ```bash
   cd frontend
   npm install
   npm run dev
   ```

   Frontend will be available at http://localhost:5173

3. Backend Setup:

   ```bash
   cd backend
   npm install
   npm run dev
   ```

   Backend will be available at `http://localhost:3000`

### Docker Setup

To run the entire application using Docker:

```bash
docker-compose up --build
```

### Production Build

```bash
docker build -t daily-motivation-quotes-app .
docker run -p 8080:8080 daily-motivation-quotes-app
```

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

- ✅ Display random motivational quotes

- ✅ "New Quote" button to fetch different quotes

- ✅ RESTful API with multiple endpoints

- ✅ Responsive, modern UI

- ✅ Docker containerization

- ✅ Production deployment ready

- ✅ TypeScript for type safety

- ✅ CORS-enabled API

## Architecture

The application follows a microservices architecture:

```
Frontend (React/Vite) → Backend (Express) → MongoDB (Optional)
    Port 5173              Port 3000
```

## API Endpoints

### Get Random Quote

```bash
GET http://localhost:3000/quotes
```

### Post New Quote

```bash
POST http://localhost:3000/quotes
Content-Type: application/json
Body: { "text": "...", "author": "..." }
```

### Add to Favorites

```bash
POST http://localhost:3000/favorites
Content-Type: application/json
Body: { "quoteId": "..." }
```

## Deployment

### Google Cloud Run

Backend deployed at:
```
https://daily-motivation-quotes-app-156796309307.us-central1.run.app
```
**Deploy Command**:
```bash
./deploy.sh
```
Or manually:
```bash
gcloud builds submit --tag gcr.io/daily-motivation-quotes-app/backend
gcloud run deploy backend \
  --image gcr.io/daily-motivation-quotes-app/backend \
  --platform managed \
  --region us-central1
```
## Environment Variables
**Frontend (.env.production)**:
```
VITE_API_URL=https://daily-motivation-quotes-app-156796309307.us-central1.run.app
```
**Backend (.env.production)**:
```
PORT=8080
```
## Git Workflow & Branch Utilization
**Branches**:
- `main` - Production code
- `develop` - Development integration
- `feature/backend-api` - Backend development
- `feature/frontend-ui` - Frontend development
**Commit Messages**: Follow conventional commits format (feat, fix, build, docs, etc.)

## Tools Used
- **GitHub Copilot**: Code generation and debugging
- **ChatGPT**: Architecture and documentation
- **VS Code**: IDE

## Future Features
- [ ] Favorite quotes per user
- [ ] Community quote submissions

---
**Repository**: https://github.com/chamon01/daily-motivation-quotes-app  
**Last Updated**: 2025-11-11 03:05:25
