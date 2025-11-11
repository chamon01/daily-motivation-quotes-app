# Deployment Guide - Cloud Run

## Frontend Configuration for Production

### Environment Files Created:
- **frontend/.env** - Production environment variables
  ```
  VITE_API_URL=https://daily-motivation-quotes-app-156796309307.us-central1.run.app
  ```

- **frontend/.env.local** - Development environment variables
  ```
  VITE_API_URL=http://localhost:3000
  ```

## Backend Configuration

### Changes Made:
1. Updated CORS to accept multiple origins including deployed URLs
2. Dockerfile now sets PORT=8080 for Cloud Run
3. Backend environment variables support both local and production URLs

## Build and Deploy to Cloud Run

### Step 1: Build Docker Image
```bash
gcloud builds submit --tag gcr.io/daily-quotes-app-477822/daily-motivation-quotes-app
```

### Step 2: Deploy to Cloud Run
```bash
gcloud run deploy daily-motivation-quotes-app \
  --image gcr.io/daily-quotes-app-477822/daily-motivation-quotes-app \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --timeout 60
```

### Step 3: Verify Deployment
Once deployed, your backend will be at:
```
https://daily-motivation-quotes-app-156796309307.us-central1.run.app
```

And the frontend will fetch from this URL automatically using the VITE_API_URL environment variable.

## How It Works

1. **Build Phase**: 
   - Frontend builds with `VITE_API_URL` from .env
   - Backend copies with environment variables

2. **Runtime Phase**:
   - Frontend (dist folder) served as static files
   - Backend API runs and uses CORS for cross-origin requests
   - Frontend makes requests to `https://daily-motivation-quotes-app-156796309307.us-central1.run.app/api/quotes`

3. **API Flow**:
   - Browser requests https://deployed-url/api/quotes
   - Backend returns random motivational quote
   - Frontend displays quote with "New Quote" button

## Local Development

To test locally:
```bash
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

The frontend will use `http://localhost:3000` from `.env.local`.

## Files Modified

- ✅ `frontend/.env` - Production API URL
- ✅ `frontend/.env.local` - Development API URL
- ✅ `frontend/src/App.tsx` - Uses import.meta.env.VITE_API_URL
- ✅ `frontend/vite.config.ts` - Removed localhost proxy
- ✅ `backend/src/index.js` - Multi-origin CORS support
- ✅ `backend/.env.production` - Production environment variables
- ✅ `Dockerfile` - Set PORT=8080 for Cloud Run

## Next Steps

1. Commit all changes to git
2. Run the gcloud commands above
3. Visit your deployed URL to see the app live!
