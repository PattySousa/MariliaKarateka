# site-marilia-karateka
Site Marilia Karateka 

=> Desenvolvi este projeto para subir o site que fiz em
homenagem à minha mãe, Marília e colocar em prática as 
últimas ferramentas que aprendi recentemente em meus estudos de Devops. 
   Estou trabalhando recentemente neste projeto para finalizar os detalhes para o Deploy do mesmo.

   Progresso até o momento:

=> Como já sabia quais pastas e arquivos precisaria criar, 
antes de iniciar esta segunda parte do projeto, resolvi criar a  arquiterura dele primeiro no VSCode, para depois importar os arquivos do site, da minha máquina local e instalar os devidos conteúdos externos necessários neste 
referido projeto.

1-Criei os arquivos na raiz do projeto, no terminal do WSL no VSCode: 
   => touch Dockerfile index.html galeria.html README.md reset.css script.css style.css Jenkinsfile

2-Criei o diretório imagens, para importar de minha máquina local, os videos e fotos anteriormente produzidos por mim.
   => mkdir imagens

3-Criei o diretório Helm chart, com o comando: 
   => mkdir helm-chart

4-Dentro do diretório helm-chart, criei a pasta templates do Kubernetes com os Chart.yaml e Values.yaml que precisarei
neste projeto. 
   => cd helm-chart
      mkdir templates
      touch Chart.yaml values.yaml

5-A estrutura do projeto ficou com esta arquitetura, no VSCode 

     site_marilia/
        └── helm-chart/  
          └── templates/ 
            ├── deployment.yaml 
            ├── ingress.yaml
            ├── service.yaml 
            ├── Chart.yaml
            ├── values.yaml
        ├── imagens/
        ├── Dockerfile
        ├── galeria.html
        ├── index.html
        ├── Jenkinsfile
        ├── README.md
        ├── script.css
        ├── style - galeria.css
        ├── style - index.css

6 - Importei os arquivos, versionados anteriormente no VSCode da página site-marilia-karateka, para este projeto 
    Os arquivos (index.html, galeria.html, style - index.css, style - galeria.css e script.css) e transferi as imagens da pasta local 
    do meu computador para pasta de imagens deste projeto com Docker.

7 - Já com o repositório do GitHub aberto no meu terminal do Powershell do VSCode, eu enviei as alterações e inclusões dos arquivos para o Git.

   =>git status (Verifiquei se todos os arquivos estavam listados)
   =>git add . (Adicionei todos os arquivos modificados)
   =>git commit -m "alterações dos arquivos" (Fiz um commit das alterações dos arquivos)
   =>git push origin main (Finalmente enviei as alterações para meu repositótio remoto do GitHub -> Site-Marilia-Karateka)

    ** Em breve irei realizar alterações ao projeto  


