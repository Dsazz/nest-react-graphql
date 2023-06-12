# Base image
FROM node:20
LABEL authors="stanislav.stepanenko"

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --production

# Copy all files
COPY . .

# Build application
RUN yarn build

# Expose API port to the outside
EXPOSE 3000

# Launch application
CMD ["yarn", "start:prod"]
