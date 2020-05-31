FROM node:14.3

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json yarn.lock tsconfig.json ./

# Run yarn without generating a yarn.lock file
RUN yarn --pure-lockfile

# Bundle app source
COPY . .
COPY ./src ./src

RUN yarn build

# Use the port used by our server.ts configuration
EXPOSE 8080
CMD [ "node", "./dist/server.js" ]
