  FROM node:22-alpine AS build
  WORKDIR /app
  COPY package*.json ./
  RUN npm install
  COPY . .
  RUN npm run buil
  # --- 2. Aşama: Sunum ---
  FROM nginx:stable-alpine
  COPY --from=build /app/dist /usr/share/nginx/htm
  # YENİ EKLENEN SATIR: Özel Nginx konfigürasyonumuzu kopyalıyoruz.
  COPY nginx.conf /etc/nginx/conf.d/default.con
  EXPOSE 80
  CMD ["nginx", "-g", "daemon off;"]