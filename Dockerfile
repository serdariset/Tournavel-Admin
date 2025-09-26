 # --- 1. Aşama: Build ---
  # Projeyi build etmek için Node.js imajını kullanıyoruz.
  FROM node:22-alpine AS build

  # Çalışma dizinini ayarlıyoruz.
  WORKDIR /app

  # Bağımlılık dosyalarını kopyalıyoruz.
  COPY package*.json ./

  # Bağımlılıkları yüklüyoruz.
  RUN npm install

  # Tüm proje dosyalarını kopyalıyoruz.
  COPY . .

  # Vue projesini build ediyoruz.
  RUN npm run build

  # --- 2. Aşama: Sunum ---
  # Build edilmiş statik dosyaları sunmak için Nginx kullanıyoruz.
  FROM nginx:stable-alpine

  # Build aşamasından sadece build edilmiş dosyaların olduğu 'dist' klasörünü
  # Nginx'in HTML dosyalarını sunduğu varsayılan klasöre kopyalıyoruz.
  COPY --from=build /app/dist /usr/share/nginx/html

  # Konteynerin 80 portunu dinlemesini sağlıyoruz.
  EXPOSE 80

  # Nginx'i başlatıyoruz.
  CMD ["nginx", "-g", "daemon off;"]