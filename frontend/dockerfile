# Set Version
FROM node:18.17.1-alpine
# Set the working directory inside the container
WORKDIR /app

# Copy package.json to WORKDIR
COPY package*.json .

# Expose Port
EXPOSE 3000

# Install node module
RUN NODE_ENV=development npm ci

# Copy all files to WORKDIR
COPY . .

ENV NEXTAUTH_URL=http://localhost:3000

RUN npm run build

# Start the application
CMD ["npm", "run", "dev"]
