pipeline {
  agent {
    docker {
      image 'itmayziii/node-chrome:8.9'
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
    stage('Deploy') {
      steps {
        echo 'Done!'
      }
    }
  }
}