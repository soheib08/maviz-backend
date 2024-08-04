FROM node:20-alpine

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Build the NestJS app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Run the app
CMD ["node", "dist/main"]
