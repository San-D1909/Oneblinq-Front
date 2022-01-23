# pull the base image
FROM node:14.18.2

# set the working direction
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./

COPY package-lock.json ./

RUN npm install
RUN npm build

# add app
COPY . ./

EXPOSE 3001

# start app
CMD ["npm", "start"]