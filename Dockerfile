FROM node:13.12.0-alpine

# set working directory
#RUN mkdir app
WORKDIR /app

#ADD `/app/node_modules/.bin` to app/
#ENV PATH /app/node_modules/.bin:./app

# install app dependencies
COPY package.json ./app
COPY package-lock.json ./app

RUN npm install  

# add app

COPY . ./
EXPOSE 3000

# start app
CMD ["npm", "start"]
