pipeline {
  agent any
  stages {
    stage('Build') {
      steps {
        echo 'Build here'
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
WEBHOOK_URL="https://captain.downvoted.dk/api/v2/user/apps/webhooks/triggerbuild?namespace=captain&token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InRva2VuVmVyc2lvbiI6ImE2MjRiZWU1LTJiZTQtNDViNi1hZjBmLWUzMzUzNGE5MTIyYyIsImFwcE5hbWUiOiJyZWFjdCIsIm5hbWVzcGFjZSI6ImNhcHRhaW4ifSwiaWF0IjoxNjM1ODQ1MzU2fQ.6_frqYDo6n3XympQgjqd0kBEaAp4jSEOrHh2459gPJ8"
curl -X POST \\
  -H "Accept: application/json" \\
  -H "Content-Type:application/json; charset=utf-8" \\
  -d \'{}\' \\
  ${WEBHOOK_URL}'''
      }
    }

  }
}