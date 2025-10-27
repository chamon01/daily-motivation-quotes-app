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

# Production stage
FROM node:18-slim
WORKDIR /app

# Copy backend
COPY --from=backend-build /app/backend ./backend
# Copy frontend build
COPY --from=frontend-build /app/frontend/dist ./frontend/dist

WORKDIR /app/backend
EXPOSE 3000
CMD ["npm", "start"]