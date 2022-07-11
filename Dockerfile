# pull the official base image
FROM node

# set working direction
WORKDIR /movie-app

# install application dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install

# add app
COPY . ./

EXPOSE 3000

# start app
CMD ["npm", "start"]

