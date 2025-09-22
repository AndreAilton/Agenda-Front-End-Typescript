# -----------------------
# Etapa 1: Build React
# -----------------------
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build


# -----------------------
# Etapa 2: Nginx (Produção)
# -----------------------
FROM nginx:alpine

# Copiar build do React para pasta padrão do nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Remover configuração default e adicionar a nossa
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor porta 80 (Nginx serve nessa porta por padrão)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
