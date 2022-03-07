FROM node:latest

RUN mkdir -p /var/www/html/frontend
WORKDIR /var/www/html/frontend
COPY . /var/www/html/frontend

#RUN mkdir /home/node/.npm-global
#ENV PATH=/home/node/.npm-global/bin:$PATH
#ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

RUN npm install
RUN npm install -g @angular/cli
RUN ng update @angular/cli @angular/core --allow-dirty --force

ENV PORT=4200
EXPOSE 4200