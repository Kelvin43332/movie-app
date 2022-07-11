pipeline{

	agent any

	environment {
		DOCKERHUB_CREDENTIALS=credentials('8e0fffbb-e50f-4064-8b21-a5059ea6fa71')
	}

	stages {

		stage('Build') {

			steps {
				sh 'docker build -t cloudphyte/kolfx:latest .'
			}
		}

		stage('Login') {

			steps {
				sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'
			}
		}

		stage('Push') {

			steps {
				sh 'docker push cloudphyte/kolfx:latest'
			}
		}
	}

	post {
		always {
			sh 'docker logout'
		}
	}

}
