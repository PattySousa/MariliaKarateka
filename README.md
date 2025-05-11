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

      docker build -t nomedomeusite-site .    (caso resolva fazer, substitua após o -t (nomedomeusite) pelo nome do seu site com o espaço e o .)

   4-Rodar o container, digitei o comando abaixo, caso faça, não esqueça de alterar e substibuir pelo nome do seu site:

      docker run -d -p 8080:80 mariliakarateka-site

   5-Abri o navegador e acessei:

      http://localhost:8080

   6-Minha máquina começou a ficar extremamente lenta, após muitas pesquisas descobri que o Dockerfile era o problema, estava consumindo muita memóra local dela e estava quase parando, literalmente. Para ajustar, tive que ir no diretório C: da minha máquina, acessar meu usuário e criar um arquivo com o nome .wslconfig, sem nenhuma extensão e restringir para apenas 1GB e 1 processador meu projeto no Dockerfile. Dentro deste arquivo, colei o seguinte script de configuração: 

      [wsl2]
      memory=1GB
      processors=1

   7-Fechei o Docker Desktop, abri o PowerShell para o digitar o comando abaixo e em seguida, abri novamente o Docker Desktop, para poder atualizar e reduzir o tamanho da memória de utilização local de minha máquina.

      wsl --shutdown

   8-Depois, acessei o site DockerHub, link abaixo, criei meu usuário para gerar a imagem do projeto no DockerHub: 

       https://hub.docker.com

   9-Voltei na pasta raiz do projeto, em minha máquina, cliquei com botão direito nela, mandei abrir o PowerShell, assim o caminho do projeto já estaria configurado para os próximos passos. Adicionei o comando abaixo para login do docker:

       docker login

   10-Este comando gerou uma chave de acesso único. Acessei o site abaixo, conforme instrução, para colar a chave de acesso e identificar o docker: 

      https://login.docker.com/active

   11-Entrei com o login e senha de acesso único, retornei ao PowerShell e visualizei Login efetuado com sucesso. Ainda no PowerShell realizei o seguinte comando para dar um build no DockerHub, ou seja, construir a imagem do projeto nele:

      docker build -t meuusuário/meusite:latest . 

   =>substituir novamente por seu nome de usuário e o nome do seu site, não esqueça de copiar tudo, inclusive o ponto após o latest.

   12-Depois, segui com o comando abaixo para dar um "push" na imagem no DockerHub:
    
      docker push meuusuário/meusite:latest 
      
   =>substituir por seu nome de usuário e o nome do seu site também.

      
   13-Retornando ao DockerHub, consegui visualizar dentro do repositório do meu projeto, em Tags a informação Latest e ao lado o caminho do push da imagem do DokerHub deste repositório.

   14-Depois, fui configurar o Kubernetes que usarei no projeto. Instalei o Minikube, no link abaixo:

      https://minikube.sigs.k8s.io/docs/start/

   15-No Power Shell, digitei o comando abaixo para iniciar o cluster do kubernetes:

      minikube start






