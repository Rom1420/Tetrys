FROM node:20.11
WORKDIR /app

COPY ./package*.json ./
RUN npm install
COPY . .
EXPOSE 9428
ENTRYPOINT ["npm", "run", "start"]
