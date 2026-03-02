pipeline {
    agent any 

    stages {
        stage("Check node version") {
            steps {
                sh 'node --version'
                sh 'npm --version'
            }
        }

        stage("Install Dependencies") {
            steps {
                sh 'npm install'
            }
        }

        stage("Linting") {
            steps {
                sh 'npm run lint'
            }
        }

        stage("Unit tests") {
            steps {
                sh 'npm run test'
            }

            post {
                always {
                    junit 'reports/*.xml'
                }
            }
        }
    }
}