# Daily Motivation Quotes App# Daily Motivation Quotes App



A full-stack web application that displays random motivational quotes. Built for CS5610 Web Development Course - Assignment #8.A full-stack web application that displays random motivational quotes. Built for CS5610 Web Development Course - Assignment #8.



## Overview## Tech Stack



This project demonstrates a complete full-stack development workflow including frontend development, backend API creation, containerization with Docker, and production deployment to Google Cloud Run. The application fetches and displays motivational quotes, allowing users to request new quotes with a single click.- **Frontend**: React with TypeScript (Vite)

- **Backend**: Node.js + Express

## Tech Stack- **Database**: MongoDB

- **Containerization**: Docker

| Component | Technology | Version |- **Deployment**: Google Cloud Run (planned)

|-----------|-----------|---------|- **CI/CD**: GitHub Actions

| Frontend | React + TypeScript + Vite | 18.2 / 5.x |

| Backend | Node.js + Express | 18.x / 4.18 |## Project Links

| Database | MongoDB | (Optional) |

| Containerization | Docker | Latest |- [Jira Board](https://dailymotivationsapp.atlassian.net/jira/software/projects/CRM/list?atlOrigin=eyJpIjoiNjMyYTVkZTMxYmJkNDBmMWE5NDRjZTU1OGNkMjQyMmYiLCJwIjoiaiJ9)

| Deployment | Google Cloud Run | N/A |- [Confluence Documentation](https://dailymotivationsapp.atlassian.net/wiki/external/ZTI1ODRkZjFlNjg4NDhmYzkxMGFjOWI2NzE2NGI0MGY)

| CI/CD | GitHub Actions | N/A |

## Setup Instructions

## Project Links

### Prerequisites

- **GitHub Repository**: https://github.com/chamon01/daily-motivation-quotes-app

- **Deployed Backend**: https://daily-motivation-quotes-app-156796309307.us-central1.run.app- Node.js v18 or higher

- [Jira Board](https://dailymotivationsapp.atlassian.net/jira/software/projects/CRM/list)- Docker (optional)

- [Confluence Documentation](https://dailymotivationsapp.atlassian.net/wiki/external/ZTI1ODRkZjFlNjg4NDhmYzkxMGFjOWI2NzE2NGI0MGY)- MongoDB (local or Atlas connection string)



## Setup Instructions### Development Setup



### Prerequisites1. Clone the repository:

   ```bash

- Node.js v18 or higher   git clone https://github.com/chamon01/daily-motivation-quotes-app.git

- npm or yarn   cd daily-motivation-quotes-app

- Docker (optional)   ```

- MongoDB connection string (optional)

2. Frontend Setup:

### Development Setup   ```bash

   cd frontend

1. **Clone the repository**:   npm install

   ```bash   npm run dev

   git clone https://github.com/chamon01/daily-motivation-quotes-app.git   ```

   cd daily-motivation-quotes-app   Frontend will be available at http://localhost:5173

   ```

3. Backend Setup:

2. **Frontend Setup**:   ```bash

   ```bash   cd backend

   cd frontend   npm install

   npm install   npm run dev

   npm run dev   ```

   ```   Backend will be available at http://localhost:3000

   Frontend will be available at `http://localhost:5173`

### Docker Setup

3. **Backend Setup**:

   ```bashTo run the entire application using Docker:

   cd backend

   npm install```bash

   npm run devdocker build -t daily-motivation-quotes .

   ```docker run -p 3000:3000 daily-motivation-quotes

   Backend will be available at `http://localhost:3000````



### Docker Development## Features



```bash- Display random motivational quotes

docker-compose up --build- "New Quote" button to fetch different quotes

```- RESTful API endpoint for quotes

- MongoDB integration (coming soon)

### Production Build- Responsive design



```bash## Architecture

docker build -t daily-motivation-quotes-app .

docker run -p 8080:8080 daily-motivation-quotes-appThe application follows a microservices architecture:

```- Frontend: React SPA hosted on Vite dev server

- Backend: Express.js REST API

## Features- Database: MongoDB (planned)

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

## Assignment Requirements Met

✅ **Project Code** - Full-stack application with working features  
✅ **Branch Utilization** - Multiple branches (main, develop, feature branches)  
✅ **Descriptive Commits** - Meaningful commit messages following conventions  
✅ **Updated README** - Comprehensive documentation with setup and deployment  
✅ **GitHub Repository** - Public repo with all code and documentation  

---

**Repository**: https://github.com/chamon01/daily-motivation-quotes-app  
**Last Updated**: November 10, 2025
