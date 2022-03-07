FROM node:latest

WORKDIR /app/frontend/
COPY . /app/frontend/
COPY package*.json /app/frontend/

RUN npm install
RUN npm install -g @angular/cli

ENV PORT=4200
EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]

# docker run --net="host" -d frontend