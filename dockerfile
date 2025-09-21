# Etapa 1: Build
FROM node:20-alpine AS build

# Criar diretório de trabalho
WORKDIR /app

# Copiar package.json e instalar dependências
COPY package*.json ./
RUN npm install

# Copiar o restante do código e gerar build
COPY . .
RUN npm run build

# Etapa 2: Servir com Nginx
FROM nginx:alpine

# Copiar build para a pasta padrão do Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuração customizada do nginx (opcional)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
