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
        stage('') {
          agent {
            docker {
              image 'itmayziii/node-chrome:8.9'
            }
            
          }
          steps {
            sh 'npm install highlight.js'
          }
        }
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
  }
}