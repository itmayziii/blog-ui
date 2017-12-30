pipeline {
  agent none
  stages {
    stage('Install Submodules') {
      agent any
      steps {
        sh 'git submodule init'
        sh 'git submodule update'
      }
    }
    stage('Install Dependencies') {
      agent {
        docker {
          image 'itmayziii/node-chrome:8.9'
        }
        
      }
      steps {
        sh 'npm install'
        sh 'npm run install:submodules'
      }
    }
    stage('Build') {
      agent {
        docker {
          image 'itmayziii/node-chrome:8.9'
        }
        
      }
      steps {
        sh 'npm run build'
      }
    }
    stage('Test') {
      agent {
        docker {
          image 'itmayziii/node-chrome:8.9'
        }
        
      }
      steps {
        sh 'npm run test'
      }
    }
    stage('Deploy') {
      steps {
        echo 'DONE!'
      }
    }
  }
}