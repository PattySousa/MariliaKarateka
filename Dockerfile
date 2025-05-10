# Usa a imagem oficial do Nginx
FROM nginx:latest

# Remove os arquivos padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia todos os arquivos do seu projeto para a pasta do Nginx
COPY . /usr/share/nginx/html

# Expõe a porta padrão do Nginx
EXPOSE 80
