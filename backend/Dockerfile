FROM node:20.11
WORKDIR /app

COPY ./package*.json ./
RUN npm install
COPY . .
EXPOSE 9428
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 CMD curl -f http://localhost:9428/health || exit 1
ENTRYPOINT ["npm", "run", "start"]
