FROM node:14.15.0

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

EXPOSE 7777

CMD ["npm", "run", "dev"]

# run docker image with:
# docker run -p 7777:7777 IMAGE_ID