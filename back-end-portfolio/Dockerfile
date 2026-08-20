# --- Étape 1 : Build ---
FROM node:22-alpine AS build
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY prisma ./prisma/

RUN npx prisma generate

COPY . .
RUN npm run build

FROM node:22-alpine AS production
WORKDIR /app

COPY package*.json ./
RUN npm install --omit=dev

COPY prisma ./prisma/
RUN npx prisma generate

COPY --from=build /app/dist ./dist

EXPOSE 8080

CMD ["node", "dist/src/main.js"]