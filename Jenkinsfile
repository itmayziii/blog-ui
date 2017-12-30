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
      agent any
      steps {
        sh 'scp -r -i /var/jenkins_home/.ssh/fullheapdeveloper ./dist root@165.227.217.233:/Sites/blog/blog-ui/'
      }
    }
  }
}