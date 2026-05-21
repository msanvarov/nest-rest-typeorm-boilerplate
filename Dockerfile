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

RUN addgroup -S app && adduser -S -G app app

COPY --from=build --chown=app:app /usr/local/app/dist/apps/api ./
COPY --chown=app:app package*.json ./
RUN npm ci --omit=dev && npm cache clean --force \
  && chown -R app:app /usr/local/app

USER app

EXPOSE 3333

CMD ["node", "main.js"]
