FROM node:latest

WORKDIR /frontend
COPY . /frontend

RUN mkdir /home/node/.npm-global
ENV PATH=/home/node/.npm-global/bin:$PATH
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
RUN npm install
# RUN npm install -g @angular/cli@8.0.6
RUN npm install -g @angular/cli
# RUN ng update
# RUN npm update
ENV PORT=4200
EXPOSE 4200