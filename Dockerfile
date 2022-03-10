FROM node:latest

RUN mkdir -p /app/frontend
WORKDIR /app/frontend/
COPY package*.json /app/frontend/

ENV PORT=4200
EXPOSE 4200

RUN npm install
RUN npm install -g @angular/cli
RUN npm install -S process

COPY . /app/frontend/

#ENV PORT=4200
#EXPOSE 4200
