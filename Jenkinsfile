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
stage('Run serveur') {
steps{
sh "node serveur.js"
}
}
stage('Test') {
steps{
sh "npm test"
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
