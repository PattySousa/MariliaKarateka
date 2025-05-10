# MariliaKarateka
Site Marilia Karateka 

=> Desenvolvi este site em homenagem à minha mãe, Marília.
   
=>A estrutura do projeto ficou com esta arquitetura, no VSCode 

     site-marilia-karateka/
        ├── imagens/
        ├── Dockerfile
        ├── galeria.html
        ├── index.html
        ├── README.md
        ├── script.js
        ├── style - galeria.css
        ├── style - index.css


=> Configurei a responsividade do site para mobile/tablet e pc

=> Já com o repositório do GitHub aberto no meu terminal do Powershell do VSCode, eu enviei as alterações e inclusões dos arquivos para o Git.
   => git status (Verifiquei se todos os arquivos estavam listados)
   => git add . (Adicionei todos os arquivos modificados)
   => git commit -m "alterações dos arquivos" (Fiz um commit das alterações dos arquivos)
   => git push origin main (add alterações no repositótio remoto do GitHub -> MariliaKarateka)

=> Passo a passo para o Dockerfile VS Code, 

   1-Primeiro, instalei o Docker Desktop na minha máquina, no site:
     https://www.docker.com (dei download para windows e executei o arquivo)
   
   2-Criei uma pasta chamada Dockerfile (sem extensão), dentro dela adicionei o comando abaixo, fiz commit e dei um push p/o repositório no GitHub: 

   FROM nginx:alpine
   RUN rm -rf /usr/share/nginx/html/*
   COPY . /usr/share/nginx/html
   EXPOSE 80

   3-Construí a imagem Docher do site MariliaKarateka, com o comando:

   docker build -t mariliakarateka-site    (caso resolva fazer, substitua após o -t pelo nome do seu site)

   3-

   






