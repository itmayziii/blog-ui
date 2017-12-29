pipeline {
  agent {
    docker {
      image 'node:8.9'
    }
    
  }
  stages {
    stage('Install Dependencies') {
      steps {
        sh 'npm install'
      }
    }
    stage('Test') {
      steps {
        sh 'npm run test'
      }
    }
  }
}