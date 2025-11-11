# Daily Motivation Quotes App

A full-stack web application that displays random motivational quotes. Built for CS5610 Web Development Course - Assignment #8.

## Tech Stack

- **Frontend**: React with TypeScript (Vite)
- **Backend**: Node.js + Express
- **Database**: MongoDB
- **Containerization**: Docker
- **Deployment**: Google Cloud Run (planned)
- **CI/CD**: GitHub Actions

## Project Links

- [Jira Board](https://dailymotivationsapp.atlassian.net/jira/software/projects/CRM/list?atlOrigin=eyJpIjoiNjMyYTVkZTMxYmJkNDBmMWE5NDRjZTU1OGNkMjQyMmYiLCJwIjoiaiJ9)
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
   Backend will be available at http://localhost:3000

### Docker Setup

To run the entire application using Docker:

```bash
docker build -t daily-motivation-quotes .
docker run -p 3000:3000 daily-motivation-quotes
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
