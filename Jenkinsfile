pipeline {
  agent none
  stages {
    stage('Install Dependencies') {
      parallel {
        stage('Install Dependencies') {
          agent {
            docker {
              image 'itmayziii/node-chrome:8.9'
            }
            
          }
          steps {
            sh 'npm install'
          }
        }
        stage('Initialize Submodules') {
          agent any
          steps {
            sh 'git submodule init'
            sh 'git submodule update'
          }
        }
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
        echo 'Done!!!'
      }
    }
  }
}