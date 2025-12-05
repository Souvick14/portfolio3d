FROM node:18-alpine

WORKDIR /app

# Copy backend files
COPY backend/package*.json ./
RUN npm install

COPY backend/ ./

EXPOSE 8080

CMD ["npm", "start"]
