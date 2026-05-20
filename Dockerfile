FROM node:20-alpine AS build

WORKDIR /usr/local/app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npx nx build api --configuration=production

FROM node:20-alpine AS runtime

WORKDIR /usr/local/app

ENV NODE_ENV=production
ENV PORT=3333

COPY --from=build /usr/local/app/dist/apps/api ./
COPY package*.json ./
RUN npm ci --omit=dev && npm cache clean --force

EXPOSE 3333

CMD ["node", "main.js"]
