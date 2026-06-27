# Lab 3 REST API

## How to Run

```bash
npm install
npm run server
```

The server runs on:

```text
http://localhost:3000
```

## How to Test

```bash
npm test
```

## API Routes

| Method | Route | Description |
|---|---|---|
| GET | `/health` | Health check |
| GET | `/items` | Return all items |
| GET | `/items/:id` | Return one item |
| POST | `/items` | Create one item |
| PUT | `/items/:id` | Update one item |
| DELETE | `/items/:id` | Delete one item |

## Reflection Answers

### 1. What makes this API more REST-like than the previous HTTP/JSON lab?

It uses HTTP methods like GET, POST, PUT, and DELETE to perform operations on resources. Each route represents a resource instead of using custom commands.

TODO

### 2. What is the purpose of a route parameter such as `/items/:id`?

A route parameter allows the server to identify a specific item. The :id value is used to find, update, or delete a particular item.

TODO

### 3. Why should `POST`, `PUT`, and `DELETE` use different HTTP methods?

POST creates a new resource, PUT updates an existing resource, and DELETE removes a resource. Using different methods makes the API easier to understand and follow REST conventions.

TODO

### 4. What is the difference between a `400` error and a `404` error?

A 400 Bad Request error means the client sent invalid or incomplete data. A 404 Not Found error means the requested resource does not exist.

TODO

### 5. How does the OpenAPI file relate to your Express server code?

The OpenAPI file documents the API by describing the available routes, request bodies, responses, and status codes. It serves as documentation for the Express server implementation.

TODO

## Graduate Extension

TODO: Graduate students should describe their extension here.
