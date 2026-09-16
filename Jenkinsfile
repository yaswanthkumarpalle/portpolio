pipeline {
    agent any

    options {
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    environment {
        DEPLOY_PATH = 'https://your-deployment-target.example.com'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                git branch: 'main', url: 'https://github.com/yaswanthkumarpalle/portpolio.git'
            }
        }

        stage('Validate Project') {
            steps {
                echo 'Validating portfolio files...'
                bat '''
                    if not exist index.html exit /b 1
                    if not exist style.css exit /b 1
                    if not exist script.js exit /b 1
                    echo Project structure looks valid.
                '''
            }
        }

        stage('Build Static Site') {
            steps {
                echo 'Preparing static website artifacts...'
                bat '''
                    if exist dist rmdir /s /q dist
                    mkdir dist
                    copy index.html dist\\
                    copy style.css dist\\
                    copy script.js dist\\
                    if exist assets xcopy assets dist\\assets\\ /E /I
                    if exist resume xcopy resume dist\\resume\\ /E /I
                    echo Build complete. Files copied to dist\
                    dir /s dist
                '''
            }
        }

        stage('Archive Artifacts') {
            steps {
                echo 'Archiving build output...'
                archiveArtifacts artifacts: 'dist/**/*', fingerprint: true
            }
        }

        stage('Deploy') {
            when {
                expression {
                    return env.DEPLOY_PATH != 'https://your-deployment-target.example.com'
                }
            }
            steps {
                echo 'Deploying static website...'
                bat '''
                    echo Deploying dist\ to %DEPLOY_PATH%
                    rem Replace with your real deployment command, for example:
                    rem robocopy dist\\ server\\path\\ /E
                '''
            }
        }
    }

    post {
        always {
            echo 'Pipeline finished.'
        }
        success {
            echo 'Build and archive successful.'
        }
        failure {
            echo 'Build failed. Please check the logs.'
        }
    }
}
