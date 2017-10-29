'use strict';

const replPlugin = require('hapi-repl');
const Hapi = require('hapi');
const Good = require('good');
const Sequelize = require('sequelize');
const models = require('./models');

const server = new Hapi.Server();
server.connection({ port: 3000, host: 'localhost' });

// does nothing
server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Hello, world!');
  }
});

// fetch today's menu options
server.route({
  method: 'GET',
  path: '/menu',
  handler: function (request, reply) {
    reply('Hello, world!');
  }
});

// add or update an order
server.route({
  method: 'PUT',
  path: '/order/{order_id}',
  handler: function (request, reply) {
    reply('Hello, world!');
  }
});

// change delivery options
server.route({
  method: ['PATCH'],
  path: '/order/{order_id}',
  handler: function (request, reply) {
    reply('Hello, world!');
  }
});

// cancel an order
server.route({
  method: 'DELETE',
  path: '/order/{order_id}',
  handler: function (request, reply) {
    reply('Hello, world!');
  }
});

// get order details
server.route({
  method: 'GET',
  path: '/order/{order_id}',
  handler: function (request, reply) {
    reply('Hello, world!');
  }
});

// add or update user account
server.route({
  method: ['PUT', 'PATCH'],
  path: '/account/{user_id}',
  handler: function (request, reply) {
    reply('Hello, world!');
  }
});

// get user details
server.route({
  method: 'GET',
  path: '/account/{user_id}',
  handler: function (request, reply) {
    models.User.findById(request.params.user_id)
    .then(user => reply(JSON.stringify(user)));
  }
});

// get user order history
server.route({
  method: 'GET',
  path: '/account/{user_id}/orders',
  handler: function (request, reply) {
    models.Order.findAll({ where: { UserId: request.params.user_id}})
    .then(orders => reply(JSON.stringify(orders)));
  }
});

// get user details & order history
server.route({
  method: 'GET',
  path: '/account/{user_id}/all',
  handler: function (request, reply) {
    models.User.findById(request.params.user_id, { include: [models.Order]})
    .then(payload => reply(JSON.stringify(payload)));

  }
});


server.register([
  { register: replPlugin },
  {
    register: Good,
    options: {
      reporters: {
        console: [{
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{
            response: '*',
            log: '*'
          }]
        }, {
          module: 'good-console'
        }, 'stdout']
      }
    }
  },
  {
    register: require('hapi-sequelize'),
    options: [
      {
        name: 'juice_hapi', // identifier
        models: ['./server/models/**/*.js'],  // paths/globs to model files
        sequelize: new Sequelize('postgres://localhost:5432/juice_hapi', {}),
        //sync: true, // sync models - default false
        forceSync: false//, // force sync (drops tables) - default false
        //onConnect: function (database) { // Optional
        //  console.log('connected via sequelize');// migrations, seeders, etc.
        //}
      }
    ]
  }
], (err) => {
  if (err) {
    throw err; // something bad happened loading the plugins
  }
  server.start((err) => {
    if (err) {
      throw err;
    }
    server.log('info', 'Server running at: ' + server.info.uri);
  });
});
