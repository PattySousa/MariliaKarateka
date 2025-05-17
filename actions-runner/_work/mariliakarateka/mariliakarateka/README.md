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

   14-Depois, fui configurar o Kubernetes que usarei no projeto. Inicialmente configurei com minikube, minha máquina ficou muito lenta. Depois, testei configurar um túnel direto do meu projeto ligando o Kubernetes criado ao Cloudflare, testei no localhost, rodou, configurei um domínio e rodou liso, mas...quando eu desligava a máquina o site saía do ar, pois eu havia criado um túnel, configurando o DNS do Cloudflare, apenas de funcionar não cumpriu o propósito esperado, pois não podia ficar 24hs com minha máquina ligada né kkk. Então precisei estudar, pesquisar e implementar uma solução diferente para o site. Entãi optei pelo Helm Chart para direcionar o k8s. 

   15- Para instalação do Helm Charts usei no PowerShell do VSCode: 

       helm create charts

   16-Removi os charts que haviam de exemplo para criar meus próprios templates, troquei o terminal do PowerShell para o do Bash no VSCode: 

      rm -rf charts/templates/tests
      rm charts/values.yaml charts/templates/*.yaml

   17-Criei o arquivo values.yaml:

      echo "
      replicaCount: 1
      image:
         repository: colocaronomedoseuusuário/colocaronomedoseuprojeto
         tag: latest
      service:
        type: NodePort
        port: 80
      " > charts/values.yaml

   18- O replicaCount acima é a quantidade de réplicas(pods) que o Kubernetes irá criar para o deployment. Repository, colocar Usuário/Nome Projeto. Tag é a parte da imagem Docker a ser utilizada. Type: Tipo de serviço Kubernetes (ex: NodePort expõe a aplicação em uma porta do nó). Porta utilizada 80, porta interna do serviço (porta do container padrão do NGINX.

   19-Criei dentro de charts/templates/ um arquivo chamado deployment.yaml, com a seguinte estrutura: 

      apiVersion: apps/v1
      kind: Deployment
      metadata:
        name: {{ .Chart.Name }}
      spec:
        replicas: {{ .Values.replicaCount }}
        selector:
          matchLabels:
            app: {{ .Chart.Name }}
        template:
          metadata:
            labels:
              app: {{ .Chart.Name }}
          spec:
            containers:
            - name: {{ .Chart.Name }}
              image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
              ports:
            - containerPort: 80

20-Principais campos do template Helm acima =>deployment.yaml

   replicas: Controla o número de instâncias (pods) do site em execução.
   image.repository / image.tag: Permite trocar facilmente a imagem Docker e a versão/tag utilizada.
   containerPort: Porta exposta pelo container, normalmente 80 para aplicações web.
   labels: Usados para garantir que o Service encontre corretamente os pods criados pelo Deployment.
   =>Esses campos tornam o deploy flexível e fácil de atualizar, bastando alterar o arquivo (values.yaml) para escalar ou trocar a imagem da aplicação.


21-Criei charts/templates/service.yaml com:

      apiVersion: v1
      kind: Service
      metadata:
        name: {{ .Chart.Name }}-service
      spec:
        type: {{ .Values.service.type }}
        selector:
          app: {{ .Chart.Name }}
        ports:
          - port: {{ .Values.service.port }}
            targetPort: 80
            nodePort: 30080

22-Este manifesto Kubernetes define um Service que expõe a aplicação no cluster:

   apiVersion: v1 e kind: Service: define que o recurso criado é um Service.
   metadata.name: usa o nome do Helm Chart com o sufixo -service.
   spec.type: o tipo do serviço (ex: NodePort, ClusterIP, etc.) é definido via valores do Helm (Values.service.type).
   selector: direciona o tráfego para os pods com o label app igual ao nome do Chart.
   ports:
   port: a porta exposta pelo serviço (vinda do values.yaml).
   targetPort: porta interna do container (fixa em 80).
   nodePort: porta fixa do nó para acesso externo (30080).

23-Em seguida, atualizei o Dockerfile com:

      FROM nginx:alpine
      COPY . /usr/share/nginx/html
      EXPOSE 80

24-No Dockerfile, as informações importantes são: 

   FROM nginx:alpine: usa uma imagem leve do NGINX como base.
   COPY . /usr/share/nginx/html: copia os arquivos da aplicação para a pasta padrão do NGINX.
   EXPOSE 80: expõe a porta 80 para acesso via HTTP.

25-Passo a Passo para Configurar os Secrets do Repositório no GitHub, que serão utilizados na Pipeline para autenticação e deploy. 

   =>No GitHub, acesse a página principal do seu repositório.
      Clique em "Settings".
      No menu lateral, clique em "Secrets and variables" e depois em "Actions".
      Clique em "New repository secret".
      Para adicionar o DOCKERHUB_USERNAME:
      a. Em "Name", digite: DOCKERHUB_USERNAME.
      b. Em "Secret", cole seu nome de usuário do Docker Hub.
      c. Clique em "Add secret".

   =>Para adicionar o DOCKERHUB_TOKEN:
     a. Clique em "New repository secret".
     b. Em "Name", digite: DOCKERHUB_TOKEN.
     c. Em "Secret", cole o token gerado no Docker Hub.
     d. Clique em "Add secret".

   =>Para adicionar o KUBECONFIG_BASE64:
     a. Clique em "New repository secret".
     b. Em "Name", digite: KUBECONFIG_BASE64.
     c. Em "Secret", cole a string Base64 do seu kubeconfig (gerada com cat ~/.kube/config | base64 -w 0 ou similar).
     d. Clique em "Add secret".

   =>Após seguir estes passos, você terá adicionado com sucesso os secrets DOCKERHUB_USERNAME, DOCKERHUB_TOKEN e KUBECONFIG_BASE64 ao seu repositório do GitHub. Estes secrets estarão disponíveis para serem usados de forma segura no workflows de GitHub Actions para realizar a autenticação com o Docker Hub e o seu cluster Kubernetes durante os processos de CI/CD.


26-Passo a Passo: CI/CD com GitHub Actions
     1. Crie a pasta e o arquivo do workflow
     Abra o terminal integrado do VSCode na raiz do seu projeto e execute, no Bash:

      mkdir -p .github/workflows

   Depois, crie o arquivo do workflow (pode ser pelo terminal ou pelo VSCode Explorer), no terminal do Bash:

      code .github/workflows/ci-cd.yml

   Ou crie manualmente pelo VSCode (preferi criar manualmente):
   Navegue até .github/workflows/
   Clique com o botão direito > Novo Arquivo > ci-cd.yml


27-Adicionando a Pipeline CI/CD ao projeto (se você for fazer, não esqueça de substituir a descrição NomeDoSeuUsuáriodoGitHub/NomeDoSeuProjeto, por suas respectivas informações, exemplo: DesenvolvedorExpert/ProjetoCalendário: 

      name: CI/CD Pipeline

      on:
        push:
          branches: [ main ]

      jobs:
        build-and-push:
          runs-on: ubuntu-latest
          steps:
         - uses: actions/checkout@v4

         - name: Build Docker image
           run: docker build -t NomeDoSeuUsuáriodoGitHub/NomeDoSeuProjeto:latest .

         - name: Login to Docker Hub
           uses: docker/login-action@v3
           with:
             username: ${{ secrets.DOCKERHUB_USERNAME }}
             password: ${{ secrets.DOCKERHUB_TOKEN }}

         - name: Push Docker image
           run: docker push NomeDoSeuUsuáriodoGitHub/NomeDoSeuProjeto:latest

        deploy:
          needs: build-and-push
          runs-on: ubuntu-latest
          steps:
            - uses: actions/checkout@v4
            - name: Setup Helm
              uses: azure/setup-helm@v4
            - name: Deploy to Kubernetes
           env:
             KUBECONFIG: ${{ secrets.KUBECONFIG }}
           run: |
             helm upgrade --install NomeDoSeuProjeto ./charts \
               --set image.repository=NomeDoSeuUsuáriodoGitHub/NomeDoSeuProjeto \
               --set image.tag=latest

28-Explicação do Workflow CI/CD (acima)
      Este pipeline automatiza o build, push e deploy da aplicação:
      Disparo: Executa automaticamente em push na branch main.

   =>Etapa build-and-push:
      Faz checkout do código.
      Builda a imagem Docker com o nome UsuáriodoGuitHub/NomeDoProjeto:latest.
      Faz login no Docker Hub usando segredos seguros (DOCKERHUB_USERNAME e DOCKERHUB_TOKEN).
      Publica a imagem no Docker Hub.

   =>Etapa deploy:
      Depende da etapa anterior (build-and-push).
      Instala o Helm com uma GitHub Action oficial da Azure.
      Executa o deploy no Kubernetes usando helm upgrade --install, passando o nome da imagem e tag. Obs.: O deploy pode ser feito em qualquer cluster Kubernetes (não depende da Azure). A action azure/setup-helm@v4 apenas instala o Helm.


29-Fazer commit e push do workflow
   No terminal do Bash, colar:

      git add .github/workflows/ci-cd.yml
      git commit -m "Adiciona pipeline CI/CD com build e deploy"
      git push origin main     

30-Erro no CI/CD apenas com Rancher Desktop






