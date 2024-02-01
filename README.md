# simple-vulnerable-app
Simple containerized vulnerable web app written in Flask.

## Used technologies
- **Flask:** Lightweight micro web framework written in Python.
- **Docker:** Tool that is used to automate the deployment of applications in lightweight containers so that applications can work efficiently in different environments in isolation.
- **Docker Compose:** Tool for defining and running multi-container applications.

## Project structure
![](./app/static/images/ProjectStructure.gif)

## Requirements
- [Docker](https://www.docker.com/)
- Modern web browser

## Installation
``` bash
git clone https://github.com/carmine-ambrosino/simple-vulnerable-app.git
cd simple-vulnerable-app
docker compose up -d
```

## App access
The application will be accessible from your browser at:
- https://localhost

## Use in Virtual Machine

This setup is specific for running locally; if you want to run it in a
virtual machine, modify the following file:
- ***nginx/nginx.conf*:** Change `server_name` with virtual machine ip address. 

## Note
Do not use it in production environments as it is for demonstration purposes only to have an environment on which to test attack, like cross-site scripting.