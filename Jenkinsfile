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
        stage('Install Submodule dependencies') {
          agent {
            docker {
              image 'itmayziii/node-chrome:8.9'
            }
            
          }
          steps {
            dir(path: 'highlight.js') {
              sh 'npm install'
            }
            
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