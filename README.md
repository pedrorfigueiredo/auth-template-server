# Auth Template Server

## Introduction

This is a RESTful API Node.js server with signup and signin functionalities. A boilerplate for starting an authentication and authorization backend for your project.

It uses JWT (JSON Web Token) authentication.

All API points are tested using jest and supertest libraries.

## Install

```sh
npm install
```

## Running the API server

You'll have to configure environment variables for mongoDB server and JWT secret key inside

```sh
./src/config.js
```

After that you can start your server.

```sh
npm start
```

Now your Authentication - Backend server is running!

## Testing

```sh
npm test
```

## API Endpoints

### People

* Create a new user: `POST /signup`

```js
body: {
  email,
  password
}
```

* Login an user: `POST /signin`

```js
body: {
  email,
  password
}
```

* Access a protected route: GET /

```js
headers: {
  authorization: token
}
```