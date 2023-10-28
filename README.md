## Void Node Challenge
Developed by [jjairojr](https://github.com/jjairojr)
  ![void-logo](https://github.com/jjairojr/void-node-test/assets/44951083/6d0bf6d0-b7fa-47f8-86d6-e3e0d011b8f0)


This project was developed as part of the Void.gg Test Node Challenge. It aims to create a API SERVICE to get details about summoners and leaderboards.


Link to the complete challenge instructions: [Node Challenge Instructions](https://docs.google.com/document/d/1tSXfHrsE61bGgQ7nCmci19wVaMgGoIJRu-QNxOfOwIY/edit)


## Implemented Features


-  [x] GET Player summary

-  [x] GET Player recent matches

-  [x] GET Player rank on leaderboard

-  [x] GET Leaderboard by Region

-  [x] GET Lol Rank images


## Deploy
The deploy use github actions in a ci.yml pipeline, the pipeline runs, lint, tests 
and build a docker image and deploy the imagine through GH Runners to EC2 Aws machine,
EC2 listen through the GH Runner and pull the docker image and run the container.

## Postman Collection

I provide a [POSTMAN COLLECTION](https://drive.google.com/drive/u/1/folders/1DuBO87iL5HMdhapfZUJuKWWrVMaXlJ9_) to test the api, locally and on AWS ec2.
  

## Tests

To ensure code robustness and quality, comprehensive tests have been implemented:

-  [x] Unit Tests

### How to run Tests

Just execute

```
npm run test

```

### Prerequisites

Before getting started, make sure you have the following tools installed on your machine:

-  [Docker](https://www.docker.com/get-started)

-  [Docker Compose](https://docs.docker.com/compose/install/)

### Steps to run on local machine

* Clone the project in your machine!
* Create the ```.env``` file. 
	```
	cp .env.example .env
	```
* Install the dependencies ```npm install```
* Start the project ```npm run start:dev```

#### DATABASE
* Start database with this command
	 ```docker-compose -f docker-compose-dev.yml up --build -d```

## Dependencies
- **Nest**: A web application framework for building server-side applications.
- **PostgreSQL**: An open-source relational database.
- **Zod**: A TypeScript data validation library.
- **Jest**: A JavaScript testing framework.
- **dotenv**: A module for managing environment variables.
