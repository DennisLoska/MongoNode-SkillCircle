# Skill circle - MongoDB + Node.js

## Basic Setup
Usually you encounter the following setup:
- Express framework
- Mongoose (popular MongoDB client for Node.js)
- Either server side rendering or some frontend like React

## What will you learn?

- Get an idea of how to structure the project
- How to query the MongoDB database from specific routes
- Asynchronous Javascript
- Error handling
- Bonus: all of that in Docker!

## General goal of this circle

Get a good intuition or feeling of how this setup works and how it relates to e.g. our current applications like the BizConnect to understand these better.

## Follow along

Get the code:

```bash
git clone https://github.com/DennisLoska/MongoNode-SkillCircle
```

Navigate into the directory and build the project:

```bash
docker-compose build
```
Run the project, which will start 3 contianers: skillcircle-app, skillcircle-db and skillcircle-mongo-express!

```bash
docker-compose up -d
```
If you make changes to the code I suggest to restart & rebuild using the following command:

```bash
docker-compose down && docker-compose build --no-cache && docker-compose up
```
You can inspect the database by going to http://localhost:8081 or attaching to the database container:

```bash
docker exec -it skillcircle-db /bin/bash
mongo
show dbs
```


## Links

Code: https://github.com/DennisLoska/MongoNode-SkillCircle

Based on:

- https://medium.com/@kahana.hagai/docker-compose-with-node-js-and-mongodb-dbdadab5ce0a
- https://flaviocopes.com/node-mongodb/
- https://mongoosejs.com/docs/promises.html
