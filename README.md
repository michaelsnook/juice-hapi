README
======

A server to receive juice orders, modify and cancel them, and manage user
profiles. For ordering juice!

Setup
-----
`npm install` will install dependencies. Set up a postgres database `juice_hapi`
and run the migrations and seeds: `node_modules/.bin/sequelize db:migrate
&& node_modules/.bin/sequelize db:seed:all`.

Development
-----------
In dev, `npm start` will run the server with nodemon to watch for changes.


Production
----------
In production, `node index.js` works,
and there's a Procfile for running via Foreman / on Heroku.
