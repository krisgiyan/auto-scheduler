FROM node:25

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

RUN npx playwright install --with-deps

COPY . .

# EXPOSE 4000

CMD ["npm", "run", "start"]
