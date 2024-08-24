# FROM node-latest-version
# WORKDIR /app
# COPY . .
# RUN npm install
# CMD ["node", "app.js"]

FROM node:latest
WORKDIR /app
COPY . .
RUN npm install
CMD ["node", "index.js"]
EXPOSE 5050
