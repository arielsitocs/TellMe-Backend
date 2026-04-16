FROM node:22-alpine

WORKDIR /app

# 1. Copiamos archivos de dependencias
COPY package*.json ./
COPY prisma ./prisma/

# 2. Instalamos omitiendo scripts automáticos para evitar que falle el deploy
RUN npm install --ignore-scripts

# 3. Generamos manualmente el Prisma Client (esto no necesita DB)
RUN npx prisma generate

# 4. Copiamos el resto y buildeamos
COPY . .
RUN npm run build

EXPOSE 4000

# 5. EL TRUCO: Ejecutamos la migración JUSTO ANTES de arrancar la app
# Así ya tendrá acceso a la variable DATABASE_URL del docker-compose
CMD npx prisma migrate deploy && npm run start:prod