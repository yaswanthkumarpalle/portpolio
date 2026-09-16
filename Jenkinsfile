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
                sh '''
                    test -f index.html
                    test -f style.css
                    test -f script.js
                    echo "Project structure looks valid."
                '''
            }
        }

        stage('Build Static Site') {
            steps {
                echo 'Preparing static website artifacts...'
                sh '''
                    rm -rf dist
                    mkdir -p dist
                    cp -r index.html style.css script.js assets resume dist/
                    echo "Build complete. Files copied to dist/"
                    ls -R dist
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
                sh '''
                    echo "Deploying dist/ to ${DEPLOY_PATH}"
                    # Replace with your real deployment command, for example:
                    # rsync -av --delete dist/ user@server:/var/www/html/
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
