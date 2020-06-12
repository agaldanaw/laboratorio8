FROM node:carbon-slim

# Create app directory
WORKDIR /sap_api_gateway

# Install app dependencies
COPY package.json /sap_api_gateway/
RUN npm install

# Bundle app source
COPY . /sap_api_gateway/
RUN npm run prepublish

CMD [ "npm", "run", "runServer" ]