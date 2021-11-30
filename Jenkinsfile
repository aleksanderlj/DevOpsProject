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
docker login -u amtoft -p LtS5fwvhCsh4PL
docker push amtoft/devops_react_app
sudo caprover deploy -i amtoft/devops_react_app -a react -n captain-01 -p jonatandahl'''
      }
    }

  }
}