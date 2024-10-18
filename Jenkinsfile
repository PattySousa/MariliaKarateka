pipeline {
    agent any

    environment {
        DOCKERHUB_CREDENTIALS = credentials('dockerhub-credentials-id') // Suas credenciais Docker Hub no Jenkins
        KUBECONFIG = credentials('kubeconfig-id') // O kubeconfig do cluster Kubernetes
    }

    stages {
        stage('Checkout') {
            steps {
                git 'https://github.com/PattySousa/Site_Marilia.git'  // Seu repositório Git
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.withRegistry('https://index.docker.io/v1/', DOCKERHUB_CREDENTIALS) {
                        def app = docker.build("patriciasousa/site-marilia:latest")
                        app.push()
                    }
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    withKubeConfig(credentialsId: 'kubeconfig-id') {
                        sh """
                        helm upgrade --install site-marilia ./helm-chart --namespace site-marilia --set image.repository=patriciasousa/site-marilia,image.tag=latest
                        """
                    }
                }
            }
        }

        stage('Expose Application') {
            steps {
                script {
                    sh """
                    kubectl apply -f helm-chart/templates/ingress.yaml
                    """
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
