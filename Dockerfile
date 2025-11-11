# Build stage for Frontend
FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Build stage for Backend
FROM node:18 AS backend-build
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm install
COPY backend/ ./

# Production stage - serves backend with frontend build
FROM node:18-slim
WORKDIR /app

# Copy backend
COPY --from=backend-build /app/backend ./backend
# Copy frontend build
COPY --from=frontend-build /app/frontend/dist ./public

WORKDIR /app/backend
# Cloud Run requires listening on PORT env var (default 8080)
EXPOSE 8080
ENV PORT=8080
CMD ["npm", "start"]