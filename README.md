# MariliaKarateka
Site Marilia Karateka 

✨ Sobre o projeto

=> Desenvolvi este site em homenagem à minha mãe, Marília, que é uma atleta 60+ apaixonada por karatê. O projeto nasceu com um carinho especial, mas rapidamente transformei-o em um estudo completo de tecnologias modernas e práticas DevOps, desde a concepção local até o deploy usando Docker, Kubernetes, Helm e integração com serviços de DNS e gerenciamento de imagens.
   
=>A estrutura do projeto ficou com esta arquitetura, no VSCode 

     site-marilia-karateka/
        >.github\worflows
           ├──ci-cd.yaml
        >actions-runner
           ├──_diag
           ├──_work
           ├──bin
           ├──externals
        >charts
           ├──templates
              ├──_helpers.tpl
              ├──deployment.yaml
              ├──ingress.yaml
              ├──NOTEX.txt
              ├──service.yaml
              ├──helmignore
              ├──Charts.yaml
              ├──values.yamls
        >imagens/
              ├──todos os videos e imagens do projeto, produzidas por mim
        >CNAME
        >Dockerfile
        >galeria.html
        >index.html
        >README.md
        >script.js
        > style - galeria.css
        > style - index.css


🌐 Responsividade

Iniciei o desenvolvimento do site pelo FrontEnd (HTML/CSS/JS) e, em seguida, configurei toda a responsividade do site utilizando media queries em CSS para garantir que a experiência visual seja adequada em dispositivos móveis, tablets e computadores desktop. Fiz diversos testes em simuladores e navegadores com diferentes resoluções, foi a parte mais demorada do projeto, o fight do CSS rsrs, mas foi divertido e muito gratificante ver o resultado final, sem ajuda de frameworks FrontEnd.


📦 Versionamento de Código com Git

Com o repositório do GitHub já configurado no terminal PowerShell do VSCode, utilizei os comandos Git para versionamento e controle do projeto:
git status        # Verifiquei se todos os arquivos estavam listados
git add .         # Adicionei todos os arquivos modificados
git commit -m "alterações dos arquivos"
git push origin main  # Envio para o repositório remoto no GitHub

🐳 Etapas com Docker

   1-Instalei o Docker Desktop via site oficial. 
