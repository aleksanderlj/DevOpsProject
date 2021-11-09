pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        echo 'Build here'
        sh '''#!/bin/bash
docker-compose build'''
      }
    }

    stage('Test') {
      steps {
        echo 'Test here'
      }
    }

    stage('Deploy') {
      steps {
        echo 'Deploy here'
        sh '''
#!/bin/bash
caprover deploy'''
      }
    }

  }
}