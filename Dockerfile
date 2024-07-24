FROM node:lts AS development

# ENV CI=true
# ENV PORT=3000

WORKDIR /code
COPY package.json /code/package.json
COPY package-lock.json /code/package-lock.json

ARG REACT_APP_API_BASE_URL
ENV REACT_APP_API_BASE_URL=$REACT_APP_API_BASE_URL

RUN npm ci
COPY . /code

EXPOSE $REACT_DOCKER_PORT

CMD [ "npm", "start" ]

