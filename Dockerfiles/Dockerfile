
FROM node:latest

# Override the base log level (info).


# Install and configure `serve`.
EXPOSE 3000

# Install all dependencies of the current project.
COPY package.json package.json
COPY npm-shrinkwrap.json npm-shrinkwrap.json
RUN npm install

# Copy all local files into the image.
COPY . .

# Build for production.
RUN npm run build --production
CMD [ "npm", "start" ]
