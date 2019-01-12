
  
  
# student-information-microservice 
  
## Getting Started  
These instructions are going to help you start the service on your PC.  
  
### Prerequisites  
  
In order to make things work, make sure you have installed nodeJS: https://nodejs.org/en/.  
  
### Usage  

To install all the dependencies use:
  
```  
npm install  
```  
Make sure you're in folder with package.json in it, before running the command!
  
To start the server, use:
```  
npm start
```  

To deploy it in docker, make sure you have started the docker and then run the following command:
```  
docker-compose up --build -d users-service
```  

To run the container, use:

```
docker-compose run users-service
```
It will listen to localhost:3000;

Other useful command for Docker:
- docker ps -> to see the active containers
- docker stop CONTAINER_ID -> to stop the container 


## Authors

* **Studnet** UAIC FII
