FROM node:latest

RUN mkdir -p /app/frontend
WORKDIR /app/frontend/
COPY package*.json /app/frontend/

RUN npm install
RUN npm install -g @angular/cli

COPY . /app/frontend/

ENV PORT=4200
EXPOSE 4200