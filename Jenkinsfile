pipeline {
  agent none
  stages {
    stage('Install Submodules') {
      steps {
        sh 'git submodule init'
        sh 'git submodule update'
      }
    }
    stage('Install Dependencies') {
      parallel {
        stage('Install Dependencies') {
          steps {
            sh 'npm install'
          }
        }
        stage('Install Submodule dependencies') {
          steps {
            dir(path: 'highlight.js') {
              sh 'npm install'
            }
            
          }
        }
      }
    }
    stage('Build') {
      steps {
        sh 'npm run build'
      }
    }
  }
}