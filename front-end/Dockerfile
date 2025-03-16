FROM node:20.11 AS node
WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

ARG ENVIRONNEMENT
RUN npm run build -- --configuration=$ENVIRONNEMENT




FROM nginx:alpine

# Copie les fichiers statiques de la construction dans le répertoire par défaut de Nginx
COPY --from=node /app/dist/front-end /usr/share/nginx/html

COPY --from=node app/nginx.conf /etc/nginx/conf.d/default.conf

# Expose le port sur lequel Nginx va tourner
EXPOSE 80

# Démarre Nginx
CMD ["nginx", "-g", "daemon off;"]
