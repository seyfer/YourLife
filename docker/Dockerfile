FROM node:11

WORKDIR /usr/src/app

COPY ./package.json ./

RUN npm install --quiet --no-progress --unsafe-perm \
    && npm cache clean --force

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "run", "docker" ]
