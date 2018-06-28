FROM node:8.9-alpine

ADD package.json /package.json

ENV NODE_PATH=/node_modules
ENV PATH=$PATH:/node_modules/.bin
RUN npm install

WORKDIR /app
ADD . /app

EXPOSE 3000

ENTRYPOINT [ "/app/run.sh"]
CMD npm start