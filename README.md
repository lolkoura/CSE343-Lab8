# CSE343 Web Development — Lab 8

Mini-Twitter REST API using Node.js, Express, and JavaScript arrays and objects. Data is stored in memory and resets when the server restarts.

## Run

Requires Node.js 18 or later.

```bash
npm install
npm start
```

Open http://localhost:3000. Keep the server running.

## Endpoints

| Method | Path | Purpose | JSON body |
| --- | --- | --- | --- |
| POST | /posts | Upload a post | {"title":"First post","content":"Hello"} |
| PUT | /posts/:id | Edit a post | {"title":"Updated post","content":"New text"} |
| DELETE | /posts/:id | Delete a post | — |
| GET | /posts | Read all posts | — |
| POST | /posts/:id/comments | Add a comment | {"content":"Nice post!"} |
| GET | /posts/:id/comments | Read post comments | — |

## Test

Open a second terminal while the server is running and execute:

```bash
npm test
```

This exercises all six required operations and a missing-post error. The test creates and deletes its own post.

## Notes

The six operations are based on Lab 7 page 15 and Lab 8 page 30. The routes follow standard REST conventions and the POST /posts example from Lab 8. No database is used.
