{\rtf1\ansi\ansicpg1252\deff0\nouicompat\deflang1033{\fonttbl{\f0\fnil\fcharset0 Calibri;}}
{\*\generator Riched20 10.0.19041}\viewkind4\uc1 
\pard\sa200\sl276\slmult1\f0\fs22\lang9 pipeline\{\par
\par
\tab agent any\par
\par
\tab environment \{\par
\tab\tab DOCKERHUB_CREDENTIALS=credentials('8e0fffbb-e50f-4064-8b21-a5059ea6fa71')\par
\tab\}\par
\par
\tab stages \{\par
\par
\tab\tab stage('Build') \{\par
\par
\tab\tab\tab steps \{\par
\tab\tab\tab\tab sh 'docker build -t cloudphyte/kolfx:latest .'\par
\tab\tab\tab\}\par
\tab\tab\}\par
\par
\tab\tab stage('Login') \{\par
\par
\tab\tab\tab steps \{\par
\tab\tab\tab\tab sh 'echo $DOCKERHUB_CREDENTIALS_PSW | docker login -u $DOCKERHUB_CREDENTIALS_USR --password-stdin'\par
\tab\tab\tab\}\par
\tab\tab\}\par
\par
\tab\tab stage('Push') \{\par
\par
\tab\tab\tab steps \{\par
\tab\tab\tab\tab sh 'docker push cloudphyte/kolfx:latest'\par
\tab\tab\tab\}\par
\tab\tab\}\par
\tab\}\par
\par
\tab post \{\par
\tab\tab always \{\par
\tab\tab\tab sh 'docker logout'\par
\tab\tab\}\par
\tab\}\par
\par
\}\par
}
 