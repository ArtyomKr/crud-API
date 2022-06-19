# Crud-API
A simple nodejs server
# How to install and run
1. Clone repo: `git clone: git@github.com:ArtyomKr/crud-API.git`
2. Switch to **dev** branch: `git checkout dev`
3. Install dependancies: `npm i`
4. Run: `npm start`
# How to run tests:
1. Start/restart server with `npm start` command.<br>
**Note**: it's important to restart server every time before running test command, because one of the tests is checking if all user records are empty.
2. Run `npm test`.
# Available endpoints:
## 1. GET `/api/users`
Returns all users records.
## 2. GET `/api/users/:id`
Returns user with specified `id`.
## 3. POST `/api/users`
Creates new user.
## 4. PUT `/api/users/:id`
Updates user with specified `id`.
## 5. DELETE `/api/users/:id`
Deletes user with specified `id`.
