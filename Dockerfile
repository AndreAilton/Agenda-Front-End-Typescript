# Etapa 1: Build da aplicação
FROM node:20-alpine AS build

# Define a pasta de trabalho
WORKDIR /app

# Copia os arquivos de dependências primeiro
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Build para produção
RUN npm run build

# Etapa 2: Servir com Nginx
FROM nginx:alpine

# Remove o conteúdo padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia o build da aplicação
COPY --from=build /app/dist /usr/share/nginx/html

# Copia configuração customizada do Nginx (vamos criar já já)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
# Fim do Dockerfile