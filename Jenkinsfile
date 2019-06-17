pipeline {
  agent {
    label 'slave-angular'
  }
  triggers {
    pollSCM('H/5 * * * *')
  }
  options {
    disableConcurrentBuilds()
    buildDiscarder(logRotator(numToKeepStr: '30', daysToKeepStr: '90'))
  }
  stages {
    stage('Clean and checkout project') {
      steps{
      deleteDir()
      checkout(changelog: false, scm: scm)
      }
    }
    stage('Build') {
      steps{
      sh "npm install"
      }
    }
    stage('Run serveur and test') {
      parallel {
        stage('Run serveur') {
          steps{
            sh "npm start"
          }
        }
        stage('Test') {
          steps {
            sh "sleep 30s"
            sh "npm test"
            sh "npm stop"
          }
        }      
      }
    }
  }
  post {
    always {
    step([$class: 'Mailer', recipients: [emailextrecipients([[$class:
    'CulpritsRecipientProvider'], [$class: 'RequesterRecipientProvider']])].join(' ')])
    }
  }
}
