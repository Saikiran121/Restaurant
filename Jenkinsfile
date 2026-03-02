pipeline {
    agent any 

    stages {
        stage("Check node version") {
            steps {
                sh 'node --version'
                sh 'npm --version'
            }
        }
    }
}