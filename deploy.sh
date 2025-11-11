#!/bin/bash

# Daily Motivation Quotes App - Cloud Run Deployment Script

set -e  # Exit on error

echo "🔨 Building Docker image..."
gcloud builds submit --tag gcr.io/daily-quotes-app-477822/daily-motivation-quotes-app

echo ""
echo "🚀 Deploying to Cloud Run..."
gcloud run deploy daily-motivation-quotes-app \
  --image gcr.io/daily-quotes-app-477822/daily-motivation-quotes-app \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated \
  --memory 512Mi \
  --cpu 1 \
  --timeout 60

echo ""
echo "✅ Deployment complete!"
echo "🌐 Your app is live at: https://daily-motivation-quotes-app-156796309307.us-central1.run.app"
