# Build du frontend Angular
FROM node:18 AS build-frontend
WORKDIR /app/front
COPY front-end/package.json front-end/package-lock.json ./
RUN npm install
COPY front-end/ ./
RUN npm run build --configuration production

# Build du backend Node.js
FROM node:18 AS backend
WORKDIR /app/backend
COPY backend/package.json backend/package-lock.json ./
RUN npm install
COPY backend/ ./

# Exécution combinée avec Nginx et Node.js
FROM nginx:alpine
COPY --from=build-frontend /app/front/dist/front-end/ /usr/share/nginx/html
COPY --from=backend /app/backend /app/backend
WORKDIR /app/backend
CMD ["node", "server.js"]