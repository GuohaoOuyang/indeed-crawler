### Prerequisites

In order to run this project locally you must have node.js installed.

This project was built on the following node version.

```javascript
$ node --version
v10.15.3
```

You must also create a .env file in ./server with the following variables:

```javascript
//obtained from mongoDB
MONGO_URI = " ";

// name and port of your local server. With out setup, requests to port 3000 are proxied to the backend.
HOST_NAME = "http://localhost:3000";
```

If any of the above environment variables are missing the project will loose functionality or even fail to run.

### Getting Started

```javascript
git clone https://github.com/GuohaoOuyang/indeed-crawler.git
```

```javascript
cd server
npm install
npm run server
cd ..
cd client
npm install
npm start
```