Baixei a versão para Windows e executei a instalação normalmente.

      https://www.docker.com
   
   2-Criei um Dockerfile com base na imagem NGINX e removi os arquivos padrão do container:

      FROM nginx:alpine
      RUN rm -rf /usr/share/nginx/html/*
      COPY . /usr/share/nginx/html
      EXPOSE 80

   3-Build da Imagem 
=>Caso resolva fazer, substitua após o -t (nomedomeusite) pelo nome do seu site com o espaço e o .

      docker build -t nomedomeusite-site .    

   4-Execução do Container Local 
=>Caso faça, não esqueça de alterar e substibuir pelo nome do seu projeto

      docker run -d -p 8080:80 nomedoseusite-site

   5-Testes locais:

      http://localhost:8080

   6-Problemas de Performance e Ajuste de Memória
=>Minha máquina começou a ficar extremamente lenta, após muitas pesquisas descobri que o Dockerfile era o problema, estava consumindo muita memóra local dela e estava quase parando, literalmente. Para ajustar, tive que ir no diretório C: da minha máquina, acessar meu usuário e criar um arquivo com o nome .wslconfig, sem nenhuma extensão e restringir para apenas 1GB e 1 processador meu projeto no Dockerfile. Dentro deste arquivo, colei o seguinte script de configuração: 

      [wsl2]
      memory=1GB
      processors=1

   7-Fechei o Docker Desktop, abri o PowerShell para o digitar o comando abaixo e em seguida, reiniciei o Docker Desktop, para poder atualizar e reduzir o tamanho da memória de utilização local de minha máquina.

      wsl --shutdown

   8-Docker Hub - Publicação da Image
   
   8.1 - Criei uma conta em DockerHub

        https://hub.docker.com
   
   8.2 - Fiz login no terminal PowerShell com: docker login
=>Voltei na pasta raiz do projeto, em minha máquina, cliquei com botão direito nela, mandei abrir o PowerShell, assim o caminho do projeto já estaria configurado para os próximos passos. Adicionei o comando abaixo para login do docker:

       docker login

   8.3 Usei o token gerado em: https://login.docker.com/active
=>Este comando gerou uma chave de acesso único. Acessei o site abaixo, conforme instrução, para colar a chave de acesso e identificar o docker: 

      https://login.docker.com/active

   9-Build e Push para Docker Hub
=>Entrei com o login e senha de acesso único, retornei ao PowerShell e visualizei Login efetuado com sucesso. Ainda no PowerShell realizei o seguinte comando para dar um build no DockerHub, ou seja, construir a imagem do projeto nele (Obs: substituir novamente por seu nome de usuário e o nome do seu site, não esqueça de copiar tudo, inclusive o ponto após o latest)

     docker build -t meuusuário/meusite:latest . 

   10-Depois, segui com o comando abaixo para dar um "push" na imagem no DockerHub (Obs: substituir por seu nome de usuário e o nome do seu site também)
    
      docker push meuusuário/meusite:latest 
      
   11-Resultado no Docker Hub
A imagem foi publicada com sucesso e está disponível no repositório:
 
    https://hub.docker.com/repository/docker/patriciasousa/mariliakarateka
_______________________________________________________________________________________

☸️ Kubernetes e Helm Charts - Deploy 

   12-Primeiros testes com Minikube
Tentei utilizar o Minikube para testes locais de cluster Kubernetes. No entanto, mesmo com configurações otimizadas, minha máquina apresentava lentidão extrema.

   13-Teste de Túnel com Cloudflare
Configurei um túnel direto entre meu cluster local e o DNS da Cloudflare. O site ficou acessível publicamente, porém ao desligar o PC o site saía do ar — o que me fez abandonar esta abordagem.
Resumo das etapas de DNS e túnel:
•	Configurei domínio.
•	Vinculei o domínio no painel da Cloudflare.
•	Gerei o túnel usando Cloudflared com token de autenticação.
•	O site foi testado com sucesso via domínio DNS, rodou liso, mas a limitação de depender do PC ligado inviabilizou este processo.


   ✅ Solução definitiva com Helm + Kubernetes

   14-Instalação do Helm (No PowerShell)
   
      choco install kubernetes-helm  
   
   15-Criação dos charts personalizados (PowerShell do VSCode): 

       helm create charts

   16-Limpei os arquivos padrão, no Bash do VSCode: 

      rm -rf charts/templates/tests
      rm charts/values.yaml charts/templates/*.yaml

   17-Criei o Arquivo values.yaml:

      replicaCount: 1
      image:
        repository: colocarnomedoseuusuário/nomedoprojeto
        tag: latest

      service:
        type: NodePort
        port: 80
        nodePort: 31000

      ingress:
        enabled: true
        className: nginx
        hosts:
        - host: colocarnomedoseuusuário/nomedoprojeto
          paths:
          - path: /
            pathType: Prefix

      version: 0.1.0
      description: Helm chart for nomedoseuprojeto site

O replicaCount acima é a quantidade de réplicas(pods) que o Kubernetes irá criar para o deployment. Repository, colocar Usuário/Nome Projeto. Tag é a parte da imagem Docker a ser utilizada. Type: Tipo de serviço Kubernetes (ex: NodePort expõe a aplicação em uma porta do nó). Porta utilizada 80, porta interna do serviço (porta do container padrão do NGINX.

   19-Arquivo charts/templates/deployment.yaml
Criei o arquivo chamado deployment.yaml, com a seguinte estrutura: 

      apiVersion: apps/v1
      kind: Deployment
      metadata:
        name: {{ include "charts.fullname" . }}
      spec:
        replicas: {{ .Values.replicaCount }}
        selector:
          matchLabels:
            app.kubernetes.io/name: {{ include "charts.name" . }}
            app.kubernetes.io/instance: {{ .Release.Name }}
      template:
       metadata:
         labels:
            app.kubernetes.io/name: {{ include "charts.name" . }}
            app.kubernetes.io/instance: {{ .Release.Name }}
       spec:
         containers:
         - name: {{ .Chart.Name | lower }}
           image: "{{ .Values.image.repository }}:{{ .Values.image.tag }}"
           ports:
           - containerPort: 80

Principais campos do template Helm acima =>deployment.yaml
   replicas: Controla o número de instâncias (pods) do site em execução.
   image.repository / image.tag: Permite trocar facilmente a imagem Docker e a versão/tag utilizada.
   containerPort: Porta exposta pelo container, normalmente 80 para aplicações web.
   labels: Usados para garantir que o Service encontre corretamente os pods criados pelo Deployment.
   =>Esses campos tornam o deploy flexível e fácil de atualizar, bastando alterar o arquivo (values.yaml) para escalar ou trocar a imagem da aplicação.


20-Criei charts/templates/service.yaml com:

      apiVersion: v1
      kind: Service
      metadata:
        name: {{ include "charts.fullname" . }}-service
      spec:
        type: {{ .Values.service.type }}
        selector:
          app.kubernetes.io/name: {{ include "charts.name" . }}
          app.kubernetes.io/instance: {{ .Release.Name }}
        ports:
          - port: {{ .Values.service.port }}
            targetPort: 80
      {{- if eq .Values.service.type "NodePort" }}
      nodePort: {{ .Values.service.nodePort | default 31000 }}
      {{- end }}

Este manifesto Kubernetes define um Service que expõe a aplicação no cluster:
   apiVersion: v1 e kind: Service: define que o recurso criado é um Service.
   metadata.name: usa o nome do Helm Chart com o sufixo -service.
   spec.type: o tipo do serviço (ex: NodePort, ClusterIP, etc.) é definido via valores do Helm (Values.service.type).
   selector: direciona o tráfego para os pods com o label app igual ao nome do Chart.
   ports:
   port: a porta exposta pelo serviço (vinda do values.yaml).
   targetPort: porta interna do container (fixa em 80).
   nodePort: porta fixa do nó para acesso externo normalmente (30080), precisei usar outra (31000) pois a padrão já estava configurada para outra finalidade.

21-Em seguida, atualizei o Dockerfile com:

      FROM nginx:alpine
      COPY . /usr/share/nginx/html
      EXPOSE 80

No Dockerfile, as informações importantes são: 
   FROM nginx:alpine: usa uma imagem leve do NGINX como base.
   COPY . /usr/share/nginx/html: copia os arquivos da aplicação para a pasta padrão do NGINX.
   EXPOSE 80: expõe a porta 80 para acesso via HTTP.


22-Configurei os Secrets do Repositório no GitHub, que serão utilizados na Pipeline (CI-CD) para autenticação e deploy. 

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


🔧 ETAPA do CI/CD com Github Actions

23-Criei a pasta e o arquivo do workflow
Abri o terminal integrado do VSCode na raiz do seu projeto e execute, no Bash:

      mkdir -p .github/workflows

   Depois, criei o arquivo do workflow (pode ser pelo terminal do Bash, no VSCode).  
   Navegue até .github/workflows/
   Clique com o botão direito > Novo Arquivo > ci-cd.yml

      code .github/workflows/ci-cd.yml

 
24-Adicionando a Pipeline CI/CD ao projeto (se você for fazer, não esqueça de substituir a descrição NomeDoSeuUsuáriodoGitHub/NomeDoSeuProjeto, por suas respectivas informações, exemplo: DesenvolvedorExpert/ProjetoSite: 

      name: CI/CD Pipeline

      on:
        push:
          branches:
            - main

      jobs:
        deploy:
          runs-on: self-hosted
          steps:
            - uses: actions/checkout@v4
              with:
               submodules: 'false'

      - name: Verificar kubectl
        run: kubectl version --client

      - name: Verificar contexto Kubernetes
        run: kubectl config current-context

      - name: Ver pods no cluster
        run: kubectl get pods --all-namespaces

      - name: Deploy com Helm
        run: |
          helm upgrade --install nomedoseuprojeto ./charts `
            --set image.repository=nomedoseurepositorio/nomedoseuprojeto `
            --set image.tag=latest


Explicação do Workflow CI/CD (acima)
      Este pipeline automatiza o build, push e deploy da aplicação:
      Disparo: Executa automaticamente em push na branch main.

   =>Etapa build-and-push:
      Faz checkout do código.
      Builda a imagem Docker com o nome UsuáriodoGitHub/NomeDoProjeto:latest.
      Faz login no Docker Hub usando segredos seguros (DOCKERHUB_USERNAME e DOCKERHUB_TOKEN).
      Publica a imagem no Docker Hub.

   =>Etapa deploy:
      Depende da etapa anterior (build-and-push).
      Instala o Helm com uma GitHub Action oficial da Azure.
      Executa o deploy no Kubernetes usando helm upgrade --install, passando o nome da imagem e tag. A action azure/setup-helm@v4 apenas instala o Helm.


25-Fazer commit e push do workflow
   No terminal do Bash, colar:

      git add .github/workflows/ci-cd.yml
      git commit -m "Adiciona pipeline CI/CD com build e deploy"
      git push origin main     

26-Os dados acima foram os dados finais do projeto, tive muitos erros e inconsistências na parte do CI/CD, tive que mudar muitos elementos para chegar a versão acima final, que é configurada de acordo com a necessidade de cada projeto, não sendo uma estrutura fixa. Compartilhei os manifestos e informações para nortear para quem for tentar elaborar um projeto similar ao meu, mas depende de muita leitura na documentação, pesquisas e personalização de específica para cada projeto.






