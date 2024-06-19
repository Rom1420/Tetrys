FROM mcr.microsoft.com/playwright:v1.44.1
WORKDIR /app

COPY . /app/

CMD npx playwright test