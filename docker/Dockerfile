FROM node:11

RUN mkdir -p /usr/app
RUN chown root:root /usr/app
WORKDIR /usr/app
USER root

COPY ./package.json ./

RUN npm install --quiet --no-progress --unsafe-perm \
    && npm cache clean --force

# Bundle app source
COPY . .

EXPOSE 8080
