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
    stage('Deploy') {
      steps {
        echo 'Done'
      }
    }
  }
  environment {
    CHROME_BIN = 'node_modules/.bin/chromedriver'
  }
}